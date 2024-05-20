import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Link as ChakraLink,
  Textarea,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAxios } from '../../hooks';
import { ApiResponse } from '../../types/ApiResponse';

const FeedbackFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  message: z.string().min(25).max(500),
});

type TFeedbackFormSchema = z.infer<typeof FeedbackFormSchema>;

export function FeedbackForm() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TFeedbackFormSchema>({
    resolver: zodResolver(FeedbackFormSchema),
  });

  const axios = useAxios();
  const toast = useToast();

  const { mutate, isPending } = useMutation<
    AxiosResponse<ApiResponse<null>>,
    AxiosError<ApiResponse<null>>,
    TFeedbackFormSchema
  >({
    mutationKey: ['feedback'],
    mutationFn: (data) => axios.post('/feedback', data),
    onSuccess: () => {
      toast({
        title: 'Feedback submitted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: 'An error occurred',
        description: error.response?.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: TFeedbackFormSchema) => {
    clearErrors();
    mutate(data);
  };

  return (
    <Card align={'center'} w={'100% '} boxShadow={'2xl'}>
      <CardHeader>
        <Heading
          as={'h2'}
          fontSize={{
            base: 'sm',
            md: '1.25rem',
          }}
        >
          Your opinion matters
        </Heading>
      </CardHeader>
      <CardBody
        w={{
          base: '100%',
          sm: '70%',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <FormControl isInvalid={!!errors.email} isRequired={true}>
              <FormLabel htmlFor={'email'}>Email address</FormLabel>
              <Input id={'email'} {...register('email')} type="email" />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.firstName} isRequired={true}>
              <FormLabel htmlFor={'firstName'}>First Name</FormLabel>
              <Input id={'firstName'} {...register('firstName')} type="text" />
              {errors.firstName && (
                <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} isRequired={true}>
              <FormLabel htmlFor={'lastName'}>Last Name</FormLabel>
              <Input id={'lastName'} {...register('lastName')} type="text" />
              {errors.lastName && (
                <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.message} isRequired={true}>
              <FormLabel htmlFor={'message'}>Message</FormLabel>
              <Textarea id={'message'} {...register('message')} />
              {errors.message && (
                <FormErrorMessage>{errors.message.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              colorScheme={'blue'}
              type={'submit'}
              isDisabled={isPending}
              isLoading={isPending}
              loadingText={'Submitting...'}
            >
              Send
            </Button>
          </Stack>
        </form>
      </CardBody>
      <CardFooter>
        <ChakraLink as={ReactRouterLink} to={'/home'}>
          Back to home
        </ChakraLink>
      </CardFooter>
    </Card>
  );
}
