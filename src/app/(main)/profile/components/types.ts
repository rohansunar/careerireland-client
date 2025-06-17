// types.ts
import { ReactNode } from "react";

export interface Review {
  id: number;
  content: string;
}
export interface Service {
  id: number;
  name: string;
}
export interface Package {
  createdAt: string | number | Date;
  amount: ReactNode;
  package: any;
  id: number;
  name: string;
}
export interface Training {
  id: number;
  title: string;
}
export interface ImmigrationService {
  id: number;
  type: string;
}

export interface IProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
  provider: string;
  total_spent: string;
  reviews: Review[];
  services: Service[];
  packages: Package[];
  training: Training[];
  immigration_services: ImmigrationService[];
}

export type MenuKey =
  | "dashboard"
  | "profile"
  | "services"
  | "immigration"
  | "packages"
  | "reviews"
  | "training"
  | "contact";
