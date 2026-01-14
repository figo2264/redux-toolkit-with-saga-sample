import React, {useRef, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
  TooltipModel,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './VisitorStatistics.module.scss';

// Custom plugin for dashed grid lines
const dashedGridPlugin: Plugin<'bar'> = {
  id: 'dashedGridLines',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const yAxis = chart.scales.y;
    const xAxis = chart.scales.x;

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    yAxis.ticks.forEach((_, index) => {
      const y = yAxis.getPixelForTick(index);
      ctx.beginPath();
      ctx.moveTo(xAxis.left, y);
      ctx.lineTo(xAxis.right, y);
      ctx.stroke();
    });

    ctx.restore();
  },
};

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type DatasetType =
  | 'totalVisitor'
  | 'newVisitor'
  | 'reVisitor'
  | 'pageView'
  | 'downloadCount';

export interface DatasetConfig {
  key: DatasetType;
  label: string;
  color: string;
  data: number[];
}

export interface Period {
  from: string;
  to: string;
}

export interface VisitorStatisticsProps {
  title: string;
  period: Period;
  labels: string[];
  datasets: DatasetConfig[];
  labelDates?: string[];
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  label: string;
  date: string;
  value: number;
  color: string;
}
const VisitorStatistics: React.FC<VisitorStatisticsProps> = ({
  title,
  period,
  labels,
  datasets,
  labelDates
}) => {
  const [activeDataset, setActiveDataset] = useState<DatasetType>(datasets[0]?.key || 'totalVisitor');
  const activeData = datasets.find((d) => d.key === activeDataset);
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    label: '',
    date: '',
    value: 0,
    color: '',
  });

  const hexToRgba = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: activeData?.label || '',
        data: activeData?.data || [],
        backgroundColor: activeData?.color || '#4e84f0',
        hoverBackgroundColor: hexToRgba(activeData?.color || '#4e84f0', 0.8),
        borderRadius: {
          topLeft: 4,
          topRight: 4,
        },
        borderSkipped: false,
      },
    ],
  };
  const externalTooltipHandler = (context: { chart: ChartJS; tooltip: TooltipModel<'bar'> }) => {
    const { tooltip: tooltipModel } = context;

    if (tooltipModel.opacity === 0) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      return;
    }

    const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex;
    const value = tooltipModel.dataPoints?.[0]?.parsed?.y || 0;
    const label = activeData?.label || '';
    const color = activeData?.color || '#4e84f0';

    // Use labelDates if provided, otherwise generate from label
    const date = labelDates?.[dataIndex] || `2024-${String(dataIndex + 1).padStart(2, '0')}`;

    if (chartContainerRef.current) {
      const x = tooltipModel.caretX;
      const y = tooltipModel.caretY;

      setTooltip({
        visible: true,
        x,
        y,
        label,
        date,
        value,
        color,
      });
    }
  };
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
    },
    onHover: (event, elements) => {
      const canvas = event.native?.target as HTMLCanvasElement;
      if (canvas) {
        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    elements: {
      bar: {
        hoverBackgroundColor: hexToRgba(activeData?.color || '#4e84f0', 0.8),
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: "'Inter', 'Noto Sans KR', sans-serif",
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Using custom dashed grid plugin instead
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: "'Inter', sans-serif",
            size: 11,
          },
          callback: (value) => {
            return Number(value).toLocaleString();
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.meta}>
        <p className={styles.period}>
          {period.from} - {period.to}
        </p>
      </div>
      <div className={styles.legend}>
        {datasets.map((dataset) => (
          <button
            key={dataset.key}
            className={activeDataset === dataset.key ? styles.legendButtonActive : styles.legendButton}
            onClick={() => setActiveDataset(dataset.key)}
            style={{
              '--dot-color': dataset.color,
              '--active-bg': dataset.color,
            } as React.CSSProperties}
          >
            <span className={styles.dot} />
            <span className={styles.label}>{dataset.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.chartContainer} ref={chartContainerRef}>
        <Bar ref={chartRef} data={chartData} options={chartOptions} plugins={[dashedGridPlugin]} />
        {tooltip.visible && (
          <div
            className={styles.customTooltip}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              '--tooltip-color': tooltip.color,
            } as React.CSSProperties}
          >
            <p className={styles.tooltipDate}>{tooltip.date}</p>
            <div className={styles.tooltipContent}>
              <span className={styles.tooltipDot} />
              <span className={styles.tooltipLabel}>
                {tooltip.label} : {tooltip.value.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorStatistics;
