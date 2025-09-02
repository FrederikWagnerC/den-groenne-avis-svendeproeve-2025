import { useParams } from "react-router"
import { useFetch } from "../../utils/fetch/fetch";
import { useImageFetch } from "../../utils/fetch/imageFetch";
import { ProductIngredientList } from "../productIngredientList/productIngredientList.component";



export const SingleProductComponent = () => {
    const { productSlug } = useParams();

    const product = useFetch(`api/products/${productSlug}`);
    
    console.log(product.data);

    // Add loading and error handling after all hooks are called
    if (product.loading) return <div>Loading product...</div>;
    if (product.error) return <div>Error loading product: {product.error.message}</div>;
    if (!product.data) return <div>No product data found</div>; 

    const { title, imageUrl, price, description, procedure, productIngredients} = product.data;

    return <SingleProductContent 
        title={title}
        imageUrl={imageUrl}
        price={price}
        description={description}
        procedure={procedure}
        productIngredients={productIngredients}
    />;
};

const SingleProductContent = ({ title, imageUrl, price, description, procedure, productIngredients }) => {
    const { data: imageData, loading: imageLoading, error: imageError } = useImageFetch(imageUrl);
    
    console.log(imageData);

    if (imageLoading) return <div>Loading image...</div>;
    if (imageError) return <div>Error loading image: {imageError.message}</div>;

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <div>
                    <div>
                        <img src={URL.createObjectURL(imageData)} alt={title} />
                        <p>{description}</p>
                    </div>
                    <div>
                        <p>{procedure}</p>
                    </div>
                </div>
                <div>
                    <ProductIngredientList ingredients={productIngredients} />
                </div>
            </div>
            <h3>{price}</h3>
        </div>
    );
};