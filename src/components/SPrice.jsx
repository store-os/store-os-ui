import React, { useState } from "react";
import { Slider } from "antd";

const SPrice = ({ disabled = false, max, min, range = false }) => {
  return (
    <React.Fragment>
      <Slider
        max={max}
        min={min}
        range={range}
        defaultValue={[120, 900]}
        disabled={disabled}
      ></Slider>
    </React.Fragment>
  );
};

export default SPrice;
