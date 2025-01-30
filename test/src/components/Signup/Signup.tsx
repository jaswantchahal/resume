import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Upload,
  message,
  Typography,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the utc plugin
import customParseFormat from "dayjs/plugin/customParseFormat";
import axiosService from "../../utils/axiosService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useSocketService from "../../utils/SoketServices";
import { decryptValue } from "../../utils/utility";

const { Text, Title } = Typography;
dayjs.extend(utc); // Use the UTC plugin
dayjs.extend(customParseFormat);

interface ExtendedAxiosResponse extends AxiosResponse {
  token: any;
  country_code: string;
  ip: string;
  timezone: string;
}

const SignupComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [showProfilePic, setshowProfilePic] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [countryShortName, setCountryShortName] = useState<string | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const userId = localStorage.getItem("userId") || "";
  const socket = useSocketService();
  const [showEmailOtp, setshowEmailOtp] = useState<boolean>(false);
  const [showSuccessFullMsg, setShowSuccessFullMsg] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(4).fill("")); // 4 input fields
  const [userEmail, setUserEmail] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [debouncedUsername, setDebouncedUsername] = useState<string>(username);
  const [isUserNameValid, setIsUserNameValid] = useState<string>("");
  const [timer, setTimer] = useState<number>(59);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const userDetail = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await axiosService.get<ExtendedAxiosResponse>(
        "https://ipapi.co/json/"
      );
      setCountryShortName(response.country_code);
      setIpAddress(response.ip);
      setTimezone(response.timezone);
    } catch (error) {
      message.error("Failed to fetch user details.");
    }
  };

  const emailDecryptValue = async () => {
    const emailDecrypted: string | null = await decryptValue(
      userDetail.email,
      "Doek4thah(vae~ph"
    );

    // Handle null or undefined cases here if needed
    if (emailDecrypted === null) {
      console.log("Decryption failed");
    } else {
      setUserEmail(emailDecrypted);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    if (userDetail.profile_status === "email_verification_pending") {
      setshowEmailOtp(true);
      setshowProfilePic(false);
      emailDecryptValue();
    }
  }, []);

  useEffect(() => {
    if (debouncedUsername.trim()) {
      socket.emit("checkUserName", { username: debouncedUsername });

      const handleResponse = (response: {
        isValid: boolean;
        message: string;
      }) => {
        setIsUserNameValid(response.message);
      };

      socket.on("checkUserName", handleResponse);

      return () => {
        socket.removeListener("checkUserName");
      };
    }
  }, [debouncedUsername, socket]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [username]);

  const handleFinish = async (values: any) => {
    const formattedDob = dayjs(values.dob).format("DD-MM-YYYY");
    setUserEmail(values.email);

    const payload = {
      user_id: userId,
      user_name: values.userName,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      dob: formattedDob,
      country_short_name: countryShortName,
      ip: ipAddress,
      timezone: timezone,
      referral_code: values.referralCode || "",
    };
    try {
      await axiosService.post("/user/profile_setup", payload);
      message.success("Signup successful!");
      setshowEmailOtp(true);
    } catch (err) {
      message.error("Signup Failed!");
    }
  };

  const handleImageChange = (file: File, userId: string) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        setSelectedImage(reader.result as string);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userId);
        uploadImage(formData);
      }
    };

    reader.onerror = () => {
      message.error("Failed to load image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const uploadImage = async (formData: FormData) => {
    try {
      const response = await axiosService.post(
        "/user/upload_profile_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setshowProfilePic(false);
      setShowSuccessFullMsg(true);
      message.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      message.error("Image upload failed. Please try again.");
    }
  };

  const handleMaybeLater = () => {
    message.info("You chose to add the photo later.");
  };
  const handleComplete = () => {
    navigate("/home");
  };

  const resendOtp = async () => {
    const requestData = {
      email: userEmail,
    };

    try {
      await axiosService.post("user/resend_email_otp", requestData);
      message.success("OTP resent successfully!");
    } catch (err) {
      message.error("Failed to resend OTP. Please try again!");
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");

    const payload = {
      email: userEmail,
      otp: otpString,
      type: "create",
    };

    try {
      const response: ExtendedAxiosResponse = await axiosService.post(
        "/user/verify_otp_with_email",
        payload
      );
      message.success("Email is Verified");
      setshowEmailOtp(false);
      setshowProfilePic(true);

      if (response.token) {
        localStorage.setItem("token", response.token);
      }
    } catch (err: unknown) {
      if (typeof err === "string") {
        message.error(err);
      } else if (
        err &&
        typeof (err as { message: string }).message === "string"
      ) {
        message.error((err as { message: string }).message);
      } else {
        message.error("An unknown error occurred");
      }
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
          >
            <img src="images/ic_back.png" alt="Back" />
          </button>
        </div>
      )}
      <div className="page_area signup">
        {!showProfilePic && !showEmailOtp && !showSuccessFullMsg && (
          <>
            <h3 style={{ color: "#fff", marginBottom: 10 }}>
              Set up your profile
            </h3>
            <p style={{ color: "#ccc", paddingBottom: 15 }}>
              Create an account so you can manage your money even faster
            </p>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <div>
                <Form.Item
                  name="userName"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                  validateStatus={
                    isUserNameValid === "This username is available"
                      ? "success"
                      : isUserNameValid
                      ? "error"
                      : undefined
                  }
                >
                  <Input
                    placeholder="Enter your username (display name)*"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setIsUserNameValid(""); // Reset validity message on input change
                    }}
                  />
                </Form.Item>
                {isUserNameValid && (
                  <Text
                    style={{
                      color:
                        isUserNameValid === "This username is available"
                          ? "#42D63A"
                          : "#ff4d4f",
                      lineHeight: 1.2,
                      display: "block",
                      position: "relative",
                      top: "-18px",
                      fontSize: 12,
                    }}
                  >
                    {isUserNameValid}
                  </Text>
                )}
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Enter your first name*" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Enter your last name*" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email*" />
              </Form.Item>
              <Form.Item
                name="dob"
                style={{ paddingBottom: "10px" }}
                rules={[{ required: true, message: "Pick your Date of Birth" }]}
                help={
                  <Text
                    type="danger"
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >
                    <img
                      style={{ marginRight: "6px" }}
                      src="./images/ic_exclamation.png"
                      alt=""
                    />
                    Please enter the same DOB as on your Adhaar card.
                  </Text>
                }
              >
                <DatePicker
                  className="ant-input dobPicker"
                  format="DD / MM / YYYY"
                  style={{ width: "100%" }}
                  placeholder="Pick your Date of Birth*"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                />
              </Form.Item>
              <Form.Item name="referralCode">
                <Input placeholder="Enter referral code(optional)" />
              </Form.Item>
              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Please accept the terms and conditions")
                          ),
                  },
                ]}
              >
                <Checkbox style={{ color: "#fff" }}>
                  I agree to the{" "}
                  <span
                    style={{ color: "#42D63A", textDecoration: "underline" }}
                  >
                    Terms and Conditions
                  </span>{" "}
                  of Money Mash Games.
                </Checkbox>
              </Form.Item>
              <Form.Item style={{ paddingTop: 15 }}>
                <Button type="primary" htmlType="submit" block>
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {!showProfilePic && showEmailOtp && !showSuccessFullMsg && (
          <div className="otp-confirmation">
            <h3>Verify your email</h3>
            <p style={{ color: "rgba(255,255,255,1)", margin: 0 }}>
              <span
                style={{ color: "rgba(255,255,255,0.6)", display: "block" }}
              >
                Please enter the 4 digit OTP sent to
              </span>
              <span>{userEmail}</span>
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
        )}
        {showProfilePic && !showEmailOtp && !showSuccessFullMsg && (
          <>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#fff", marginBottom: 10 }}>Add a photo</h3>
              <p style={{ color: "#ccc", paddingBottom: 15 }}>
                Add a profile photo so your friends know it’s you!
              </p>
              <div className="img_area" style={{ padding: "20px 0" }}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    alt="Profile"
                  />
                ) : (
                  <img
                    src="./images/ic_user.png"
                    style={{ width: 160 }}
                    alt="Default Profile"
                  />
                )}
              </div>
            </div>
            <div style={{ paddingTop: 100 }}>
              <div className="profilePicUploader" style={{ paddingBottom: 16 }}>
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleImageChange(file, userId);
                    return false; // Prevent upload, handle file locally
                  }}
                >
                  <Button type="primary" style={{ width: "100%" }}>
                    Choose a photo
                  </Button>
                </Upload>
              </div>
              <Button
                type="text"
                style={{ color: "#ccc", width: "100%" }}
                onClick={handleMaybeLater}
              >
                Maybe later
              </Button>
            </div>
          </>
        )}
        {showSuccessFullMsg && (
          <div className="account_successs">
            <div style={{ textAlign: "center", width: "100%" }}>
              <img src="./images/check_welcome.svg" alt="" />
              <Title style={{ color: "#fff", paddingTop: "24px" }} level={2}>
                Successfully!
              </Title>
              <Text
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "16px",
                  paddingBottom: 40,
                  display: "block",
                }}
              >
                You have successfully Registed!
              </Text>
              <div className="primary_btn_bg">
                <Button className="primary_btn kyc_start_btn" onClick={handleComplete}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignupComponent;
