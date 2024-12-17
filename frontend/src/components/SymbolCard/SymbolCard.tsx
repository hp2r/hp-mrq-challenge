import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { useEffect, useState } from 'react';
import percentageDiff from '@/utils/percentageDiff';
import ListPrice from '@/components/ListPrice';
import ListBanner from '../ListBanner';
import currencyFormatter from '@/utils/currencyFormatter';

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
      <ListBanner id={id} trend={trend} />
      <ListPrice price={currencyFormatter(price)} />
      {showCardInfo &&
        <>
        <ListItem Icon={<CompanyIcon />} label={companyName} spacing='space-between'/> 
        <ListItem Icon={<IndustryLogo />} label={industry} spacing='space-between'/>
        <ListItem Icon={<MarketCapIcon />} label={currencyFormatter(marketCap)} spacing='space-between'/>
        </>
      }
    </div>
  );
};
export default SymbolCard;
