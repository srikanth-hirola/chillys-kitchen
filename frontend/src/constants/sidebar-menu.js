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
      path: '/catering',
      title: 'Catering',
  },
    {
        id: 5,
        icon: UserIcon,
        path: '/profile',
        title: 'My account',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/Login',
        title: 'Login',
    }
]

export default sidebar_menu;