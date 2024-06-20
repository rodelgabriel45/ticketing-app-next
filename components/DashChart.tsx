'use client';

import { Status } from '@prisma/client';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface dataElements {
  name: Status;
  total: number;
}

interface dataProps {
  data: dataElements[];
}

const DashChart = ({ data }: dataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={367}>
          <BarChart data={data}>
            <XAxis dataKey='name' stroke='#888888' fontSize={12} />

            <YAxis stroke='#888888' fontSize={12} />
            <Bar dataKey='total' fill='#60A5FA' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashChart;
