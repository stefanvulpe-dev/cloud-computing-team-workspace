import { Stack } from '@chakra-ui/react';
import { RecipeSection } from '../components';

export function Home() {
  return (
    <Stack spacing={10} mx={'auto'} mt={10}>
      <RecipeSection
        title={'Trending Recipes'}
        subtitle={'Based on what’s popular'}
      />
    </Stack>
  );
}
