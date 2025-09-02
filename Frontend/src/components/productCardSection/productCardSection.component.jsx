import { ProductCard } from "../productCard/productCard.component";
import { useFetch } from "../../utils/fetch/fetch";


export const ProductCardSection = ({ products, type }) => {
    if (products.length % 2 !== 0) {
        const placeholderProduct = { id: 'placeholder', name: 'Placeholder', image: 'placeholder.jpg', price: 0, type: 'placeholder' };
        products.push({placeholderProduct});
    }


    

    if (type === 'category') {
        return (
            <div className="flex flex-wrap gap-4 px-4 justify-center">
                {products && products.map((product) => (
                    <>
                    
                        {product.placeholderProduct ? (
                            <ProductCard key={type} type='placeholder' />
                        ) : (
                            <ProductCard key={product.products.id} {...product.products} />
                        )}
                    </>
                ))}
            </div>
        );
    } else if (type === 'all') {
        return (
            <div className="flex flex-wrap gap-4 px-4 justify-center">
                {products && products.map((product) => {
                    const { data, error, isLoading } = useFetch(`api/products/${product.id}`);
                    console.log(data);
                    return <ProductCard key={product.id} {...product} />;
                })}
            </div>
        );
    }

}