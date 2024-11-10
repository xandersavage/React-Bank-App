import { useEffect, useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AuthService } from '@/services/auth';

interface LocationState {
  email?: string;
}

/**
 * Component to verify a user's email address.
 *
 * This component is responsible for displaying a message that prompts the user to check their
 * email for a verification link. If the email is not found in the location state, it redirects
 * the user to the signup page. Users can also request to resend the verification email.
 *
 * State:
 * - isResending: A boolean that indicates whether the resend email request is in progress.
 *
 * Effects:
 * - Redirects to the signup page if no email is found in the location state.
 *
 * Functions:
 * - handleResendEmail: Handles the logic for resending the verification email and displays
 *   a notification based on the success or failure of the request.
 */
export function VerifyEmail() {
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};

  useEffect(() => {
    // If no email in state, redirect to signup
    if (!email) {
      navigate('/signup', { replace: true });
    }
  }, [email, navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await AuthService.resendVerificationEmail(email!);

      notifications.show({
        title: 'Verification Email Sent',
        message: 'Please check your inbox for the verification link.',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to resend verification email. Please try again.',
        color: 'red',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md" mt={30}>
        <Stack align="center" spacing="lg">
          <IconMail size={50} color="blue" />
          <Title order={2} ta="center">
            Verify Your Email
          </Title>
          <Text c="dimmed" size="sm" ta="center">
            We've sent a verification email to <strong>{email}</strong>. Please check your inbox and
            click the verification link to complete your registration.
          </Text>
          <Button onClick={handleResendEmail} loading={isResending} variant="light" fullWidth>
            Resend Verification Email
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
