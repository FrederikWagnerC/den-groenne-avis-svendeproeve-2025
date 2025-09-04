import { NavLink } from "react-router";


export const ProductCard = ({ name, description, image, slug, category, price }) => {


    // console.log(URL.createObjectURL(data));

    return (
        <>
            <div className="flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex-1 group">
                <NavLink to={`/produkter/${category.slug}/${slug}`} className="block">
                    <div className="relative overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-54 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-darkgreen/50 text-white p-2 px-4 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                            <p>Pris: {price} kr</p>
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{name}</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{description}</p>
                        <div className="flex justify-between items-center mt-auto">
                        </div>
                    </div>
                </NavLink>
            </div>
        </>
    );
}