import { useParams } from "react-router";
import { useFetch } from "../../utils/fetch/fetch";
import { ProductCardSection } from "../../components/productCardSection/productCardSection.component";
import { ProductCategoryNav } from "../../components/productCategoryNav/productCategoryNav.component";
import { GreenLineComponent } from "../../components/greenLine/greenLine.component";


export const ProductsPage = () => {
    const { categorySlug } = useParams();




    if (categorySlug) {
        const { data, error, isLoading } = useFetch(`api/products/category/${categorySlug}`);


        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
            <>
                <GreenLineComponent />

                <div className="flex flex-row mx-auto">
                    <ProductCategoryNav />
                    {data && <ProductCardSection type='category' products={data} />}
                </div>
            </>

        )
    } else {
        const { data, error, isLoading } = useFetch('api/products')
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return (
            <>
                <GreenLineComponent />
                <div className="flex flex-row">
                    <ProductCategoryNav />
                    {data && <ProductCardSection type='all' products={data} />}
                </div>

            </>
        );
    }
};