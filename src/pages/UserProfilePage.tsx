import React, { useState } from 'react';
import { Container, Button, Modal, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';

import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import PersonalInformation from '../components/PersonalInformation/PersonalInformation';
import ProfileAccountDetails from '../components/ProfileAccountDetails/ProfileAccountDetails';
import SecuritySection from '../components/SecuritySection/SecuritySection';
import styles from '../css/UserProfilePage.module.css';

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, Country',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
    },
  });

  const handleSave = (values) => {
    console.log('Saving profile:', values);
    setEditMode(false);
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account');
    setDeleteAccountModalOpen(false);
  };

  return (
    <Container size="md" className={styles.container}>
      <ProfileHeader
        fullName={form.values.fullName}
        email={form.values.email}
        onEditClick={() => setEditMode(true)}
      />
      
      <form onSubmit={form.onSubmit(handleSave)}>
        <PersonalInformation form={form} editMode={editMode} />
        
        {editMode && (
          <Group position="right" mt="md" mb="xl">
            <Button type="submit">Save Changes</Button>
          </Group>
        )}

        <ProfileAccountDetails />
        <SecuritySection />
        
        <Button
          color="red"
          leftIcon={<IconTrash size={14} />}
          onClick={() => setDeleteAccountModalOpen(true)}
          className={styles.deleteButton}
        >
          Close Account
        </Button>
      </form>

      <Modal
        opened={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
        title="Close Account"
      >
        <Text>
          Are you sure you want to close your account? This action cannot be
          undone.
        </Text>
        <Group position="right" mt="md">
          <Button onClick={() => setDeleteAccountModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteAccount}>
            Close Account
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default UserProfilePage;