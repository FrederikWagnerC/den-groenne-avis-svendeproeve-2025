


import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth.provider";
import { useFetch } from "../../utils/fetch/fetch";

export const CreateProductComponent = ({ onProductCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        categoryId: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { loginData } = useAuth();
    
    // Fetch categories for dropdown
    const { data: categories, error: categoriesError, loading: categoriesLoading } = useFetch("api/categories");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const token = loginData.accessToken;
        if (!token) {
            alert("Du skal være logget ind for at oprette produkter.");
            return;
        }

        // Validate required fields
        if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.categoryId) {
            alert("Alle felter skal udfyldes.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    image: formData.image.trim(),
                    description: formData.description.trim(),
                    price: parseInt(formData.price),
                    categoryId: parseInt(formData.categoryId)
                })
            });

            if (response.ok) {
                const newProduct = await response.json();
                
                // Clear form
                setFormData({
                    name: "",
                    image: "",
                    description: "",
                    price: "",
                    categoryId: ""
                });

                // Call callback if provided
                if (onProductCreated) {
                    onProductCreated(newProduct);
                }

                alert("Produkt oprettet succesfuldt!");
            } else {
                const errorData = await response.text();
                console.log('Error response:', errorData);
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Der opstod en fejl ved oprettelse af produktet. " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-medium text-green-600 mb-2">Opret ny annonce</h1>
                <p className="text-sm text-gray-600">
                    Her kan du oprette en ny annonce.<br />
                    Du har mulighed for at slette dine annoncer igen under "min konto" siden
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Titel
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Skriv på dit produkt..."
                        className="w-full p-3 border-2 border-green-400 focus:outline-none focus:border-green-600 text-gray-700 placeholder-gray-400"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-green-400 focus:outline-none focus:border-green-600 text-gray-700 bg-white"
                        required
                    >
                        <option value="">Hvilken kategori tilhører dit produkt...</option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Annonce tekst
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Skriv en annonce tekst her der beskriver produktet"
                        className="w-full h-32 p-3 border-2 border-green-400 resize-none focus:outline-none focus:border-green-600 text-gray-700 placeholder-gray-400"
                        rows={4}
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        URL til billede
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Her skal du tilføje som ligger en direkte link til et online billede på URL her"
                        className="w-full p-3 border-2 border-green-400 focus:outline-none focus:border-green-600 text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Pris
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Pris..."
                        className="w-full p-3 border-2 border-green-400 focus:outline-none focus:border-green-600 text-gray-700 placeholder-gray-400"
                        min="0"
                        step="1"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 font-medium transition-colors duration-200 min-w-[120px]"
                    >
                        {isSubmitting ? "Opretter..." : "Opret"}
                    </button>
                </div>
            </form>
        </div>
    );
};