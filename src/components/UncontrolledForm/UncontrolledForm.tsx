import React, { useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { FormInput } from '@components/UI/FormInput/FormInput';
import { AutocompleteInput } from '@components/UI/AutocompleteInput/AutocompleteInput';
import { ButtonBack } from '@components/UI/ButtonBack/ButtonBack';
import { InputType } from '@/src/types/enums';
import { validationSchema } from '@/src/types/validations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCard } from '@store/cardsSlice';

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [country, setCountry] = useState('');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set('country', country);

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const pictureInput = formRef.current.elements.namedItem(
      'picture'
    ) as HTMLInputElement;
    const picture = pictureInput?.files || null;

    const terms = formData.get('terms') === 'on';

    try {
      await validationSchema.validate(
        { ...data, terms, picture },
        { abortEarly: false }
      );
      setErrors({});

      const pictureBase64 =
        picture && picture.length > 0
          ? await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(picture[0]);
            })
          : null;

      dispatch(
        addCard({
          name: data.name as string,
          age: Number(data.age),
          email: data.email as string,
          password: data.password as string,
          confirmPassword: data.confirmPassword as string,
          gender: data.gender as string,
          terms,
          picture: pictureBase64,
          country: data.country as string,
          isNew: true,
        })
      );

      navigate('/');
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
    <>
      <ButtonBack />
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

        <AutocompleteInput
          nameData="country"
          error={errors.country}
          onChange={(value) => setCountry(value)}
        />

        <button type="submit" className="form__button">
          Submit
        </button>
      </form>
    </>
  );
};
