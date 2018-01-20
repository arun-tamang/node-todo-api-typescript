export interface UserToPost {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

interface UserInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ValidateUser {
  validated: boolean;
  userInfo: UserInfo;
}

export interface LoginResult {
  userInfo: UserInfo;
  tokens: Tokens;
}