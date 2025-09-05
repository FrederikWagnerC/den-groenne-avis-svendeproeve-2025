import { useParams } from "react-router"
import { useFetch } from "../../utils/fetch/fetch";
import { useImageURLFetch } from "../../utils/fetch/imageURLFetch";
import spinner from '../../assets/spinner.svg';
import { CreateCommentComponent } from "../createComment/createComment.component";

export const SingleProductComponent = ({ product }) => {
    const {name, image, description, price} = product;

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

