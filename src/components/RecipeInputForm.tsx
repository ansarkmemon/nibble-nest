'use client';

import {
  TextField,
  Button,
  Autocomplete,
  Stepper,
  Stack,
  Tab,
  Tabs,
  Box,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FOOD_CATEGORIES, FORM_STEPS } from '@/constants';
import { CUISINE_TYPES } from '@/types/cuisine';
import FormStepsNav from './FormStepsNav';
import { CloudUpload } from '@mui/icons-material';
import { Recipe } from '@/types/recipe';
import { useRouter } from 'next/navigation';

const TabPanel = ({
  children,
  value,
  index,
  setCurrentTab,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
  setCurrentTab: (tab: number) => void;
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          <FormStepsNav currentTab={value} setCurrentTab={setCurrentTab} />
        </Box>
      )}
    </div>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const RecipeInputForm = () => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = methods;
  const router = useRouter();

  console.log('values > ', methods.getValues());

  const [currentTab, setCurrentTab] = useState(0);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    // formData.append('category', data.category);
    formData.append('cuisine', data.cuisine);
    formData.append('cookTime', data.cookTime);
    formData.append('ingredients', data.ingredients);
    formData.append('instructions', data.instructions);

    for (let i = 0; i < data.category.length; i++) {
      formData.append('category', data.category[i]);
    }

    if (data?.files?.length) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append('files', data.files[i]);
      }
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`, {
      method: 'POST',
      body: formData,
    });

    reset();
    router.push('/');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {FORM_STEPS.map((step) => (
            <Tab key={step} label={step} />
          ))}
        </Tabs>

        <TabPanel value={currentTab} index={0} setCurrentTab={setCurrentTab}>
          <Stack spacing={2} direction="column" padding={2}>
            <TextField
              label="Name"
              placeholder="Name of the recipe"
              fullWidth
              required={true}
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message as string}
              {...register('name', { required: 'This field is required' })}
            />

            <Controller
              name="category"
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <Autocomplete
                    disablePortal
                    multiple={true}
                    options={FOOD_CATEGORIES.map((category) => category.name)}
                    value={value || []}
                    onChange={(_, value) => {
                      onChange(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(errors.category?.message)}
                        helperText={errors.category?.message as string}
                        label="Category"
                        required={true}
                        {...params}
                      />
                    )}
                  />
                );
              }}
            />

            <Autocomplete
              disablePortal
              options={CUISINE_TYPES}
              renderInput={(params) => (
                <TextField
                  error={Boolean(errors.cuisine?.message)}
                  required={true}
                  helperText={errors.cuisine?.message as string}
                  label="Cuisine"
                  {...params}
                  {...register('cuisine', { required: 'Cuisine is required' })}
                />
              )}
            />

            <TextField
              label="Cook Time"
              placeholder="How long does it take to cook?"
              fullWidth
              {...register('cookTime', { required: false })}
            />
          </Stack>
        </TabPanel>

        <TabPanel value={currentTab} index={1} setCurrentTab={setCurrentTab}>
          <Stack spacing={2} direction="column" padding={2}>
            <Controller
              name="ingredients"
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <TextField
                    label="Ingredients"
                    multiline
                    placeholder="Please add each ingredient in a new line"
                    onChange={(e) => {
                      onChange(e.target.value.split('\n'));
                    }}
                  />
                );
              }}
            />
          </Stack>
        </TabPanel>
        <TabPanel value={currentTab} index={2} setCurrentTab={setCurrentTab}>
          <Stack spacing={2} direction="column" padding={2}>
            <TextField
              label="Instructions"
              multiline
              placeholder="Please add each instruction in a new line"
              {...register('instructions', {
                required: 'Instructions are required',
              })}
            />
          </Stack>
        </TabPanel>
        <TabPanel value={currentTab} index={3} setCurrentTab={setCurrentTab}>
          <Stack spacing={2} direction="column" padding={2}>
            {/* <TextField label="Media" multiline /> */}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload Images
              <VisuallyHiddenInput
                type="file"
                // onChange={(event) => console.log(event.target.files)}
                {...register('files', { required: 'Images are required' })}
                multiple
              />
            </Button>
          </Stack>
        </TabPanel>
      </form>
    </FormProvider>
  );
};
