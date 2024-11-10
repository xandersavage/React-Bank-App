/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Text, Title } from '@mantine/core';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '5rem' }}>
      <Title order={1}>Welcome to Our Banking App</Title>
      <Text size="lg" c="dimmed" style={{ marginBottom: '2rem' }}>
        Manage your finances easily and securely.
      </Text>
      <Stack spacing="md" align="center">
        <Button onClick={handleLogin} size="lg" c="blue">
          Login
        </Button>
        <Button onClick={handleSignUp} size="lg" c="green">
          Sign Up
        </Button>
      </Stack>
    </Container>
  );
};

export default HomePage;
