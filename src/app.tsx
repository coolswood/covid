import React, { useState } from 'react';

import MultipleSelectCheckmarks from 'src/components/DropDown';
import { LineChartWidget } from 'src/widgets/LineChartWidget';
import ToggleButtons from 'src/components/ToggleButtons';
import { useTheme } from '@mui/material/styles';

const chartToggle = [
  {
    value: 'cases',
    label: 'Reported cases',
  },
  {
    value: 'ranked',
    label: 'Ranked charts',
  },
];

export const App = () => {
  const theme = useTheme();
  const [selectedGraph, setSelectedGraph] = useState(chartToggle[0].value);

  return (
    <div
      style={{
        background: theme.palette.background.default,
      }}
    >
      <MultipleSelectCheckmarks />
      <div>
        <ToggleButtons
          buttons={chartToggle}
          onChange={setSelectedGraph}
          value={selectedGraph}
        />
        <LineChartWidget />
      </div>
    </div>
  );
};
