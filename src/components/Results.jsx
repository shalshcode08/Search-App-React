import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../context/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResult, searchTerm } = useResultContext();
  const location = useLocation();

  // Fetch the results once the component mounts
  useEffect(() => {
    if(searchTerm){
      if(location.pathname === '/videos'){
        getResult(`/q=${searchTerm} videos`)
      }
      else{
        getResult(`/?q=${searchTerm}`)
        // getResult("/?q=")
      }
    }
     // You can replace 'Nike' with searchTerm if dynamic
  }, [searchTerm, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(location.pathname);

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {/* Check if results are available and map through them */}
          {results?.results?.length > 0 ? (
            results?.results.map(({ url, title }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={url} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {url.length > 30 ? url.substring(0, 30) : url}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            ))
          ) : (
            <p>No results found</p> // Handle case where no results are found
          )}
        </div>
      );
    case "/images":
      return "IMAGES"
    case "/news":
      return "SEARCH";
    case "/videos":
      return "SEARCH";
    default:
      return "ERROR";
  }
};
