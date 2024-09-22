import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";
const AddUsers = () => {
  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">
            <Link className="dash-head1" to="/user-operation">
              Users Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add User</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
