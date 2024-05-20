import { VStack } from '@chakra-ui/react';
import { RecipeManageSection, RecipeManageSectionHeader } from '../components';

export function Recipes() {
  return (
    <VStack spacing={10} mx={'auto'} mt={10}>
      <RecipeManageSectionHeader
        title={'Manage your recipes'}
        subtitle={'Add, modify or delete recipes'}
      />
      <RecipeManageSection />
    </VStack>
  );
}
