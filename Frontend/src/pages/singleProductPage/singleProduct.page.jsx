import { useParams } from "react-router"
import { SingleProductComponent } from "../../components/singleProduct/singleProduct.component";
import { ProductCategoryNav } from "../../components/productCategoryNav/productCategoryNav.component";
import { GreenLineComponent } from "../../components/greenLine/greenLine.component";


export const SingleProductPage = () => {
    const { productId } = useParams();

    return (
        <>
            <GreenLineComponent />
            <div className="flex flex-row">

                <ProductCategoryNav />
                <SingleProductComponent />
            </div>
            <GreenLineComponent />

        </>
    )
}
