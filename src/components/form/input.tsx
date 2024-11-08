import React from 'react';
import { FilledTextFieldProps, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

interface IInputProps extends Omit<FilledTextFieldProps, 'variant'> {
  errors?: any;
  variant?: 'filled';
  name: string;
}

const Input: React.FC<IInputProps> = props => {
  const { name, type, slotProps, helperText, disabled, errors, ...otherProps } = props;
  const isPasswordType = type === 'password';
  const [isVisible, setIsVisible] = React.useState(false);
  const hasError = errors ? errors[name] : null;

  return (
    <TextField
      {...otherProps}
      sx={{ marginBottom: 2 }}
      fullWidth
      name={name || ''}
      variant={props.variant || 'filled'}
      type={isPasswordType ? (isVisible ? 'text' : 'password') : type || 'text'}
      error={!!hasError}
      helperText={hasError ? hasError?.message : helperText}
      autoComplete="new-password"
      slotProps={{
        ...slotProps,
        input: {
          endAdornment:
            isPasswordType && !disabled ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <VisibilityOffOutlined color="primary" />
                  ) : (
                    <VisibilityOutlined color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null,
          autoComplete: 'new-password',
          ...slotProps?.input
        },
        htmlInput: {
          autoComplete: 'new-password',
          ...slotProps?.htmlInput
        }
      }}
      disabled={disabled}
    />
  );
};

export default Input;