import { Checkbox } from 'antd';
import styled from "styled-components";
import React from 'react';

const SCategories = ({
    categories = {}
}) => {
    return (
        <CategoriesContainer>
            {categories && categories.map(item => (
                <CategoryContainer>
                    <Checkbox>{item.key}</Checkbox>
                    <span>{item.doc_count}</span>
                </CategoryContainer>
            ))}
        </CategoriesContainer>
    )
}

const CategoriesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start
`;

const CategoryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export default SCategories;
