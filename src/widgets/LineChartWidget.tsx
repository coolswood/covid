import React, { useState } from 'react';
import LineCharts from 'src/components/LineChart';
import ToggleButtons from 'src/components/ToggleButtons';

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

export const LineChartWidget = () => {
  const [selectedCases, setSelectedCases] = useState(cases[0].value);
  const [selectedTimeline, setSelectedTimeline] = useState(timeline[0].value);

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
        <LineCharts data={[1, 2, 3, 4, 5]} />
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
