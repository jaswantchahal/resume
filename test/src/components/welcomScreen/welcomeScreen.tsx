import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Splash from "../../pages/splashScreen/splashScreen";

const WelcomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [animateSplash, setAnimateSplash] = useState(false);

  const contentData = [
    {
      imgSrc: "images/welcome/img1.png",
      title: "Enjoy Interesting Games Here",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    },
    {
      imgSrc: "images/welcome/img2.png",
      title: "Explore New Adventures",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      imgSrc: "images/welcome/img3.png",
      title: "Join a Community of Gamers",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateSplash(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={`splash-container ${animateSplash ? "animate" : ""}`}>
        <Splash />
      </div>
      <div className="welcome-screen">
        <div
          className="skipBtn"
          style={{ textAlign: "right", padding: "30px 0 40px" }}
        >
          <Button
            onClick={handleSkip}
            style={{
              background: "#2B313E",
              borderColor: "transparent",
              color: "#fff",
              borderRadius: 28,
              height: 37,
            }}
          >
            Skip
          </Button>
        </div>
        <div className="bottom-area">
          <div className="imgArea">
            <img src={contentData[currentIndex].imgSrc} alt="" />
          </div>
          <div className="nav">
            {contentData.map((_, index) => (
              <span
                key={index}
                className={currentIndex === index ? "active" : ""}
              ></span>
            ))}
          </div>
          <div className="content_area" style={{ textAlign: "center" }}>
            <h2>{contentData[currentIndex].title}</h2>
            <p>{contentData[currentIndex].description}</p>
          </div>
          <div className="btns_area" style={{ textAlign: "center" }}>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
