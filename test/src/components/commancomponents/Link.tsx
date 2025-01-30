import React from 'react'
import { Typography } from 'antd';

const LinkComponent = () => {

    const { Text, Link } = Typography;

    return (
        <div style={{ marginTop: "24px" }}>
            <Link style={{ color: "#fff", display: "block", marginBottom: "15px" }} href='#' >
                <div className="grey_gradint_bg" >
                    <div style={{ background: "var(--darkgrey2-bg-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px" }}>
                        <div className="link_left">
                            <img src="./images/newimg/addmoney.svg" alt="addmoney" />
                            <Text style={{ fontSize: "16px", color: "#fff", marginLeft: "12px" }}>Add Money</Text>
                        </div>
                        <div className="link_right">
                            <img src="./images/newimg/linearrow.svg" alt="linearrow.svg" />

                        </div>
                    </div>
                </div>
            </Link>
            <Link style={{ color: "#fff", display: "block", marginBottom: "15px" }} href='#' >
                <div className="grey_gradint_bg" >
                    <div style={{ background: "var(--darkgrey2-bg-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px" }}>
                        <div className="link_left">
                            <img src="./images/newimg/withdraw.svg" alt="addmoney" />
                            <Text style={{ fontSize: "16px", color: "#fff", marginLeft: "12px" }}>Withdraw Money</Text>
                        </div>
                        <div className="link_right">
                            <img src="./images/newimg/linearrow.svg" alt="linearrow.svg" />

                        </div>
                    </div>
                </div>
            </Link>
            <Link style={{ color: "#fff", display: "block", marginBottom: "15px" }} href='/managepaymentmethod' >
                <div className="grey_gradint_bg" >
                    <div style={{ background: "var(--darkgrey2-bg-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px" }}>
                        <div className="link_left">
                            <img src="./images/newimg/bankicon.svg" alt="addmoney" />
                            <Text style={{ fontSize: "16px", color: "#fff", marginLeft: "12px" }}>Manage Account</Text>
                        </div>
                        <div className="link_right">
                            <img src="./images/newimg/linearrow.svg" alt="linearrow.svg" />

                        </div>
                    </div>
                </div>
            </Link>
            <Link style={{ color: "#fff", display: "block" }} href='#' >
                <div className="grey_gradint_bg">
                    <div style={{ background: "var(--darkgrey2-bg-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px" }}>
                        <div className="link_left">
                            <img src="./images/newimg/transactions.svg" alt="addmoney" />
                            <Text style={{ fontSize: "16px", color: "#fff", marginLeft: "12px" }}>My Transactions</Text>
                        </div>
                        <div className="link_right">
                            <img src="./images/newimg/linearrow.svg" alt="linearrow.svg" />

                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default LinkComponent;
