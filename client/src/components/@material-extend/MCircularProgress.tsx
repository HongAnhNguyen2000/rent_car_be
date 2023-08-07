import { useTheme } from '@mui/material/styles';
import { CircularProgress, CircularProgressProps } from '@mui/material';

// ----------------------------------------------------------------------

declare module '@mui/material' {
  interface CircularProgressPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

export default function MCircularProgress({
  color = 'primary',
  sx,
  ...other
}: CircularProgressProps) {
  const theme = useTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} sx={sx} {...other} />;
  }

  return (
    <CircularProgress
      sx={{
        color: theme.palette[color].main,
        ...sx
      }}
      {...other}
    />
  );
}
