import React from "react";
import PropTypes from "prop-types";

export default function CustomPopup({ message, isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="custom-popup bg-primary text-white py-2 px-4 rounded-md shadow-md">
      <p>{message}</p>
    </div>
  );
}

CustomPopup.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
