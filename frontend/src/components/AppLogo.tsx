import { Link as ReactRouterLink } from 'react-router-dom';
import { Center, Image, Link as ChakraLink } from '@chakra-ui/react';

export function AppLogo({ logoWidth }: { logoWidth: string }) {
  return (
    <Center>
      <ChakraLink as={ReactRouterLink} to={'/'}>
        <Image
          src="/logo.svg"
          alt="logo"
          objectFit="contain"
          w={logoWidth}
          bg={'white'}
          py={2}
          px={10}
          rounded={'full'}
          boxShadow={'dark-lg'}
        />
      </ChakraLink>
    </Center>
  );
}
