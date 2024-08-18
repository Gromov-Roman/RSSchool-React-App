import { FormEvent, useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uncontrolledActions } from '@core/slices/uncontrolled';
import { ValidationError } from 'yup';
import Button from '@components/Button/Button';
import { ThemeContext } from '@context/ThemeContext';
import { validationSchema } from '@src/shared/validation/schema';
import './Uncontrolled.page.scss';
import AutocompleteCountry from '@components/AutocompleteCountry/AutocompleteCountry';

export default function UncontrolledPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addData } = uncontrolledActions;
  const { theme } = useContext(ThemeContext);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      picture: pictureRef.current?.files?.[0],
      termsAccepted: termsRef.current?.checked,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(addData({ ...formData, picture: reader.result as string }));
        setErrors({});
        navigate('/');
      };
      reader.readAsDataURL(formData.picture as Blob);
    } catch (validationErrors) {
      const formattedErrors: Record<string, string> = {};

      (validationErrors as ValidationError).inner.forEach(({ path, message }: ValidationError) => {
        if (path) {
          formattedErrors[path] = message;
        }
      });

      setErrors(formattedErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`uncontrolled-form ${theme}`}>
      <div className="uncontrolled-form_controls">
        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Name</span>
            <input name="name" type="text" ref={nameRef} />
          </label>

          <div className="error">{errors.name}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Age</span>
            <input name="age" type="number" ref={ageRef} />
          </label>

          <div className="error">{errors.age}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Email</span>
            <input name="email" type="email" ref={emailRef} />
          </label>

          <div className="error">{errors.email}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Gender</span>
            <select name="gender" ref={genderRef}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <div className="error">{errors.gender}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Password</span>
            <input name="password" type="password" ref={passwordRef} />
          </label>

          <div className="error">{errors.password}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Confirm Password</span>
            <input name="confirmPassword" type="password" ref={confirmPasswordRef} />
          </label>

          <div className="error">{errors.confirmPassword}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Country</span>
            <AutocompleteCountry ref={countryRef} />
            {/* <input name="country" type="text" ref={countryRef} /> */}
          </label>

          <div className="error">{errors.country}</div>
        </div>

        <div className="form-control-container">
          <label className="form-control">
            <span className="form-control_name">Upload Picture</span>
            <input name="picture" type="file" ref={pictureRef} className="upload-file" />
          </label>

          <div className="error">{errors.picture}</div>
        </div>

        <div className="form-control-container">
          <div className="form-control">
            <input id="terms" name="terms" type="checkbox" ref={termsRef} />
            <label htmlFor="terms">
              <span className="form-control_name">Accept Terms and Conditions</span>
            </label>
          </div>

          <div className="error">{errors.termsAccepted}</div>
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
