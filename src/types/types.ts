import { InputType } from '@/src/types/enums';
import { UseFormRegister } from 'react-hook-form';

export type FormInputProps = {
  nameData: string;
  error: string | undefined;
  nameTitle?: string;
  type?: InputType;
  register?: UseFormRegister<NameInputs>;
};

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
  picture?: FileList | null | undefined;
};
