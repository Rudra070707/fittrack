const cron = require("node-cron");
const User = require("../models/User");
const ZumbaSession = require("../models/ZumbaSession");
const { sendZumbaNotification } = require("./mailer");

// In-memory cache: `${sessionId}-${userId}`
const sentCache = new Set();

function startZumbaNotifier() {
  // ✅ Runs every minute (with IST timezone)
  cron.schedule(
    "* * * * *",
    async () => {
      try {
        const now = new Date();

        // Look ahead 6 hours
        const lookAhead = new Date(now.getTime() + 6 * 60 * 60 * 1000);

        // Active upcoming sessions
        const sessions = await ZumbaSession.find({
          isActive: true,
          dateTime: { $gte: now, $lte: lookAhead },
        }).lean();

        if (!sessions.length) return;

        // Users who opted in
        const users = await User.find({
          zumbaNotify: true,
          email: { $exists: true, $ne: "" },
        })
          .select("name email")
          .lean();

        if (!users.length) return;

        for (const session of sessions) {
          const notifyBeforeMin = Number(session.notifyBeforeMin ?? 60);

          const notifyAt = new Date(
            new Date(session.dateTime).getTime() - notifyBeforeMin * 60 * 1000
          );

          // Trigger only if within ±1 minute window
          const withinOneMinute =
            Math.abs(now.getTime() - notifyAt.getTime()) < 60 * 1000;

          if (!withinOneMinute) continue;

          // Format session time (India friendly)
          const sessionTimeFormatted = new Date(session.dateTime).toLocaleString(
            "en-IN",
            {
              timeZone: "Asia/Kolkata",
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          for (const user of users) {
            const cacheKey = `${session._id}-${user._id}`;
            if (sentCache.has(cacheKey)) continue;

            try {
              await sendZumbaNotification({
                to: user.email,
                userName: user.name,
                sessionTime: sessionTimeFormatted,
              });

              // ✅ Mark only after SUCCESS
              sentCache.add(cacheKey);

              console.log(
                `✅ Zumba reminder sent -> ${user.email} | Session ${session._id}`
              );
            } catch (mailErr) {
              console.error(
                `❌ Failed to send Zumba reminder to ${user.email}:`,
                mailErr.message
              );

              // ✅ Allow retry next minute (do not cache failed attempts)
              sentCache.delete(cacheKey);
            }
          }
        }
      } catch (err) {
        console.error("❌ Zumba notifier error:", err.message);
      }
    },
    {
      timezone: "Asia/Kolkata", // ✅ important for consistent triggering
    }
  );

  console.log("🕺 Zumba notifier started (runs every minute)");
}

module.exports = { startZumbaNotifier };