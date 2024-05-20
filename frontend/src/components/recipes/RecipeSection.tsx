import {
  Box,
  HStack,
  useBreakpointValue,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { RecipeSectionHeader } from './RecipeSectionHeader.tsx';
import { RecipePagination } from './RecipePagination.tsx';
import { useEffect, useState } from 'react';
import { RecipeSectionProps, TRecipe, TRecipeApiData } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../hooks';
import { AxiosResponse } from 'axios';
import { getRecipeTags } from '../../data';

export function RecipeSection({ title, subtitle }: RecipeSectionProps) {
  const breakPoint = useBreakpointValue({ base: 'base', lg: 'lg', xl: 'xl' });

  const [nrOfColumns, setNrOfColumns] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [recipesToShow, setRecipesToShow] = useState<TRecipe[]>([]);

  const axiosClient = useAxios();

  const { data, error, isFetching } = useQuery<
    AxiosResponse<Record<string, TRecipeApiData[]>>
  >({
    queryKey: ['recipes', 'trending'],
    queryFn: () => axiosClient.get('/recipes/trending'),
  });

  const recipes: TRecipe[] =
    data?.data.recipes.map((recipe: TRecipeApiData) => {
      return {
        id: `${recipe.id}`,
        title: recipe.title,
        description: recipe.summary,
        image: recipe.image,
        ingredients: recipe.extendedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        servings: recipe.servings,
        prepTime: recipe.readyInMinutes,
        cookTime: recipe.cookingMinutes > 0 ? recipe.cookingMinutes : 0,
        tags: getRecipeTags(),
      };
    }) || [];

  const onNextPage = () => {
    const nextPage = pageNumber + 1;
    if (nextPage * nrOfColumns > recipes.length) {
      return;
    }

    setPageNumber(nextPage);
    setRecipesToShow(
      recipes.slice((nextPage - 1) * nrOfColumns, nextPage * nrOfColumns),
    );
  };

  const onPrevPage = () => {
    const prevPage = pageNumber - 1;
    if (prevPage < 1) {
      return;
    }

    setPageNumber(prevPage);
    setRecipesToShow(
      recipes.slice((prevPage - 1) * nrOfColumns, prevPage * nrOfColumns),
    );
  };

  useEffect(() => {
    if (breakPoint === 'base') {
      setNrOfColumns(1);
    } else if (breakPoint === 'lg') {
      setNrOfColumns(2);
    } else if (breakPoint === 'xl') {
      setNrOfColumns(3);
    }

    setRecipesToShow(recipes.slice(0, nrOfColumns));

    return () => {
      setNrOfColumns(0);
    };
  }, [breakPoint, data, nrOfColumns]);

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  return (
    <>
      {isFetching ? (
        <HStack alignItems={'center'}>
          <Spinner thickness="4px" color={'blue.500'} />
          <Text>Loading...</Text>
        </HStack>
      ) : (
        <Box>
          <RecipeSectionHeader
            title={title}
            subtitle={subtitle}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
          />
          <RecipePagination nrOfColumns={nrOfColumns} recipes={recipesToShow} />
        </Box>
      )}
    </>
  );
}
