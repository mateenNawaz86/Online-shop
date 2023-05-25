import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const productHandler = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <>
      <main className="py-8 w-11/12  m-auto">
        <section className="max-w-eighty m-auto mb-12">
          <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-14">
            Products
          </h1>

          {!data ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {data.map((item, index) => {
                return (
                  <div
                    className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <img
                      className="p-8 rounded-t-lg"
                      src={item.imgURL}
                      alt="product"
                    />

                    <div className="px-5 pb-5">
                      <h5 className="text-xl font-normal tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>

                      <p>{item.description}</p>

                      <div className="flex items-center mt-2.5 mb-5">
                        <span className="text-1xl font-bold text-gray-900 dark:text-white">
                          ${item.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => productHandler(item._id)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Detail
                        </button>
                        <Link
                          to="/add-to-cart"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <hr />
      </main>
    </>
  );
};

export default Products;
