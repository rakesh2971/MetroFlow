
'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const data = [
  { name: 'Exposure Achieved', value: 2750, fill: 'hsl(var(--chart-1))' },
  { name: 'Exposure Remaining', value: 1250, fill: 'hsl(var(--chart-2))' },
];

const chartConfig = {
  value: {
    label: 'Hours',
  },
  'Exposure Achieved': {
    label: 'Achieved',
    color: 'hsl(var(--chart-1))',
  },
  'Exposure Remaining': {
    label: 'Remaining',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function BrandingExposureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding Exposure</CardTitle>
        <CardDescription>Contractual ad exposure hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <PieChart accessibilityLayer>
             <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
