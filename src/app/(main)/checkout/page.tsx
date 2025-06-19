"use client";

import Checkout from "@/components/immigration/checkout-imme";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const purchase = searchParams.get("purchase");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  if (!purchase || !price || !name || !id) return <div>Loading...</div>;

  return (
    <Checkout purchase={purchase} price={Number(price)} name={name} id={id} />
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
