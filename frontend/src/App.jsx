/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import BookTable from './pages/BookTable'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import './App.css';
import Orders from './pages/Orders';
import Dashboard from './pages/admin/home/DashBoard';
import ProductList from './pages/admin/products/Products';
import AddProduct from './pages/admin/products/AddProduct';
import EditProduct from './pages/admin/products/EditProduct';
import Category from './pages/admin/products/category/Category';
import Catering from './pages/admin/catering/Catering';
import BlogList from './pages/admin/blogs/Blogs';
import AddBlog from './pages/admin/blogs/AddBlog';
import EditBlog from './pages/admin/blogs/EditBlog';
import Login from './pages/authentication/Login';
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';
import ForgotPassword from './pages/user/ForgotPassword';

function App () {
  return(
    <Router>
   
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/admin" element={<Dashboard/>} />
                  <Route exact path="/products" element={<ProductList/>} />
                  <Route exact path="/add-product" element={<AddProduct/>} />
                  <Route exact path="/products/:edit" element={<EditProduct/>} />
                  <Route exact path="/category" element={<Category/>} />
                  <Route exact path="/catering" element={<Catering/>} />
                  <Route exact path="/admin-blogs" element={<BlogList/>} />
                  <Route exact path="/add-blogs" element={<AddBlog/>} />
                  <Route exact path="/admin-blogs/:edit" element={<EditBlog/>} />
                  <Route exact path="/orders" element={< Orders/>} />
                  <Route exact path="/locations" element={<div>LOcations</div>} />
                  <Route exact path="/profile" element={<div>Profile</div>} />
                  <Route exact path="/login" element={<Login/>}/> 
                  <Route exact path="/user-login" element={<UserLogin/>}/> 
                  <Route exact path="/user-register" element={<UserRegister/>}/> 
                  <Route exact path="/forgot-password" element={<ForgotPassword/>}/> 

                  <Route path='/' element={<Home />}/>
                  <Route path='/about' element={<About />}/>
                  <Route path='/menu' element={<Menu/>}/>
                  <Route path='/book-table' element={<BookTable />}/>
                  <Route path='/blog' element={<Blog />}/>
                  <Route path='/blog/:slug' element={<BlogDetails />}/>
                  <Route path='/contact-us' element={<Contact />}/>
          </Routes>
    </Router>
  )
}

export default App;