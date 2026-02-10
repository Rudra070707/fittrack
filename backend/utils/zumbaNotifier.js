const cron = require("node-cron");
const User = require("../models/User");
const ZumbaSession = require("../models/ZumbaSession");
const { sendZumbaNotification } = require("./mailer");

/**
 * ✅ Zumba Notification Scheduler
 *
 * - Runs every minute
 * - Finds upcoming Zumba sessions
 * - Calculates notify time using notifyBeforeMin
 * - Sends email to users with zumbaNotify = true
 * - Prevents duplicate emails using in-memory cache
 *
 * ⚠️ NOTE:
 * This cache resets on server restart (ACCEPTABLE for college/demo).
 * For permanent deduplication, a NotificationLog collection can be added later.
 */

// In-memory cache: `${sessionId}-${userId}`
const sentCache = new Set();

function startZumbaNotifier() {
  // Run every minute
  cron.schedule("* * * * *", async () => {
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

          // Mark BEFORE sending (prevents race duplicates)
          sentCache.add(cacheKey);

          try {
            await sendZumbaNotification({
              to: user.email,
              userName: user.name,
              sessionTime: sessionTimeFormatted,
            });

            console.log(
              `✅ Zumba reminder sent -> ${user.email} | Session ${session._id}`
            );
          } catch (mailErr) {
            console.error(
              `❌ Failed to send Zumba reminder to ${user.email}:`,
              mailErr.message
            );
          }
        }
      }
    } catch (err) {
      console.error("❌ Zumba notifier error:", err.message);
    }
  });

  console.log("🕺 Zumba notifier started (runs every minute)");
}

module.exports = { startZumbaNotifier };
