import React, { useState } from "react";
import { Typography, Tag, Modal, Flex } from "antd";

const TransactionList = () => {
    const { Text } = Typography;
    const [transactionModal, setTransactionModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

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

    const transactions: Transaction[] = [
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
        },
        {
            _id: "6773de71afbbee6330br868b",
            userId: "67596d85b77f2bb09d7367e39",
            transactionId: 1890038,
            amount: "450245.00",
            balance: "129146.00",
            eventName: "Aviatorrrr",
            paymentMethod: "crypto_payment",
            type: "debit",
            status: "success",
            createdAt: "2025-01-24T12:07:13.836Z",
            crypto_currency: "BTC",
            crypto_amount: "0.00005806",
            reqId: 8,
            roundId: 1,
        },
    ];

    const getFormattedDate = (date: string) => {
        const today = new Date();
        const createdAt = new Date(date);
        const diffTime = today.getTime() - createdAt.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        return createdAt.toLocaleDateString("en-GB");
    };

    const groupedTransactions = transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
        const dateKey = getFormattedDate(transaction.createdAt);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);
        return acc;
    }, {});

    const handleTransactionClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setTransactionModal(true);
    };

    return (
        <>
            <div>
                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                    <div key={date}>
                        {transactions.map((transaction) => (
                            <div
                                className="grey_gradint_bg"
                                style={{
                                    position: "relative",
                                    marginBottom: "12px",
                                    marginTop: "18px",
                                }}
                                key={transaction._id}
                                onClick={() => handleTransactionClick(transaction)}
                            >
                                <Tag
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        border: "none",
                                        fontSize: "11px",
                                        borderRadius: "0px 3px 0px 3px",
                                        margin: "0px",
                                        backgroundColor:
                                            transaction.type === "credit"
                                                ? "rgba(5, 193, 107, 1)"
                                                : "rgba(240, 67, 73, 1)",
                                        color: "#fff",
                                    }}
                                >
                                    {transaction.type === "credit" ? "Credit" : "Debit"}
                                </Tag>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        background: "var(--darkgrey2-bg-color)",
                                        padding: "20px 12px 12px 12px",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <div>
                                        <Text style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>
                                            {transaction.eventName}
                                        </Text>
                                        <div>
                                            <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px" }}>
                                                {new Date(transaction.createdAt).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </Text>
                                        </div>
                                    </div>
                                    <div style={{ color: "#ddd", marginTop: "8px" }}>
                                        <div>
                                            <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px" }}>
                                                Amount:{" "}
                                                <span
                                                    style={{
                                                        color: "rgba(119, 204, 0, 1)",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    ₹{transaction.amount}
                                                </span>
                                            </Text>
                                        </div>
                                        <div>
                                            <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px" }}>
                                                Balance:{" "}
                                                <span
                                                    style={{
                                                        color: "rgba(119, 204, 0, 1)",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    ₹{transaction.balance}
                                                </span>
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Modal
                className="grey_gradint_bg transactionModal"
                centered
                open={transactionModal}
                onOk={() => setTransactionModal(false)}
                onCancel={() => setTransactionModal(false)}
                footer={null}
                closeIcon={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '40%',
                    lg: '40%',
                    xl: '30%',
                    xxl: '30%'

                }}

            >
                {selectedTransaction && (
                    <div className="modal_bg " >
                        <div className='modal_bg_inner'>
                            <div style={{ position: "relative" }}>
                                <Text style={{ display: "block", fontSize: "22px", fontWeight: "600", textAlign: "center", color: "#fff", textTransform: "capitalize" }}>Transaction Details</Text>
                                <Tag
                                    style={{
                                        position: "absolute",
                                        top: "-24px",
                                        right: "0",
                                        padding: "0 10px",
                                        width: "fit-content",
                                        left: "0",
                                        margin: "0 auto",
                                        border: "none",
                                        fontSize: "11px",
                                        borderRadius: "0 0 3px 3px",
                                        backgroundColor:
                                            selectedTransaction.type === "credit"
                                                ? "rgba(5, 193, 107, 1)"
                                                : "rgba(240, 67, 73, 1)",
                                        color: "#fff",
                                    }}
                                >
                                    {selectedTransaction.type === "credit" ? "Credit" : "Debit"}
                                </Tag>
                                <Flex style={{ justifyContent: "space-between" }}>
                                    <div style={{ padding: "8px", marginBottom: "8px" }}>
                                        <span style={{ display: "block", color: "rgba(255, 255, 255, 0.65)", fontSize: "14px", fontWeight: "500" }}>Amount :</span>
                                        <Text style={{ display: "block", color: "rgba(119, 204, 0, 1)", fontSize: "14px", fontWeight: "500" }}>
                                            ₹{selectedTransaction.amount}
                                        </Text>

                                    </div>
                                    <div style={{ padding: "8px", marginBottom: "8px" }}>
                                        <span style={{ display: "block", color: "rgba(255, 255, 255, 0.65)", fontSize: "14px", fontWeight: "500" }}>Balance :</span>

                                        <Text style={{ display: "block", color: "rgba(119, 204, 0, 1)", fontSize: "14px", fontWeight: "500" }}>
                                            ₹{(selectedTransaction.balance)}
                                        </Text>
                                    </div>
                                </Flex>

                                <div className="detail_box">
                                    <span style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                                        Game Name
                                    </span>
                                    <Text style={{ display: "block", color: "#fff", fontSize: "14px", fontWeight: "500" }}>
                                        {(selectedTransaction.eventName)}
                                    </Text></div>

                                <div className="detail_box">
                                    <span style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                                        Transaction ID
                                    </span>
                                    <Text style={{ display: "block", color: "#fff", fontSize: "14px", fontWeight: "500" }}> {selectedTransaction.transactionId}</Text>

                                </div>
                                <div className="detail_box">
                                    <span style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                                        Request ID
                                    </span>
                                    <Text style={{ display: "block", color: "#fff", fontSize: "14px", fontWeight: "500" }}>{selectedTransaction.reqId}</Text>
                                </div>
                                <div className="detail_box">
                                    <span style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                                        Round ID
                                    </span>
                                    <Text style={{ display: "block", color: "#fff", fontSize: "14px", fontWeight: "500" }} >{selectedTransaction.roundId}</Text>
                                </div>
                                <div className="detail_box">
                                    <span style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                                        Date/Time
                                    </span >
                                    <Text style={{ display: "block", color: "#fff", fontSize: "14px", fontWeight: "500" }}>
                                        {new Date(selectedTransaction.createdAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </Text>
                                </div>




                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default TransactionList;
