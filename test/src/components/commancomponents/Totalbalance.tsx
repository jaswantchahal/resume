import React from "react";
import "./balance.scss";
import { Typography } from 'antd';

interface TotalBalanceProps {
  title: string;
  imgPath: string;
  balance: string;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ title, imgPath, balance }) => {

  const { Text } = Typography;

  return (
    <div className="grey_gradint_bg">
      <div className="total_balance text-center">
        <Text style={{ display: "block", fontWeight: "500", color: "#fff", textTransform: "capitalize" }}>
          {title}
        </Text>
        <div className="balance">
          <img src={imgPath} alt="coin" />
          <Text style={{ fontSize: "32px", marginLeft: "8px", fontWeight: "600", color: "#fff" }}>
            {balance}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
