import { Center } from '@chakra-ui/react';
import { FeedbackForm } from '../components';

export function Feedback() {
  return (
    <Center minH={'100vh'} maxW={'xl'} mx={'auto'}>
      <FeedbackForm />
    </Center>
  );
}
