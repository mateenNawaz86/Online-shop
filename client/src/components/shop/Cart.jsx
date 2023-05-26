import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../../state/cartSlice";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const deleteCartItemHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
    console.log("Cart item deleted:", itemId);
  };

  return (
    <>
      <main className="py-4 md:py-8">
        <section className="w-4/5 mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center bg-[#fff] py-2 px-4 rounded shadow-md"
            >
              <img src={item.product.imgURL} alt="Cart item" />
              <div>
                <h3>{item.product.title}</h3>
                <p>${item.product.price}</p>
              </div>
              <MdDeleteForever
                className="text-xl font-medium text-[#DF2C2B] cursor-pointer"
                onClick={() => deleteCartItemHandler(item.product._id)}
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Cart;
