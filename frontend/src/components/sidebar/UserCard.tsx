import { Avatar, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks';

export function UserCard() {
  const { user } = useAuth();
  return (
    <HStack spacing={2} justifyContent={'center'}>
      <Avatar name={'User'} size={'md'} src="https://bit.ly/dan-abramov" />
      <Text fontWeight={'semibold'} fontSize={'1.25rem'}>
        {user?.firstName} {user?.lastName}
      </Text>
    </HStack>
  );
}
