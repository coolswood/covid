import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type ToggleButtonsType<T> = {
  value: T;
  onChange: (value: T) => void;
  buttons: {
    value: T;
    label: string;
  }[];
};

export default function ToggleButtons<T>({
  buttons,
  value,
  onChange,
}: ToggleButtonsType<T>) {
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={(e, val) => {
          if (val !== null) {
            onChange(val);
          }
        }}
      >
        {buttons.map(({ value, label }) => (
          <ToggleButton key={label} value={value}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
