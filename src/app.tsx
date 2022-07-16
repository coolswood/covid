import React, { useState } from 'react';

import MultipleSelectCheckmarks from 'src/components/DropDown';
import { LineChartWidget } from 'src/widgets/LineChartWidget';
import ToggleButtons from 'src/components/ToggleButtons';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { BarChartWidget } from 'src/widgets/BarChartWidget';
import Loader from 'src/components/Loader';
import { ApiRequest } from 'src/helper';
import { CHART_TOGGLE } from './constants';

export const App = () => {
  const theme = useTheme();
  const [selectedGraph, setSelectedGraph] = useState<'cases' | 'ranked'>(
    CHART_TOGGLE[0].value
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const { isLoading, error, data, isFetching } = useQuery(
    'countries',
    () =>
      ApiRequest<api.countries.response, api.countries.request>(
        'countries',
        {}
      ),
    {
      staleTime: Infinity,
      onSuccess: data => {
        setSelectedCountries([...data].splice(0, 10));
      },
    }
  );

  if (isLoading || data === undefined) return <Loader />;

  return (
    <div
      style={{
        background: theme.palette.background.default,
        height: '100vh',
        padding: '20px',
      }}
    >
      <MultipleSelectCheckmarks
        countries={data}
        selectedCountries={selectedCountries}
        toggleCountry={setSelectedCountries}
      />
      <div
        style={{
          margin: '20px 0',
        }}
      >
        <ToggleButtons
          buttons={CHART_TOGGLE}
          onChange={setSelectedGraph}
          value={selectedGraph}
        />
      </div>
      {selectedGraph === 'cases' ? (
        <LineChartWidget selectedCountries={selectedCountries} />
      ) : (
        <BarChartWidget selectedCountries={selectedCountries} />
      )}
    </div>
  );
};
