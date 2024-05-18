import { Stack } from '@chakra-ui/react';
import { RecipeManageSection, RecipeManageSectionHeader } from '../components';

export function Recipes() {
  return (
    <Stack
      alignItems={'center'}
      spacing={10}
      mx={'auto'}
      mt={'12'}
      minH={'100vh'}
    >
      <RecipeManageSectionHeader
        title={'Manage your recipes'}
        subtitle={'Add, modify or delete recipes'}
      />
      <RecipeManageSection />
    </Stack>
  );
}
