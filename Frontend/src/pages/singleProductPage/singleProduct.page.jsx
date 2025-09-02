import { useParams } from "react-router"
import { SingleProductComponent } from "../../components/singleProduct/singleProduct.component";


export const SingleProductPage = () => {
    const { productId } = useParams();

    return (
        <div>
            <h1>Single Product Page</h1>
            <SingleProductComponent />
        </div>
    )
}
