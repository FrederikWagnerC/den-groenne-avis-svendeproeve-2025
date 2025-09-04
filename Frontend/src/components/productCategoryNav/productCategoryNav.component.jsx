import { useFetch } from "../../utils/fetch/fetch"
import { NavLink } from "react-router"
import { useParams } from "react-router"


export const ProductCategoryNav = () => {
    const { data, error, isLoading } = useFetch('api/categories')
    const { categorySlug } = useParams();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <nav className=" p-4">
            <h2 className="text-lg font-semibold mb-4">Kategorier</h2>
            <ul className="space-y-2">
                {categorySlug ?
                    <li><NavLink to={`/produkter`} className="text-black hover:text-lightgreen">Alle produkter</NavLink></li>
                    : <li><NavLink to={`/produkter`} className="text-black hover:text-lightgreen font-bold">Alle produkter</NavLink></li>}
                {data && data.map((category) => (
                    <li key={category.id}>
                        {category.slug === categorySlug ? <NavLink to={`/produkter/${category.slug}`} className="text-black hover:text-lightgreen font-bold">
                            {category.name}
                        </NavLink> : <NavLink to={`/produkter/${category.slug}`} className="text-black hover:text-lightgreen">
                            {category.name}
                        </NavLink>}
                    </li>
                ))}
            </ul>
        </nav>
    );
}