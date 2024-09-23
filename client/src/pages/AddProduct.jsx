import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { HashLink as Link } from "react-router-hash-link";

const AddProduct = () => {
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

      <div className="product-listing">
        <ReactQuill theme="snow" />
      </div>
    </>
  );
};

export default AddProduct;
