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

type LineChartType = {};

export default class BarCharts extends Component<LineChartType> {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
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
