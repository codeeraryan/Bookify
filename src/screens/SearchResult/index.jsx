import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usefirebase } from '../../context/Firebase';
import BookCard from '../../components/BookCard';

export default function SearchResult() {
    const location = useLocation();
    const firebase = usefirebase();
    const { results } = location.state || {};
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (results) {
            setSearchResults(results);
        }
    }, [results, firebase]);

   
    

    return (
        <div className="min-h-screen  p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Results</h1>
                
                {searchResults.length > 0 ? (
                    <div  className=" md:grid-cols-3  grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((book, index) => (
                                        <BookCard key={index} id={book.id} {...book}/>

                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No results found</p>
                    </div>
                )}
            </div>
        </div>
    );
}