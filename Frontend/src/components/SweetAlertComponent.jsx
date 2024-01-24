import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlertComponent = ({ title, text, icon, confirmButtonText, position, timer ,background ,color}) => {
  const showAlert = () => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      position,
      timer,
      showConfirmButton: timer ? false : true, // Hide the "OK" button when using a timer
      background,
      color,
    });
  };

  // Trigger showAlert when the component mounts
  useEffect(() => {
    showAlert();
  }, []);

  return null; // SweetAlertComponent doesn't render any visible content
};

export default SweetAlertComponent;
