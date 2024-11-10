import React from 'react';
import { Avatar, Text, Button, Group, Paper } from '@mantine/core';
import styles from '../../css/ProfileHeader.module.css';

const ProfileHeader = ({ fullName, email, onEditClick }) => {
  return (
    <Paper className={styles.paper}>
      <Group position="center" direction="column" spacing="sm">
        <Avatar 
          src="https://example.com/avatar.jpg" 
          size={120} 
          radius={120} 
          className={styles.avatar}
        />
        <Text size="xl" className={styles.name}>
          {fullName}
        </Text>
        <Text size="sm" className={styles.email}>
          {email}
        </Text>
        <Button onClick={onEditClick} className={styles.button}>
          Edit Profile
        </Button>
      </Group>
    </Paper>
  );
};

export default ProfileHeader;