import React, { useState } from "react";
import { Carousel } from "antd";

import "./Slider.scss";

const Slider: React.FC = () => {
    return (
        <Carousel className="depositSlider" autoplay dots={false}>
        <div>
         <img src="./images/newimg/sliderimg1.png" alt="sliderimg" />
        </div>
    </Carousel>
    );
};

export default Slider;