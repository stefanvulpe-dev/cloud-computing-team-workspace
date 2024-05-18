import {
  Text,
  Heading,
  Link as ChakraLink,
  Stack,
  Center,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export function Hero() {
  return (
    <Center minH={'100vh'}>
      <Stack
        textAlign={'center'}
        spacing={10}
        p={8}
        bgColor={'hsla(0, 0%, 0%, 0.6)'}
        maxW={'8xl'}
        rounded={'xl'}
      >
        <Heading
          as="h1"
          size={['xl', '2xl', '3xl']}
          color={'white'}
          style={{
            textWrap: 'pretty',
          }}
        >
          Welcome to the landing page!
        </Heading>
        <Text
          fontSize={['md', 'lg', 'xl']}
          color={'white'}
          w={{
            base: '100%',
            sm: '80%',
            lg: '60%',
          }}
          mx={'auto'}
          style={{
            textWrap: 'pretty',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
          commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed.
        </Text>
        <ChakraLink
          as={ReactRouterLink}
          to={'/login'}
          bg={'white'}
          w={'max-content'}
          mx={'auto'}
          px={4}
          py={2}
          rounded={'lg'}
          fontWeight={'semibold'}
        >
          Login / Register now
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to={'/home'}
          w={'max-content'}
          mx={'auto'}
          color={'white'}
          fontWeight={'semibold'}
        >
          Click here to go to the home page
        </ChakraLink>
      </Stack>
    </Center>
  );
}
