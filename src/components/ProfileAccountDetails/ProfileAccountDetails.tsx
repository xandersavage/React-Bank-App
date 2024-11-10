import React from 'react';
import { TextInput, Text, Paper, Title, Group } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import styles from '../../css/ProfileAccountDetails.module.css';

const ProfileAccountDetails = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to show a notification here
  };

  return (
    <Paper shadow="sm" radius="md" className={styles.paper}>
      <Title order={3} className={styles.title}>Account Details</Title>
      <Group grow>
        <TextInput
          label="Account Number"
          value="1234567890"
          readOnly
          rightSection={
            <IconCopy
              size={14}
              className={styles.copyIcon}
              onClick={() => copyToClipboard('1234567890')}
            />
          }
        />
        <TextInput
          label="IBAN"
          value="GB29NWBK60161331926819"
          readOnly
          rightSection={
            <IconCopy
              size={14}
              className={styles.copyIcon}
              onClick={() => copyToClipboard('GB29NWBK60161331926819')}
            />
          }
        />
      </Group>
      <Text mt="md">Account Balance:</Text>
      <Text className={styles.balance}>$10,000.00</Text>
    </Paper>
  );
};

export default ProfileAccountDetails;