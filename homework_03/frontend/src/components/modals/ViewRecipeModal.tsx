import {
  Button,
  Heading,
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
  VStack,
} from '@chakra-ui/react';
import { TRecipe } from '../../types';
import { FaHashtag, FaRegClock, FaUser } from 'react-icons/fa';
import { TbSalt } from 'react-icons/tb';
import { AiOutlineSound } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../../hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../types/ApiResponse.ts';
import { useEffect, useState } from 'react';

export function ViewRecipeModal({
  isOpen,
  onClose,
  recipe,
}: {
  isOpen: boolean;
  onClose: () => void;
  recipe: TRecipe;
}) {
  const axiosClient = useAxios();

  const [audioBuffer, setAudioBuffer] = useState<string | null>();

  const { mutate, isPending } = useMutation<
    AxiosResponse<{ audioContent: string }>,
    AxiosError<ApiResponse<null>>,
    string
  >({
    mutationKey: ['recipes', 'audio'],
    mutationFn: (data: string) =>
      axiosClient.post(`/recipes/audio`, {
        text: data,
      }),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setAudioBuffer(data.data.audioContent);
    },
  });

  useEffect(() => {
    if (!audioBuffer) return;

    const context = new window.AudioContext();
    const source = context.createBufferSource();

    // Decode the Base64 string to get the original audio data
    const arrayBuffer = Uint8Array.from(atob(audioBuffer), (c) =>
      c.charCodeAt(0),
    ).buffer;

    context.decodeAudioData(
      arrayBuffer,
      function (buffer) {
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
      },
      function (e) {
        console.log('Error decoding audio data', e);
      },
    );

    return () => {
      source.disconnect();
      source.stop();
    };
  }, [audioBuffer]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'xl'}>
        <ModalHeader>
          <VStack spacing={8} maxW={'calc(100% - 2rem)'}>
            <Heading fontSize={['md', 'lg', 'xl']}>{recipe.title}</Heading>
            <Button
              onClick={() => mutate(recipe.title + '. ' + recipe.description)}
              colorScheme={'blue'}
              leftIcon={<AiOutlineSound />}
              isDisabled={isPending}
            >
              Read aloud
            </Button>
          </VStack>
        </ModalHeader>
        <ModalCloseButton onClick={() => setAudioBuffer(null)} />
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
