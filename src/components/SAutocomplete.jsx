import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import debounce from 'lodash/debounce';

const SAutocomplete = ({ onSearchQuery, autocomplete =[]}) => {
  const [options, setOptions] = useState([]);
  const onSelect = (value) => {
    console.log("onSelect:", value);
  }

  const onAutocomplete = (value) => {

    if (value !== null)
    {
      return value.map((item) => {

        const title = `${item.title}`
        const id = `${item.id}`
        const image = `${item.image}`
       
        return {
          value: title,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {title} 
                <a
                  href={`https://store-ui.alchersan.com/product/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={image} width="20"></img>
                </a>
              </span>
            </div>
          ),
        };
        
      });
    }

  }

  const onSearch = (value) => {
    
    setOptions(value ? onAutocomplete(autocomplete) : []);
    const query = "q=" + value;
    onSearchQuery({query}) //Search Query
  }

  return (
    <AutoComplete 
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={debounce(onSearch, 300)} // 300 is the required delay
      onChange={debounce(onSearch, 300)} // To search when you click the autocomplete
    >
      <Input.Search size="large" placeholder="Busca lo que quieras" enterButton />
    </AutoComplete>
  );
};

export default SAutocomplete;
