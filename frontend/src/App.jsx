import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Customers from './pages/Customers';
import Circulation from './pages/Circulation';
import Analytics from './pages/Analytics';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import CustomerProfile from './pages/CustomerProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/circulation" element={<Circulation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/return" element={<Return />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
