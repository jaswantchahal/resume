import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FixedFooter.scss";
import { useSelector } from "react-redux";
import { selectUserState } from "../../context/user/userSlice";
import { useTranslation } from "react-i18next";

const FixedFooter: React.FC = () => {
  const { userInfo, userStatus } = useSelector(selectUserState);
  const { t } = useTranslation();

  const navItems = [
    { path: "/home", icon: "./images/footer/home_ic.svg", label: t('Home') },
    { path: "/", icon: "./images/footer/reward_ic.svg", label: t("Rewards") },
    { path: "/", icon: "./images/footer/invite_ic.svg", label: t("Invite") },
    { path: "/profile", icon: "profile", label: t('Profile') },
  ];

  const userName = `${userInfo.first_name} ${userInfo.last_name}`;

  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const profileInitials = getInitials(userName);
  const location = useLocation();

  return (
    <div className="fixed-bar">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              className={location.pathname === item.path ? "active" : ""}
              to={item.path}
            >
              <span className="icon">
                {item.icon === "profile" ? (
                  <span className="profile-initials">{profileInitials}</span>
                ) : (
                  <img src={item.icon} alt={item.label} />
                )}
              </span>
              <span className="text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FixedFooter;
