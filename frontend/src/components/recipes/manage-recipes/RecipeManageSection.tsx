import { SimpleGrid } from '@chakra-ui/react';
import { RecipeManageCard } from './RecipeManageCard.tsx';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/ApiResponse.ts';
import { TRecipe } from '../../../types';
import { useAxios } from '../../../hooks';

export function RecipeManageSection() {
  const axiosClient = useAxios();

  const { data, isPending, isError, error } = useQuery<
    AxiosResponse<ApiResponse<TRecipe[]>>,
    AxiosError<ApiResponse<null>>
  >({
    queryKey: ['recipes', 'all'],
    queryFn: () => axiosClient.get('/recipes'),
    retry: 1,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <div>No recipes found</div>;
    }
    return <div>Error fetching recipes {error.response?.data.message}</div>;
  }

  if (!data?.data?.value) {
    return <div>No recipes found</div>;
  }

  return (
    <SimpleGrid
      w={['fit-content', null, null, null, 'full']}
      maxW={'5xl'}
      columns={[1, null, 2, null, 3]}
      spacing={4}
    >
      {data.data.value.map((recipe, index) => (
        <RecipeManageCard key={index} recipe={recipe} />
      ))}
    </SimpleGrid>
  );
}
