import React from 'react'
import { Typography, Tag, Modal, Flex } from "antd";
import CommanHeading from '../../components/commancomponents/Heading';

const WithdrawlDetails = () => {

    const Text = Typography

    return (
        <div style={{ padding: "16px" }}>
            <CommanHeading title="Withdrawl Details" link="/" />

            <div className="grey_gradint_bg" style={{marginTop:"24px",marginBottom:"24px"}}>
                <div style={{ padding:"32px 0",backgroundColor: "var(--grey-bg-color)", borderRadius: "12px", textAlign: "center" }}>
                    <Text style={{color:"#fff",fontSize:"14px"}}>Successfull  27 Aug 2024, 7:21 PM</Text>
                    <Flex style={{justifyContent:"center"}}>
                        <img src="./images/newimg/greencheck.svg" alt=" greencheck" style={{marginRight:"12px"}} />
                        <Text style={{fontSize:"32px",fontWeight:"600",color:"#fff"}}>₹ 900.00</Text>
                    </Flex>
                </div>
            </div>
            <div className="grey_gradint_bg">

                <Flex  style={{gap:"20px", justifyContent:"space-around",alignItems:"center", background:"var(--darkgrey2-bg-color)",borderRadius:"12px",padding:"15px"}}>
                    <div>

                    <Text style={{color:"rgba(255, 255, 255, 0.6)"}}>To</Text>
                    <Text  style={{color:"rgba(255, 255, 255, 1)",fontSize:"20px"}}>Akhilesh Kumar Kushwala</Text>
                    <Text  style={{color:"rgba(255, 255, 255, 0.6)" ,fontSize:"14px"}}>XXXX XXXX XXXX 8745</Text>
                    </div>
                    <div>
                         <Flex style={{justifyContent:"center", backgroundColor:"rgba(255, 255, 255, 0.2)",borderRadius:"50%",height:"60px",width:"60px"}}>
                            <img style={{width:"30px"}} src="./images/newimg/withdrawhite.svg" alt="withdrawhite.svg" />
                         </Flex>
                    </div>
                </Flex>
            </div>
        </div>
    )
}

export default WithdrawlDetails;
