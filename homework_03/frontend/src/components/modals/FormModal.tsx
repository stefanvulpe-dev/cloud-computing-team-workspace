import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  form: ReactElement;
  title: string;
};

export function FormModal({ isOpen, onClose, form, title }: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{form}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
