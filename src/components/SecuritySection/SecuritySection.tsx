import React, { useState } from 'react';
import { Button, Paper, Title, Modal, PasswordInput, Group } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import styles from '../../css/SecuritySection.module.css';

const SecuritySection = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const handleChangePassword = (values) => {
    console.log('Changing password:', values);
    setChangePasswordModalOpen(false);
    form.reset();
  };

  return (
    <Paper shadow="sm" radius="md" className={styles.paper}>
      <Title order={3} className={styles.title}>Security</Title>
      <Button 
        leftIcon={<IconLock size={14} />}
        onClick={() => setChangePasswordModalOpen(true)}
        className={styles.button}
      >
        Change Password
      </Button>

      <Modal
        opened={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        title="Change Password"
      >
        <form onSubmit={form.onSubmit(handleChangePassword)}>
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            required
            mb="md"
            {...form.getInputProps('currentPassword')}
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            required
            mb="md"
            {...form.getInputProps('newPassword')}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            required
            mb="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Change Password</Button>
          </Group>
        </form>
      </Modal>
    </Paper>
  );
};

export default SecuritySection;