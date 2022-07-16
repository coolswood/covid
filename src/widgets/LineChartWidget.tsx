import React, { useState } from 'react';
import LineCharts from 'src/components/LineChart';
import ToggleButtons from 'src/components/ToggleButtons';
import { useQuery } from 'react-query';
import { ApiRequest } from 'src/helper';

const cases: {
  value: 'deaths' | 'confirmed';
  label: string;
}[] = [
  {
    value: 'deaths',
    label: 'Death count',
  },
  {
    value: 'confirmed',
    label: 'Confirmed cases',
  },
];

const timeline: {
  value: 'new' | 'total';
  label: string;
}[] = [
  {
    value: 'new',
    label: 'daily',
  },
  {
    value: 'total',
    label: 'common',
  },
];

export const LineChartWidget = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const [selectedCases, setSelectedCases] = useState<'confirmed' | 'deaths'>(
    cases[0].value
  );
  const [selectedTimeline, setSelectedTimeline] = useState<'total' | 'new'>(
    timeline[0].value
  );

  const { isLoading, error, data, isFetching } = useQuery(
    ['lineChart', selectedCases, selectedTimeline, selectedCountries],
    () =>
      ApiRequest<
        {
          countries: { country: string; series: number[] }[];
          dates: string[];
        },
        {
          countries: string[];
          status: 'confirmed' | 'deaths';
          timeline: 'total' | 'new';
        }
      >(
        'lineChart',
        {
          countries: selectedCountries,
          status: selectedCases,
          timeline: selectedTimeline,
        },
        'POST'
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      onSuccess: data => {
        console.log(11);
      },
    }
  );

  if (isLoading || data === undefined) return null;

  return (
    <div>
      <div>
        <LineCharts days={data.dates} data={data.countries} />
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
