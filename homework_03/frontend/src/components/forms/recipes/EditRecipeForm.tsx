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
import { TRecipe } from '../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAxios } from '../../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/ApiResponse.ts';
import { FileUpload, validateFiles } from '../FileUpload.tsx';
import { FiFile } from 'react-icons/fi';

const EditRecipeSchema = z
  .object({
    title: z.string().min(3).max(30),
    description: z.string().min(3).max(500),
    ingredients: z
      .string()
      .transform((val) => val.split(',').map((i) => i.trim()))
      .refine((val) => val.length >= 1 && val.length <= 10, {
        message: 'Must have between 1 and 10 ingredients',
      })
      .or(z.array(z.string().min(3).max(30))),
    prepTime: z.number().int().positive(),
    cookTime: z.number().int().positive(),
    servings: z.number().int().positive(),
    tags: z
      .string()
      .transform((val) => val.split(',').map((i) => i.trim()))
      .refine((val) => val.length >= 1 && val.length <= 3, {
        message: 'Must have between 1 and 3 tags',
      })
      .or(z.array(z.string().min(3).max(30))),
    image: z.any(),
  })
  .required();

type TEditRecipeSchema = z.infer<typeof EditRecipeSchema>;

export function EditRecipeForm({
  recipe,
  onModalClose,
}: {
  recipe: TRecipe;
  onModalClose: () => void;
}) {
  const queryClient = useQueryClient();
  const axiosClient = useAxios();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<TEditRecipeSchema>({
    defaultValues: recipe,
    resolver: zodResolver(EditRecipeSchema),
  });

  const { mutate, isPending, error } = useMutation<
    AxiosResponse<ApiResponse<TRecipe>>,
    AxiosError<ApiResponse<null>>,
    FormData
  >({
    mutationKey: ['recipes', 'addRecipe'],
    mutationFn: (data) => axiosClient.put(`/recipes/${recipe.id}`, data),
    onError: (error) => {
      for (const key in error.response?.data.validationErrors) {
        setError(key as keyof TEditRecipeSchema, {
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

  const onSubmit = (data: TEditRecipeSchema) => {
    clearErrors();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('prepTime', data.prepTime.toString());
    formData.append('cookTime', data.cookTime.toString());
    formData.append('servings', data.servings.toString());
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('image', data.image[0]);

    mutate(formData);
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
        <FormControl isRequired isInvalid={!!errors.image}>
          <FormLabel htmlFor={'image'}>Image</FormLabel>
          <FileUpload
            accept={'image/*'}
            register={register('image', { validate: validateFiles })}
          >
            <Button leftIcon={<FiFile />}>Upload</Button>
          </FileUpload>
          {errors.image ? (
            <FormErrorMessage>
              {errors.image.message as string}
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              Upload a file. 2MB is the max size allowed
            </FormHelperText>
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
