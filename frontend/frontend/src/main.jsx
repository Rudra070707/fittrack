import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import "./index.css";
import AdminLayout from "./admin/AdminLayout";

// 🔥 Toast
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* 🔥 GLOBAL BACKGROUND BASE (FINAL FIXED - NO LINES) */}
      <div className="fixed inset-0 -z-[999] pointer-events-none overflow-hidden">

        {/* 🔥 BASE COLOR */}
        <div className="absolute inset-0 bg-[#05070c]" />

        {/* 🔥 LARGE SMOOTH LIGHT BLOBS (NO HARSH EDGES) */}
        <div className="absolute w-[1200px] h-[1200px] -top-1/3 -left-1/3 bg-green-400/10 blur-[250px] rounded-full" />

        <div className="absolute w-[1200px] h-[1200px] bottom-[-30%] right-[-30%] bg-cyan-400/10 blur-[250px] rounded-full" />

        {/* 🔥 CENTER SOFT LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[800px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[180px]" />

        {/* 🔥 SMOOTH DEPTH OVERLAY (REMOVES BANDING) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        {/* 🔥 NOISE TEXTURE (KEY FOR SMOOTHNESS) */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
          }}
        />

      </div>

      {/* 🔥 GLOBAL TOASTER (UPGRADED PREMIUM UI) */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        containerStyle={{
          marginTop: "10px",
        }}
        toastOptions={{
          duration: 3000,

          style: {
            background: "rgba(15, 23, 42, 0.85)",
            color: "#E6EAF0",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "12px 16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
            fontSize: "14px",
            transition: "all 0.3s ease",
          },

          success: {
            iconTheme: {
              primary: "#00FF9C",
              secondary: "#000",
            },
          },

          error: {
            iconTheme: {
              primary: "#FF4D4D",
              secondary: "#000",
            },
          },
        }}
      />

      {/* 🔥 APP MOUNT ANIMATION WRAPPER */}
      <div className="animate-fadeIn">

        <Routes>

          {/* Redirect root → /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Customer App */}
          <Route path="/home/*" element={<App />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />

        </Routes>

      </div>

    </BrowserRouter>
  </React.StrictMode>
);