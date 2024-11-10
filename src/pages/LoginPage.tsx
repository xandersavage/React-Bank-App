/* eslint-disable no-console */
import { useContext, useState } from 'react';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthContext } from '../auth/AuthContext/AuthContext';
import { supabase } from '../services/supabaseClient';

export function LoginPage() {
  const { setSession } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoggingIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      if (data.session) {
        setSession(data.session);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during login', error);
      form.setFieldError('email', 'Invalid email or password');
      form.setFieldError('password', 'Invalid email or password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        Welcome back to SecureBank
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Anchor size="sm" href="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              icon={<IconMail size="1rem" />}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              icon={<IconLock size="1rem" />}
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button loading={isLoggingIn} type="submit" fullWidth mt="xl">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
