import React, { ChangeEvent, FormEvent, lazy, Suspense, useState } from "react";
import { useSession } from "next-auth/react";

import { GuestPurchaseProvider } from "@/components/immigration/GuestPurchaseContext";
import RightSide from "@/components/immigration/RightSide";

type Tab = "register" | "guest" | "login";

interface FormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const LeftSide = lazy(() => import("@/components/immigration/LeftSide"));

export default function Checkout({
  purchase,
  price,
  name,
  id,
}: {
  purchase: string;
  price: number;
  name: string;
  id: string;
}) {
  const { status } = useSession();

  const [selectedTab, setSelectedTab] = useState<Tab>("register");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [product, setProduct] = useState<Product>({
    id: 1,
    name,
    price,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/100",
  });

  const handleQuantityChange = (delta: number) => {
    setProduct((prev) => {
      const newQty = prev.quantity + delta;
      return { ...prev, quantity: newQty > 1 ? newQty : 1 };
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);

    if (formData.email && formData.password) {
      // Your registration logic here
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  const totalPrice = product.price * product.quantity;

  if (status === "loading") {
    return (
      <div
        className="max-w-7xl mx-auto my-6 md:my-10 flex items-center justify-center"
        style={{ minHeight: "200px" }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <GuestPurchaseProvider>
      <div className="max-w-7xl mx-auto my-6 md:my-10 flex flex-col md:flex-row border rounded-lg shadow-md overflow-hidden font-sans">
        {status !== "authenticated" ? (
          <Suspense
            fallback={
              <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-300 flex items-center justify-center">
                <p>Loading form...</p>
              </div>
            }
          >
            <LeftSide
              status={status}
              errorMessage={errorMessage}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setLoginError={setErrorMessage}
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Suspense>
        ) : (
          <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-300">
            <div
              className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded"
              role="alert"
              aria-live="polite"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block mt-1">
                You are logged in successfully!
              </span>
            </div>
          </div>
        )}

        <RightSide
          product={product}
          onQuantityChange={handleQuantityChange}
          totalPrice={totalPrice}
          status={status}
          id={id}
          selectedTab={selectedTab}
        />
      </div>
    </GuestPurchaseProvider>
  );
}
