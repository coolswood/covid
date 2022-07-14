import React, { useState } from 'react';

import MultipleSelectCheckmarks from 'src/components/DropDown';
import { LineChartWidget } from 'src/widgets/LineChartWidget';
import ToggleButtons from 'src/components/ToggleButtons';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BarChartWidget } from 'src/widgets/BarChartWidget';

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
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const { isLoading, error, data, isFetching } = useQuery(
    'repoData',
    () => axios.get('/api/countries').then(res => res.data),
    {
      staleTime: Infinity,
      onSuccess: data => {
        setSelectedCountries([...data].splice(0, 10));
      },
    }
  );

  if (isLoading) return null;

  return (
    <div
      style={{
        background: theme.palette.background.default,
      }}
    >
      <MultipleSelectCheckmarks
        countries={data}
        selectedCountries={selectedCountries}
        toggleCountry={setSelectedCountries}
      />
      <div>
        <ToggleButtons
          buttons={chartToggle}
          onChange={setSelectedGraph}
          value={selectedGraph}
        />
        {selectedGraph === 'cases' ? (
          <LineChartWidget selectedCountries={selectedCountries} />
        ) : (
          <BarChartWidget selectedCountries={selectedCountries} />
        )}
      </div>
    </div>
  );
};
