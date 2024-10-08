import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const navigate = useNavigate(); // For navigation after successful submission

  // State for product details
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching categories"); // Error toast
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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
    setSubcategory(""); // Reset subcategory when category changes
  };

  // Fetch product details for editing
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const product = await response.json();
        setProductName(product.name);
        setCategory(product.category);
        setSubcategory(product.subcategory);
        setDescription(product.description);
        setFeatures(product.features);
        setImages(product.images);

        const categoryData = categories.find(
          (cat) => cat.name === product.category
        );
        if (categoryData) {
          setSubcategories(categoryData.subcategories);
        }
      } catch (error) {
        toast.error("Error fetching product"); // Error toast
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      console.error("Product ID is undefined");
    }
  }, [id, categories]);

  // Handle image change
  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    formData.append("features", features);

    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      toast.success("Product updated successfully!"); // Success toast
      navigate("/product-operation");
    } catch (error) {
      toast.error("Error updating product"); // Error toast
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Toaster /> {/* Toast notification container */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/product-operation">
              Products Listing Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Edit Product</span>
          </h1>
        </div>
      </div>
      <div className="add-product">
        <form className="add-product-form" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              id="productName" // Match label "for" attribute
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
              id="category" // Match label "for" attribute
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
                Subcategory
              </label>
              <select
                id="subcategory" // Match label "for" attribute
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
            <label htmlFor="image0" className="form-label">
              Upload Images
            </label>
            {images.map((image, index) => (
              <div key={index} className="image-upload">
                <input
                  type="file"
                  id={`image${index}`} // Ensure id matches the label's for attribute
                  name={`image${index + 1}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="product-form-input-file"
                />
                {image && typeof image === "string" && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${image}`}
                    alt={`Current Image ${index + 1}`}
                    style={{ maxWidth: "150px", marginTop: "10px" }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              readOnly
              style={{ display: "none" }} // Hidden textarea for accessibility
            />
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
            <textarea
              id="features"
              value={features}
              readOnly
              style={{ display: "none" }} // Hidden textarea for accessibility
            />
            <ReactQuill
              theme="snow"
              value={features}
              onChange={setFeatures}
              className="form-quill"
            />
          </div>
          <button type="submit" className="btn-submit">
            Edit Product +
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
