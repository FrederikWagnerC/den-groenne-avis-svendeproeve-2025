import { useImageFetch } from "../../utils/fetch/imageFetch";
import { NavLink } from "react-router";
import heartSVG from '../../assets/heart.svg';
import { useParams } from "react-router";


export const ProductCard = ({ title, description, imageUrl, slug, type }) => {
    let imageData, imageLoading, imageError;
    if (type !== 'placeholder') {
        const { data, loading, error } = useImageFetch(imageUrl);
        imageData = data;
        imageLoading = loading;
        imageError = error;
    }
    const { categorySlug } = useParams();

    if (imageLoading) return <div>Loading image...</div>;
    if (imageError) return <div>Error loading image: {imageError.message}</div>;

    return (
        <>
            {type === 'placeholder' ? (
                <div className="flex flex-row min-w-[400px] flex-1 placeholder">
                </div>
            ) : (
                <div className="flex flex-row rounded-lg shadow-lg overflow-hidden min-w-[400px] flex-1">

                    <>
                        <img
                            src={URL.createObjectURL(imageData)}
                            alt={title}
                            className="object-cover w-[200px] h-[200px] aspect-square flex-shrink-0"
                        />
                        <div className="p-4 flex justify-between flex-col">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                                <p className="">{description}</p>
                            </div>
                            <div className="flex justify-between">
                                {categorySlug ? (
                                    <NavLink to={`/produkter/${categorySlug}/${slug}`} className="text-darkgrey">
                                        Læs mere
                                    </NavLink>
                                ) : (
                                    <NavLink to={`/produkter/${slug}`} className="text-darkgrey">
                                        Læs mere
                                    </NavLink>
                                )}
                                <button>
                                    Likes <img src={heartSVG} alt="Likes" className="inline-block w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                </div>
            )}
        </>
    );
}