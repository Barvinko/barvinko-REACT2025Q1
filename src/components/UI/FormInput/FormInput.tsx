import { InputType } from '@/src/types/enums';
import { UseFormRegister } from 'react-hook-form';
import { NameInputs, NameInput } from '@/src/types/types';

type FormInputProps = {
  nameData: string;
  error: string | undefined;
  nameTitle?: string;
  type?: InputType;
  register?: UseFormRegister<NameInputs>;
};

const capitalizeFirstLetter = (str: string) =>
  str ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

export const FormInput = ({
  nameData,
  error,
  type = InputType.TEXT,
  nameTitle,
  register,
}: FormInputProps) => {
  return (
    <div className="form__input-container">
      <label htmlFor={nameData} className="form__label">
        {nameTitle ? nameTitle : capitalizeFirstLetter(nameData)}
      </label>
      <input
        id={nameData}
        name={nameData}
        {...(register && register(nameData as NameInput))}
        type={type}
        className="form__input"
      />
      {error && <p className="form__error">{error}</p>}
    </div>
  );
};
