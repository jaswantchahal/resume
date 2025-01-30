import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Select, Button, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import axiosService from "../../utils/axiosService";
import { AxiosResponse } from "axios";

interface Country {
  code: string;
  label: string;
  flag: string;
}

interface ExtendedAxiosResponse extends AxiosResponse {
  id: string;
  token: string; // Add token at the root level
}

const LoginComponent: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [otpField, setOtpField] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(4).fill("")); // 4 input fields
  const [timer, setTimer] = useState<number>(59); // Timer for 60 seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false); // To track if the timer is active
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async (): Promise<Country[]> => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData: Country[] = response.data
          .map((country: any) => {
            const callingCode =
              country.idd?.root + (country.idd?.suffixes?.[0] || "");
            return {
              code: callingCode || "",
              label: country.name.common,
              flag: country.flags.svg,
            };
          })
          .filter((country: Country) => country.code);

        const india = countryData.find(
          (country) => country.label.toLowerCase() === "india"
        );
        if (india) {
          setSelectedCountry(india);
        }

        setCountries(countryData);
        return countryData;
      } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    const country = countries.find((c) => c.code === value.value);
    setSelectedCountry(country || null);
  };

  const onFinish = async (values: any) => {
    setMobileNumber(values.mobile);
    if (!selectedCountry) {
      message.error("Please select a country!");
      return;
    }

    const requestData = {
      mobile_number: values.mobile,
      country_code: selectedCountry.code.replace("+", ""),
    };

    try {
      await axiosService.post("/user/create", requestData);
      message.success("OTP Sent!");
      setOtpField(true);
      setIsTimerActive(true); // Start the timer
      setTimer(60); // Reset the timer to 60 seconds
    } catch (err) {
      message.error("Failed to send OTP!");
    }
  };

  const resendOtp = async () => {
    const requestData = {
      mobile_number: mobileNumber,
      country_code: selectedCountry?.code.replace("+", ""),
    };

    try {
      await axiosService.post("/user/create", requestData);
      message.success("OTP resent successfully!");
    } catch (err) {
      message.error("Failed to resend OTP. Please try again!");
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    const requestData = {
      mobile_number: mobileNumber,
      country_code: selectedCountry?.code.replace("+", ""),
      otp: otpString,
    };
    try {
      const response: ExtendedAxiosResponse = await axiosService.post(
        "/user/verify_otp",
        requestData
      );
      const userData = response.data;
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      localStorage.setItem("userId", response.id);
      if(userData){
        if (userData.profile_status === "number_verified") {
          navigate("/signup");
        } else if (userData.profile_status === "active") {
          if (localStorage.getItem("token")) {
            navigate("/home");
          }
        }
      } else {
        navigate("/signup");
      }
    } catch (err) {
      message.error("Please enter a valid OTP!");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
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
      <div className="backBtn">
        {otpField && (
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
        )}
      </div>
      {otpField ? (
        <div className="otp-confirmation">
          <h3>Confirm your number</h3>
          <p style={{ color: "rgba(255,255,255,1)", margin: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Enter the OTP we sent to the number ending{" "}
            </span>
            <span style={{ fontWeight: 600 }}>5421</span>
          </p>
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
      ) : (
        <div className="otp-screen">
          <h3 style={{ fontWeight: 600, margin: "0 0 6px" }}>
            Enter your phone number
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
              name="mobile"
              rules={[
                { required: true, message: "Please input your mobile number!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                className="mobile_field"
                addonBefore={
                  <Select
                    labelInValue
                    value={
                      selectedCountry
                        ? {
                            value: selectedCountry.code,
                            label: (
                              <span>
                                <img
                                  src={selectedCountry.flag}
                                  alt={selectedCountry.label}
                                  style={{ width: "20px", marginRight: "8px" }}
                                />
                                {`${selectedCountry.code}`}
                              </span>
                            ),
                          }
                        : undefined
                    }
                    onChange={handleCountryChange}
                    loading={loading}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const optionLabel = option?.children
                        ? option.children.toString()
                        : "";
                      const optionKey = option?.key
                        ? option.key.toString()
                        : "";
                      return (
                        optionLabel
                          .toLowerCase()
                          .includes(input.toLowerCase()) ||
                        optionKey.toLowerCase().includes(input.toLowerCase())
                      );
                    }}
                    style={{ width: 80 }}
                    dropdownStyle={{ width: 300 }}
                  >
                    {countries.map((country) => (
                      <Select.Option
                        key={`${country.code}-${country.label}`}
                        value={country.code}
                      >
                        <img
                          src={country.flag}
                          alt={country.label}
                          style={{ width: "20px", marginRight: "8px" }}
                        />
                        {country.label}
                      </Select.Option>
                    ))}
                  </Select>
                }
                placeholder="Mobile Number"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
