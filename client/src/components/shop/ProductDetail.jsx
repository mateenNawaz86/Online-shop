import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../state/productSlice";
import Spinner from "../../UI/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <main className="py-4 md:py-8">
        <section className="w-4/5 m-auto">
          <article className="flex flex-col">
            <h2 className="text-center text-teal-700 text-xl font-semibold my-3 ">
              {product.title}
            </h2>
            <hr />
            <img src={product.imgURL} alt="product" className="my-4" />
            <p className="text-lg font-semibold text-green-500">
              ${product.price}
            </p>
            <button className="w-fit mt-3 py-2 px-3 text-white bg-green-500 hover:bg-green-700 rounded">
              Add to Cart
            </button>
          </article>
        </section>
      </main>
    </>
  );
};

export default ProductDetail;
