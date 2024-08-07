import { useState } from "react";
import { useRouter } from "next/navigation";

const BuyForm = ({ book, closeModal }) => {
   const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    email: "",
    quantity: 1,
    paymentMethod: "",
    book: book.title,
    price: book.price,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);

        // Remove the ordered book from the cart in localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCartItems = cartItems.filter(
          (item) => item.title !== book.title
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
    setTimeout(() => {
      closeModal();
    }, 3000);
    router.push("/");
     // Close modal after submission
  };

  return (
    <div className="p-4 h-[400px] overflow-auto">
      {showAlert && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>Order placed successfully!</p>
        </div>
      )}
      <div className="w-full flex justify-end">
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white w-6 h-6 rounded-xl"
        >
          X
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Buy {book.title}</h2>
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div className="flex-1">
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <label className="block mb-2">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-2 w-full"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyForm;
