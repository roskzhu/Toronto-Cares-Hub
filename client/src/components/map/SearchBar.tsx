import { Autocomplete } from "@react-google-maps/api";
import React from "react";

interface SearchbarProps {
  onLoad: (autoC: any) => void; 
  onPlaceChanged: () => void;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
  shouldShowButton: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({
  onLoad,
  onPlaceChanged,
  handleSearch,
  shouldShowButton,
}) => {
  return (
    <div className="relative w-full mt-20 ml-16">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-white bg-white/15 rounded-sm transition-all"
            placeholder="Search a location..."
          />
          {shouldShowButton && (
            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-white/60 rounded-r-lg
                         hover:bg-white/40 focus:ring-4 focus:outline-none transition-all"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          )}
        </div>
      </Autocomplete>
    </div>
  );
};

export default Searchbar;
