import { useState, useRef } from 'react';
import {
  Stack,
  Heading,
  Box,
  HStack,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { axiosClient } from '../api';

interface Message {
  text: string;
  sender: 'User' | 'Assistant';
}

export function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: requestResponse, isPending: isRequestingResponse } =
    useMutation<
      AxiosResponse<{ value: { message: string } }>,
      AxiosError<ApiResponse<null>>,
      string
    >({
      mutationFn: (message) =>
        axiosClient.post('/assistant/response', { message }),
      onSuccess: ({
        data: {
          value: { message },
        },
      }) => {
        setMessages([...messages, { text: message, sender: 'Assistant' }]);

        setTimeout(scrollToBottom, 0);
        inputRef.current?.focus();
      },
    });

  const scrollToBottom = () => {
    const element = messagesRef.current;
    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'User' }]);
      setInputValue('');

      setTimeout(scrollToBottom, 0);

      requestResponse(inputValue);
    }
  };

  return (
    <Stack
      justifyContent="space-between"
      spacing={10}
      pt={12}
      pb={6}
      pr={10}
      minH="100vh"
      width="100%"
    >
      <Heading
        as="h2"
        fontWeight="semibold"
        textAlign="center"
        fontSize={{
          base: '1rem',
          md: '1.25rem',
          lg: '1.35rem',
        }}
      >
        Ask me anything about food!
      </Heading>

      <Box>
        <Box overflowY="scroll" height="75vh" p={2} mb={6} ref={messagesRef}>
          {messages.map((msg, index) => (
            <HStack
              key={index}
              justify={msg.sender === 'User' ? 'flex-end' : 'flex-start'}
            >
              <Box
                bg={msg.sender === 'User' ? 'blue.500' : 'gray.100'}
                color={msg.sender === 'User' ? 'white' : 'black'}
                px={4}
                py={2}
                my={2}
                borderRadius="md"
              >
                <Text whiteSpace="pre-wrap">{msg.text}</Text>
              </Box>
            </HStack>
          ))}
        </Box>

        <HStack width="100%">
          <Input
            id="search"
            placeholder="What do you wish to ask the assistant?"
            w="100%"
            bg="white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isRequestingResponse}
            ref={inputRef}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
}
