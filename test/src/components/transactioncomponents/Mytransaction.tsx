import React, { useState } from "react";
import { Card, List, Typography, Tag, Dropdown, Menu, Button, MenuProps } from "antd";
import ContestsButtons from "./TransactionBtn";
import TransactionList from "./TransactionList";
import SelectDate from "./selectdate";


const TransactionHistory: React.FC = () => {
  const { Text } = Typography;
  const [showSelectDate, setShowSelectDate] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    // Show SelectDate only if "Custom" is selected
    setShowSelectDate(info.key === '3');
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Assending',

    },
    {
      key: '2',
      label: 'Desending',

    },
    {
        key: '3',
        label: 'Custom',

    },

  ];

  return (
    <div >
      <ContestsButtons />
      {showSelectDate && <SelectDate />}

      <div style={{ color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: "16px", color: "#fff" }}> Recent Transactions</Text>
        <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]} placement="bottomRight">
          <img
            src="./images/newimg/filter.svg"
            alt="filter"
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </div>
      <TransactionList />

    </div>
  );
};

export default TransactionHistory;
