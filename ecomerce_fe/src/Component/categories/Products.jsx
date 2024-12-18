import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      // Replace with your actual API endpoint
      try {
        const response = await fetch("../../../Electronics.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const foundProduct = data.find((item) => item.id === parseInt(id));
        setproduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  console.log(product);
  const products = product.find((item) => item.id === parseInt(id));
  if (!products) {
    return <p>Product not Found...</p>;
  }
  return (
    <>
      <div>
        <div>
          <h1>{product.type}</h1>
          <p>{product.model}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
    </>
  );
};

export default Products;
