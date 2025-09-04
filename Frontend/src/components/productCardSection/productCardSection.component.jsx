import { ProductCard } from "../productCard/productCard.component";
import { useFetch } from "../../utils/fetch/fetch";
import { useState } from "react";

export const ProductCardSection = ({ products, type }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;


    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    // Calculate pagination
    const totalPages = Math.ceil(products.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-7xl mx-auto mb-8">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 px-4">
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-lightgreen text-white hover:bg-green-600 cursor-pointer'
                        }`}
                    >
                        ← Forrige
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-2 rounded ${
                                        currentPage === page
                                            ? 'bg-lightgreen text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded ${
                            currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-lightgreen text-white hover:bg-green-600 cursor-pointer'
                        }`}
                    >
                        Næste →
                    </button>
                </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
                <div className="text-center text-gray-600 text-sm mt-4">
                    ({products.length} produkter i alt)
                </div>
            )}
        </div>
    );
};