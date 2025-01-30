import React from "react";
import { Typography } from 'antd';

interface CommanHeadingProps {
    title: string;
    
}

const SubHeading: React.FC<CommanHeadingProps> = ({ title }) => {

    const { Text } = Typography;

    return (
        <div >
            <Text style={{ display:"block",margin:"24px 0", fontSize: "24px", fontWeight: "600",  color: "#fff" }}>
                {title}
            </Text>
        </div>
    );
};

export default SubHeading;
