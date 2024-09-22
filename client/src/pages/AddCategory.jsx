import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";

const AddCategory = () => {
  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/product-operation">
              Products Listing Page
            </Link>
            <IoIosArrowForward className="arrow-icon" />
            <span className="dash-head2">Add Category</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
