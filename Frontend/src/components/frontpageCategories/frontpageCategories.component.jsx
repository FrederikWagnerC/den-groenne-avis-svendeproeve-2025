import { FrontPageCard } from "../frontpageCard/frontpageCard.component";
import { useFetch } from "../../utils/fetch/fetch";


export const FrontPageCategories = () => {
  const { data, error, isLoading } = useFetch("api/categories");

  if (isLoading) return <img src={spinner} alt="Loading..." className="mx-auto" />;
    if (error) return <p>Error loading products: {error.message}</p>;
    let featuredCategories;
    if (data) {
      featuredCategories = data
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
  
    }

  return (
    <section className="">
      <h3 className="text-lg font-normal mb-4">Populære kategorier</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {featuredCategories && featuredCategories.map((category) => (
          <FrontPageCard key={category.id} name={category.name} image={category.image} slug={category.slug} type="category" />
        ))}
      </div>
    </section>
  );
};