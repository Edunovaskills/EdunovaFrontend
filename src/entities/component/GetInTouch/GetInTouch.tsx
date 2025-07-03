import React from 'react'
import { BuzInfoSection } from '../BuzzInfo-Section/BuzInfoSection'
import { Stack, TextField, Typography } from '@mui/material'
import { RoundedIcon } from 'shared/components'
import { publicImages } from 'shared/config'
import { Link } from 'react-router-dom'
import {
  BottomViewStyled,
  ButtonStyled,
  FieldsWrapperStyled,
  PaperStyled,
  RightViewWrapperStyled,
  StackStyled,
} from './styles.component'
import { useScreenSize } from 'shared/hooks'
import { useCreateEnquiryMutation } from 'entities/mutation'
import { useForm } from 'react-hook-form'
import { enquirySchema, type EnquirySchema } from 'features/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import {number} from 'shared/environment/model/environment.model'

export const GetInTouch = () => {
  const TopView = () => {
    return (
      <>
        <Typography variant="h5.700">
          GET IN{' '}
          <Typography variant="h5.700" color="primary.main">
            TOUCH
          </Typography>
        </Typography>

        <Typography variant="body2">
          Stay in Touch with us, We’re Here for You.
        </Typography>
      </>
    )
  }

  const BottomView = () => {
    const { smallScreen: smallscreen } = useScreenSize()
    const { mutateAsync: createEnquiry, isPending } = useCreateEnquiryMutation()
    const {
      handleSubmit,
      register,
      formState: { errors, isValid },
      reset,
    } = useForm<EnquirySchema>({
      resolver: yupResolver(enquirySchema),
      defaultValues: {
        fullName: '',
        email: '',
        message: '',
      },
      mode: 'onTouched',
    })

    const onSubmit = async (data: EnquirySchema) => {
      await createEnquiry({ ...data, phone: `+91 ${data.phone}` })
      reset()
    }

    return (
      <PaperStyled issmall={smallscreen} id="contact-us">
        <StackStyled
          component={'form'}
          issmall={smallscreen}
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e)
          }}
        >
          <TextField
            {...register('fullName')}
            placeholder="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <FieldsWrapperStyled>
            <TextField
              {...register('email')}
              type="email"
              placeholder="Email Address"
              sx={{ flexBasis: '49%' }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              placeholder="XXXXX XXXXX"
              sx={{ flexBasis: '49%' }}
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                inputProps: {
                  maxLength: 10,
                },
                startAdornment: (
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    +91
                  </Typography>
                ),
              }}
            />
          </FieldsWrapperStyled>
          <TextField
            placeholder="Message"
            multiline
            rows={4}
            sx={{ width: '100%' }}
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
          />

          <ButtonStyled
            variant="contained"
            type="submit"
            disabled={!isValid || isPending}
            loading={isPending}
          >
            Send Enquiry
          </ButtonStyled>
        </StackStyled>

        <BottomViewStyled>
          <RightViewWrapperStyled>
            <RoundedIcon
              content={<img src={publicImages.mail} alt="mail" />}
              size={40}
            />
            <Stack spacing={'10px'}>
              <Typography variant="body1.600" color="secondary.main">
                Email Us:{' '}
                <Link to="mailto:info@edunovaskill.com" color="secondary.main">
                  <Typography variant="body1.600" color="secondary.main">
                    info@edunovaskill.com
                  </Typography>
                </Link>
              </Typography>
              <Typography variant="body2">
                For enquiries, academic collaboration proposals, or detailed
                specifications, please reach out to us at{' '}
                <Link to="mailto:contact@edunova.com" color="secondary.main">
                  info@edunovaskill.com
                </Link>
              </Typography>
            </Stack>
          </RightViewWrapperStyled>

          <RightViewWrapperStyled>
            <RoundedIcon
              content={<img src={publicImages.phone} alt="phone" />}
              size={40}
            />
            <Stack spacing={'10px'}>
              <Typography variant="body1.600" color="secondary.main">
                Call Us:{' '}
                <Link to="tel:+{number}" color="secondary.main">
                  <Typography variant="body1.600" color="secondary.main">
                    +{number}
                  </Typography>
                </Link>
              </Typography>
              <Typography variant="body2">
                We're here to help — how can we assist you today?
              </Typography>
            </Stack>
          </RightViewWrapperStyled>
        </BottomViewStyled>
      </PaperStyled>
    )
  }
  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<BottomView />} />
  )
}
