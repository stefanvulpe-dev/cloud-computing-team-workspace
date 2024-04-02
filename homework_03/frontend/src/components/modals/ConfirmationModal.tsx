import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

type ConfirmationModalProps = {
  isOpen: boolean;
  isButtonDisabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isButtonDisabled,
  title,
  message,
  confirmText,
  cancelText,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onConfirm}
            isDisabled={isButtonDisabled}
          >
            {confirmText}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            isDisabled={isButtonDisabled}
          >
            {cancelText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
