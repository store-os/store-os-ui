import React, { useState } from "react";
import { Slider } from "antd";

const SPrice = ({ disabled = false, minValue, maxValue, range = false }) => {
  return (
    <Slider
      max={maxValue}
      min={minValue}
      range={range}
      marks={{[minValue]: minValue , [maxValue]: maxValue}}
      defaultValue={[minValue, maxValue]}
      disabled={disabled}
    ></Slider>
  );
};

export default SPrice;
