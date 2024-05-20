import { HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';

export function HomeRootLayout() {
  return (
    <HStack spacing={10}>
      <Sidebar />
      <Outlet />
    </HStack>
  );
}
