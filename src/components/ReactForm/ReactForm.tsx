import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/src/types/validations';
import { FormInput } from '@components/UI/FormInput/FormInput';
import { InputType } from '@/src/types/enums';
import { FormValues } from '@/src/types/types';

export const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
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

      <FormInput
        nameData="country"
        type={InputType.TEXT}
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
