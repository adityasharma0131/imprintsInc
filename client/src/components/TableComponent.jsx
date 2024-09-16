// Table.js
import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, data, emptyMessage }) => {
  return (
    <table className="modern-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>{emptyMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string,
};

Table.defaultProps = {
  emptyMessage: "No data available",
};

export default Table;
