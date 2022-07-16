import React, { useState } from 'react';
import ToggleButtons from 'src/components/ToggleButtons';
import BarCharts from 'src/components/BarChart';
import { useQuery } from 'react-query';
import { ApiRequest } from 'src/helper';
import Loader from 'src/components/Loader';
import { CASES } from 'src/constants';

export const BarChartWidget = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const [selectedCases, setSelectedCases] = useState<shared.cases>(
    CASES[0].value
  );

  const { isLoading, error, data, isFetching } = useQuery(
    ['barChart', selectedCases, selectedCountries],
    () =>
      ApiRequest<api.barChart.response, api.barChart.request>(
        'barChart',
        {
          countries: selectedCountries,
          status: selectedCases,
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
        <BarCharts data={data.data} countries={data.countries} />
        <div>
          <ToggleButtons
            buttons={CASES}
            onChange={setSelectedCases}
            value={selectedCases}
          />
        </div>
      </div>
    </div>
  );
};
