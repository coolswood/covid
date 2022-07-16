export const CASES: {
  value: shared.cases;
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

export const TIMELINE: {
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

export const CHART_TOGGLE: {
  value: shared.chartToggle;
  label: string;
}[] = [
  {
    value: 'cases',
    label: 'Reported cases',
  },
  {
    value: 'ranked',
    label: 'Ranked charts',
  },
];
