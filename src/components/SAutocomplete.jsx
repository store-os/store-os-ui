import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import axios from "axios";
import debounce from 'lodash/debounce';



function getAutocomplete(query) {
  const getAsync = async() => {
    try{
      return await axios.get(process.env.REACT_APP_AUTOCOMPLETE_URL+"?q="+query)
    }
    catch(error){
      console.error(error)
    }
  }

  const getResponse = async() => {
    try {
      const response = await getAsync() 
      if (response.data.autocomplete){
        console.log("Autocomplete",response.data.autocomplete)
        
        return response.data.autocomplete
      }
    
    }
    catch(error){
      console.error(error)
    }
   
  }
  
  getResponse()
}


const SearchResult = (query) => {


  getAutocomplete(query)
    
  return new Array(3)
      .join('.')
      .split('.')
      .map((item, idx) => {

        const category = `${query}-${idx}`;
        
        return {
          value: category,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                Found {query} on{' '}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              </span>
              <span>100 results</span>
            </div>
          ),
        };
      });
};

const SAutocomplete = ({ onSearchQuery }) => {
  const [options, setOptions] = useState([]);
  const onSelect = (value) => {
    console.log("onSelect:", value);
  }
  const onSearch = (value) => {
    setOptions(value ? SearchResult(value) : []);
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
    >
      <Input.Search size="large" placeholder="Busca lo que quieras" enterButton />
    </AutoComplete>
  );
};

export default SAutocomplete;
