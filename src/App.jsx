// ============================================
// IMPORTS - Bringing in code we need from other files/libraries
// ============================================

// Import React and its special hooks (functions that add superpowers to our components)
// - React: The main library that lets us build user interfaces
// - useEffect: A hook that runs code when the component loads or when data changes
// - useState: A hook that lets us store and update data (like variables that trigger re-renders)
import React, { useEffect, useState } from 'react'

// Import a custom hook that delays actions (prevents searching on every keystroke)
// This is great for search bars - waits until user stops typing before searching
import { useDebounce } from 'use-debounce';

// Import our custom components (reusable pieces of UI we built)
import Search from './components/search'      // The search bar component
import Spinner from './components/spinner'    // The loading animation component
import MovieCard from './components/Moviecard' // Component that displays each movie

// ============================================
// API CONFIGURATION - Settings to connect to the movie database
// ============================================

// The base URL for The Movie Database (TMDB) API
// Think of this as the main address where we send our requests
const API_BASE_URL = 'https://api.themoviedb.org/3'

// Our secret API key that proves we're allowed to use TMDB
// import.meta.env accesses environment variables (secrets stored securely)
// VITE_TMDB_API_KEY is the name of our key in the .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Options/settings that we send with every API request
const API_OPTIONS = {
  method: 'GET',  // GET means we're requesting data (not changing anything)
  headers: {      // Headers are like metadata - extra info about our request
    accept: 'application/json',  // We want the response in JSON format (structured data)
    Authorization: `Bearer ${API_KEY}`  // Proves we're authorized to use the API
  }
}


// ============================================
// MAIN APP COMPONENT - This is the heart of our application
// ============================================

