import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper } from '../form/field-wrapper';

// Define the type for the options prop
export interface OptionT {
  value: string;
  label: string;
}

// Define the type for the component props
interface FpRadioGroupProps {
  options: OptionT[];
  defaultValue: string;
  registration: Partial<UseFormRegisterReturn>;
  label: string;
  error?: FieldError;
  position?: 'Column' | 'Row';
  onValueChange: (value: string) => void;
}

const FpRadioGroup: React.FC<FpRadioGroupProps> = ({
  options,
  defaultValue,
  registration,
  error,
  label,
  onValueChange,
  position = 'Column',
}) => (
  <FieldWrapper label={label} error={error}>
    <RadioGroup.Root
      data-position={position}
      className={`flex gap-2 data-[position="Column"]:flex-col`}
      defaultValue={defaultValue}
      name={label}
      aria-label="Options"
      onValueChange={onValueChange}
      {...registration}
    >
      {options.map((option) => (
        <div
          key={option.value}
          data-position={position}
          className="flex items-center data-[position='Row']:ml-4"
        >
          <input
            type="radio"
            {...registration}
            id={option.value}
            value={option.value}
            className="hidden" // Hide the native input, as we will style the custom radio button
          />
          <RadioGroup.Item
            className="bg-white w-6 h-6 rounded-full shadow-md hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-black"
            value={option.value}
            id={option.value}
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <label className="text-primary text-sm  pl-4 " htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </FieldWrapper>
);

export default FpRadioGroup;
