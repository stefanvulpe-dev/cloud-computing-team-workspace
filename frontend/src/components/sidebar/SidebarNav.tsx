import {
  HStack,
  List,
  ListIcon,
  ListItem,
  Link as ChakraLink,
  Text,
  Button,
} from '@chakra-ui/react';
import { FaHome, FaRegCompass, FaRobot } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiFoodMenu } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { useLocalStorage } from '../../hooks';
import { FaQuestionCircle } from 'react-icons/fa';

export function SidebarNav() {
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();

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
      <ListItem>
        <Button
          fontSize={'1.25rem'}
          px={0}
          gap={2}
          leftIcon={<MdLogout />}
          onClick={() => {
            removeItem('token');
            removeItem('user');
            navigate('/login', { replace: true });
          }}
          variant={'none'}
          textAlign={'left'}
        >
          Logout
        </Button>
      </ListItem>
    </List>
  );
}
