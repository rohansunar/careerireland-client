/* eslint-disable no-unused-vars */
interface TMentor {
  id: string;
  name: string;
  email: string;
  // achievement: string;
  designation: string;
  desc: string;
  image: string;
  bio: string;
}

interface TPackage {
  id: string;
  name: string;
  note: string;
  amount: number;
  service: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface TImmigration {
  id: string;
  name: string;
  amount: number;
  service: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TTestimonial {
  name: string;
  image: string;
  testimonial: string;
  role: string;
  date: string;
}

interface TBlog {
  id: string;
  title: string;
  img: string;
  slug: string;
  desc: string;
  summary: string;
  blogger: string;
  createdAt: string;
}

interface TContactUs {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

interface TService {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TMentorInfo {
  id: string;
  name: string;
  email: string;
  image: string;
  location: string;
  designation: string;
  desc: string;
  status: string;
  linkedin?: string;
  profile?: string;
  services: TService[];
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  name: string;
  image: string | null;
}

interface IReview {
  id: string;
  message: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

interface Service {
  id: string;
  amount: number;
  status: string;
  progress: string;
  createdAt: string;
  mentor_services: MentorService;
}

interface Package {
  id: string;
  amount: number;
  status: string;
  progress: string;
  createdAt: string;
  package: {
    amount: number;
    name: string;
    id: string;
  };
}
interface Training {
  id: string;
  amount: number;
  status: string;
  progress: string;
  createdAt: string;
  training: {
    amount: number;
    name: string;
    id: string;
  };
}

interface ImmigrationService {
  id: string;
  amount: number;
  status: string;
  progress: string;
  createdAt: string;
  immigration_service: {
    amount: number;
    name: string;
    id: string;
  };
}

interface IMentor {
  id?: string;
  name: string;
  email: string;
  image: string;
  desc: string;
  password?: string;
  designation: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface Review {
  id: string;
  message: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  mentor: IMentor;
  user: IUser;
}

interface IProfile {
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

interface IGoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface IGuestPurchase {
  name: string;
  email: string;
  mobile_no: string;
  id: string;
}

interface ITraining {
  id: string;
  name: string;
  amount: number;
  img: string;
  order?: number;
  service: string[];
  highlights: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICustomerReview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  comment: string;
  source: string;
  rating: number;
  order?: number;
  date: Date;
}

interface IComment {
  id: string;
  content: string;
  blogId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  author: {
    name: string;
    image: string | null;
  };
  replies?: IComment[];
}
