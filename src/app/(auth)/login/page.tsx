'use client';

import { Box, Button, CircularProgress, Paper, Typography, Link as MuiLink } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/lib/store/hooks';
import Link from 'next/link';

import Input from '@/components/form/input';
import { LoginFormSchema } from './definitions';
import { userLoginSlice } from '@/lib/store/features/auth/auth-slice';
import { ILoginData } from '@/lib/store/features/auth/auth-types';
import { setUserData } from '@/lib/store/features/user/user-slice';
import { IUserSliceState } from '@/lib/store/features/user/user-types';
import { useBreakpoint } from '@/hooks';
import { paperStyles } from '../styles';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const isSmallMobile = useBreakpoint('xs');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ILoginData>({
    defaultValues: { password: '', email: '' },
    resolver: zodResolver(LoginFormSchema)
  });

  const onSubmit: SubmitHandler<ILoginData> = async data => {
    const resp = await dispatch(userLoginSlice(data));
    const userData: IUserSliceState = {
      access_token: resp.payload.access_token,
      data: {
        ...resp.payload.user.data
      }
    };
    dispatch(setUserData(userData));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={1}>
      <Paper square={isSmallMobile} sx={paperStyles}>
        <Typography align="center" variant="h3" mb={4}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} label="Email" errors={errors} />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Password" type="password" errors={errors} />
            )}
          />
          <Box width={1} display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" sx={{ width: 1 }} disabled={isSubmitting}>
              {!isSubmitting ? 'Submit' : <CircularProgress size={25} />}
            </Button>
          </Box>
        </form>
        <Box width={1} display="flex" justifyContent="center" mt={2}>
          <MuiLink component={Link} href="/signup">
            Or register
          </MuiLink>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
