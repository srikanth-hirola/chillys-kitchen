import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/admin',
        title: 'Dashboard',
    },

    
    {
        id: 2,
        icon: ProductIcon,
        path: '/orders',
        title: 'Orders',
        
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products',
        title: 'Products',
        submenu: [
            {
              id: 21,
             icon: ShippingIcon,
              path: '/products',
              title: 'Product List',
            },
            {
              id: 22,
             icon: ShippingIcon,
              path: '/add-product',
              title: 'Add Product',
            },
            {
              id: 23,
             icon: ShippingIcon,
              path: '/products/:edit',
              title: 'Edit Product',
            },
            {
              id: 24,
             icon: ShippingIcon,
              path: '/category',
              title: 'Add Category',
            },
          ],
    },
    {
      id: 4,
      icon: UserIcon,
      path: '/admin-blogs',
      title: 'Blogs',
      submenu: [
        {
          id: 21,
         icon: ShippingIcon,
          path: '/admin-blogs',
          title: 'All Blogs',
        },
        {
          id: 22,
         icon: ShippingIcon,
          path: '/add-blogs',
          title: 'Add Blog',
        },
        {
          id: 23,
         icon: ShippingIcon,
          path: '/admin-blogs/:edit',
          title: 'Edit Blog',
        },
        
      ],
  },
    {
      id: 5,
      icon: UserIcon,
      path: '/site-config',
      title: 'Site Config',
      submenu: [
        {
          id: 1,
         icon: ShippingIcon,
          path: '/site-config/header',
          title: 'Header',
        },
        {
          id: 2,
         icon: ShippingIcon,
          path: '/site-config/banner',
          title: 'Banner',
        },
        {
          id: 3,
         icon: ShippingIcon,
          path: '/site-config/menu',
          title: 'Menu ',
        },
        {
          id: 4,
         icon: ShippingIcon,
          path: '/site-config/about',
          title: 'About ',
        },
        {
          id: 5,
         icon: ShippingIcon,
          path: '/site-config/services',
          title: 'Services ',
        },
        {
          id: 6,
         icon: ShippingIcon,
          path: '/site-config/delivery',
          title: 'Delivery ',
        },
        
      ],
  },

    {
        id: 7,
        icon: UserIcon,
        path: '/login',
        title: 'Login',
    }
]

export default sidebar_menu;