import React from 'react'
import { VerificationSDK, KycFlow } from "astra-sdk-new";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import 'astra-sdk-new/kycModal.css';
const Step4 = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrImgUrl, setQrImgUrl] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const sdkRef = useRef(null);
  const [showKyc, setShowKyc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // prevent background scroll while KYC modal is open
    if (showKyc) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
    return () => {};
  }, [showKyc]);



  const startKyc = async () => {
    try {
      setLoading(true);
      setError(null);

      // First initialize session with the backend
      const sessionResponse = await fetch("https://dc50252eefe8.ngrok-free.app/api/v2/dashboard/merchant/onsite/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-server-key": import.meta.env.VITE_ASTRA_SERVER_KEY || "fc122118-e86d-44db-bc29-bea64e387412",
          "device-type": "web",
        },
        body: JSON.stringify({
          reference: "test12",
          email: "user3@example.com",
          callback_url: "https://yourapp.com/kyc/callback",
          redirect_url: "https://yourapp.com/kyc/redirect",
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error(`Session initialization failed: ${sessionResponse.status}`);
      }

      const sessionData = await sessionResponse.json();
      // support multiple possible response shapes from the server
      const sessionId =
        sessionData?.data?.session_id ||
        sessionData?.data?.sessionId ||
        sessionData?.data?.id ||
        sessionData?.session_id ||
        sessionData?.sessionId ||
        sessionData?.id ||
        (sessionData?.session && sessionData.session.id);

      if (!sessionId) {
        throw new Error("No session ID received from server");
      }

      // Initialize SDK with the session ID
      const sdk = new VerificationSDK({
        serverKey: import.meta.env.VITE_ASTRA_SERVER_KEY || "fc122118-e86d-44db-bc29-bea64e387412",
      });

      // pass both snake_case and camelCase session keys to be compatible with SDK/server

      sdk.setSessionId(sessionId);   // <-- important: sets internal session id used by uploadFace/uploadDocument/getStatus/getResult
      sdkRef.current = sdk;
      setShowKyc(true);

      sdkRef.current = sdk;
      setShowKyc(true);
    } catch (e) {
      setError(e?.message || "Failed to initialize KYC session");
      toast.error(e?.message || "Failed to initialize KYC session");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={startKyc}
        className="w-full rounded-md bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white py-[13px]"
      >
        {loading ? "Starting..." : "Start Face Scan"}
      </button>
      {/* QR Handoff UI */}
      {showQR && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p style={{ color: "#9ca3af" }}>Scan on your phone to continue KYC</p>
          {qrImgUrl ? (
            <img src={qrImgUrl} alt="KYC QR Code" style={{ maxWidth: 220, border: "1px solid #ddd", borderRadius: 8, padding: 5 }} />
          ) : (
            <p>Preparing QR...</p>
          )}
          {mobileUrl && (
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
              Or open: <a href={mobileUrl} style={{ color: "#2563eb" }}>{mobileUrl}</a>
            </p>
          )}
          {/* Optional desktop fallback */}
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="rounded-md bg-[#292929] text-white text-xs py-[10px] px-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* KYC Modal with blurred background overlay and high z-index */}
      {showKyc && sdkRef.current && (
        <>
          {/* semi-transparent overlay that blurs the background */}
          <div
            aria-hidden
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999]"
          />

          {/* container that ensures SDK modal renders on top */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999999] pointer-events-auto">
            <KycFlow sdk={sdkRef.current} onClose={() => setShowKyc(false)} />
          </div>
        </>
      )}

      {/* prevent body scroll when modal open */}
      {/** useEffect below toggles document overflow when showKyc changes */}
    </div>
  )
}

export default Step4
