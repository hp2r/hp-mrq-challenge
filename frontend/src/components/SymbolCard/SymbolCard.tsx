import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import upIcon from '@/assets/up.png';
import downIcon from '@/assets/down.png';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardRow from './symbolCardRow';
import { act, useEffect, useMemo, useRef, useState } from 'react';
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
    return () => {
      console.log('Component unmounted'); 
    };
  },[]);

  useEffect(() => {
    const classes = ['symbolCard'];

    if(timerId) clearTimeout(timerId);

    if(activeSymbol === id) {
      classes.push('symbolCard__selected');
    } else if(activeSymbol !== id || activeSymbol === null) {
      if(activeSymbol === null) {
        classes.splice(classes.indexOf('symbolCard__unselected'), 1);
        classes.push('symbolCard');
      } else if(activeSymbol.length > 0 && activeSymbol !== id) {
        classes.push('symbolCard__unselected');
      }

      if(currentPrice > 0 && price > currentPrice) {
        classes.push(`symbolCard__green ${addShake}`);
        setTimerId(setTimeout(() => {
          classes.splice(classes.indexOf('symbolCard__green'), 1);
          setCardClassName(classes.join(' '));
        }, 1000));
      } else if(currentPrice > 0 && price < currentPrice) {
        classes.push(`symbolCard__red ${addShake}`);
        setTimerId(setTimeout(() => {
          classes.splice(classes.indexOf('symbolCard__red'), 1);
          setCardClassName(classes.join(' '));
        }, 1000));
      }
    }

    setCardClassName(classes.join(' '));
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
