/* eslint-disable no-console */
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconUser,
} from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { Code, Group } from '@mantine/core';
import { supabase } from '../../services/supabaseClient'; // Supabase client import
import classes from '../../css/NavbarSimpleColored.module.css'; // Adjust path as needed

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconBellRinging },
  { link: '/accounts', label: 'Accounts', icon: IconReceipt2 },
  { link: '/transactions', label: 'Transactions', icon: IconFingerprint },
  { link: '/transfer-funds', label: 'Transfer Funds', icon: IconKey },
  { link: '/profile', label: 'Profile', icon: IconUser },
];

export function NavbarSimpleColored() {
  // Supabase logout handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Sign out user
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      // Optionally redirect or update UI after logout
      window.location.href = '/'; // Redirect to home page or login page
    }
  };

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* Add your bank's logo here */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {/* Add user profile or status info here */}
        {links}
      </div>

      <div className={classes.footer}>
        <NavLink to="#" onClick={handleLogout} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}
