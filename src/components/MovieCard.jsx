// ============================================
// MOVIE CARD COMPONENT - Displays a single movie's information
// ============================================

// Import React library
import React from 'react'

// DESTRUCTURING - Unpacking values from objects
// Instead of: const MovieCard = (props) => { const movie = props.movie; }
// We use destructuring to extract movie from props immediately
// Then we FURTHER destructure movie to extract its properties
// This is like opening nested boxes to get to the values inside
const MovieCard = ({ movie: { 
    title,              // Movie name (string)
    vote_average,       // Rating score (number like 7.5)
    poster_path,        // URL path to poster image (string)
    release_date,       // Release date (string like "2024-05-15")
    original_language   // Language code (string like "en" for English)
  } }) => {
  
  // ============================================
  // RENDER - The movie card UI
  // ============================================
  return (
    // Main container for the movie card
    <div className='movie-card'>
      
      {/* ============================================ */}
      {/* MOVIE POSTER IMAGE */}
      {/* ============================================ */}
      
      {/* Conditional src: if poster_path exists, build full URL, otherwise use placeholder */}
      {/* Ternary: condition ? ifTrue : ifFalse */}
      {/* Template literal: `text ${variable}` allows embedding variables in strings */}
      {/* w500: width of 500px for the image from TMDB */}
      <img 
        src={poster_path 
          ? `https://image.tmdb.org/t/p/w500/${poster_path}` 
          : `/No-Poster.png`
        }
        alt={title} // alt text for accessibility (screen readers for visually impaired)
      />
      
      {/* Container for text content, mt-4 = margin-top (spacing from image) */}
      <div className='mt-4'>
        
        {/* Movie title in heading 3 */}
        {/* {title} - curly braces output the JavaScript variable value */}
        <h3>{title}</h3>

        {/* Container for movie metadata (rating, language, year) */}
        <div className='content'>
          
          {/* ============================================ */}
          {/* RATING DISPLAY */}
          {/* ============================================ */}
          <div className='rating'>
            {/* Star icon */}
            <img src="Rating.svg" alt="Star Icon" />
            
            {/* Rating number with conditional formatting */}
            {/* .toFixed(1): rounds number to 1 decimal place (7.543 becomes "7.5") */}
            {/* If vote_average exists, show formatted rating, otherwise show 'N/A' */}
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          {/* Bullet point separator (black square) */}
          <span>◼</span>
          
          {/* ============================================ */}
          {/* LANGUAGE CODE */}
          {/* ============================================ */}
          {/* Display language code like "en" or "es" */}
          <p className='lang'>{original_language}</p>
          
          {/* Another bullet separator */}
          <span>◼</span>
          
          {/* ============================================ */}
          {/* RELEASE YEAR */}
          {/* ============================================ */}
          {/* Extract year from full date */}
          {/* .split('-'): splits "2024-05-15" into ["2024", "05", "15"] */}
          {/* [0]: gets first element (the year) */}
          {/* If release_date exists, extract year, otherwise show 'N/A' */}
          <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

// Export this component so other files can import and use it
export default MovieCard