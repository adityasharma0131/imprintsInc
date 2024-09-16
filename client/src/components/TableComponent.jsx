import React from "react";

// Table component with default parameters
const Table = ({
  columns = [],
  data = [],
  emptyMessage = "No data available",
}) => {
  return (
    <table className="modern-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column] || "N/A"}</td>
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

export default Table;
