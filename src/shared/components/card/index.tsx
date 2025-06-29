import React from 'react'
import { ArrowRight } from 'lucide-react'
import {
  CardContainer,
  ImageContainer,
  PriceBadge,
  ContentContainer,
  CardTitle,
  CardDescription,
  ActionButton,
} from './Card.styles'

interface CardProps {
  title: string
  description: string
  image?: string
  price?: number
  isFree?: boolean
  onClick?: () => void
  onActionClick?: (e: React.MouseEvent) => void
  actionText?: string
  actionDisabled?: boolean
  type?: 'event' | 'course' | 'blog'
  className?: string
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  price,
  isFree,
  onClick,
  onActionClick,
  actionText,
  actionDisabled = false,
  type = 'event',
  className = '',
}) => {
  const placeholderImage = `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center`

  return (
    <CardContainer $type={type} className={className} onClick={onClick}>
      <ImageContainer>
        <img
          src={image || placeholderImage}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = placeholderImage
          }}
        />

        {(price !== undefined || isFree) && (
          <PriceBadge $type={type} $isFree={isFree || price === 0}>
            {isFree || price === 0 ? 'Free' : `₹${price}`}
          </PriceBadge>
        )}
      </ImageContainer>

      <ContentContainer>
        <CardTitle $type={type}>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>

        {actionText && (
          <ActionButton
            $type={type}
            $disabled={actionDisabled}
            onClick={onActionClick}
            disabled={actionDisabled}
          >
            {actionText}
            {!actionDisabled && <ArrowRight />}
          </ActionButton>
        )}
      </ContentContainer>
    </CardContainer>
  )
}
