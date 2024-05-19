import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import { SidebarContent } from './SidebarContent.tsx';
import { useRef } from 'react';

export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [isLargerScreen] = useMediaQuery('(min-width: 60em)', { ssr: false });

  return (
    <>
      {isLargerScreen ? (
        <Stack
          spacing={10}
          minH={'100vh'}
          p={10}
          bg={'white'}
          alignSelf={'stretch'}
        >
          <SidebarContent />
        </Stack>
      ) : (
        <>
          <IconButton
            aria-label={'Open Sidebar'}
            icon={<IoMenu />}
            onClick={onOpen}
            pos={'fixed'}
            top={4}
            left={4}
          />
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement={'left'}
            size={'full'}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody pt={10}>
                <Stack spacing={10}>
                  <SidebarContent />
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
