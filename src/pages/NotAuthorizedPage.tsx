import { IconLock } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Stack, Text, Title } from '@mantine/core';

const NotAuthorizedPage = () => {
  return (
    <Container
      size="sm"
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh' }}
    >
      <IconLock size={80} color="#FF6B6B" />
      <Title order={2} mt="md" mb="sm">
        Not Authorized
      </Title>
      <Text size="lg" c="dimmed" align="center" mb="md">
        You do not have permission to view this page. Please log in or contact support if you
        believe this is an error.
      </Text>
      <Stack spacing="md" align="center">
        <Button component={NavLink} to="/" variant="outline" color="blue" size="lg">
          Go to Home
        </Button>
        <Button component={NavLink} to="/login" variant="filled" color="blue" size="lg">
          Log In
        </Button>
      </Stack>
    </Container>
  );
};

export default NotAuthorizedPage;
