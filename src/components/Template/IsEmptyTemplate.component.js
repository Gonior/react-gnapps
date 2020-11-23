import React from "react";
const IsEmptyContent = ({ colspan }) => {
  return (
    <tr>
      <td colSpan={colspan} className="text-center">
        <h1>Is Empty</h1>
      </td>
    </tr>
  );
};
export default IsEmptyContent;
