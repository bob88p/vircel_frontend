import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Categories from './pages/Categories';
import Customers from './pages/Customers';
import Circulation from './pages/Circulation';
import Analytics from './pages/Analytics';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import UpdateCategory from './pages/UpdateCategory';
import ManageCategories from './pages/ManageCategories';
import CustomerProfile from './pages/CustomerProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/circulation" element={<Circulation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/return" element={<Return />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
