import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { HashLink as Link } from "react-router-hash-link";
const EditContact = () => {
  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/social-operation">
              Socials Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Edit Contact</span>
          </h1>
        </div>
      </div>

      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit User</h1>
          </div>

          {/* Form for adding a new user */}
          <form>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="dash-input"
                      placeholder="Enter name"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="dash-input"
                      placeholder="Enter email"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      className="dash-input"
                      placeholder="Enter address"
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Edit +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditContact;
