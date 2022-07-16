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
import isEqual from 'lodash/isEqual';

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

  componentDidUpdate(prevProps: BarChartsType, prevState: Readonly<{}>) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({
        options: this.getOption(),
      });
    }
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
        top: '10%',
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
        notMerge={true}
      />
    );
  }
}
