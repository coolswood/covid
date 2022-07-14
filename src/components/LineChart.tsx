import ReactEchartsCore from 'echarts-for-react/lib/core';
import {LineChart} from 'echarts/charts';
import {GridComponent, VisualMapComponent} from 'echarts/components';
import * as echarts from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import React, {Component} from 'react';

echarts.use([VisualMapComponent, GridComponent, CanvasRenderer, LineChart]);

type LineChartType = {
    data: number[];
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
        const {data} = this.props;

        return {
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            grid: {
                top: 20,
                bottom: 20,
                right: 0,
                left: 23,
            },
            series: [
                {
                    data: data,
                    type: 'line',
                    smooth: true,
                    symbolSize: 6,
                },
            ],
        };
    };

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.state.options}
                style={{height: '200px'}}
                notMerge={true}
            />
        );
    }
}
