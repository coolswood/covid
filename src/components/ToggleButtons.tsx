import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type ToggleButtonsType = {
  value: string;
  onChange: (value: string) => void;
  buttons: {
    value: string;
    label: string;
  }[];
};

export default function ToggleButtons({
  buttons,
  value,
  onChange,
}: ToggleButtonsType) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(e, val) => onChange(val)}
    >
      {buttons.map(({ value, label }) => (
        <ToggleButton value={value}>{label}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
