import React from "react";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

// Reusable Action Buttons Component
const ActionButtons = ({ showEdit = true, showDelete = true }) => {
  return (
    <div className="action-icons">
      {showEdit && <MdEditNote className="icon edit-icon" />}
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
