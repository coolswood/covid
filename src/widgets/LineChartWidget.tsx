import React, { useState } from 'react';
import LineCharts from 'src/components/LineChart';
import ToggleButtons from 'src/components/ToggleButtons';
import { useQuery } from 'react-query';
import { ApiRequest } from 'src/helper';
import Loader from 'src/components/Loader';
import { CASES, TIMELINE } from 'src/constants';

export const LineChartWidget = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const [selectedCases, setSelectedCases] = useState<shared.cases>(
    CASES[0].value
  );
  const [selectedTimeline, setSelectedTimeline] = useState<shared.timeline>(
    TIMELINE[0].value
  );

  const { isLoading, error, data, isFetching } = useQuery(
    ['lineChart', selectedCases, selectedTimeline, selectedCountries],
    () =>
      ApiRequest<api.lineChart.response, api.lineChart.request>(
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
    }
  );

  if (isLoading || data === undefined) return <Loader />;

  return (
    <div>
      <div>
        <LineCharts days={data.dates} data={data.countries} />
        <div
          style={{
            display: 'flex',
          }}
        >
          <ToggleButtons
            buttons={CASES}
            onChange={setSelectedCases}
            value={selectedCases}
          />
          <ToggleButtons
            buttons={TIMELINE}
            onChange={setSelectedTimeline}
            value={selectedTimeline}
          />
        </div>
      </div>
    </div>
  );
};
