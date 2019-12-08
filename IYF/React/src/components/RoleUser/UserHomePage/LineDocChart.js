import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { name: "Pir", Vartotojai: 5, Pateikti_dokumentai: 8 },
  { name: "Antr", Vartotojai: 7, Pateikti_dokumentai: 15 },
  { name: "Treč", Vartotojai: 2, Pateikti_dokumentai: 4 },
  { name: "Ketv", Vartotojai: 10, Pateikti_dokumentai: 18 },
  { name: "Penkt", Vartotojai: 1, Pateikti_dokumentai: 3 },
];

function LineDocChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Vartotojai" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Pateikti_dokumentai" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineDocChart;