export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date | null;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  ssn: string;
  accountType: string;
  initialDeposit: number;
  employmentStatus: string;
  annualIncome: number;
  termsAccepted: boolean;
}

export interface SignupState {
  isAuthenticating: boolean;
  isCreatingProfile: boolean;
  isNavigating: boolean;
}
