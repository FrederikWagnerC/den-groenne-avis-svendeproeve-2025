import spinner from "../../assets/spinner.svg";
import { NavLink } from "react-router";


export const FrontPageCard = ({ image, type, name, category, slug }) => {

  



  if (type === "product") {
    return (
      <div className="relative overflow-hidden group cursor-pointer">
        <NavLink to={`/produkter/${category}/${slug}`}>
            <img className="w-full aspect-square object-cover" src={image} alt={name} />
          <div className="absolute bottom-0 left-0 right-0 bg-lightgreen/75 text-white p-2 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <p className="md:text-sm text-xs font-medium text-center">{name}</p>
          </div>
        </NavLink>
      </div>
    )
  }

  if (type === "category") {
    return (
      <div className="relative">
        <NavLink to={`/produkter/${slug}`}>

            <img className="w-full aspect-square object-cover" src={image} alt={name} />

          <div className="absolute top-0 left-0 right-0 bg-lightgreen/75 text-white p-2 ">
            <p className="md:text-sm text-xs font-medium text-center underline">{name}</p>
          </div>
        </NavLink>
      </div>
    )
  }
  return (
    <>
    </>
  );
};