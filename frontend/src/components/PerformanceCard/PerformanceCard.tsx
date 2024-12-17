import { memo } from 'react';
import './performanceCard.css';
import PerformanceInfo from './src/PerformanceInfo';
import TrendLabel from './src/VolumeLabel';
import currencyFormatter from '@/utils/currencyFormatter';

type PerformanceCardProps = {
  title: string;
  volume: number;
  change: number;
};

const PerformanceCard = ({ title, volume, change }: PerformanceCardProps) => {
  return (
    <div className="performanceCard">
      <PerformanceInfo label={title} change={change} />
      <TrendLabel change={change} volume={currencyFormatter(volume)} />
    </div>
  );
};
export default memo(PerformanceCard);
