import { Box } from '@chakra-ui/react';
import { Hero, LandingNav } from '../layouts';

export function Landing() {
  return (
    <Box
      bgGradient={'url(/bg-landing.jpg)'}
      bgBlendMode={'darken'}
      bgPos={'center'}
      bgSize={'cover'}
      bgRepeat={'no-repeat'}
      minH={'100vh'}
    >
      <LandingNav />
      <Hero />
    </Box>
  );
}
