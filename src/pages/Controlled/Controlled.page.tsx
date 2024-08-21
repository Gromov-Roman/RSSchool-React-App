import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { passwordSchema, validationSchema } from '@src/shared/validation/schema';
import Button from '@components/Button/Button';
import AutocompleteCountry from '@components/AutocompleteCountry/AutocompleteCountry';
import { ThemeContext } from '@context/ThemeContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FormFieldsData } from '@models/data.model';
import { controlledActions } from '@core/slices/controlled';
import { RootState } from '@core/store';
import { ValidationError } from 'yup';
import PasswordStrengthComponent from '@components/PasswordStrength/PasswordStrength';
import './Controlled.page.scss';

const MAX_STRENGTH = 6;

export default function ControlledFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addData } = controlledActions;
  const { theme } = useContext(ThemeContext);
  const controlledData = useSelector((state: RootState) => state.controlledReducer.data);
  const [strength, setStrength] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormFieldsData>({ resolver: yupResolver<FormFieldsData>(validationSchema), mode: 'onTouched' });

  const onSubmit = async (data: FormFieldsData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(addData({ ...data, picture: reader.result as string }));
      navigate('/');
    };
    reader.readAsDataURL(data.picture?.[0] as Blob);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    passwordSchema
      .validate(event.target.value, { abortEarly: false })
      .catch((error: ValidationError) => setStrength(MAX_STRENGTH - error.inner.length));
  };

  useEffect(() => {
    if (controlledData.length) {
      const lastData = controlledData.at(-1);

      setValue('name', lastData?.name || '');
      setValue('age', lastData?.age || 0);
      setValue('email', lastData?.email || '');
      setValue('password', lastData?.password || '');
      setValue('confirmPassword', lastData?.confirmPassword || '');
      setValue('gender', lastData?.gender || '');
      setValue('termsAccepted', lastData?.termsAccepted || false);
    }
  }, [controlledData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`controlled-form ${theme}`}>
      <div className="controlled-form_controls">
        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Name</span>
            <input type="text" {...register('name')} />
          </label>
          <div className="error">{errors.name?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Age</span>
            <input type="number" {...register('age')} />
          </label>
          <div className="error">{errors.age?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Email</span>
            <input type="email" {...register('email')} />
          </label>
          <div className="error">{errors.email?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Gender</span>
            <select {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <div className="error">{errors.gender?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Password</span>
            <input type="password" {...register('password')} onChange={handlePasswordChange} />
          </label>
          <PasswordStrengthComponent strength={strength} />
          <div className="error">{errors.password?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Confirm Password</span>
            <input type="password" {...register('confirmPassword')} />
          </label>
          <div className="error">{errors.confirmPassword?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Country</span>
            <Controller control={control} name="country" render={({ field }) => <AutocompleteCountry {...field} />} />
          </label>
          <div className="error">{errors.country?.message}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Upload Picture</span>
            <input type="file" {...register('picture')} className="upload-file" />
          </label>
          <div className="error">{errors.picture?.message}</div>
        </div>

        <div className="form-control-container">
          <div className="form-control">
            <input id="terms" type="checkbox" {...register('termsAccepted')} />
            <label htmlFor="terms">
              <span className="form-control_name">Accept Terms and Conditions</span>
            </label>
          </div>
          <div className="error">{errors.termsAccepted?.message}</div>
        </div>
      </div>

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
}
