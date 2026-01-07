"use client";

import { useState } from "react";

export default function RequestReturnButton({
  assetId,
}: {
  assetId: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleReturnRequest = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/return-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId }),
      });

      let data = null;

      // ✅ SAFE JSON PARSE
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      }

      if (!res.ok) {
        alert(data?.error || "Failed to request return");
        return;
      }

      alert("Return request submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReturnRequest}
      disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50 transition"

    >
      {loading ? "Requesting..." : "Request Return"}
    </button>
  );
}
