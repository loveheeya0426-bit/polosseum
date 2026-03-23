'use client';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { STAT_LABELS } from '../lib/constants';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const COLORS = [
  { bg: 'rgba(59, 130, 246, 0.35)', border: 'rgb(59, 130, 246)' },
  { bg: 'rgba(239, 68, 68, 0.35)', border: 'rgb(239, 68, 68)' },
  { bg: 'rgba(16, 185, 129, 0.35)', border: 'rgb(16, 185, 129)' },
];

export default function StatChart({ candidates }) {
  if (!candidates || candidates.length === 0) return null;

  const labels = Object.keys(STAT_LABELS).map(k => STAT_LABELS[k].label);
  const statKeys = Object.keys(STAT_LABELS);

  const data = {
    labels,
    datasets: candidates.map((c, i) => ({
      label: c.name,
      data: statKeys.map(k => c.stats[k]),
      backgroundColor: COLORS[i % COLORS.length].bg,
      borderColor: COLORS[i % COLORS.length].border,
      borderWidth: 2,
      pointBackgroundColor: COLORS[i % COLORS.length].border,
      pointBorderColor: '#fff',
      fill: true,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0,0,0,0.08)' },
        grid: { color: 'rgba(0,0,0,0.08)' },
        pointLabels: {
          color: 'rgba(0,0,0,0.7)',
          font: { size: 13, weight: 'bold' },
        },
        min: 0,
        max: 100,
        ticks: { display: false, stepSize: 20 },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1e293b',
          font: { size: 15, weight: '900' },
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#0f172a',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12, weight: 'bold' },
        padding: 10,
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-slate-50 rounded-2xl p-3 md:p-4">
      <Radar data={data} options={options} />
    </div>
  );
}
