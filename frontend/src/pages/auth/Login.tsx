import { Center } from '@chakra-ui/react';
import { LoginForm } from '../../components';

export function Login() {
  return (
    <Center minH={'100vh'} maxW={'xl'} mx={'auto'}>
      <LoginForm />
    </Center>
  );
}
