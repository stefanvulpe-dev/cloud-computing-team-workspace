import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';
import { RecipeSectionHeaderProps } from '../../../types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function RecipeSectionHeader({
  title,
  subtitle,
  onNextPage,
  onPrevPage,
}: RecipeSectionHeaderProps) {
  return (
    <HStack justifyContent={'space-between'}>
      <Box>
        <Heading
          as={'h2'}
          fontWeight={'semibold'}
          fontSize={{
            base: '1rem',
            md: '1.25rem',
            lg: '1.35rem',
          }}
        >
          {title}
        </Heading>
        <Heading
          as={'h3'}
          fontWeight={'semibold'}
          fontSize={{
            base: '0.75rem',
            md: '0.85rem',
            lg: '1rem',
          }}
        >
          {subtitle}
        </Heading>
      </Box>
      <HStack>
        <IconButton
          aria-label={'previous'}
          icon={<FaChevronLeft />}
          fontSize={['0.75rem', '1rem']}
          h={[6, 10]}
          w={[6, 10]}
          onClick={onPrevPage}
        />
        <IconButton
          aria-label={'next'}
          icon={<FaChevronRight />}
          h={[6, 10]}
          w={[6, 10]}
          fontSize={['0.75rem', '1rem']}
          onClick={onNextPage}
        />
      </HStack>
    </HStack>
  );
}
