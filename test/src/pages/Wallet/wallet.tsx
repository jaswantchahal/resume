import React from "react";
import "./wallet.scss"
import { Typography } from 'antd';
import CommanHeading from "../../components/commancomponents/Heading";
import TotalBalance from "../../components/commancomponents/Totalbalance";
import LinkComponent from "../../components/commancomponents/Link";

const Wallet: React.FC = () => {

    const { Text} = Typography;

    return (
        <>
            <div className="wallet_sec">
                <CommanHeading title="Wallet" link="/" />

                <div className="coin_value">
                    <Text style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#fff" }}>Value of 1 coin is equal to 1 rupee</Text>
                    <Text style={{ marginBottom: "0px", fontWeight: "600", color: "#fff" }} className="mb-0">1 Coin = 1 Rupee</Text>
                </div>
                <TotalBalance title="Total Balance" imgPath="./images/newimg/mmcoin.svg" balance="3,750.00" />
                <LinkComponent />
            </div>
        </>
    )
}
export default Wallet;