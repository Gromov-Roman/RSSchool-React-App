export interface Data {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  gender?: string;
  picture?: string;
  country?: string;
  confirmPassword?: string;
  termsAccepted?: boolean;
}

export interface FormFieldsData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture?: FileList;
  termsAccepted?: boolean;
}
