import ReactEchartsCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
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
  BarChart,
  TooltipComponent,
  LegendComponent,
]);

type BarChartsType = {
  data: number[];
  countries: string[];
};

export default class BarCharts extends Component<BarChartsType> {
  state = {
    options: {},
  };

  componentDidMount() {
    this.setState({
      options: this.getOption(),
    });
  }

  getOption = () => {
    const { data, countries } = this.props;

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: countries,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '90%',
          data: data,
        },
      ],
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
