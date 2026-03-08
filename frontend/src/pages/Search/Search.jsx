import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import { Loader2, SearchX } from 'lucide-react';
import api from '../../utils/api';
import './Search.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Need to import token or cart related stuff if the FoodItem relies on them,
    // storeContext provides cart state
    const { url } = useContext(StoreContext);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await api.get(`/api/food/search?q=${encodeURIComponent(query)}`);
                if (response.data.success) {
                    setResults(response.data.data);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="search-page">
            <div className="search-header">
                <h2>Search Results for "{query}"</h2>
                <p>Found {results.length} matches</p>
            </div>

            <div className="search-results-container">
                {isLoading ? (
                    <div className="search-loader">
                        <Loader2 className="spinning-loader" size={50} color="#E23744" />
                        <p>Scanning menu...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="food-display-list">
                        {results.map((item) => (
                            <FoodItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results-state">
                        <SearchX size={80} color="#c2c2c2" />
                        <h2>No items found</h2>
                        <p>We couldn't find any dish matching "{query}". Try checking your spelling or using more generic terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
