import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { HashLink as Link } from "react-router-hash-link";

const EditProduct = () => {
  // State for product details
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  // Handle image change
  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0]; // Update the specific image file
    setImages(files);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("features", features);

    // Append images if available
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    // Call API or handle form submission logic here
    console.log("Submitting product:", {
      name: productName,
      category,
      images,
      description,
      features,
    });
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
            <span className="dash-head2">Edit Product</span>
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
              onChange={(e) => setCategory(e.target.value)}
              className="product-form-select"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>

          {/* Image Inputs */}
          <div className="form-group">
            <label htmlFor="images" className="form-label">
              Upload Images
            </label>
            <input
              type="file"
              name="image1"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 0)}
              className="product-form-input-file"
              required
            />
            <input
              type="file"
              name="image2"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 1)}
              className="product-form-input-file"
            />
            <input
              type="file"
              name="image3"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 2)}
              className="product-form-input-file"
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
            Edit Product +
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
