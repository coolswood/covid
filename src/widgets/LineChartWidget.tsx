import React, { useState } from 'react';
import LineCharts from 'src/components/LineChart';
import ToggleButtons from 'src/components/ToggleButtons';
import { useQuery } from 'react-query';
import axios from 'axios';

const cases = [
  {
    value: 'Death count',
    label: 'death',
  },
  {
    value: 'Confirmed cases',
    label: 'confirmed',
  },
];

const timeline = [
  {
    value: 'Daily',
    label: 'daily',
  },
  {
    value: 'Common',
    label: 'common',
  },
];

export const LineChartWidget = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const [selectedCases, setSelectedCases] = useState(cases[0].value);
  const [selectedTimeline, setSelectedTimeline] = useState(timeline[0].value);

  const { isLoading, error, data, isFetching } = useQuery(
    'lineChart',
    () => axios.get('/api/lineChart').then(res => res.data),
    {
      staleTime: Infinity,
    }
  );

  if (isLoading) return null;

  return (
    <div>
      <div>
        <LineCharts days={data.timeLine} data={data.countries} />
        <div>
          <ToggleButtons
            buttons={cases}
            onChange={setSelectedCases}
            value={selectedCases}
          />
          <ToggleButtons
            buttons={timeline}
            onChange={setSelectedTimeline}
            value={selectedTimeline}
          />
        </div>
      </div>
    </div>
  );
};
