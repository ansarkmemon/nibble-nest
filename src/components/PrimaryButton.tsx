import { Button, ButtonProps } from '@mui/material';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="black"
      className={workSans.className}
      sx={{
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
