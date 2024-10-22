import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
// const baseUrl = "https://duckduckgo8.p.rapidapi.com";
// const baseUrl = "https://google-api31.p.rapidapi.com";
const baseUrl = "https://google-web-search1.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResult = async (url) => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        'x-rapidapi-key': '785e7a037fmsh408998582c50566p1aa967jsnb2d7ab48aa2c',
    'x-rapidapi-host': 'google-web-search1.p.rapidapi.com'
      },
    });
    const data = await response.json();
    console.log(data);

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResult, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
