import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CommanHeading from '../../components/commancomponents/Heading';
import SubHeading from '../../components/commancomponents/Subheading';

type FieldType = {
    username?: string;
    accountnumber: string;
    confirmaccount: string;
    ifsccode?: string;
};

const AddBankaccount = () => {
    const Text = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FieldType | null>(null);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setFormData(values);
        setIsModalOpen(true); // Open the modal
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ padding: '16px' }}>
            <CommanHeading link="#" title="" />
            <SubHeading title="Enter Bank Details" />
            <Form
            className='confirmbankdetail '
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please Enter Account Holder Name' }]}
                >
                    <Input placeholder="Account Holder Name" />
                </Form.Item>
                <Form.Item<FieldType>
                    name="accountnumber"
                    rules={[
                        { required: true, message: 'Please Enter Account Number ' },
                        { pattern: /^\d+$/, message: 'Only numbers are allowed' },
                    ]}
                >
                    <Input placeholder="Account Number" maxLength={16} />
                </Form.Item>
                <Form.Item<FieldType>
                    name="confirmaccount"
                    dependencies={['accountnumber']}
                    rules={[
                        { required: true, message: 'Please Confirm Account Number ' },
                        { pattern: /^\d+$/, message: 'Only numbers are allowed' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('accountnumber') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Account numbers do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Confirm Account Number" maxLength={16} />
                </Form.Item>
                <Form.Item<FieldType>
                    name="ifsccode"
                    rules={[{ required: true, message: 'Please Enter IFSC Code' }]}
                >
                    <Input placeholder="IFSC Code" />
                </Form.Item>
                <div className="primary_btn_bg">
                    <Button className="primary_btn" htmlType="submit">
                        Proceed
                    </Button>
                </div>
            </Form>

            {/* Ant Design Modal */}
            <Modal
                className='grey_gradint_bg'
                // title="Confirm Bank A/c Details"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                closeIcon={null}
                centered
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '30%',
                    lg: '40%',
                    xl: '30%',
                    xxl: '30%'

                }}
            // footer={[
            //   <Button key="close" onClick={() => setIsModalOpen(false)}>
            //     Edit
            //   </Button>,

            //   <Button
            //     key="confirm"
            //     type="primary"
            //     onClick={() => {
            //       console.log('Payment Confirmed:', formData);
            //       setIsModalOpen(false);
            //     }}
            //   >
            //     Confirm & Pay
            //   </Button>,
            // ]}
            >
                {formData && (
                    <div className='modal_bg'>
                    <div className='modal_bg_inner'>

                        <Text style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            display: "block",
                            color: "#FFF",
                            textAlign: "center",
                            marginBottom: "16px"
                        }}>Confirm Bank A/c Details</Text>
                        <div style={{
                            position: 'relative',
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            padding: "8px 10px ",
                            borderRadius: "6px"
                        }}>

                            <div>
                                <Text style={{ 
                                    fontSize: "14px",
                                    marginBottom:"16px",
                                    display:"block", 
                                    fontWeight: '500', 
                                    color: "rgba(255, 255, 255, 0.65)" }}
                                     >
                                    Bank A/c Number
                                    <span style={{ display: "block", color: "#fff" }}>
                                        {formData.accountnumber}
                                    </span>
                                </Text>
                                {/* <Text style={{ 
                                    fontSize: "14px",
                                    marginBottom:"16px",
                                    display:"block", 
                                    fontWeight: '500', 
                                    color: "rgba(255, 255, 255, 0.65)" }}>
                                    Bank Name: Punjab National Bank
                                </Text> */}
                                <Text style={{ 
                                    fontSize: "14px",
                                    marginBottom:"16px",
                                    display:"block", 
                                    fontWeight: '500', 
                                    color: "rgba(255, 255, 255, 0.65)" }}>
                                    IFSC Code: 
                                    <span style={{ display: "block", color: "#fff" }}>
                                    {formData.ifsccode}
                                    </span>
                                </Text>
                                <Text style={{ 
                                    fontSize: "14px",
                                    marginBottom:"16px",
                                    display:"block", 
                                    fontWeight: '500', 
                                    color: "rgba(255, 255, 255, 0.65)" }}>
                                    Holder Name: 
                                    <span style={{ display: "block", color: "#fff" }}>
                                    {formData.username}</span>
                                </Text>
                            </div>

                            <div className="primary_btn_bg">
                                <Button className="primary_btn" key="confirm"

                                    onClick={() => {
                                        console.log('Payment Confirmed:', formData);
                                        setIsModalOpen(false);
                                    }}>
                                    Confirm & Pay
                                </Button>
                            </div>

                            <Button key="close" style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                border: "none",
                                padding:"0px 6px",
                                color: "#fff",
                                backgroundColor: "rgba(240, 67, 73, 1)",
                                height: "auto"
                            }} onClick={() => setIsModalOpen(false)}>
                                <EditOutlined />Edit
                            </Button>
                        </div>
                    </div>
                    </div>

                )}

            </Modal>
        </div>
    );
};

export default AddBankaccount;
