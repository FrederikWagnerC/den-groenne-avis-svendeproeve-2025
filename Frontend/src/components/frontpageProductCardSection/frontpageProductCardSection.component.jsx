import { useFetch } from "../../utils/fetch/fetch";
import spinner from '../../assets/spinner.svg';
import { FrontPageCard } from "../frontpageCard/frontpageCard.component";

export const FrontPageProductCardSection = () => {
  const { data, error, isLoading } = useFetch("api/products");

  if (isLoading) return <img src={spinner} alt="Loading..." className="mx-auto" />;
  if (error) return <p>Error loading products: {error.message}</p>;
  let featuredProducts;
  if (data) {
    featuredProducts = data
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

  }


  return (
    <section className="">
      <h3 className="text-lg font-normal mb-4">Udvalgte produkter</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {featuredProducts && featuredProducts.map((product) => (
          <FrontPageCard key={product.id} name={product.name} image={product.image} type="product" />
        ))}
      </div>
    </section>
  );
};