import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Typography, Divider, Tree } from "antd";
import styled from "styled-components";

const CheckboxGroup = Checkbox.Group;

const SCategories = ({ categories = {} }) => {
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState();

  const fetchData = async () => {
    let treeCategories = [];
    setData(categories);
    {
        categories &&
        categories.map((item, i) => {
          let children = [];
          item.subcategories &&
            item.subcategories.buckets.map((sub, j) => {
              let subchildren = [];
              sub.subsubcategories &&
                sub.subsubcategories.buckets.map((subsub, k) => {
                  subchildren.push({
                    title: subsub.key,
                    key: `${i}-${j}-${k}`,
                  });
                });
              children.push({
                title: sub.key,
                key: `${i}-${j}`,
                children: subchildren,
              });
            });
          treeCategories.push({
            title: item.key,
            key: `${i}`,
            children,
          });
        });
        setTreeData(treeCategories);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return treeData ? (
    <Tree checkable treeData={treeData} />
  ) : (
    <p>Rendering...</p>
  );
};

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const SubCategoryContainer = styled(CheckboxGroup)`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > label {
    text-align: left;
    :first-of-type {
      margin-left: 8px;
    }
  }
`;

export default SCategories;
