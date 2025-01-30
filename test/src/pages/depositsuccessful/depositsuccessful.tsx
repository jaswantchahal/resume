import React from 'react'
import { Typography, Tag, Button, Flex } from "antd";
import { Link } from 'react-router-dom';



const DepositSuccessful = () => {
    const Text = Typography;
    
    type Transaction = {
        _id: string;
        userId: string;
        transactionId: number;
        amount: string;
        balance: string;
        eventName: string;
        paymentMethod: string;
        type: string;
        status: string;
        createdAt: string;
        crypto_currency: string;
        crypto_amount: string;
        reqId: number;
        roundId: number;
    };

    const transactions = [
        {
            _id: "6773de71afbbee6330b7868b",
            userId: "67596d85b77f2bb09d767e39",
            transactionId: 189008,
            amount: "450.00",
            balance: "1291.00",
            eventName: "Aviator",
            paymentMethod: "crypto_payment",
            type: "credit",
            status: "success",
            createdAt: "2024-12-15T12:07:13.836Z",
            crypto_currency: "BTC",
            crypto_amount: "0.00005806",
            reqId: 1,
            roundId: 1,
        }]
    console.log("-----", transactions[0].userId);
    return (
        <div style={{
            padding: "16px",
            backgroundImage: `url("./images/newimg/depobg.svg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',

        }}>

            <img src="./images/newimg/greencheck.svg" alt="greencheck.svg" style={{ display: "block", margin: "40px auto 0px ", width: "80px" }} />
            <Text style={{ textAlign: "center", fontSize: "18px", color: "#fff" }}>Deposit Successful</Text>
            <Text style={{ textAlign: "center", fontSize: "34px", color: "#fff", fontWeight: "600" }}>{transactions[0]?.amount}</Text>
            <Text style={{ textAlign: "center", fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", fontWeight: "500" }}>

                {new Date(transactions[0]?.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}


            </Text>
            <div style={{ padding: "10px 15px", margin: "16px auto 30px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                <Flex style={{ justifyContent: "space-between", padding: "12px 0px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", alignItems: "center" }}>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>Amount</Text>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 1)" }}>{transactions[0]?.amount}</Text>
                </Flex>
                <Flex style={{ justifyContent: "space-between", padding: "12px 0px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", alignItems: "center" }}>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>Balance</Text>
                    <Text style={{ fontSize: "14px", color: "rgba(119, 204, 0, 1)" }}>{transactions[0]?.balance}</Text>
                </Flex>
                <Flex style={{ justifyContent: "space-between", padding: "12px 0px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", alignItems: "center" }}>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>Beneficiary</Text>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 1)" }}>Beneficiary Name</Text>
                </Flex>
                <Flex style={{ justifyContent: "space-between", padding: "12px 0px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", alignItems: "center" }}>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>Transaction ID</Text>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 1)" }}>{transactions[0]?.transactionId}</Text>
                </Flex>
                <Flex style={{ justifyContent: "space-between", padding: "12px 0px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", alignItems: "center" }}>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>Status</Text>
                    <Text style={{ fontSize: "14px", color: "rgba(255, 255, 255, 1)" }}>{transactions[0]?.status}</Text>
                </Flex>
            </div>


            <div className="primary_btn_bg">

                <Button className="primary_btn"> Share Receipt</Button>
            </div>
            <div style={{ textDecoration: "none", margin: "30px auto", textAlign: "center", }}>

                <Link to="/" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: "500", }}>Back to Home</Link>
            </div>
        </div>
    )
}

export default DepositSuccessful;
