'use client';
import { calculateTotalSumForEachCategory } from '@/helpers/chartsCalsHelpers';
import { BalanceDay } from '@/types/types';
import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  '#FF5733',
  '#FFC300',
  '#33FF57',
  '#334CFF',
  '#FF33D1',
  '#33FFE7',
  '#8A2BE2',
  '#FF6347',
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#b1afaf'
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

type Props = {
  statistics: BalanceDay[];
};
export default function PieChartComponent({ statistics }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (event: React.MouseEvent<SVGPathElement, MouseEvent>, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const statsWithTotalSums = calculateTotalSumForEachCategory(statistics);

  return (
    <PieChart width={300} height={150}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={statsWithTotalSums}
        cx={150}
        cy={80}
        innerRadius={30}
        outerRadius={50}
        fill='#c586e0' // Default color for inactive slices
        dataKey='value'
        paddingAngle={3}
        onMouseEnter={onPieEnter}
      >
        {statsWithTotalSums.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
