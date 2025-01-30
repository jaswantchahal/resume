import React from 'react';
import CommanHeading from '../../components/commancomponents/Heading';
import { Collapse, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './helpandsupport.scss';

interface FAQItem {
  key: string;
  label: string;
  content: string;
}

const HelpandSupport: React.FC = () => {
     const emailAdress = "moneymash@support.com";
     const emailText = "Write us at";
    const faqHeading = "Frequently Asked Questions";
  // Static FAQ data
  const faqData: FAQItem[] = [
    {
      key: '1',
      label: 'How to add money to the wallet?',
      content: 'You can add money using your debit card, credit card, or net banking.',
    },
    {
      key: '2',
      label: 'How to withdraw my money?',
      content: 'Withdrawals can be made to your linked bank account within 24 hours.',
    },
    {
      key: '3',
      label: 'What is the maximum wallet limit?',
      content: 'The maximum wallet limit depends on your KYC status.',
    },
  ];

  return (
    <div style={{ padding: '16px 0' }}>
      <CommanHeading title="Help & Support" link="" />

      {/* Contact Section */}
      <Flex
        style={{
          gap: '20px',
          padding: '19px 20px',
          borderRadius: '12px',
          margin: '32px auto 24px',
          backgroundImage:
            'linear-gradient(83.35deg, #796EC1 21.15%, rgba(198, 189, 252, 0.9) 48.81%, rgba(198, 189, 252, 0.9) 55.64%, #796EC1 97.13%)',
        }}
      >
        <div>
          <img
            src="./images/newimg/mail.svg"
            style={{ width: '100%' }}
            alt="mail.svg"
          />
        </div>
        <div>
          <Typography.Text style={{ color: '#fff' ,display:"block"}}>{emailText}</Typography.Text>
          <Link
            style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}
            to="mailto:moneymash@support.com"
          >
           {emailAdress} 
          </Link>
        </div>
      </Flex>

      
      <div>
        <Typography.Text
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#fff',
            display:"block",
            marginBottom: '16px',
          }}
        >
          {faqHeading}
        </Typography.Text>
        <Collapse
          className="custom-collapse"
          items={faqData.map((item) => ({
            key: item.key,
            label: item.label,
            children: <p style={{ paddingInlineStart: 24 }}>{item.content}</p>,
          }))}
          bordered={false}
          defaultActiveKey={['1']}
        />
      </div>
    </div>
  );
};

export default HelpandSupport;
