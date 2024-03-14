/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React from 'react'
// import { BrowserRouter , Routes , Route } from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'
// import BookTable from './pages/BookTable'
// import Blog from './pages/Blog'
// import BlogDetails from './pages/BlogDetails'
// import Contact from './pages/Contact'
// import Menu from './pages/Menu'
// const App = () => {
//   return (
//     <BrowserRouter>
// <Routes>
// <Route path='/' element={<Home />}/>
// <Route path='/about' element={<About />}/>
// <Route path='/menu' element={<Menu/>}/>
// <Route path='/book-table' element={<BookTable />}/>
// <Route path='/blog' element={<Blog />}/>
// <Route path='/blog/:slug' element={<BlogDetails />}/>
// <Route path='/menu' element={<Contact />}/>
// </Routes>

//     </BrowserRouter>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
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

function App () {
  return(
    <Router>
      {/* <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'> */}
          {/* dashboard Routes */}
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
                  <Route exact path="/login" element={<div>Login</div>} />
               
              {/* </Routes>
          </div>
          
      </div>
      <Routes> */}
      {/* websites routes */}
          <Route path='/' element={<Home />}/>
<Route path='/about' element={<About />}/>
<Route path='/menu' element={<Menu/>}/>
<Route path='/book-table' element={<BookTable />}/>
<Route path='/blog' element={<Blog />}/>
<Route path='/blog/:slug' element={<BlogDetails />}/>
<Route path='/menu' element={<Contact />}/>
          </Routes>
    </Router>
  )
}

export default App;