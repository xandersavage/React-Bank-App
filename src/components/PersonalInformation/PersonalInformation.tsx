import React from 'react';
import { TextInput, Select, Grid, Paper, Title } from '@mantine/core';
// import { DatePicker } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import styles from '../../css/PersonalInformation.module.css';

const PersonalInformation = ({ form, editMode }) => {
  return (
    <Paper shadow="sm" radius="md" className={styles.paper}>
      <Title order={3} className={styles.title}>Personal Information</Title>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Full Name"
            {...form.getInputProps('fullName')}
            disabled={!editMode}
            rightSection={editMode && <IconEdit size={14} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            {...form.getInputProps('email')}
            disabled={!editMode}
            rightSection={editMode && <IconEdit size={14} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Phone"
            {...form.getInputProps('phone')}
            disabled={!editMode}
            rightSection={editMode && <IconEdit size={14} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Address"
            {...form.getInputProps('address')}
            disabled={!editMode}
            rightSection={editMode && <IconEdit size={14} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          {/* <DatePicker
            label="Date of Birth"
            {...form.getInputProps('dateOfBirth')}
            disabled={!editMode}
          /> */}
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Gender"
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            {...form.getInputProps('gender')}
            disabled={!editMode}
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default PersonalInformation;