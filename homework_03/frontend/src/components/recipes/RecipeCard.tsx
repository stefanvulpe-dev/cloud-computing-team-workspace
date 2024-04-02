import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaHashtag, FaRegHeart } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { RecipeCardProps } from '../../types';
import { ViewRecipeModal } from '../modals';

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              maxW={'300px'}
              mx={'auto'}
            />
            <Heading size="md">{recipe.title}</Heading>
            <Text
              color={'gray.500'}
              style={{
                textWrap: 'balance',
              }}
            >
              {recipe.ingredients.slice(0, 3).join(', ')}
            </Text>
            <HStack spacing={4}>
              <Button
                onClick={onOpen}
                colorScheme={'blue'}
                size={'sm'}
                leftIcon={<CgDetailsMore />}
              >
                View Recipe
              </Button>
              <Button
                colorScheme={'blue'}
                size={'sm'}
                variant={'outline'}
                leftIcon={<FaRegHeart />}
              >
                Save Recipe
              </Button>
            </HStack>
          </Stack>
        </CardBody>
        <Divider w={'90%'} mx={'auto'} />
        <CardFooter>
          <Wrap spacing={4} justify={'center'}>
            {recipe.tags.map((tag, index) => (
              <WrapItem key={index}>
                <Tag size={'sm'} variant="outline" colorScheme={'teal'}>
                  <TagLeftIcon as={FaHashtag} />
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </CardFooter>
      </Card>
      <ViewRecipeModal isOpen={isOpen} onClose={onClose} recipe={recipe} />
    </>
  );
}
