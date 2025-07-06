import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  testimonialSchema,
  TestimonialSchema,
} from 'features/schema/testimonial.schema'
import { useCreateTestimonialMutation } from 'entities/mutation/testimonial/create-testimonail.mutation'
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Avatar,
} from '@mui/material'
import ReactStars from 'react-stars'
import { publicImages } from 'shared/config'

export const CreateTestimonialPage = () => {
  const form = useForm<TestimonialSchema>({
    resolver: yupResolver(testimonialSchema),
    defaultValues: {
      name: '',
      designation: '',
      message: '',
    },
    mode: 'onTouched',
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form
  const { mutateAsync, isPending } = useCreateTestimonialMutation()

  const onSubmit = async (data: TestimonialSchema) => {
    await mutateAsync(data)
    reset()
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%)',
        py: 8,
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: '100%',
          display: 'flex',
          boxShadow: 6,
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: 'linear-gradient(135deg, #a7ffeb 0%, #e0f7fa 100%)',
            p: 5,
            minHeight: 420,
            gap: 2,
          }}
        >
          <Avatar
            src={publicImages?.avatar || ''}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              boxShadow: 3,
              bgcolor: 'primary.main',
            }}
          />
          <Typography
            variant="h4"
            fontWeight={800}
            align="center"
            gutterBottom
            sx={{ mb: 1 }}
          >
            Share Your Experience
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            align="center"
            sx={{ fontWeight: 500, mb: 2 }}
          >
            Your words inspire others! Please fill out the form to add your
            testimonial.
          </Typography>
          <ReactStars
            count={5}
            size={32}
            value={5}
            color2="#00bfae"
            edit={false}
          />
        </Box>
        <Box flex={2}>
          <CardContent>
            <form
              onSubmit={(e) => {
                void handleSubmit(onSubmit)(e)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
            >
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Designation"
                  fullWidth
                  {...register('designation')}
                  error={!!errors.designation}
                  helperText={errors.designation?.message}
                />
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register('message')}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={!isValid || isPending}
                  sx={{ borderRadius: 8, fontWeight: 600, mt: 2 }}
                >
                  {isPending ? 'Submitting...' : 'Submit Testimonial'}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
