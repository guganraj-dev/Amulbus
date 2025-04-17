import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Buslist from './Buslist';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.results || []; // Get results from navigation state

    return (
        <div className="search-results-container">
        <button className="search-back-btn" onClick={() => navigate('/homepage')}>
          Go Back
        </button>
  
        {results.length > 0 ? (
          <Buslist available={results} />
        ) : (
          <h3 className="search-no-results">No Buses Found</h3>
        )}
      </div>
    );
};

export default Results;