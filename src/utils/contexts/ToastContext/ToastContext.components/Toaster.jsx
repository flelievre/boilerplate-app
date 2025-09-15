import React from 'react';
import {
  ToastContainer,
} from 'react-toastify';

const Toaster = ({ themeName = 'light' } = {}) => (
  <ToastContainer theme={themeName} style={{ fontSize: '0.9rem' }} />
);

export default Toaster;
