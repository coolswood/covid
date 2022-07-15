import React, { useState } from 'react';
import ToggleButtons from 'src/components/ToggleButtons';
import BarCharts from 'src/components/BarChart';
import { useQuery } from 'react-query';
import axios from 'axios';

const cases = [
  {
    value: 'Death count',
    label: 'death',
  },
  {
    value: 'Total cases',
    label: 'total',
  },
];

export const BarChartWidget = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const [selectedCases, setSelectedCases] = useState(cases[0].value);

  const { isLoading, error, data, isFetching } = useQuery(
    'barChart',
    () => axios.get('/api/barChart').then(res => res.data),
    {
      staleTime: Infinity,
    }
  );

  console.log(data);

  if (isLoading) return null;

  return (
    <div>
      <div>
        <BarCharts data={[100, 2, 5]} countries={['Af', 'sadasd', 'sad']} />
        <div>
          <ToggleButtons
            buttons={cases}
            onChange={setSelectedCases}
            value={selectedCases}
          />
        </div>
      </div>
    </div>
  );
};
