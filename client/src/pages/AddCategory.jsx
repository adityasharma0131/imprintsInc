import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";

const AddCategory = () => {
  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">
            <Link className="dash-head" to="/product-operation">
              Products Page
            </Link>
            <IoIosArrowForward />
            Add Category
          </h1>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
