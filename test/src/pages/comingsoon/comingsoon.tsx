import React from 'react'
import { Typography, Button } from "antd";

const Text = Typography;
const comingsoonTitle = "We’re Coming Soon";
const comingsoonContent = " We are working on it to launch as soon as possible.";

const ComingSoon = () => {

    return (
        <div style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(./images/newimg/comingsoonbg.svg)",
            marginLeft: "-16px",
            marginRight: "-16px",
            height: "100vh"
        }}>
            <div style={{
                textAlign: "center",
                position: "relative",
                top: "44%",
                padding: "16px",
                transform: "translateY(70%)"
            }}>
                <Text style={{ fontWeight: "700", fontSize: "28px" }}>{comingsoonTitle}</Text>
                <Text style={{ fontWeight: "500", color: "rgba(255, 255, 255, 0.8)" }}>
                    {comingsoonContent}
                   </Text>
                <div className="primary_btn_bg " style={{ marginTop: "20px", width: "fit-content" }}>
                    <Button className='primary_btn'>Notify Me</Button>

                </div>
            </div>
        </div>)
}

export default ComingSoon;
