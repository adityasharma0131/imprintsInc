import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { HashLink as Link } from "react-router-hash-link";
import { toast } from "react-hot-toast"; // Importing react-hot-toast
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  // Fetch categories and subcategories from the backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Update subcategories when a category is selected
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Find the selected category and its subcategories
    const categoryData = categories.find(
      (cat) => cat.name === selectedCategory
    );
    setSubcategories(categoryData ? categoryData.subcategories : []);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    formData.append("features", features);

    // Append images to FormData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);

        // Show success toast
        toast.success("Product added successfully!");

        // Redirect to /product-operation
        navigate("/product-operation");

        // Optionally reset form fields
      } else {
        console.error("Error adding product:", response.statusText);
        toast.error("Failed to add product. Please try again."); // Show error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/product-operation">
              Products Listing Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add Product</span>
          </h1>
        </div>
      </div>

      <div className="add-product">
        <form className="add-product-form" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="product-form-input"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className="product-form-select"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          {subcategories.length > 0 && (
            <div className="form-group">
              <label htmlFor="subcategory" className="form-label">
                Sub Category
              </label>
              <select
                name="subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="product-form-select"
                required
              >
                <option value="" disabled>
                  Select subcategory
                </option>
                {subcategories.map((subcat, index) => (
                  <option key={index} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Image Inputs */}
          <div className="form-group">
            <label htmlFor="images" className="form-label">
              Upload Product Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="product-form-input-file"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="form-quill"
            />
          </div>

          {/* Features */}
          <div className="form-group">
            <label htmlFor="features" className="form-label">
              Features
            </label>
            <ReactQuill
              theme="snow"
              value={features}
              onChange={setFeatures}
              className="form-quill"
            />
          </div>

          <button type="submit" className="btn-submit">
            Add Product +
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
