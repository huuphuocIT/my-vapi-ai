"use client";

import type { FC } from "react";
import { useVapi } from "../../hooks";
import { Button } from "@workspace/ui/components/button";

interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
}

export const VapiWidget: FC<VapiWidgetProps> = ({
  apiKey,
  assistantId,
  config = {},
}) => {
  const { isConnected, isSpeaking, transcript, startCall, endCall } = useVapi({
    apiKey,
    assistantId,
    config,
  });

  if (!isConnected) {
    return (
      <div className="space">
        <Button className="" onClick={endCall}>
          End Call
        </Button>
      </div>
    );
  }

  return (
    <div className="space">
      <div
        className=""
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          width: "320px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          border: "1px solid #e1e5e9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              className="w-[12px] animate-pulse"
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: isSpeaking ? "#ff4444" : "#12A594",
                animation: isSpeaking ? "pulse 1s infinite" : "none",
              }}
            ></div>
            <span style={{ fontWeight: "bold", color: "#333" }}>
              {isSpeaking ? "Assistant Speaking..." : "Listening..."}
            </span>
          </div>
          <button
            onClick={endCall}
            style={{
              background: "#ff4444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            End Call
          </button>
        </div>

        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            marginBottom: "12px",
            padding: "8px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          {transcript.length === 0 ? (
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
              Conversation will appear here...
            </p>
          ) : (
            transcript.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    background: msg.role === "user" ? "#12A594" : "#333",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    display: "inline-block",
                    fontSize: "14px",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VapiWidget;
