import React, { useState } from 'react';
import { Typography, Tag, Form, Input, Button } from "antd";
import CommanHeading from '../../components/commancomponents/Heading';

const AddMoney = () => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState<string | number>(''); 

    const Text = Typography;

    const handleTagClick = (value: number) => {
        setInputValue(value); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
    };

    return (
        <div style={{ padding: "16px" }}>
            <CommanHeading title="" link="/" />
            <Text style={{ fontSize: "24px", color: "#fff", fontWeight: "600" }}>
                Enter Amount
            </Text>
            <Text style={{ fontSize: "16px", color: "rgba(255, 255, 255, .6)", fontWeight: "400" }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            </Text>
            <div style={{ margin: "16px 0", display: 'flex', gap: '8px' }}>
                {[100, 200, 500, 1000].map((value) => (
                    <Tag
                        key={value}
                        style={{
                            backgroundColor: "rgba(43, 49, 62, 0.7)",
                            borderRadius: "6px",
                            padding: "8px 16px",
                            border: "none",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "400",
                            cursor: "pointer",
                        }}
                        onClick={() => handleTagClick(value)} 
                    >
                        {value}
                    </Tag>
                ))}
            </div>

            <Form form={form}>
                <Form.Item>
                    <Input
                        placeholder="Enter amount"
                        value={inputValue} // Bind the input value to the state
                        onChange={handleInputChange} // Update state when user types
                    />
                </Form.Item>

                <Form.Item className='primary_btn_bg'> 
                    <Button
                        className="primary_btn"
                        type="primary"
                        onClick={() => console.log("Submitted Value:", inputValue)}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddMoney;
