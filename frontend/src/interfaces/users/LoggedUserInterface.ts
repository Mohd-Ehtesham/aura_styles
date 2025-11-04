export interface LoggedUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface User {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  street: string;
  state: string;
  country: string;
  postalCode: string;
  isVerified: string;
  googleId?: string;
  facebookId?: string;
  provider?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
