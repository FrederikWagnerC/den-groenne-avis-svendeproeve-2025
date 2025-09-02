import { useParams } from "react-router";
import { useFetch } from "../../utils/fetch/fetch";
import { ProductCard } from "../../components/productCard/productCard.component";
import { ProductCardSection } from "../../components/productCardSection/productCardSection.component";


export const ProductsPage = () => {
    const { categorySlug } = useParams();




    if (categorySlug) {
        const { data, error, isLoading } = useFetch(`api/categories/${categorySlug}`);

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
            <>
                {data && <ProductCardSection type='category' products={data.categoryProducts} />}
            </>

        )
    } else {
        const { data, error, isLoading } = useFetch('api/products')
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return (
             <>

                {data && <ProductCardSection type='all' products={data} />}
            </>

        );
    }
};