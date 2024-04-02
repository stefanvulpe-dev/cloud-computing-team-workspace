import { TRecipe } from '../../types';
import { SimpleGrid } from '@chakra-ui/react';
import { RecipeCard } from './RecipeCard.tsx';

export function ExploreRecipesSection({ recipes }: { recipes: TRecipe[] }) {
  return (
    <SimpleGrid columns={[1, null, 2, null, 3]} gap={4}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </SimpleGrid>
  );
}
