import React, { useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { FormInput } from '@components/UI/FormInput/FormInput';
import { InputType } from '@/src/types/enums';
import { validationSchema } from '@/src/types/validations';

export const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      console.log('Form submitted:', data);
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const formattedErrors: Record<string, string> = {};

        validationErrors.inner.forEach((err: ValidationError) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <main className="main">
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <FormInput nameData="name" type={InputType.TEXT} error={errors.name} />

        <FormInput nameData="age" type={InputType.NUMBER} error={errors.age} />

        <FormInput
          nameData="email"
          type={InputType.EMAIL}
          error={errors.email}
        />

        <FormInput
          nameData="password"
          type={InputType.PASSWORD}
          error={errors.password}
        />

        <FormInput
          nameData="confirmPassword"
          nameTitle="Confirm Password"
          type={InputType.PASSWORD}
          error={errors.confirmPassword}
        />

        <div className="form__input-container">
          <label htmlFor="gender" className="form__label">
            Gender
          </label>
          <select id="gender" name="gender" className="form__select">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="form__error">{errors.gender}</p>}
        </div>

        <div className="form__input-container">
          <label htmlFor="terms" className="form__label">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="form__checkbox"
            />
            Accept Terms and Conditions
          </label>
          {errors.terms && <p className="form__error">{errors.terms}</p>}
        </div>

        <FormInput
          nameData="picture"
          type={InputType.FILE}
          error={errors.picture}
        />

        <FormInput
          nameData="country"
          type={InputType.TEXT}
          error={errors.country}
        />

        <button type="submit" className="form__button">
          Submit
        </button>
      </form>
    </main>
  );
};
