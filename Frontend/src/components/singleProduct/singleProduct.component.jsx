import { useParams } from "react-router"
import { useFetch } from "../../utils/fetch/fetch";
import { useImageURLFetch } from "../../utils/fetch/imageURLFetch";
import spinner from '../../assets/spinner.svg';

export const SingleProductComponent = () => {
    const { productSlug } = useParams();

    const product = useFetch(`api/products/${productSlug}`);
    
    console.log(product.data);

    // Add loading and error handling after all hooks are called
    if (product.loading) return <div className="flex justify-center items-center h-64">Loading product...</div>;
    if (product.error) return <div className="text-red-500 text-center">Error loading product: {product.error.message}</div>;
    if (!product.data) return <div className="text-center">No product data found</div>; 

    const { name, image, price, description, procedure, productIngredients} = product.data;

    return <SingleProductContent 
        name={name}
        image={image}
        price={price}
        description={description}
        procedure={procedure}
        productIngredients={productIngredients}
    />;
};

const SingleProductContent = ({ name, image, price, description, procedure, productIngredients }) => {
    const { data: imageData, loading: imageLoading, error: imageError } = useImageURLFetch(image);
    
    console.log(image);

    if (imageLoading) return <div className="flex justify-center items-center h-64"><img src={spinner} alt="Loading..." /></div>;
    if (imageError) return <div className="text-red-500 text-center">Error loading image: {imageError.message}</div>;

    return (
        <div className=" mx-auto overflow-hidden">
            {/* Product Image */}
            <div className="w-full h-128 bg-gray-50">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="py-6 flex flex-col gap-4">
                <h2 className="text-3xl font-medium text-black">{name}</h2>

                <p className="text-sm text-lightgray leading-relaxed">{description}</p>



                <div className="">
                    <div className="text-lg font-bold text-lightgreen">
                        Pris: {price} kr
                    </div>
                </div>
            </div>
        </div>
    );
};