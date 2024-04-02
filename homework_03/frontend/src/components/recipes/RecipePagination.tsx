import { RecipeCard } from './RecipeCard.tsx';
import { SimpleGrid } from '@chakra-ui/react';
import { RecipePaginationProps } from '../../types';

export function RecipePagination({
  nrOfColumns,
  recipes,
}: RecipePaginationProps) {
  return (
    <SimpleGrid columns={nrOfColumns} spacing={4} mt={4}>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </SimpleGrid>
  );
}
