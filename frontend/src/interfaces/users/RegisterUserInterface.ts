export interface RegisterUser {
  avatar: File | string;
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
}

export interface userRegisterApiResponse {
  success: boolean;
  message: string;
  createdUser: RegisterUser;
}
