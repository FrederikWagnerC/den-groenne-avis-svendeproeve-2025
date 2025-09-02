import { useImageURLFetch } from "../../utils/fetch/imageURLFetch";
import spinner from "../../assets/spinner.svg";


export const FrontPageCard = ({ image, type, name }) => {
  const { data, loading, error } = useImageURLFetch(image);

  console.log(image)



  if (type === "product") {
    return (
      <div className="relative overflow-hidden group cursor-pointer">
        {loading ? (
          <div className="aspect-square flex items-center justify-center bg-gray-200"><img src={spinner} alt="Loading..." /></div>
        ) : error ? (
          <div className="aspect-square flex items-center justify-center bg-gray-200">Error loading image</div>
        ) : (
          <img className="w-full aspect-square object-cover" src={URL.createObjectURL(data)} alt={name} />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-lightgreen/75 text-white p-2 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <p className="md:text-sm text-xs font-medium text-center">{name}</p>
        </div>
      </div>
    )
  }

  if (type === "category") {
    return (
      <div className="relative">
        {loading ? (
          <div className="aspect-square flex items-center justify-center bg-gray-200"><img src={spinner} alt="Loading..." /></div>
        ) : error ? (
          <div className="aspect-square flex items-center justify-center bg-gray-200">Error loading image</div>
        ) : (
          <img className="w-full aspect-square object-cover" src={URL.createObjectURL(data)} alt={name} />
        )}
        <div className="absolute top-0 left-0 right-0 bg-lightgreen/75 text-white p-2">
          <p className="md:text-sm text-xs font-medium text-center">{name}</p>
        </div>
      </div>
    )
  }
  return (
    <>
    </>
  );
};