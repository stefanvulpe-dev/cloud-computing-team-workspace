import { Box, Button, Heading, HStack, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { ConfirmationModal, FormModal } from '../../modals';
import { AddRecipeForm } from '../../forms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../../../hooks';

export function RecipeManageSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const axiosClient = useAxios();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['recipes', 'deleteAll'],
    mutationFn: () => axiosClient.delete('/recipes'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      deleteOnClose();
    },
  });

  return (
    <>
      <HStack
        justifyContent={'space-between'}
        w={['fit-content', null, null, null, 'full']}
        maxW={'5xl'}
      >
        <Box>
          <Heading
            as={'h2'}
            fontWeight={'semibold'}
            fontSize={{
              base: '1rem',
              md: '1.25rem',
              lg: '1.35rem',
            }}
          >
            {title}
          </Heading>
          <Heading
            as={'h3'}
            fontWeight={'semibold'}
            fontSize={{
              base: '0.75rem',
              md: '0.85rem',
              lg: '1rem',
            }}
          >
            {subtitle}
          </Heading>
        </Box>
        <HStack>
          <Button
            onClick={addOnOpen}
            colorScheme={'blue'}
            size={'sm'}
            leftIcon={<FaPlus />}
          >
            Add Recipe
          </Button>
          <Button
            onClick={deleteOnOpen}
            colorScheme={'red'}
            size={'sm'}
            leftIcon={<FaTrashCan />}
          >
            Delete All
          </Button>
        </HStack>
      </HStack>
      <FormModal
        isOpen={addIsOpen}
        onClose={addOnClose}
        form={<AddRecipeForm onModalClose={addOnClose} />}
        title={'Add recipe'}
      />
      <ConfirmationModal
        isOpen={deleteIsOpen}
        isButtonDisabled={isPending}
        onClose={deleteOnClose}
        onConfirm={() => mutate()}
        title={'Delete all recipes?'}
        message={
          'This action cannot be undone. Are you sure you want to delete all recipes?'
        }
        confirmText={'Delete All'}
        cancelText={'Cancel'}
      />
    </>
  );
}
