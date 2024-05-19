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
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../../../hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/ApiResponse.ts';

const RegisterSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    }),
});

type TRegisterSchema = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const axios = useAxios();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<
    AxiosResponse<ApiResponse<null>>,
    AxiosError<ApiResponse<null>>,
    TRegisterSchema
  >({
    mutationKey: ['auth', 'register'],
    mutationFn: (data) => axios.post('/auth/register', data),
    onSuccess: () => {
      reset();
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      for (const key in error.response?.data.validationErrors) {
        setError(key as keyof TRegisterSchema, {
          message: error.response.data.validationErrors[key].join(', '),
        });
      }
    },
  });

  const onSubmit = (data: TRegisterSchema) => {
    clearErrors();
    mutate(data);
  };

  return (
    <Card align={'center'} w={'100% '} boxShadow={'2xl'}>
      <CardHeader>
        <Heading as={'h2'} size={['md', 'lg']}>
          Register
        </Heading>
      </CardHeader>
      <CardBody
        w={{
          base: '100%',
          sm: '70%',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.firstName} isRequired={true}>
              <FormLabel htmlFor={'firstName'}>First Name</FormLabel>
              <Input id={'firstName'} type="text" {...register('firstName')} />
              {errors.firstName && (
                <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} isRequired={true}>
              <FormLabel htmlFor={'lastName'}>Last Name</FormLabel>
              <Input id={'lastName'} type="text" {...register('lastName')} />
              {errors.lastName && (
                <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.email} isRequired={true}>
              <FormLabel htmlFor={'email'}>Email address</FormLabel>
              <Input id={'email'} type="email" {...register('email')} />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password} isRequired={true}>
              <FormLabel htmlFor={'password'}>Password</FormLabel>
              <Input
                id={'password'}
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button colorScheme={'blue'} type={'submit'} isDisabled={isPending}>
              Register
            </Button>
          </Stack>
        </form>
      </CardBody>
      <CardFooter>
        <ChakraLink as={ReactRouterLink} to={'/login'} textAlign={'center'}>
          Already a user? Login here
        </ChakraLink>
      </CardFooter>
    </Card>
  );
}
