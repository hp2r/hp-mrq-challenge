import './listbanner.css';
import upIcon from '@/assets/up.png';
import downIcon from '@/assets/down.png';
import { memo } from 'react';

type ListBannerProps = {
  id: string;
  trend?: 'UP' | 'DOWN' | null;
};
const ListBanner = ({ id, trend }: ListBannerProps) => {
  return (
  <div className='listBanner'>
    <div className='listBanner__id'>{id}</div>
    {trend && <div className='listBanner__trend' data-testid={`${id}-trend-${trend}`}><img src={trend === 'UP' ? upIcon : downIcon} /></div>}
  </div>
  );
};

export default memo(ListBanner);
