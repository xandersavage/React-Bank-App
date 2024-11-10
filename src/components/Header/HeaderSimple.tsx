import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Burger, Container, Group, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../css/HeaderSimple.module.css';

const links = [
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/accounts', label: 'Accounts' },
  { link: '/transactions', label: 'Transactions' },
  { link: '/transfer-funds', label: 'Transfer Funds' },
  { link: '/profile', label: 'Profile' },
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const headerRef = useRef(null);

  const desktopItems = links.map((link) => (
    <NavLink key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </NavLink>
  ));

  const mobileItems = links.map((link) => (
    <NavLink key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </NavLink>
  ));

  return (
    <header className={classes.header} ref={headerRef}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group gap={5} visibleFrom="xs">
          {desktopItems}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Transition transition="pop-top-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={classes.dropdown}
              withBorder
              style={{
                ...styles,
                position: 'absolute',
                top: headerRef.current ? headerRef.current.offsetHeight : 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            >
              {mobileItems}
            </Paper>
          )}
        </Transition>
      </Container>
    </header>
  );
}
