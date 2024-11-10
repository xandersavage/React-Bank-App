import { useContext, useState } from 'react';
import { IconHome, IconLock, IconMail, IconPhone, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  NumberInput,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { AuthService } from '@/services/auth';
import { SignupFormValues, SignupState } from '@/types/auth';
import { AuthContext } from '../auth/AuthContext/AuthContext';

const ACCOUNT_TYPES = [
  { value: 'savings', label: 'Savings Account' },
  { value: 'checking', label: 'Checking Account' },
  { value: 'business', label: 'Business Account' },
  { value: 'student', label: 'Student Account' },
] as const;

const EMPLOYMENT_STATUSES = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' },
] as const;

export function SignupPage() {
  const { setSession } = useContext(AuthContext);
  const navigate = useNavigate();

  // Granular loading states
  const [signupState, setSignupState] = useState<SignupState>({
    isAuthenticating: false,
    isCreatingProfile: false,
    isNavigating: false,
  });

  const form = useForm<SignupFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: null,
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      ssn: '',
      accountType: '',
      initialDeposit: 0,
      employmentStatus: '',
      annualIncome: 0,
      termsAccepted: false,
    },
    validate: {
      firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      dateOfBirth: (value) => validateDateOfBirth(value),
      phone: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
      accountType: (value) => (value ? null : 'Please select an account type'),
      termsAccepted: (value) => (value ? null : 'You must accept the terms and conditions'),
    },
  });

  // Validation helpers
  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include an uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must include a lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must include a number';
    }
    return null;
  };

  const validateDateOfBirth = (date: Date | null): string | null => {
    if (!date) {
      return 'Date of birth is required';
    }
    const age = Math.floor((new Date().getTime() - date.getTime()) / 31557600000);
    if (age < 18) {
      return 'You must be at least 18 years old';
    }
    return null;
  };

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      setSignupState((prev) => ({ ...prev, isAuthenticating: true }));

      const { user, session } = await AuthService.signUp(values);

      if (!user) {
        throw new Error('User creation failed');
      }

      if (session) {
        // User was auto-confirmed (rare case)
        setSession(session);
        notifications.show({
          title: 'Success',
          message: 'Account created successfully! Redirecting to dashboard...',
          color: 'green',
        });
        navigate('/dashboard');
      } else {
        // Normal flow - email verification needed
        navigate('/verify-email', {
          state: { email: values.email },
          replace: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during signup. Please try again.';

      notifications.show({
        title: 'Signup Failed',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setSignupState({
        isAuthenticating: false,
        isCreatingProfile: false,
        isNavigating: false,
      });
    }
  };

  const isLoading = Object.values(signupState).some(Boolean);

  return (
    <Container size={720} my={40}>
      <Title ta="center" style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        Open a New Bank Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" href="/login">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="Your first name"
                icon={<IconUser size="1rem" />}
                required
                disabled={isLoading}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Your last name"
                icon={<IconUser size="1rem" />}
                required
                disabled={isLoading}
                {...form.getInputProps('lastName')}
              />
            </Group>

            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              icon={<IconMail size="1rem" />}
              disabled={isLoading}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              icon={<IconLock size="1rem" />}
              disabled={isLoading}
              {...form.getInputProps('password')}
            />

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              icon={<IconLock size="1rem" />}
              disabled={isLoading}
              {...form.getInputProps('confirmPassword')}
            />

            <Group grow>
              <DateInput
                label="Date of Birth"
                placeholder="Your date of birth"
                required
                disabled={isLoading}
                {...form.getInputProps('dateOfBirth')}
              />
              <TextInput
                label="Phone Number"
                placeholder="1234567890"
                icon={<IconPhone size="1rem" />}
                required
                disabled={isLoading}
                {...form.getInputProps('phone')}
              />
            </Group>

            <TextInput
              label="Address"
              placeholder="1234 Main St"
              icon={<IconHome size="1rem" />}
              required
              disabled={isLoading}
              {...form.getInputProps('address')}
            />

            <Group grow>
              <TextInput
                label="City"
                placeholder="Your city"
                required
                disabled={isLoading}
                {...form.getInputProps('city')}
              />
              <TextInput
                label="State"
                placeholder="Your state"
                required
                disabled={isLoading}
                {...form.getInputProps('state')}
              />
              <TextInput
                label="Zip Code"
                placeholder="12345"
                required
                disabled={isLoading}
                {...form.getInputProps('zipcode')}
              />
            </Group>

            <Divider my="xs" label="Account Information" labelPosition="center" />

            <Select
              label="Account Type"
              placeholder="Select account type"
              data={ACCOUNT_TYPES}
              required
              disabled={isLoading}
              {...form.getInputProps('accountType')}
            />

            <Select
              label="Employment Status"
              placeholder="Select employment status"
              data={EMPLOYMENT_STATUSES}
              disabled={isLoading}
              {...form.getInputProps('employmentStatus')}
            />

            <NumberInput
              label="Annual Income"
              placeholder="Your annual income"
              min={0}
              disabled={isLoading}
              {...form.getInputProps('annualIncome')}
            />

            <Checkbox
              label="I accept the terms and conditions"
              disabled={isLoading}
              {...form.getInputProps('termsAccepted', { type: 'checkbox' })}
            />
          </Stack>

          <Button loading={isLoading} type="submit" fullWidth mt="xl">
            {isLoading ? getLoadingText(signupState) : 'Open Account'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

// Helper function to get loading text
function getLoadingText(state: SignupState): string {
  if (state.isAuthenticating) {
    return 'Creating account...';
  }
  if (state.isCreatingProfile) {
    return 'Setting up profile...';
  }
  if (state.isNavigating) {
    return 'Redirecting...';
  }
  return 'Processing...';
}
