import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SSort = ({ onSortQuery }) => {
  const onSortChange = (value) => {
    let query = "";
    switch (value.value) {
      case "AZ":
        query = "fieldsort=title.keyword&order=asc";
        break;
      case "ZA":
        query = "fieldsort=title.keyword&order=desc";
        break;
      case "priceAsc":
        query = "fieldsort=final_price&order=asc";
        break;
      case "priceDesc":
        query = "fieldsort=final_price&order=desc";
        break;
      default:
        query = "fieldsort=title.keyword&order=asc";
    }
    onSortQuery({ query });
  };

  return (
    <Select
      labelInValue
      defaultValue={{ value: "A - Z" }}
      style={{ width: 240 }}
      onChange={onSortChange}
    >
      <Option value="AZ">A - Z</Option>
      <Option value="ZA">Z - A</Option>
      <Option value="priceAsc">Precio de menor a mayor</Option>
      <Option value="priceDesc">Precio de mayor a menor</Option>
    </Select>
  );
};

export default SSort;
