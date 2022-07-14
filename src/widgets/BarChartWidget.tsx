import React, { useState } from 'react';
import ToggleButtons from 'src/components/ToggleButtons';
import BarCharts from 'src/components/BarChart';

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

  const data = [
    {
      location: 'Afghanistan',
      total_cases: 183285,
      new_cases: 13,
      total_deaths: 7728,
      new_deaths: 0,
      code: 'AFG',
    },
    {
      location: 'Africa',
      last_updated_date: '2022-07-13',
      total_cases: 12155871,
      new_cases: 3596,
      total_deaths: 255473,
      new_deaths: 27,
      code: 'OWID_AFR',
    },
  ];

  return (
    <div>
      <div>
        <BarCharts />
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
