import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [enteredInp, setEnteredInp] = useState({
    title: "",
    imgURL: "",
    description: "",
    price: "",
  });

  const inpChangeHandler = (event) => {
    setEnteredInp({
      ...enteredInp,
      [event.target.name]: event.target.value,
    });
  };

  // Function for handling post request
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: enteredInp.title,
          imgURL: enteredInp.imgURL,
          description: enteredInp.description,
          price: enteredInp.price,
        }),
      });

      if (!response.ok) {
        // Handle the case when the server returns an error status code
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const product = await response.json();
      if (product) {
        navigate("/");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const isFormValid = Object.values(enteredInp).every(
    (value) => value.trim() !== ""
  );

  return (
    <>
      <main className="w-full">
        <section className="py-8 w-4/5 mx-auto">
          <h2 className="text-center text-[#4280EA] text-3xl font-semibold mb-4 tracking-wider">
            Add Product
          </h2>

          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col gap-2 w- bg-[#f6f6f6] px-6 py-4 rounded shadow-md"
          >
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-base sm:text-xl font-medium text-[#E74133]"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={enteredInp.title}
                onChange={inpChangeHandler}
                placeholder="Enter your title"
                className="w-full px-3 py-1 my-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="imgURL"
                className="text-base sm:text-xl font-medium text-[#E74133]"
              >
                Image URL
              </label>
              <input
                type="text"
                name="imgURL"
                id="imgURL"
                value={enteredInp.imgURL}
                onChange={inpChangeHandler}
                placeholder="Enter your image URL"
                className="w-full px-3 py-1 my-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-base sm:text-xl font-medium text-[#E74133]"
              >
                Description
              </label>
              <textarea
                type="description"
                name="description"
                id="description"
                rows="4"
                value={enteredInp.description}
                onChange={inpChangeHandler}
                className="resize-y w-full px-3 py-1 my-2"
                placeholder="Enter your product description is here.."
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="price"
                className="text-base sm:text-xl font-medium text-[#E74133]"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={enteredInp.price}
                onChange={inpChangeHandler}
                placeholder="$12.9"
                className="w-full px-3 py-1 my-2"
              />
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 ease-linear delay-150 w-fit px-4 py-1 text-white rounded-sm"
            >
              Add Product
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddProduct;
