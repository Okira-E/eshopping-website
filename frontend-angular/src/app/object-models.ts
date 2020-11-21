export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface Product {
  title?: string;
  description?: string;
  price?: number;
  image?: string;
}
