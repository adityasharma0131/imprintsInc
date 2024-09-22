import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";
const AddLogo = () => {
  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/client-operation">
              Gallery Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add Logo</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AddLogo;
