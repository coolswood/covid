import ReactEchartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { Component } from 'react';

echarts.use([
  VisualMapComponent,
  GridComponent,
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  LegendComponent,
]);

type LineChartType = {
  data: {
    country: string;
    series: number[];
  }[];
  days: string[];
};

export default class LineCharts extends Component<LineChartType> {
  state = {
    options: {},
  };

  componentDidMount() {
    this.setState({
      options: this.getOption(),
    });
  }

  getOption = () => {
    const { data, days } = this.props;

    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: data.map(item => item.country),
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days,
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: 20,
        bottom: 20,
        right: 40,
        left: 40,
      },
      series: data.map(item => ({
        name: item.country,
        data: item.series,
        type: 'line',
        smooth: true,
        symbolSize: 6,
      })),
    };
  };

  render() {
    return (
      <ReactEchartsCore
        echarts={echarts}
        option={this.state.options}
        style={{ height: '200px' }}
        notMerge={true}
      />
    );
  }
}
