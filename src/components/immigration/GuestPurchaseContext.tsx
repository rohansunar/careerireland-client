import React, { createContext, useContext, useState, ReactNode } from "react";
import { z } from "zod";
import { guestPurchaseSchema } from "@/util/schema";

export type GuestPurchaseData = z.infer<typeof guestPurchaseSchema>;

interface GuestPurchaseContextType {
  data: GuestPurchaseData;
  setData: React.Dispatch<React.SetStateAction<GuestPurchaseData>>;
}

const defaultData: GuestPurchaseData = {
  name: "",
  mobile_no: "",
  email: "",
};

const GuestPurchaseContext = createContext<
  GuestPurchaseContextType | undefined
>(undefined);

export const GuestPurchaseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<GuestPurchaseData>(defaultData);

  return (
    <GuestPurchaseContext.Provider value={{ data, setData }}>
      {children}
    </GuestPurchaseContext.Provider>
  );
};

export const useGuestPurchase = (): GuestPurchaseContextType => {
  const context = useContext(GuestPurchaseContext);
  if (!context) {
    throw new Error(
      "useGuestPurchase must be used within GuestPurchaseProvider"
    );
  }
  return context;
};
