import React from "react";
import "./SearchBar.css";

type Props = {
  isLoading?: boolean;
  onSearch?: (value: string) => void;
};
export const SearchBar = ({ isLoading, onSearch }: Props) => {
  const [searchText, setSearchText] = React.useState("");

  const handleSearch = () => {
    onSearch?.(searchText);
  };
  
  return (
    <div className="search">
      <input
        type="url"
        className="search-input"
        placeholder="https://example.com"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        className="btn-search"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </button>
    </div>
  );
};
