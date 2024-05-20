import { UserCard } from './UserCard.tsx';
import { SidebarNav } from './SidebarNav.tsx';
import { AppLogo } from '../AppLogo.tsx';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { MdLogout } from 'react-icons/md';

export function SidebarContent() {
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();

  return (
    <>
      <AppLogo logoWidth={'200px'} />
      <UserCard />
      <SidebarNav />
      <Button
        fontSize={'1.15rem'}
        px={10}
        leftIcon={<MdLogout />}
        variant={'outline'}
        colorScheme={'purple'}
        position={'absolute'}
        bottom={10}
        left={'50%'}
        transform={'translateX(-50%)'}
        margin={'auto'}
        onClick={() => {
          removeItem('token');
          removeItem('user');
          navigate('/login', { replace: true });
        }}
      >
        Logout
      </Button>
    </>
  );
}
