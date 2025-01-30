import React, { useState } from 'react';
import BankList from '../../components/managepaymentmotheds/banklist';
import AddBank from '../../components/managepaymentmotheds/addbank';
import CommanHeading from '../../components/commancomponents/Heading';
import SubHeading from '../../components/commancomponents/Subheading';

// interface Account {
//     id: number;
//     bankName: string;
//     accountNumber: string;
//     isPrimary: boolean;
//     icon: string;
//   }
  
const ManageAccount = () => {
    // const [accounts, setAccounts] = useState<Account[]>([]);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: 'PNB Bank',
      accountNumber: '*** 8456',
      isPrimary: true,
      icon: './images/newimg/bankicon.svg',
    },
    {
      id: 2,
      bankName: 'HDFC Bank',
      accountNumber: '*** 1234',
      isPrimary: false,
      icon: './images/newimg/bankicon.svg',
    },
  ]);

  return (
    <div style={{ padding: '16px' }}>
      <CommanHeading title="" link="/wallet" />
      <SubHeading title="Payment methods" />
      {accounts.length > 0 ? (
        <BankList accounts={accounts} setAccounts={setAccounts} />
      ) : (
        <AddBank />
      )}
    </div>
  );
};

export default ManageAccount;
