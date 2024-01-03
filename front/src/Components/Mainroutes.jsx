import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Frontpage from '../Pages/Frontpage';
import Displaypage from '../Pages/Displaypage';

const Mainroutes = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/display/:id" element={<Displaypage />} />
      </Routes>
    </HelmetProvider>
  );
};

export default Mainroutes;
