import React from "react";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { HashLink as Link } from "react-router-hash-link";

const ActionButtons = ({ editLink, showEdit, showDelete }) => {
  return (
    <div className="action-icons">
      {/* Conditionally render the edit icon and link */}
      {showEdit && editLink && (
        <Link to={editLink}>
          <MdEditNote className="icon edit-icon" />
        </Link>
      )}
      {/* Conditionally render the delete icon */}
      {showDelete && <AiFillDelete className="icon delete-icon" />}
    </div>
  );
};

// Reusable Table Component
const Table = ({ headers, data, renderRow, loading, noDataMessage }) => {
  return (
    <table className="modern-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={headers.length}>Loading...</td>
          </tr>
        ) : data.length > 0 ? (
          data.map((item) => renderRow(item))
        ) : (
          <tr>
            <td colSpan={headers.length}>{noDataMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export { Table, ActionButtons };
