import React, { useState, useEffect } from "react";
import { Tree } from "antd";

const SCategories = ({ data = {}, onCategoriesQuery }) => {
  const [treeData, setTreeData] = useState([]);

  const fetchData = async () => {
    let treeCategories = [];
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

export default SCategories;
