export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TLoginResponse = {
  user: User;
  token: string;
};
