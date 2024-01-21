import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = ({ userId }) => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [img, setimg] = useState("");
  const [category, setCategory] = useState("TSHIRT");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [avlQty, setAvlQty] = useState("");
  const [error, seterror] = useState(false);

  const handleChange = (e) => {
    if (e.target.name == "title") {
      settitle(e.target.value);
    } else if (e.target.name == "desc") {
      setdesc(e.target.value);
    } else if (e.target.name == "img") {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
        setimg(reader.result);
      }
      reader.onerror = err =>{
        console.log("Error: ",err);
        seterror(true);
      }
    } else if (e.target.name == "category") {
      setCategory(e.target.value);
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "avlQty") {
      setAvlQty(e.target.value);
    } else if (e.target.name == "size") {
      const options = [...e.target.selectedOptions];
      const values = options.map((option) => option.value);
      setSizes(values);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resBody = {
      title,
      desc,
      img,
      category,
      sizes,
      color:color.toLowerCase(),
      price,
      avlQty,
      userId,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/seller/addProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    const a = await res.json();
    if (res.status == "201") {
      toast.success(a.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(a.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <div className="overflow-x-auto mx-0 min-w-fit lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-visible">
                <form
                  className="max-w-sm mx-auto"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      value={title}
                      onChange={handleChange}
                      name="title"
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Green Bat-Man Hoodie"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <input
                      value={desc}
                      name="desc"
                      onChange={handleChange}
                      type="text"
                      id="desc"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="user_avatar"
                    >
                      Upload Picture
                    </label>
                    <input
                      name="img"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                      accept="image/*"
                      required
                    />
                    <div
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="user_avatar_help"
                    >
                      Please select the images in the format of .png,.jpeg.
                    </div>
                    {error && <p className="text-red-700 text-sm">Please choose a supported image.</p>}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select your apparel category
                      <select
                        required
                        value={category}
                        onChange={handleChange}
                        name="category"
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="TSHIRT">TSHIRT</option>
                        <option value="BOTTOM">BOTTOM</option>
                        <option value="FOOTWEAR">FOOTWEAR</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="Size"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Available Sizes
                      <select
                        required
                        multiple
                        value={sizes}
                        onChange={handleChange}
                        name="size"
                        id="size"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="7">7 - (Only For FootWear)</option>
                        <option value="8">8 - (Only For FootWear)</option>
                        <option value="9">9 - (Only For FootWear)</option>
                        <option value="10">10 - (Only For FootWear)</option>
                      </select>
                    </label>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="color"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      name="color"
                      value={color}
                      onChange={handleChange}
                      type="text"
                      id="color"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Black, White, Green, etc"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      name="price"
                      value={price}
                      onChange={handleChange}
                      type="number"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="599"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="availableQty"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Available Quantity
                    </label>
                    <input
                      name="avlQty"
                      value={avlQty}
                      onChange={handleChange}
                      type="number"
                      id="availableQty"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="50"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
