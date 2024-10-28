import { FORM_STEPS } from '@/constants';
import { ArrowLeft, ArrowRight, Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface FormStepsNavProps {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

export default function FormStepsNav({
  currentTab,
  setCurrentTab,
}: FormStepsNavProps) {
  const { formState } = useFormContext();
  const isValid = formState.isValid;

  return (
    <Stack
      spacing={2}
      padding={2}
      direction="row"
      justifyContent="space-between"
    >
      {currentTab > 0 && (
        <Button
          variant="contained"
          startIcon={<ArrowLeft />}
          onClick={() => setCurrentTab(currentTab - 1)}
          fullWidth
        >
          Back
        </Button>
      )}
      {currentTab < FORM_STEPS.length - 1 && (
        <Button
          variant="contained"
          endIcon={<ArrowRight />}
          onClick={() => setCurrentTab(currentTab + 1)}
          fullWidth
        >
          Next
        </Button>
      )}
      {currentTab === FORM_STEPS.length - 1 && (
        <Button
          type="submit"
          variant="contained"
          startIcon={<Add />}
          fullWidth
          color="secondary"
          disabled={!isValid}
        >
          Create Recipe
        </Button>
      )}
    </Stack>
  );
}
