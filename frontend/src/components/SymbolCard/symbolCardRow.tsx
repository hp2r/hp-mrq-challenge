import { ReactElement } from 'react';

interface RowProps {
    icon: ReactElement;
    field: string;
}

const SymbolCardRow = (symbolRow:RowProps) => {
    return(
        <div className='symbolCard__row'>{symbolRow.icon}<div>{symbolRow.field}</div></div>
    )
}

export default SymbolCardRow;