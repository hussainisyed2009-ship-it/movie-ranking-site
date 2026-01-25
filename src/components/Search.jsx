// ============================================
// SEARCH COMPONENT - Search input field with icon
// ============================================

// Import React library
import React from 'react'

// Search component receives props from parent (App.jsx)
// PROPS (Properties): data passed from parent to child component
// Destructuring: {searchTerm, setSearchTerm} extracts these from props object
const Search = ({searchTerm, setSearchTerm}) => {
  
  // ============================================
  // RENDER - The search bar UI
  // ============================================
  return (
    // Outer container with "search" class for styling
    <div className="search">
      
      {/* Inner wrapper div */}
      <div>
        
        {/* Search icon (magnifying glass) displayed before input */}
        <img src="search.svg" alt="search" />

        {/* ============================================ */}
        {/* TEXT INPUT FIELD - CONTROLLED COMPONENT */}
        {/* ============================================ */}
        {/* This is a "controlled component" - React controls its value */}
        <input 
          type="text"  // Makes it a text input field
          placeholder='Search'  // Gray text shown when empty (hint to user)
          
          // VALUE: Makes this a controlled input
          // Input always displays the value from searchTerm state
          // This creates "single source of truth" - state controls what's displayed
          value={searchTerm}
          
          // ONCHANGE: Fires every time user types a character
          // event: object containing info about the change
          // event.target: the input element itself
          // event.target.value: the current text in the input
          // We call setSearchTerm to update the state with new value
          // This creates a loop: type → onChange → update state → re-render → show new value
          onChange={(event) => setSearchTerm(event.target.value)} 
        />
      </div>
    </div>
  )
}

// Export this component so App.jsx can import it
export default Search