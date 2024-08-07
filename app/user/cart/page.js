"use client";
import { useState, useEffect } from "react";
import BuyForm from "../../components/BuyForm";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleBuy = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="p-4 h-[100vh] " >
      {cart.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h2 className="text-2xl font-bold text-center">
            Please add books to cart
          </h2>
        </div>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row  justify-between items-center border-b p-4 gap-4"
          >
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-lg">{item.author}</p>
              <p className="text-lg">${item.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleBuy(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
              >
                Buy
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg">
            <BuyForm book={selectedBook} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
