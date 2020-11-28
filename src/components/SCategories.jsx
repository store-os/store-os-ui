import { Checkbox, Typography, Divider } from "antd";
import styled from "styled-components";
import React from "react";

const CheckboxGroup = Checkbox.Group;

const SCategories = ({ categories = {} }) => {
  return (
    <React.Fragment>
      <CategoriesContainer>
        {categories &&
          categories.map((item) => (
            <React.Fragment>
              <CategoryContainer>
                <Checkbox>
                  {item.key} ({item.doc_count})
                </Checkbox>
                <SubCategoryContainer>
                  {item.subcategories &&
                    item.subcategories.buckets.map((sub) => {
                      {
                        return <Checkbox>{sub.key}</Checkbox>;
                      }
                    })}
                </SubCategoryContainer>
              </CategoryContainer>
              <Divider />
            </React.Fragment>
          ))}
      </CategoriesContainer>
    </React.Fragment>
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
