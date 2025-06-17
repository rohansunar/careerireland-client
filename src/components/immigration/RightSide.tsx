import React from "react";
import { Product } from "./types";
import { useGuestPurchase } from "./GuestPurchaseContext";
import {
  useGuestImmigrationService,
  useImmigrationService,
} from "@/hooks/use-query";

interface RightSideProps {
  product: Product;
  onQuantityChange: (delta: number) => void;
  totalPrice: number;
  status: string;
  id: any;
  selectedTab: "register" | "guest" | "login";
}

export default function RightSide({
  product,
  onQuantityChange,
  totalPrice,
  status,
  id,
  selectedTab,
}: RightSideProps) {
  const { data } = useGuestPurchase();
  const { mutate: immigration, isPending: isImmigration } =
    useGuestImmigrationService();
  const { mutate, isPending: isLoginImmigration } = useImmigrationService();

  const handleCheckout = () => {
    if (selectedTab === "guest") {
      immigration({ ...data, id });
    } else {
      mutate({ immigration_serviceId: id });
    }
  };

  return (
    <aside className="flex-[0.8] p-6 md:p-8 bg-gray-50 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      <div className="flex items-center bg-white rounded shadow p-4 mb-6">
        <div className="flex-1 flex items-center justify-between">
          <h3 className="text-md font-semibold">{product.name}</h3>
          <h3 className="text-md font-semibold text-right">
            €{totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* <div className="flex items-center bg-white rounded shadow p-4 mb-6">

        <div className="flex-1">

          <div className="mt-2 flex items-center space-x-2">
            <h3 className="text-md mx-4 font-semibold">{product.name}</h3>
            <button
              onClick={() => onQuantityChange(-1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <h3 className="text-md mx-4 text-right font-semibold">€{totalPrice.toFixed(2)}</h3>
            <input
              type="text"
              readOnly
              value={product.quantity}
              className="w-12 text-right border rounded"
              aria-label="Product quantity"
            />
            <button
              onClick={() => onQuantityChange(1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div> */}

      <div className="text-right font-semibold text-xl mb-4">
        Total: €{totalPrice.toFixed(2)}
      </div>

      {/* Guest Purchase Info */}
      {selectedTab === "guest" && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Guest Information</h3>
          <p>
            <strong>Name:</strong> {data.name || ""}
          </p>
          <p>
            <strong>Mobile No:</strong> {data.mobile_no || ""}
          </p>
          <p>
            <strong>Email:</strong> {data.email || ""}
          </p>
        </div>
      )}

      <button
        className="mt-auto w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleCheckout}
        disabled={selectedTab === "guest" ? isImmigration : isLoginImmigration}
      >
        {isImmigration || isLoginImmigration
          ? "Processing..."
          : "Proceed to Checkout"}
      </button>
    </aside>
  );
}
