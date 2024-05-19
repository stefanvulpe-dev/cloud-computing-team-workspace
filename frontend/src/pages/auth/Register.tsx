import { Center } from '@chakra-ui/react';
import { RegisterForm } from '../../components';

export function Register() {
  return (
    <Center minH={'100vh'} maxW={'xl'} mx={'auto'}>
      <RegisterForm />
    </Center>
  );
}
