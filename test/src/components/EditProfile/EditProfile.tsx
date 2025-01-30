import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../context/store";
import { selectUserState } from "../../context/user/userSlice";
import {
  Typography,
  Button,
  Input,
  Form,
  DatePicker,
  message,
  Modal,
} from "antd";
import { decryptValue } from "../../utils/utility";
import CommanHeading from "../commancomponents/Heading";
import { CameraOutlined } from "@ant-design/icons";
import axiosService from "../../utils/axiosService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getUserThunk } from "../../context/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const EditProfileComponent: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector(selectUserState);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(
    userInfo.profile_image || null
  );
  const [form] = Form.useForm();

  useEffect(() => {
    const decryptAndSetField = async (
      key: keyof typeof userInfo,
      field: string,
      format?: string
    ) => {
      const decrypted = await decryptValue(userInfo[key], "Doek4thah(vae~ph");
      if (decrypted === null) {
        console.log(`Decryption failed for ${field}`);
      } else {
        form.setFieldsValue({
          [field]: format ? dayjs(decrypted, format) : decrypted,
        });
      }
    };

    decryptAndSetField("email", "email");
    decryptAndSetField("mobile_number", "mobile_number");
    decryptAndSetField("dob", "dob", "DD-MM-YYYY");
  }, [userInfo, form]);

  const userName = `${userInfo.first_name} ${userInfo.last_name}`;

  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const profileInitials = getInitials(userName);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
          const formData = new FormData();
          formData.append("file", file);
          formData.append("user_id", userInfo.user_id);
          uploadImage(formData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
      await axiosService.post("/user/upload_profile_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Image updated successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      message.error("Image upload failed. Please try again.");
    }
  };

  const onFinish = async (values: any) => {
    const formattedDob = dayjs(values.dob).format("DD-MM-YYYY");

    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      dob: formattedDob,
      wallet_amount: userInfo.wallet_amount,
    };

    try {
      await axiosService.patch("/user/update_profile", payload);
      dispatch(getUserThunk({}));
      navigate("/profile", { state: { showProfileUpdatedModal: true } });
      message.success("Profile Updated!");
    } catch (err) {
      message.error("Profile update Failed!");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <CommanHeading title="Edit Profile" link="/" />
      <div className="scroll_area edit_profile">
        <div
          className="profile_img"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#2B313E",
                  color: "#fff",
                  fontSize: 32,
                  fontWeight: "bold",
                  border: "2px solid #fff",
                }}
              >
                {profileInitials}
              </div>
            )}
            <Button
              className="editProfile-pic-btn"
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
                width: 40,
                height: 40,
                background: "#2B313E",
                color: "#fff",
                border: "none",
              }}
              shape="circle"
              icon={<CameraOutlined />}
              size="large"
              onClick={() =>
                document.getElementById("profile-image-input")?.click()
              }
            />
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="first_name"
            initialValue={userInfo.first_name}
            rules={[
              { required: true, message: t('Please enter your First Name') },
            ]}
          >
            <Input placeholder={t("First Name")} />
          </Form.Item>
          <Form.Item
            name="last_name"
            initialValue={userInfo.last_name}
            rules={[{ required: true, message: t('Please enter your Last Name') }]}
          >
            <Input placeholder={t("Last Name")} />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder={t('Email')} disabled />
          </Form.Item>
          <Form.Item name="mobile_number">
            <Input placeholder={t('Phone Number')} disabled />
          </Form.Item>
          <Form.Item
            name="dob"
            style={{ paddingBottom: "10px" }}
            rules={[{ required: true, message: t('Pick your Date of Birth') }]}
            help={
              userInfo.kyc_status !== "completed" && ( // Conditionally render help text Completed
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
                  {t("Please enter the same DOB as on your Adhaar card")}
                </Text>
              )
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
              disabled={userInfo.kyc_status === "completed"}
            />
          </Form.Item>
          <Form.Item>
            <div className="primary_btn_bg">
              <Button className="primary_btn kyc_start_btn" htmlType="submit">
                {t('Save')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
