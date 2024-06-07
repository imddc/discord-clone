import { ChannelType } from '@prisma/client'
import { useState } from 'react'
import FormErrors from '~/components/form/form-errors'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

interface FormSelectProps {
  id: string
  label?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
}

const FormSelect = ({
  label,
  id,
  disabled,
  defaultValue,
  className,
  errors,
  required
}: FormSelectProps) => {
  const [value, setValue] = useState<ChannelType>(ChannelType.TEXT)

  const handleChange = (v: ChannelType) => {
    setValue(v)
  }

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

        <input id={id} name={id} value={value} readOnly hidden />

        <Select
          disabled={disabled}
          defaultValue={ChannelType.TEXT}
          onValueChange={handleChange}
        >
          <SelectTrigger className="border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select a channel type" />
          </SelectTrigger>

          <SelectContent>
            {Object.values(ChannelType).map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
}

export default FormSelect
