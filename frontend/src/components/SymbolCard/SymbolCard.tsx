import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import upIcon from '@/assets/up.png';
import downIcon from '@/assets/down.png';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardRow from './symbolCardRow';
import { useEffect, useMemo, useState } from 'react';
import percentageDiff from '@/utils/percentageDiff';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const { activeSymbol, showCardInfo } = useAppSelector((state) => state.store);

  const [cardClassName, setCardClassName] = useState('symbolCard'); 
  const [currentPrice, setCurrentPrice] = useState(0);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();
  const addShake:string = (percentageDiff(price, currentPrice)) > 25 ? 'symbolCard__shake' : '';
  
  const handleOnClick = () => {
    onClick(id);
  };

  useEffect(() => {
    if(activeSymbol === id) {
      setCardClassName('symbolCard symbolCard__scale');
      if(timerId) clearTimeout(timerId);
    } else {
      setCardClassName('symbolCard symbolCard__descale');
      if(price > currentPrice) {
        setCardClassName(`symbolCard symbolCard__green ${addShake}`)
      } else {
        setCardClassName(`symbolCard symbolCard__red ${addShake}`)
      }
      setTimerId(setTimeout(() => {
          setCardClassName('symbolCard');
      }, 2000))
    }
    setCurrentPrice(price);
  },[activeSymbol, price]);

  return (
    <div key={id} id={id} onClick={handleOnClick} className={cardClassName}>
      <div className='symbolCard__banner'>
        <div className='symbolCard__banner_id'>{id}</div>
        {trend && <div className='symbolCard__banner_trend' data-testid={`${id}-trend-${trend}`}><img src={trend === 'UP' ? upIcon : downIcon} /></div>}
      </div>
      <div className='symbolCard__price'>
        <div>PRICE:</div>
        <div>{price ? '$'+Math.round(price) : '--'}</div>
      </div>
      {showCardInfo &&
        <>
        <SymbolCardRow icon={<CompanyIcon />} field={companyName} /> 
        <SymbolCardRow icon={<IndustryLogo />} field={industry} /> 
        <SymbolCardRow icon={<MarketCapIcon />} field={"$"+Math.abs(Number(marketCap)) / 1.0e+9 + "B"} /> 
        </>
      }
    </div>
  );
};
export default SymbolCard;
