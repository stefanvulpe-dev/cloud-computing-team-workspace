import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks';
import { ExploreRecipesSection } from '../components';
import { TRecipe, TRecipeApiData } from '../types';
import { getRecipeTags } from '../data';
import { AxiosResponse } from 'axios';

const ExploreFormSchema = z.object({
  search: z.string().min(3),
});

type ExploreFormInput = z.infer<typeof ExploreFormSchema>;

export function Explore() {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ExploreFormInput>({
    resolver: zodResolver(ExploreFormSchema),
  });

  const axiosClient = useAxios();

  const { data, refetch, isRefetching } = useQuery<
    AxiosResponse<Record<string, TRecipeApiData[]>>
  >({
    queryKey: ['recipes', 'search'],
    queryFn: () =>
      axiosClient.get('/recipes/search', {
        params: {
          title: (formRef.current?.elements[0] as HTMLInputElement).value,
        },
      }),
    enabled: false,
  });

  const recipes: TRecipe[] =
    data?.data.results.map((recipe: TRecipeApiData) => {
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

  const onSubmit = async () => {
    clearErrors();
    await refetch();
    onClose();
  };

  return (
    <Stack spacing={4} minH={'100vh'} mx={'auto'} gap={8} alignItems={'center'}>
      <Button
        mt={4}
        w={'60%'}
        maxW={'md'}
        leftIcon={<FaSearch />}
        onClick={onOpen}
      >
        Search for recipes
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.search}>
                <FormLabel htmlFor={'search'} display={'none'}>
                  Search for recipes
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents={'none'} color={'teal'}>
                    <FaSearch />
                  </InputLeftElement>
                  <Input
                    id={'search'}
                    isDisabled={isRefetching}
                    {...register('search')}
                    placeholder={'Search for recipes'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        formRef.current?.dispatchEvent(
                          new Event('submit', { bubbles: true }),
                        );
                      }
                    }}
                  />
                </InputGroup>
                {errors.search && (
                  <FormErrorMessage>{errors.search.message}</FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Text
        style={{
          textAlign: 'center',
          textWrap: 'balance',
        }}
      >
        Use the search bar to find recipes. Type in a keyword, that will help
        you find the recipe you are looking for by title.
      </Text>
      {isRefetching ? (
        <Text>Loading</Text>
      ) : recipes.length === 0 ? (
        <Text>No recipes to show yet</Text>
      ) : (
        <ExploreRecipesSection recipes={recipes} />
      )}
    </Stack>
  );
}
