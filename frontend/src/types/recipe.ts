export type TRecipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  ingredients: string[];
  servings: number;
  prepTime: number;
  cookTime: number;
};

export type RecipeSectionHeaderProps = {
  title: string;
  subtitle: string;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export type RecipeSectionProps = Omit<
  RecipeSectionHeaderProps,
  'onNextPage' | 'onPrevPage'
>;

export type RecipePaginationProps = {
  nrOfColumns: number;
  recipes: TRecipe[];
};

export type RecipeCardProps = {
  recipe: TRecipe;
};

export type TRecipeApiData = {
  id: number;
  title: string;
  summary: string;
  extendedIngredients: { name: string }[];
  image: string;
  servings: number;
  readyInMinutes: number;
  cookingMinutes: number;
};
