"use client";

interface GroupedAsset {
   id: number;   
  name: string;
  location: string;
  type: string;
  code: number;
}

type Props = {
  asset: GroupedAsset;
  disabled: boolean;
};

export default function CheckoutButton({ asset, disabled }: Props) {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: asset.code,
          message: null,
          name: asset.name,
          location: asset.location,
          type: asset.type,
          code: asset.code,
        }),
      });

      if (!res.ok) {
        alert("No asset available");
        return;
      }

      alert("Request sent successfully");
      location.reload();
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleCheckout}
      className={`
        px-4 py-1.5 text-xs font-medium rounded-md transition
        ${
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
        }
      `}
    >
      {disabled ? "Unavailable" : "Request"}
    </button>
  );
}
