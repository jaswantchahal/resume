import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message, Typography } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import axiosService from "../../utils/axiosService";
import { AxiosResponse } from "axios";

interface ExtendedAxiosResponse extends AxiosResponse {
  id: string;
  token: string; // Add token at the root level
}

const { Text, Title } = Typography;

const KycVerifyComponent: React.FC = () => {
  const [aadhaarField, setaadhaarField] = useState<boolean>(true);
  const [otpField, setOtpField] = useState<boolean>(false);
  const [showSuccessFullMsg, setShowSuccessFullMsg] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // 4 input fields
  const [timer, setTimer] = useState<number>(59); // Timer for 60 seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false); // To track if the timer is active
  const navigate = useNavigate();
  const [aadHaarNumber, setAadHaarNumber] = useState<string>("");
  const [aadHaarData, setAadHaarData] = useState<any>("");

  const onFinish = async (values: any) => {
    setAadHaarNumber(values.adhaar_number);

    const payload = {
      adhaar_number: values.adhaar_number,
    };

    try {
      const response: ExtendedAxiosResponse = await axiosService.post(
        "/user/adhaar_verification",
        payload
      );
      message.success("OTP Sent!");
      setAadHaarData(response.data);
      console.log("aadhaarData", aadHaarData);
      setaadhaarField(false);
      setOtpField(true);
      setIsTimerActive(true);
      setTimer(60);
    } catch (err) {
      message.error("Failed to send OTP!");
    }
  };

  const resendOtp = async () => {
    const payload = {
      adhaar_number: aadHaarNumber,
    };

    try {
      const response: ExtendedAxiosResponse = await axiosService.post(
        "/user/adhaar_verification",
        payload
      );
      setAadHaarData(response.data);
      message.success("OTP resent successfully!");
    } catch (err) {
      message.error("Failed to resend OTP. Please try again!");
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    const payload = {
      adhaar_number: aadHaarNumber,
      ref_id: aadHaarData.ref_id,
      otp: otpString,
    };
    try {
      const response: ExtendedAxiosResponse = await axiosService.post(
        "/user/verify_adhaar_otp",
        payload
      );
      setOtpField(false);
      setShowSuccessFullMsg(true);
    } catch (err) {
      message.error("Please enter a valid OTP!");
    }
  };

  const handleComplete = () => {
    navigate("/home");
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleBackClick = () => {
    console.log("click");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer
    }
    return () => clearInterval(interval); // Clear the interval on unmount
  }, [isTimerActive, timer]);

  return (
    <>
      {!showSuccessFullMsg && (
        <div className="backBtn">
          <button
            style={{
              background: "none",
              border: "none",
              height: "46px",
              cursor: "pointer",
            }}
            type="button"
            onClick={handleBackClick}
          >
            <img src="images/ic_back.png" alt="Back" />
          </button>
        </div>
      )}
      {aadhaarField && (
        <div className="otp-screen">
          <h3 style={{ fontWeight: 600, margin: "0 0 6px" }}>
            Enter your Aadhaar number
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
            We will send an OTP Verification to you.
          </p>
          <Form
            name="otp-form"
            onFinish={onFinish}
            layout="vertical"
            style={{ paddingTop: 30 }}
          >
            <Form.Item
              name="adhaar_number"
              rules={[
                {
                  required: true,
                  message: "Please input your Aadhaar Number!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                className="mobile_field"
                placeholder="Enter adhaar number"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {otpField && (
        <div className="otp-confirmation">
          <h3>Enter OTP</h3>
          <Text style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: 16 }}>
            OTP has been sent on mobile number, Please enter OTP to verify
            Adhaar number.
          </Text>
          <Form
            name="otp-form-field"
            layout="vertical"
            style={{ paddingTop: 30 }}
          >
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`} // Assign an id for focusing
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1} // Only allow one digit
                    style={{ width: "75px", textAlign: "center" }}
                  />
                ))}
              </div>
            </Form.Item>
            <div
              style={{
                textAlign: "center",
                padding: "0 0 20px",
                cursor: "pointer",
              }}
            >
              <span
                className="timer"
                style={{ display: "block", padding: "20px 0" }}
              >{`00:${String(timer).padStart(2, "0")}`}</span>
              <Button
                onClick={() => {
                  if (!isTimerActive) {
                    resendOtp();
                    setTimer(59);
                    setIsTimerActive(true);
                  }
                }}
                disabled={isTimerActive}
                style={{
                  background: "none",
                  color: isTimerActive ? "rgba(255,255,255,0.5)" : "#42D63A",
                  border: 0,
                  height: "auto",
                  textDecoration: "underline",
                }}
              >
                Resend OTP
              </Button>
            </div>
            <Form.Item>
              <Button
                type="primary"
                onClick={verifyOtp}
                style={{ width: "100%" }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {showSuccessFullMsg && (
        <div className="account_successs">
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <img src="./images/check_welcome.svg" alt="" />
            <Title style={{ color: "#fff", paddingTop: "24px" }} level={2}>
              Thank You!
            </Title>
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "16px",
                paddingBottom: 40,
                display: "block",
              }}
            >
              Your eKYC Verification Process
              <br /> Successfully Completed
            </Text>
            <div className="primary_btn_bg">
              <Button
                className="primary_btn kyc_start_btn"
                onClick={handleComplete}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KycVerifyComponent;
