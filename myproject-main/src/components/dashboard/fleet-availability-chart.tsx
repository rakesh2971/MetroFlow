
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const data = [
  { name: 'Service', value: 18, fill: 'hsl(var(--chart-1))' },
  { name: 'Standby', value: 5, fill: 'hsl(var(--chart-2))' },
  { name: 'IBL/Maint.', value: 2, fill: 'hsl(var(--chart-3))' },
];

const chartConfig = {
  value: {
    label: "Trainsets",
  },
  service: {
    label: "In Service",
    color: "hsl(var(--chart-1))",
  },
  standby: {
    label: "Standby",
    color: "hsl(var(--chart-2))",
  },
  maintenance: {
    label: "IBL/Maint.",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function FleetAvailabilityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Availability</CardTitle>
        <CardDescription>Nightly trainset allocation status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
