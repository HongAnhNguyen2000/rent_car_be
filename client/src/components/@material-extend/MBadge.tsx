import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Badge, BadgeProps } from '@mui/material';

// ----------------------------------------------------------------------

declare module '@mui/material' {
  interface BadgePropsColorOverrides {
    info: true;
    success: true;
    warning: true;
  }
}

const MBadge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === 'default' || color === 'error' || color === 'primary' || color === 'secondary') {
      return (
        <Badge ref={ref} color={color} sx={sx} {...other}>
          {children}
        </Badge>
      );
    }

    return (
      <Badge
        ref={ref}
        sx={{
          '& .MuiBadge-badge': {
            color: theme.palette[color].contrastText,
            backgroundColor: theme.palette[color].main
          },
          ...sx
        }}
        {...other}
      >
        {children}
      </Badge>
    );
  }
);

export default MBadge;
