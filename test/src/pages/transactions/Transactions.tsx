import React from 'react'
import CommanHeading from '../../components/commancomponents/Heading';
import TransactionHistory from '../../components/transactioncomponents/Mytransaction';

const Transactions = () => {
    return (
        <div>
          <div style={{padding:"16px"}}>
          <CommanHeading title="My Transactions" link="/" />
          <TransactionHistory />
          </div>
        </div>
    )
}

export default Transactions;
