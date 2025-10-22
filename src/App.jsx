// src/App.jsx
import Header from './components/Header';
import PodcastGrid from './components/PodcastGrid';

/**
 * Main App component - The root component of the podcast explorer application.
 * 
 * This component serves as the main container for the entire application,
 * rendering the header and the podcast grid. It follows a simple composition
 * pattern where the main functionality is delegated to child components.
 * 
 * @component
 * @returns {JSX.Element} The rendered application with header and podcast grid
 * 
 * @example
 * // The App component is typically rendered in main.jsx
 * <App />
 */
function App() {
  return (
    <div className="App">
      <Header />
      <PodcastGrid />
    </div>
  );
}

export default App;