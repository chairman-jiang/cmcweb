import * as echarts from 'echarts/core';

import { PieChart, PieSeriesOption, BarChart, BarSeriesOption, LineChart, LineSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption,
  TitleComponent, TitleComponentOption,
  LegendComponent, LegendComponentOption,
  GridComponent, GridComponentOption,
  TransformComponent
} from 'echarts/components';

echarts.use([PieChart, BarChart, LineChart, TooltipComponent, TitleComponent, LegendComponent, GridComponent, TransformComponent]);

export type EcOption = echarts.ComposeOption<
| PieSeriesOption
| BarSeriesOption
| LineSeriesOption
| TooltipComponentOption
| TitleComponentOption
| LegendComponentOption
| GridComponentOption>;
