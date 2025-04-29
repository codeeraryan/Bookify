import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usefirebase } from '../../context/Firebase';

export default function SearchResult() {
    const location = useLocation();
    const firebase = usefirebase();
    const { results } = location.state || {};
    const [searchResults, setSearchResults] = useState([]);
    const [bookImages, setBookImages] = useState({});

    useEffect(() => {
        if (results) {
            setSearchResults(results);
            
            // Load all book images
            const loadImages = async () => {
                const imagePromises = {};
                
                for (const book of results) {
                    if (book.imageURL) {
                        imagePromises[book.imageURL] = firebase.getImageUrl(book.imageURL);
                    }
                }
                
                // Resolve all promises and update state
                const images = {};
                for (const [imageURL, promise] of Object.entries(imagePromises)) {
                    try {
                        images[imageURL] = await promise;
                    } catch (error) {
                        console.error("Error loading image:", error);
                        images[imageURL] = '/images/bookSymbol.png'; // Fallback image
                    }
                }
                
                setBookImages(images);
            };
            
            loadImages();
        }
    }, [results, firebase]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Results</h1>
                
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((book, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={bookImages[book.imageURL] || '/images/bookSymbol.png'} 
                                        alt={book.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.name}</h2>
                                    <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>
                                    <p className="text-gray-600 mb-1">Price: ${book.price}</p>
                                    <div className="flex items-center mt-3">
                                        <img 
                                            src={book.userPhoto || '/images/bookSymbol.png'} 
                                            alt={book.userName} 
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span className="text-sm text-gray-600">{book.userName}</span>
                                    </div>
                                </div>
                            </div>
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