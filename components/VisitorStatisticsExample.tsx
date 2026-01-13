import React from 'react';
import VisitorStatistics, { DatasetConfig, Period } from './VisitorStatistics';

const VisitorStatisticsExample: React.FC = () => {
  const title = '방문자 통계';

  const period: Period = {
    from: '2024년 1월',
    to: '2024년 12월',
  };

  const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const datasets: DatasetConfig[] = [
    {
      key: 'totalVisitor',
      label: '총 방문자 수',
      color: '#4e84f0',
      data: [4100, 4800, 4400, 5600, 5300, 6600, 6300, 6900, 6200, 6500, 7500, 7200],
    },
    {
      key: 'newVisitor',
      label: '신규 방문자 수',
      color: '#ba89eb',
      data: [2100, 2400, 2200, 2800, 2700, 3300, 3200, 3500, 3100, 3300, 3800, 3600],
    },
    {
      key: 'reVisitor',
      label: '재방문자 수',
      color: '#0bbd32',
      data: [2000, 2400, 2200, 2800, 2600, 3300, 3100, 3400, 3100, 3200, 3700, 3600],
    },
    {
      key: 'pageView',
      label: '페이지뷰 수',
      color: '#2caee6',
      data: [8200, 9600, 8800, 11200, 10600, 13200, 12600, 13800, 12400, 13000, 15000, 14400],
    },
    {
      key: 'downloadCount',
      label: '다운로드 수',
      color: '#ff5d5d',
      data: [820, 960, 880, 1120, 1060, 1320, 1260, 1380, 1240, 1300, 1500, 1440],
    },
  ];
  const labelDates = [
    '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
    '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1024px' }}>
      <VisitorStatistics
        title={title}
        period={period}
        labels={labels}
        labelDates={labelDates}
        datasets={datasets}
      />
    </div>
  );
};

export default VisitorStatisticsExample;