// App is a functional component - a JavaScript function that returns HTML-like code (JSX)
// The () => {} syntax is an arrow function (modern JavaScript way to write functions)
const App = () => {
  
  // ============================================
  // STATE VARIABLES - Data that can change and triggers UI updates
  // ============================================
  
  // useState creates a state variable and a function to update it
  // Pattern: const [value, setValue] = useState(initialValue)
  
  // searchTerm: stores what the user types in the search box
  // setSearchTerm: function to update searchTerm
  // "" (empty string) is the initial value
  const [searchTerm, setSearchTerm] = useState("");
  
  // errorMessage: stores any error messages to show the user
  // Example: "Failed to fetch movies" or "No internet connection"
  const [errorMessage, setErrorMessage] = useState("");
  
  // isLoading: tracks if we're currently fetching data from the API
  // true = show loading spinner, false = show content
  const [isLoading, setIsLoading] = useState(false);
  
  // movieList: stores the array of movies we get from the API
  // [] (empty array) means no movies at the start
  const [movieList, setMovieList] = useState([]);
  
  // debouncedSearchTerm: a delayed version of searchTerm
  // Waits 500 milliseconds (0.5 seconds) after user stops typing before updating
  // This prevents making an API call for every single keystroke
  // Example: User types "batman" - it only searches once they stop typing, not 6 times
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // ============================================
  // FETCH MOVIES FUNCTION - Gets movie data from the TMDB API
  // ============================================
  
  // async: this function performs asynchronous operations (waits for API response)
  // query = '': if no query is provided, defaults to empty string
  const fetchMovies = async (query = '') => {
    
    // Step 1: Set loading to true (shows the spinner to the user)
    setIsLoading(true);
    
    // Step 2: Clear any previous error messages
    setErrorMessage('');

    // try-catch: handles errors gracefully (if API fails, we catch the error)
    try {
      // Step 3: Build the API endpoint (URL) based on whether user is searching
      // Ternary operator: condition ? ifTrue : ifFalse
      const endpoint = query 
        // If there's a search query, use the search endpoint
        // encodeURIComponent: makes the query URL-safe (replaces spaces with %20, etc.)
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        // If no query, get popular movies sorted by popularity
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      // Step 4: Make the API request
      // fetch: sends an HTTP request to the endpoint
      // await: pauses here until the response comes back (doesn't freeze the UI)
      const response = await fetch(endpoint, API_OPTIONS)

      // Step 5: Check if the request was successful
      // response.ok is true for status codes 200-299 (success)
      // ! means "not", so this checks if response is NOT ok
      if (!response.ok) {
        // throw: creates an error that gets caught by the catch block below
        throw new Error('failed to get movies');
      }

      // Step 6: Convert the response to JavaScript object
      // .json() parses the JSON string into an object we can use
      const data = await response.json();

      // Step 7: Log the data to console (for debugging - you can see it in browser dev tools)
      console.log(data);

      // Step 8: Check if the API returned an error message
      // This is specific to some API responses that return success but with error data
      if (data.response == 'False') {
        // Set the error message from API or use a default message
        setErrorMessage(data.Error || 'Failed to fetch movies');
        // Clear the movie list since we got an error
        setMovieList([]);
        // return: exits the function early
        return;
      }

      // Step 9: Update our movie list with the results
      // data.results is an array of movie objects from the API
      // || [] means "or empty array" (if results is undefined, use empty array)
      setMovieList(data.results || [])

    } catch (error) {
      // This runs if anything in the try block throws an error
      // Could be network error, API error, etc.
      console.log(`Error fetching movies: ${error}`)
      // Set a user-friendly error message
      setErrorMessage('Error fetching movies. Please Try Again.');
    } finally {
      // This ALWAYS runs, whether try succeeded or catch ran
      // Turn off loading spinner since we're done (success or failure)
      setIsLoading(false);
    }
  }

  // ============================================
  // SIDE EFFECT - Runs when debouncedSearchTerm changes
  // ============================================
  
  // useEffect: runs code when component loads or when dependencies change
  // First argument: function to run
  // Second argument: [dependencies] - run when these values change
  useEffect( () => {
    // When debouncedSearchTerm changes (user stopped typing), fetch movies
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])  // Dependency array: only re-run when this value changes

  // ============================================
  // RENDER - What gets displayed on the screen (JSX/HTML-like code)
  // ============================================
  
  // return: sends back JSX that React converts to HTML
  return (
    // <main>: main content container (semantic HTML)
    // className: like class in HTML, but JSX uses className
    // bg-[url()]: Tailwind CSS for background image
    // bg-cover: makes background image cover entire area
    // bg-center: centers the background image
    // bg-fixed: keeps background fixed when scrolling
    // min-h-screen: minimum height of 100% of screen height
    <main className="bg-[url('./background.png')] bg-cover bg-center bg-fixed min-h-screen">
      
      {/* Empty div for decorative pattern overlay */}
      <div className="pattern"/>
      
      {/* Main content wrapper */}
      <div className='wrapper'>
        
        {/* ============================================ */}
        {/* HEADER SECTION - Top of the page */}
        {/* ============================================ */}
        <header>
          
          {/* Hero banner image - decorative image at top */}
          <img src="./recommendations.png" alt="Hero Banner"/>
          
          {/* Main heading - <span> lets us style part of the text differently */}
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy Without The Hastle</h1>
          
          {/* Search component - we pass props (data) to it */}
          {/* searchTerm: current value to display in search box */}
          {/* setSearchTerm: function to update searchTerm when user types */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* ============================================ */}
        {/* MOVIE LIST SECTION - Shows all the movies */}
        {/* ============================================ */}
        <section className='all-movies'>
          
          {/* Section heading, mt-[40px] = margin-top of 40 pixels */}
          <h2 className='mt-[40px]'>All Movies</h2>

          {/* CONDITIONAL RENDERING - Shows different things based on state */}
          {/* JavaScript inside JSX must be in curly braces {} */}
          {/* Ternary operator: condition ? ifTrue : ifFalse */}
          
          {isLoading ? (
            // If isLoading is true, show the spinner (loading animation)
            <Spinner/>
          ) : errorMessage ? (
            // If there's an error message, show it in red text
            <p className="text-red-50">{errorMessage}</p>
          ) : (
            // Otherwise, show the list of movies
            <ul>
              {/* .map(): loops through each movie in movieList array */}
              {/* For each movie, create a MovieCard component */}
              {movieList.map((movie) => (
                // key: unique identifier (React needs this for performance)
                // movie: pass entire movie object to the MovieCard component
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App