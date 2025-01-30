import React from "react";
import "./topbar.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const TopBar: React.FC = () => {

    return (
        <>
            <Flex gap="middle" className="topbar ">
                <div className="logo_side"><img src="./images/logo.svg" alt="logo" /></div>
                <button>
                    <div className="count">
                        <img src="./images/newimg/mmicon.svg" alt="mmicon" />
                        <span>900</span>
                    </div>
                    <span className="plus"><PlusOutlined  style={{fontSize:"10px"}}/></span>
                </button>
            </Flex>

        </>
    );
};

export default TopBar;