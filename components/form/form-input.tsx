'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import FormErrors from './form-errors'

interface FormInputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            ref={ref}
            className={cn(
              'border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0',
              className
            )}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            name={id}
            id={id}
            type={type}
            aria-describedby={`${id}-error`}
            onBlur={onBlur}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
