import {
  HStack,
  Image,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { TRecipe } from '../../types';
import { FaHashtag, FaRegClock, FaUser } from 'react-icons/fa';
import { TbSalt } from 'react-icons/tb';

export function ViewRecipeModal({
  isOpen,
  onClose,
  recipe,
}: {
  isOpen: boolean;
  onClose: () => void;
  recipe: TRecipe;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{recipe.title}</ModalHeader>
        <ModalCloseButton />
        <Stack p={6} spacing={4}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            aspectRatio={'16/9'}
            objectFit={'cover'}
            rounded={'lg'}
          />

          <Text
            style={{
              textWrap: 'balance',
            }}
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          ></Text>

          <Stack spacing={4} w={'calc(100% - 2rem)'} mx={'auto'}>
            <HStack alignItems={'center'}>
              <TbSalt />
              <Text>Ingredients:</Text>
            </HStack>

            <UnorderedList pl={4}>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </UnorderedList>

            <HStack alignItems={'center'}>
              <FaUser />
              <Text>Suited for: {recipe.servings} people</Text>
            </HStack>

            <HStack alignItems={'center'}>
              <FaRegClock />
              <Text>Preparation time: {recipe.prepTime} minutes</Text>
            </HStack>

            <HStack align={'center'}>
              <FaRegClock />
              <Text>Cooking time: {recipe.cookTime} minutes</Text>
            </HStack>
          </Stack>

          <HStack spacing={4} justifyContent={'center'}>
            {recipe.tags.map((tag, index) => (
              <Tag
                size={'sm'}
                variant="outline"
                colorScheme={'teal'}
                key={index}
              >
                <TagLeftIcon as={FaHashtag} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Stack>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}
