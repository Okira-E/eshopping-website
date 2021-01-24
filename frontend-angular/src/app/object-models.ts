export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface Product {
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
}
