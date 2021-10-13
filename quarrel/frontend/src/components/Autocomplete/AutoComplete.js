import { useEffect, useState } from "react";
import "./Autocomplete.css";
const AutoComplete = ({ suggestions , placeholder, changeStateFunc} ) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const onChange = (e) => {
    const userInput = e.target.value;
    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions?.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);

  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
    changeStateFunc(e.target.innerText)
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions" >
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No users found</em>
      </div>
    );
  };

  return (
    <>
      <input type="text" onChange={onChange} value={input} placeholder={placeholder} />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;
