import {
  Link as ChakraLink,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { BiFoodMenu } from 'react-icons/bi';
import {
  FaHome,
  FaQuestionCircle,
  FaRegCompass,
  FaRobot,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export function SidebarNav() {
  return (
    <List spacing={8} mt={6} w={'max-content'} mx={'auto'}>
      <ListItem fontSize={'1.25rem'}>
        <ChakraLink
          as={NavLink}
          to={'/home/trending'}
          _activeLink={{ color: 'gray.500' }}
        >
          <HStack>
            <ListIcon as={FaHome} />
            <Text>Home</Text>
          </HStack>
        </ChakraLink>
      </ListItem>
      <ListItem fontSize={'1.25rem'}>
        <ChakraLink
          as={NavLink}
          to={'/home/explore'}
          _activeLink={{ color: 'gray.500' }}
        >
          <HStack>
            <ListIcon as={FaRegCompass} />
            <Text>Explore</Text>
          </HStack>
        </ChakraLink>
      </ListItem>
      <ListItem fontSize={'1.25rem'}>
        <ChakraLink
          as={NavLink}
          to={'/home/recipes'}
          _activeLink={{ color: 'gray.500' }}
        >
          <HStack>
            <ListIcon as={BiFoodMenu} />
            <Text>Your recipes</Text>
          </HStack>
        </ChakraLink>
      </ListItem>
      <ListItem fontSize={'1.25rem'}>
        <ChakraLink
          as={NavLink}
          to={'/home/assistant'}
          _activeLink={{ color: 'gray.500' }}
        >
          <HStack>
            <ListIcon as={FaRobot} />
            <Text>Assistant</Text>
          </HStack>
        </ChakraLink>
      </ListItem>
      <ListItem fontSize={'1.25rem'}>
        <ChakraLink
          as={NavLink}
          to={'/home/faq'}
          _activeLink={{ color: 'gray.500' }}
        >
          <HStack>
            <ListIcon as={FaQuestionCircle} />
            <Text>FAQ</Text>
          </HStack>
        </ChakraLink>
      </ListItem>
    </List>
  );
}
