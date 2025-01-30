import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

interface Account {
    id: number;
    bankName: string;
    accountNumber: string;
    isPrimary: boolean;
    icon: string;
  }
  
  // Define the props type for the BankList component
  interface BankListProps {
    accounts: Account[];
    setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  }
  const BankList: React.FC<BankListProps> = ({ accounts, setAccounts }) => {
    const { Text } = Typography;

  // Handle delete account
  const handleDelete = (id :number) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
  };

  return (
    <div>
      {accounts.map((account) => (
        <div
          key={account.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(37, 43, 53, 1)',
            padding: '12px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                marginRight: '6px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'rgba(43, 49, 62, 0.6)',
                width: '65px',
                height: '50px',
                borderRadius: '6px',
              }}
            >
              <img style={{ width: '30px' }} 
              src={account.icon} alt="bankicon" />
            </div>
            <div>
              <Text style={{ 
                display: 'block', color: '#fff', fontSize: '16px' }}>
                {account.bankName}
              </Text>
              <Text style={{ 
                display: 'block', color: '#fff', fontSize: '12px' }}>
                {account.accountNumber}
              </Text>
              {account.isPrimary && (
                <Text style={{ 
                    display: 'block', 
                    color: 'rgba(119, 204, 0, 1)', fontSize: '12px' }}>
                  Primary Account
                </Text>
              )}
            </div>
          </div>
          <div>
            <Button
              style={{
                height: 'auto',
                padding: '3px 10px',
                borderRadius: '34px',
                fontSize: '11px',
                color: 'rgba(240, 67, 73, 1)',
                backgroundColor: 'rgba(240, 67, 73, 0.2)',
              }}
              onClick={() => handleDelete(account.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Link
        to="#"
        style={{ 
            alignItems: 'center', 
            margin: '10px 0', 
            display: 'flex', 
            textDecoration: 'none' }}
      >
        <div
          style={{
            marginRight: '10px',
            border: '1px dashed rgba(54, 141, 255, 1)',
            height: '50px',
            width: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
          }}
        >
          <img 
          style={{ width: '28px' }} 
          src="./images/newimg/linebankicon.svg" alt="" />
        </div>
        <Text style={{ 
            fontSize: '14px', color: 'rgba(54, 141, 255, 1)' }}>
            Add bank account</Text>
      </Link>
      <Link
        to="#"
        style={{ 
            alignItems: 'center', 
            margin: '10px 0', display: 'flex', 
            textDecoration: 'none' }}
      >
        <div
          style={{
            marginRight: '10px',
            border: '1px dashed rgba(54, 141, 255, 1)',
            height: '50px',
            width: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
          }}
        >
          <img 
          style={{ width: '28px' }} 
          src="./images/newimg/cryptocurrency.svg" alt="" />
        </div>
        <Text style={{ 
            fontSize: '14px', 
            color: 'rgba(54, 141, 255, 1)' 
            }}>
            Add Crypto account</Text>
      </Link>
    </div>
  );
};

export default BankList;
