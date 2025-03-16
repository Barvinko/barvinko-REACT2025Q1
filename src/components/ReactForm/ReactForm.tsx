import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/src/types/validations';
import { FormInput } from '@components/UI/FormInput/FormInput';
import { InputType } from '@/src/types/enums';
import { FormValues } from '@/src/types/types';
import { AutocompleteInput } from '@components/UI/AutocompleteInput/AutocompleteInput';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCard } from '@store/cardsSlice';

export const ReactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      addCard({
        name: data.name as string,
        age: Number(data.age),
        email: data.email as string,
        password: data.password as string,
        confirmPassword: data.confirmPassword as string,
        gender: data.gender as string,
        terms: data.terms ?? false,
        picture: data.picture instanceof File ? data.picture : null,
        country: data.country as string,
      })
    );
    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        nameData="name"
        register={register}
        error={errors?.name?.message}
      />

      <FormInput
        nameData="age"
        type={InputType.NUMBER}
        register={register}
        error={errors.age?.message}
      />

      <FormInput
        nameData="email"
        type={InputType.EMAIL}
        register={register}
        error={errors.email?.message}
      />

      <FormInput
        nameData="password"
        type={InputType.PASSWORD}
        register={register}
        error={errors.password?.message}
      />

      <FormInput
        nameData="confirmPassword"
        nameTitle="Confirm Password"
        type={InputType.PASSWORD}
        register={register}
        error={errors.confirmPassword?.message}
      />

      <div className="form__input-container">
        <label htmlFor="gender" className="form__label">
          Gender
        </label>
        <select id="gender" {...register('gender')} className="form__select">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="form__error">{errors.gender.message}</p>
        )}
      </div>

      <div className="form__input-container">
        <label htmlFor="terms" className="form__label">
          <input
            id="terms"
            type="checkbox"
            {...register('terms')}
            className="form__checkbox"
          />
          Accept Terms and Conditions
        </label>
        {errors.terms && <p className="form__error">{errors.terms.message}</p>}
      </div>

      <FormInput
        nameData="picture"
        type={InputType.FILE}
        register={register}
        error={errors.picture?.message}
      />

      <AutocompleteInput
        nameData="country"
        register={register}
        error={errors.country?.message}
      />

      <button
        type="submit"
        className={`form__button ${!isValid ? 'form__button--disabled' : ''}`}
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};
