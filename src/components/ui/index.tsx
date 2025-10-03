import React from 'react';

export const Avatar: React.FC<{ src?: string; initials?: string }> = ({ src, initials }) => (
  <div
    style={{
      height: 72,
      width: 72,
      borderRadius: 0,
      overflow: "hidden",
      background: "#e2e8f0",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 18,
      color: "#374151",
      border: "2px solid #d1d5db",
    }}
  >
    {src ? (
      <img src={src} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
    ) : (
      initials || "HP"
    )}
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      background: active ? "#111827" : "#eef2ff",
      color: active ? "#fff" : "#3730a3",
      padding: "4px 10px",
      fontSize: 12,
      marginRight: 6,
      marginTop: 6,
      border: "1px solid #e5e7eb",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, background: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", padding: 16, ...style }}>{children}</div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    {...props}
    style={{
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.15)",
      background: "#111827",
      color: "#fff",
      padding: "8px 12px",
      fontSize: 13,
      cursor: "pointer",
      ...style,
    }}
  >
    {children}
  </button>
);
