type UserType = 'public' | 'private';

interface User {
  id: string;
  type: UserType;
  fullName?: string;
  avatar?: string;
  lat?: number;
  lng?: number;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}
