'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '~/lib/utils'
import { Button, ButtonProps } from '../ui/button'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
  size?: ButtonProps['size']
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
  size
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn(className)}
      variant={variant}
      size={size || 'sm'}
    >
      {children}
    </Button>
  )
}

export default FormSubmit
