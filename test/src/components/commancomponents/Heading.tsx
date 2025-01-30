import React from "react";
import { Typography } from 'antd';
import { Link } from "react-router-dom";

interface CommanHeadingProps {
    title: string;
    link: string;
}

const CommanHeading: React.FC<CommanHeadingProps> = ({ title, link }) => {

    const { Text} = Typography;

    return (
        <div className="common_top">
            <Link to={link}>
                <img src="./images/newimg/rightarrow.svg" alt="right arrow" />
            </Link>
            <Text style={{ fontSize: "24px", fontWeight: "600", margin: "0 auto", color: "#fff" }}>
                {title}
            </Text>
        </div>
    );
};

export default CommanHeading;
