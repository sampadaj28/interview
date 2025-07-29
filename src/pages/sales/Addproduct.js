import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { useAddProductMutation } from "../../services/adminApi"; // adjust path as needed

export default function Addproduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const [addProduct, { isLoading }] = useAddProductMutation();
  const token = localStorage.getItem("token");

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!image) newErrors.image = "Product image is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price.trim()) newErrors.price = "Price is required";
    else if (isNaN(price)) newErrors.price = "Price must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);

    try {
      const result = await addProduct({ formData, token }).unwrap();
      alert("Product added successfully");
      setName("");
      setImage(null);
      setDescription("");
      setPrice("");
      setErrors({});
    } catch (error) {
      alert(error?.data?.message || "Failed to add product");
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <h3 className="text-[1.125rem] font-semibold">Add Product</h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-3 text-sm border rounded shadow appearance-none focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-start mt-1">{errors.name} *</p>}
            </div>

            {/* Product Image */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Product Image</label>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
              </label>
              {errors.image && <p className="text-red-500 text-start mt-1">{errors.image} *</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-3 text-sm border rounded shadow appearance-none focus:outline-none"
              />
              {errors.description && <p className="text-red-500 text-start mt-1">{errors.description} *</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-3 text-sm border rounded shadow appearance-none focus:outline-none"
              />
              {errors.price && <p className="text-red-500 text-start mt-1">{errors.price} *</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Link to="/Product" className="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5">Back</Link>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
