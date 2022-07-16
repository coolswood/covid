declare namespace api {
  namespace countries {
    type request = {};
    type response = string[];
  }

  namespace lineChart {
    type request = {
      countries: string[];
      status: shared.cases;
      timeline: shared.timeline;
    };
    type response = {
      countries: { country: string; series: number[] }[];
      dates: string[];
    };
  }

  namespace barChart {
    type request = {
      countries: string[];
      status: shared.cases;
    };
    type response = {
      countries: string[];
      data: number[];
    };
  }
}

declare namespace shared {
  type cases = 'deaths' | 'confirmed';
  type timeline = 'total' | 'new';
  type chartToggle = 'cases' | 'ranked';
}
