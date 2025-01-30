import React, { useState } from "react";
import { Button } from "antd";

const ContestsButtons: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number>(0);

    const buttonTexts = ["Contests", "Deposit", "Withdraw"];

    const handleButtonClick = (index: number) => {
        setActiveButton(index);
    };

    return (
        <div
            className="top_btn"
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 8px",
                margin: "24px 0",
            }}
        >
            {buttonTexts.map((text, index) => (
                <Button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    style={{
                        padding: "10px 18px",
                        backgroundColor:
                            activeButton === index
                                ? "rgba(13, 181, 97, 1)"
                                : "rgba(13, 181, 97, 0.2)",
                        color: "#fff",
                        borderColor:
                            activeButton === index
                                ? "transparent"
                                : "rgba(13, 181, 97, 0.8)",
                        height: "auto",
                    }}
                >
                    {text}
                </Button>
            ))}
        </div>
    );
};

export default ContestsButtons;
