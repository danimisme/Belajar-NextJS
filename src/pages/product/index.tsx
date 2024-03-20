import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { push } = useRouter();

  const { data, error, isLoading } = useSWR("/api/product", fetcher);

  return (
    <div>
      <ProductView products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default ProductPage;
