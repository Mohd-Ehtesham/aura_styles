export interface LoginUser {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  token: string;
  message: string;
  loggedUser: {
    _id: string;
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
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
