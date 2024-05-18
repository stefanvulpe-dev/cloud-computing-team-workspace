import { Sidebar } from '../../components';
import { Outlet } from 'react-router-dom';
import { HStack } from '@chakra-ui/react';

export function HomeRootLayout() {
  return (
    <HStack spacing={10}>
      <Sidebar />
      <Outlet />
    </HStack>
  );
}
