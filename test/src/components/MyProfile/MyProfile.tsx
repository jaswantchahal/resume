import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserState } from "../../context/user/userSlice";
import { Typography, Button } from "antd";
import { decryptValue } from "../../utils/utility";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./MyProfile.scss";

const { Text, Title } = Typography;

const MyProfileComponent: React.FC<{
  setActiveModal: (modal: string | null) => void;
}> = ({ setActiveModal }) => {
  const { t } = useTranslation();
  const { userInfo } = useSelector(selectUserState);
  const [userEmail, setUserEmail] = useState<string>("");
  const navigate = useNavigate();

  const emailDecryptValue = async () => {
    const emailDecrypted: string | null = await decryptValue(
      userInfo.email,
      "Doek4thah(vae~ph"
    );
    if (emailDecrypted === null) {
      console.log("Decryption failed");
    } else {
      setUserEmail(emailDecrypted);
    }
  };

  useEffect(() => {
    emailDecryptValue();
  });

  const navItems = [
    {
      path: "/wallet",
      icon: "./images/profile/wallet.svg",
      label: t("Wallet"),
      balance: userInfo?.wallet_amount,
    },
    {
      path: "/",
      icon: "./images/profile/refers.svg",
      label: t("Refer & Earn"),
    },
    {
      path: "/",
      icon: "./images/profile/notification.svg",
      label: t("Notifications"),
    },
    {
      path: "/",
      icon: "./images/profile/how_to_play.svg",
      label: t("How to Play"),
    },
    {
      path: "/",
      icon: "./images/profile/help.svg",
      label: t("Help & Support"),
    },
    {
      path: "/",
      icon: "./images/profile/privacy.svg",
      label: t("Privacy Policy"),
    },
    { path: "/", icon: "./images/profile/settings.svg", label: t("Settings") },
    {
      path: "https://moneymashgames.com/term&condition.html",
      icon: "./images/profile/terms.svg",
      label: t("Terms & Conditions"),
      target: "_blank",
    },
    {
      path: "#",
      icon: "./images/profile/delete.svg",
      label: t("Delete Account"),
      action: () => setActiveModal("deleteAccount"),
    },
    {
      path: "#",
      icon: "./images/profile/logout.svg",
      label: t("Logout"),
      action: () => setActiveModal("logoutAccount"),
    },
  ];

  const handleProfileEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="profile_top">
        <div className="inner" style={{ position: "relative", zIndex: 1 }}>
          <Title
            style={{
              color: "#fff",
              textAlign: "center",
              paddingBottom: "16px",
              margin: 0,
            }}
            level={3}
          >
            {t('My Profile')}
          </Title>
          <div className="profile-meta">
            <div className="img_area">
              <img
                src={userInfo.profile_image}
                alt={`${userInfo.first_name}'s profile`}
              />
            </div>
            <div className="profile_details">
              <Title
                style={{ color: "#fff", fontSize: "18px", margin: 0 }}
                level={5}
              >
                {`${userInfo.first_name} ${userInfo.last_name}`}
              </Title>
              <Text style={{ display: "block", paddingBottom: "8px" }}>
                {userEmail}
              </Text>
              <div className="primary_btn_bg edit_profile-btn">
                <Button
                  className="primary_btn"
                  style={{ fontSize: 12 }}
                  icon={<EditOutlined style={{ paddingRight: "10" }} />}
                  onClick={handleProfileEdit}
                >
                  {t("Edit")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-links">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={item.action}
                target={item.target}
              >
                <span className="icon">
                  <img src={item.icon} alt={item.label} />
                </span>
                <span className="text" style={{ paddingLeft: 12 }}>
                  {item.label}
                </span>
                {(item.label === "Wallet" || item.label === "वॉलेट") && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#77CC00",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img style={{ marginRight: '5px' }} src="./images/profile/mm_coin.svg" alt="" />
                    {item.balance}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyProfileComponent;
