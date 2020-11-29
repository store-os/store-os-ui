import React, { useState } from "react";
import { Slider } from "antd";

const SPrice = ({ disabled = false, minValue, maxValue, range = false }) => {
  let maxRound = '1';
  for (var i = 0; i < maxValue.toString().length; i++) {
    maxRound = maxRound + '0';
  }
  maxRound = parseInt(maxRound);
  return (
    <Slider
      max={maxRound}
      min={0}
      range={range}
      marks={{ 0: '0', [maxRound]: maxRound }}
      defaultValue={[minValue, maxValue]}
      disabled={disabled}
    ></Slider>
  );
};

export default SPrice;
