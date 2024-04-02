import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAxios } from '../../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/ApiResponse.ts';
import { TRecipe } from '../../../types';

const RecipeSchema = z
  .object({
    title: z.string().min(3).max(30),
    description: z.string().min(3).max(500),
    ingredients: z
      .string()
      .transform((value) => value.split(',').map((v) => v.trim()))
      .refine((value) => value.length > 0, {
        message: 'At least one ingredient is required',
      }),
    prepTime: z.number().int().positive(),
    cookTime: z.number().int().positive(),
    servings: z.number().int().positive(),
    tags: z
      .string()
      .transform((value) => value.split(',').map((v) => v.trim()))
      .refine((value) => value.length > 0, {
        message: 'At least one tag is required',
      }),
  })
  .required();

type TRecipeSchema = z.infer<typeof RecipeSchema>;

export function AddRecipeForm({ onModalClose }: { onModalClose: () => void }) {
  const queryClient = useQueryClient();
  const axiosClient = useAxios();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<TRecipeSchema>({
    resolver: zodResolver(RecipeSchema),
  });

  const { mutate, isPending, error } = useMutation<
    AxiosResponse<ApiResponse<TRecipe>>,
    AxiosError<ApiResponse<null>>,
    TRecipeSchema
  >({
    mutationKey: ['recipes', 'addRecipe'],
    mutationFn: (data) => axiosClient.post('/recipes', data),
    onError: (error) => {
      for (const key in error.response?.data.validationErrors) {
        setError(key as keyof TRecipeSchema, {
          message: error.response?.data.validationErrors[key].join(', '),
        });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['recipes', 'all'],
      });
      onModalClose();
    },
  });

  const onSubmit = (data: TRecipeSchema) => {
    clearErrors();
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel htmlFor={'title'}>Title</FormLabel>
          <Input id={'title'} {...register('title')} />
          {errors.title && (
            <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel htmlFor={'description'}>Description</FormLabel>
          <Textarea id={'description'} {...register('description')} />
          {errors.description ? (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Max 100 characters</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.ingredients} isRequired>
          <FormLabel htmlFor={'ingredients'}>Ingredients</FormLabel>
          <Input id={'ingredients'} {...register('ingredients')} />
          {errors.ingredients ? (
            <FormErrorMessage>{errors.ingredients.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Separate ingredients with commas</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.tags} isRequired>
          <FormLabel htmlFor={'tags'}>Tags</FormLabel>
          <Input id={'tags'} {...register('tags')} />
          {errors.tags ? (
            <FormErrorMessage>{errors.tags.message}</FormErrorMessage>
          ) : (
            <FormHelperText>
              Separate tags with commas. Max number is 3
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.servings} isRequired>
          <FormLabel htmlFor={'servings'}>Servings</FormLabel>
          <NumberInput min={1} max={10}>
            <NumberInputField
              id={'servings'}
              {...register('servings', {
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.servings ? (
            <FormErrorMessage>{errors.servings.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Nr of people the recipe serves</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.prepTime} isRequired>
          <FormLabel htmlFor={'prepTime'}>Prep time</FormLabel>
          <NumberInput min={1} max={300}>
            <NumberInputField
              id={'prepTime'}
              {...register('prepTime', {
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.prepTime ? (
            <FormErrorMessage>{errors.prepTime.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Time in minutes</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.cookTime} isRequired>
          <FormLabel htmlFor={'cookTime'}>Cook time</FormLabel>
          <NumberInput min={1} max={300}>
            <NumberInputField
              id={'cookTime'}
              {...register('cookTime', {
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.cookTime ? (
            <FormErrorMessage>{errors.cookTime.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Time in minutes</FormHelperText>
          )}
        </FormControl>
        <Button
          my={4}
          colorScheme={'blue'}
          type={'submit'}
          isDisabled={isPending}
        >
          Submit
        </Button>
        {error && (
          <Text color={'red.500'} textAlign={'center'}>
            {error?.response?.data.message}
          </Text>
        )}
      </Stack>
    </form>
  );
}
