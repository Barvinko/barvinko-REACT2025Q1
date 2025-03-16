export type NameInputs = {
  terms?: boolean | undefined;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
};

export type NameInput =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'country'
  | 'terms';

export type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms?: boolean;
  picture?: FileList;
};
