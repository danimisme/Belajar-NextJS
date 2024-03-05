import { useRouter } from "next/router";

const ShopPage = () => {
  const { query } = useRouter();
  console.log(query);
  return (
    <div>
      <h1>Shop</h1>
      <p>
        Detail Product : {query.slug && query.slug[0]} -
        {query.slug && query.slug[1]} - {query.slug && query.slug[2]}
      </p>
    </div>
  );
};

export default ShopPage;
