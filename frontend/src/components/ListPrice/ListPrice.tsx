import './listprice.css';
type ListPriceProps = {
  price: string;
};
const ListPrice = ({ price }: ListPriceProps) => {
  return (
    <div className='listPrice'>
      <div>PRICE:</div>
      <div>{price}</div>
    </div>
  );
};

export default ListPrice;
