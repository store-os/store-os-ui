import React, { useState, useEffect } from "react";
import { Slider } from "antd";

const SPrice = ({
  disabled = false,
  minValue,
  maxValue,
  range = false,
  onPriceQuery,
}) => {
  let maxRound = "1";
  for (var i = 0; i < maxValue.toString().length; i++) {
    maxRound = maxRound + "0";
  }
  maxRound = parseInt(maxRound);

  const onPriceChange = (value) => {
    const query = "from=" + value[0] + "&to=" + value[1];
    onPriceQuery({ query });
  };

  return (
    <Slider
      max={maxRound}
      min={0}
      range={range}
      marks={{ 0: "0", [maxRound]: maxRound }}
      defaultValue={[minValue, maxValue]}
      disabled={disabled}
      onAfterChange={onPriceChange}
    ></Slider>
  );
};

export default SPrice;
