'use client';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { LocationOn, Home, SearchOutlined, Person } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(pathname);
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === '/api/auth/logout') {
            return;
          }
          setValue(newValue);
          router.push(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} value={'/'} />
        <BottomNavigationAction
          label="Search"
          icon={<SearchOutlined />}
          value="/categories/breakfast"
        />
        <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
        <BottomNavigationAction
          label="Profile"
          icon={<Person />}
          value="/api/auth/logout"
          href="/api/auth/logout"
        />
      </BottomNavigation>
    </Paper>
  );
};
