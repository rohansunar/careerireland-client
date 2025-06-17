export type Tab = "register" | "guest" | "login";

export interface UserFormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
