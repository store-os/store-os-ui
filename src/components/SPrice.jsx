import React, { useState, useEffect } from "react";
import axios from "axios";
import { Slider } from "antd";

const SPrice = ({ data= {}, onAfterChange /*disabled = false, minValue, maxValue, range = false, onChange, onAfterChange*/ }) => {
  
  
  const [sliderData, setSliderData] = useState([])
  var maxRound = '10000'; 
    

  const fetchData = async () => {
    
    console.log("Data Slider: ", data)
    let maxValue = data.aggregations.maxPrice.value
    console.log("MaxValue: ", maxValue)
    
    for (var i = 0; i < maxValue.toString().length; i++) {
      maxRound = maxRound + '0';
    }
    maxRound = parseInt(maxRound);
    console.log("MaxRound: ", maxRound)
    
    setSliderData(maxRound)

  };
  
let from = ""
let to = ""

const onChange = (value) => {
  from = value[0] 
  to = value[1]
}

const onCheck = (value) => {
  if (from < to) {
    let query = "";
    query = "from="+from+"&to="+to
    const result = axios(
      `${process.env.REACT_APP_PRODUCTS_URL}?${query}`
    );
    result.then(response => {
      onAfterChange({response, query});
    });

  }

}

useEffect(() => {
  fetchData();
}, []);

  return sliderData ? (
    <Slider
      max={maxRound}
      min={0}
      range={true}
      marks={{ 0: '0', [maxRound]: maxRound }}
      defaultValue={[0, 10000]}
      disabled={false}
      onChange={onChange}
      onAfterChange={onCheck}
    ></Slider>
  ): (
    <p>Rendering...</p>
  );
};

export default SPrice;
