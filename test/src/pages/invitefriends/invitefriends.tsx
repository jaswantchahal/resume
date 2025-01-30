import React from 'react';
import { Button, Flex, Typography } from 'antd';
import "./invitrfriends.scss"

const Text = Typography;

const InviteFriends = () => {
    const inviteimgScr = "./images/newimg/inviteimg.png";
    const rupeeimgScr = "./images/newimg/rupee.svg";
    const stepHeading = "How to Get Cash?";

    const steps = [
        {
            title: "Step 1",
            text: "Share your link with friends",
            image: "./images/newimg/share.svg",
        },
        {
            title: "Step 2",
            text: "Invitee registers, you get <strong>cash rewards</strong>",
            image: "./images/newimg/cashrewards.svg",
        },
        {
            title: "Step 3",
            text: "Get <strong>cash reward</strong> after invitee finishes tasks",
            image: "./images/newimg/finishtask.svg",

        },
    ];

    const inviteTitle = "Invite your friends!";
    const invitesubheading = "Share your code with your friends & get exciting bonus points";
    const refTitle = "You and your colleague will get";
    const refpoints = "1 Referral = Rs 100/-";

    return (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Text style={{ fontSize: "24px", fontWeight: "600", marginBottom: "12px" }}>
                {inviteTitle}
            </Text>
            <Text style={{
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "12px",
                fontSize: "16px",
                fontWeight: "400"
            }}>
                {invitesubheading}
            </Text>
            <img src={inviteimgScr} style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }} alt="inviteimg.png" />

            <Flex style={{
                margin: "0 auto",
                width: "fit-content",
                padding: "4px 10px",
                borderRadius: "6px",
                alignItems: "center",
                gap: "8px",
                background: "var(--yellow-color)",
                position: "relative",
                zIndex: "1",
                marginTop: "-3px",
                justifyContent: "center"
            }}>
                <div>
                    <img src={rupeeimgScr} style={{ width: "100%" }} alt="rupee" />
                </div>
                <div>
                    <Text style={{ fontWeight: "500", fontSize: "12px" }}>{refTitle}</Text>
                    <Text style={{ fontWeight: "700", fontSize: "12px" }}>{refpoints}</Text>
                </div>
            </Flex>

            <div className="grey_gradint_bg" style={{ marginTop: "24px" }}>
                <div className='invitesteps' style={{ backgroundColor: "var(--grey-bg-color)", borderRadius: "12px", padding: "15px 16px" }}>
                    <div
                        style={{
                            padding: "0px 0px 8px 0px",
                            borderBottom: "1px solid transparent",
                            borderImage: "linear-gradient(90deg, rgba(174, 186, 212, 0) 0%, rgba(174, 186, 213, 0.2) 50%, rgba(174, 186, 212, 0) 100%) 1",
                        }}>
                        <Text style={{position:"relative",zIndex:"2", fontSize: "20px", fontWeight: "600" }}>{stepHeading}</Text>
                    </div>

                    <Flex style={{ position:"relative",zIndex:"2",margin: "24px auto 36px", gap: "20px" }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{ position: "relative", flex: "1" }}>
                                {index < steps.length - 1 && (
                                    <div style={{
                                        position: "absolute",
                                        top: "54px",
                                        right: "-27px",
                                        height: "10px",
                                        width: "28px",
                                        backgroundRepeat: "no-repeat",
                                        backgroundImage: "url(./images/newimg/rightarrows.svg)"
                                    }}></div>
                                )}
                                <Text style={{
                                    fontWeight: "500",
                                    display: "block"
                                }}>
                                    {step.title}</Text>
                                <div style={{
                                    margin: "14px auto",
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <img src={step.image} alt="share image" />
                                </div>
                                <Text style={{ fontSize: "10px" }} dangerouslySetInnerHTML={{ __html: step.text }} />
                            </div>
                        ))}
                    </Flex>

                    <div className="primary_btn_bg" style={{position:"relative",zIndex:"2"}}>
                        <Button className="primary_btn ">
                            <img src="./images/newimg/invite.svg" style={{ 
                                width: "25px", marginRight: "8px" }} alt="invite.svg" />
                            Invite Friend
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteFriends;
