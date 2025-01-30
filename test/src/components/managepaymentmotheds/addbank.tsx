import React from 'react'
import { Typography, Button, Flex } from "antd";
import { Link } from 'react-router-dom';


const AddBank = () => {
    const { Text } = Typography;

    return (
        <div >
            <Flex vertical>
                <div
                    style={{
                        margin: "100px auto 24px",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "rgba(43, 49, 62, 0.6)",
                        width: "130px",
                        height: "90px",
                        borderRadius: "6px",
                    }}
                >
                    <img style={{ width: "60px" }} src="./images/newimg/bankicon.svg" alt="bankicon" />
                </div>
                <div className="primary_btn_bg">

                    <Link to="#" className='primary_btn'>Add New Bank</Link>
                </div>
                <Text style={{ color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginTop: "24px", fontSize: "14px", }}>Want to use crypto instead? <Link to="/addcrypto" style={{ color: "rgba(66, 214, 58, 1)", fontSize: "14px", }}>Add Now</Link></Text>

            </Flex>
        </div>
    )
}

export default AddBank;
