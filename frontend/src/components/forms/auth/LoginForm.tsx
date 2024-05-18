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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth, useAxios, useLocalStorage } from '../../../hooks';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../../../types/ApiResponse.ts';
import { TLoginResponse } from '../../../types';

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    }),
});

type TLoginFormSchema = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  const axios = useAxios();
  const { setUser, setToken } = useAuth();
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<
    AxiosResponse<ApiResponse<TLoginResponse>>,
    AxiosError<ApiResponse<null>>,
    TLoginFormSchema
  >({
    mutationKey: ['auth', 'login'],
    mutationFn: (data) => axios.post('/auth/login', data),
    onSuccess: (response) => {
      if (response.data.isSuccess) {
        const { user, token } = response.data.value!;
        setUser(user);
        setToken(token);
        setItem('token', token);
        setItem('user', user);
        navigate('/home', { replace: true });
      }
    },
    onError: (error) => {
      for (const key in error.response?.data.validationErrors) {
        setError(key as keyof TLoginFormSchema, {
          message: error.response?.data.validationErrors[key][0],
        });
      }
    },
  });

  const onSubmit = (data: TLoginFormSchema) => {
    clearErrors();
    mutate(data);
  };

  return (
    <Card align={'center'} w={'100% '} boxShadow={'2xl'}>
      <CardHeader>
        <Heading as={'h2'} size={['md', 'lg']}>
          Login
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
            <FormControl isInvalid={!!errors.password} isRequired={true}>
              <FormLabel htmlFor={'password'}>Password</FormLabel>
              <Input
                id={'password'}
                {...register('password')}
                type="password"
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button colorScheme={'blue'} type={'submit'} isDisabled={isPending}>
              Login
            </Button>
          </Stack>
        </form>
      </CardBody>
      <CardFooter>
        <ChakraLink as={ReactRouterLink} to={'/register'} textAlign={'center'}>
          Don't have an account? Register
        </ChakraLink>
      </CardFooter>
    </Card>
  );
}
