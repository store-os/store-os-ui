import React, { useState, useEffect } from "react";
import { Checkbox, Tree } from "antd";
import styled from "styled-components";

const CheckboxGroup = Checkbox.Group;

const SCategories = ({ data = {}, onCategoriesQuery }) => {
  const [treeData, setTreeData] = useState([]);

  const fetchData = async () => {
    let treeCategories = [];
    {
      data &&
        data.aggregations &&
        data.aggregations.categories.buckets &&
        data.aggregations.categories.buckets.map((item, i) => {
          let children = [];
          item.subcategories &&
            item.subcategories.buckets.map((sub, j) => {
              let subchildren = [];
              sub.subsubcategories &&
                sub.subsubcategories.buckets.map((subsub, k) => {
                  subchildren.push({
                    title: subsub.key,
                    key: `category=${item.key}&subcategory=${sub.key}&subsubcategory=${subsub.key}`,
                  });
                });
              children.push({
                title: sub.key,
                key: `category=${item.key}&subcategory=${sub.key}`,
                children: subchildren,
              });
            });
          treeCategories.push({
            title: item.key,
            key: `category=${item.key}`,
            children,
          });
        });
      setTreeData(treeCategories);
    }
    console.log(treeData);
  };

  const onCheck = (checkedKeys, info) => {
    let query = "";
    console.log(checkedKeys);
    checkedKeys.map((item) => {
      query = query + item + "&";
    });
    onCategoriesQuery({ query });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return treeData ? (
    <Tree checkable treeData={treeData} onCheck={onCheck} />
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
