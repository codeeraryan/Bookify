import React, { useState, useEffect } from 'react'
import { usefirebase } from '../context/Firebase';
import { SlCloudUpload } from "react-icons/sl";
import { FaBookMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function AddListing() {
    const [name, SetName] = useState("");
    const [isbn, SetIsbn] = useState("");
    const [price, SetPrice] = useState("");
    const [coverPic, SetCoverPic] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [previewError, setPreviewError] = useState("");

    const firebase = usefirebase();
    const navigate = useNavigate();

    const handleFormSubmit = async(evt) => {
        evt.preventDefault();
        if (!firebase.isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            await firebase.handleCreateNewListing(name, isbn, price, coverPic);
            // Reset form after successful submission
            SetName("");
            SetIsbn("");
            SetPrice("");
            SetCoverPic("");
            setImgUrl("");
        } catch (error) {
            console.error("Error creating listing:", error);
        }
    }

    const handleFileChange = (evt) => {
        const file = evt.target.files[0];
        
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            setPreviewError("Invalid file type. Please upload JPEG, PNG, or GIF.");
            return;
        }

        if (file.size > maxSize) {
            setPreviewError("File is too large. Maximum size is 5MB.");
            return;
        }

        SetCoverPic(file);
        setImgUrl(URL.createObjectURL(file));
        setPreviewError("");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-3xl overflow-hidden">
                {/* Form Section */}
                <div className="p-10 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <FaBookMedical className="mx-auto text-5xl text-purple-600 mb-4" />
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Add New Book Listing
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Share your book with the world
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="bookName" className="sr-only">Book Name</label>
                            <input
                                id="bookName"
                                type="text"
                                required
                                value={name}
                                onChange={(evt) => SetName(evt.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                placeholder="Book Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="isbn" className="sr-only">ISBN Number</label>
                            <input
                                id="isbn"
                                type='number'
                                required
                                value={isbn}
                                onChange={(evt) => SetIsbn(evt.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                placeholder="ISBN Number"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="sr-only">Price</label>
                            <input
                                id="price"
                                type="number"
                                required
                                value={price}
                                onChange={(evt) => SetPrice(evt.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                placeholder="Price"
                            />
                        </div>

                        <div>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-gray-600">
                                        <label 
                                            htmlFor="file-upload" 
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                                        >
                                            <span>Upload a cover photo</span>
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                type="file" 
                                                className="sr-only" 
                                                accept="image/gif, image/jpeg, image/png"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>
                            </div>
                            
                            {previewError && (
                                <p className="mt-2 text-sm text-red-600">{previewError}</p>
                            )}

                            {imgUrl && (
                                <div className="mt-4 flex justify-center">
                                    <img 
                                        src={imgUrl} 
                                        alt="Preview" 
                                        className="h-40 w-auto object-contain rounded-md shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Create Listing
                            </button>
                        </div>
                    </form>
                </div>

                {/* Image Section */}
                <div className="hidden md:block bg-cover bg-center relative">
                    <img 
                        src='/images/doggy2.gif' 
                        alt="Decorative" 
                        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
                    />
                </div>
            </div>
        </div>
    )
}

export default AddListing