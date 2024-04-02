import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { RecipeCardProps } from '../../../types';
import { ConfirmationModal, FormModal } from '../../modals';
import { EditRecipeForm } from '../../forms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../../../hooks';

export function RecipeManageCard({ recipe }: RecipeCardProps) {
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnclose,
  } = useDisclosure();

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnclose,
  } = useDisclosure();

  const axiosClient = useAxios();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/recipes/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['recipes', 'all'],
      });
      confirmOnclose();
    },
  });

  return (
    <>
      <Card maxW={'22rem'} justifyContent={'center'}>
        <CardBody>
          <Stack minH={'20rem'} justifyContent={'space-between'}>
            <Image
              src={recipe.image}
              fallbackSrc={'https://via.placeholder.com/150'}
              aspectRatio={16 / 9}
              objectFit={'cover'}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              alignSelf={'stretch'}
              maxW={'275px'}
              mx={'auto'}
            />
            <Heading size="md">{recipe.title}</Heading>
            <Text color={'gray.500'}>
              {recipe.ingredients.slice(0, 3).join(', ')}
            </Text>
            <HStack spacing={4}>
              <Button
                onClick={editOnOpen}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<FaPen />}
              >
                Edit Recipe
              </Button>
              <Button
                onClick={confirmOnOpen}
                colorScheme={'red'}
                size={'sm'}
                variant={'outline'}
                leftIcon={<FaTrash />}
              >
                Delete Recipe
              </Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
      <FormModal
        isOpen={editIsOpen}
        onClose={editOnclose}
        form={<EditRecipeForm onModalClose={editOnclose} recipe={recipe} />}
        title={'Edit Recipe'}
      />
      <ConfirmationModal
        isOpen={confirmIsOpen}
        onClose={confirmOnclose}
        onConfirm={() => {
          mutate(recipe.id);
        }}
        isButtonDisabled={isPending}
        title={'Delete Recipe'}
        message={`Are you sure you want to delete this recipe? ${recipe.title} will be permanently removed.`}
        confirmText={'Delete Recipe'}
        cancelText={'Cancel'}
      />
    </>
  );
}
