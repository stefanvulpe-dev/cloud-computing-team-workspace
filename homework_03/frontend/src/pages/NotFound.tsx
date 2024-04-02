import {
  Center,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export function NotFound() {
  return (
    <Center minH={'100vh'}>
      <Stack spacing={8} textAlign={'center'}>
        <Heading as={'h1'} size={['lg', 'xl', '2xl']}>
          404 Not Found :(
        </Heading>
        <Text
          style={{
            textWrap: 'pretty',
          }}
        >
          The page you are looking for does not exist or has been moved.
        </Text>
        <ChakraLink
          as={ReactRouterLink}
          to={'/'}
          bgColor={'red.500'}
          w={'fit-content'}
          mx={'auto'}
          px={4}
          py={2}
          rounded={'lg'}
          color={'white'}
        >
          Go back to home
        </ChakraLink>
      </Stack>
    </Center>
  );
}
