// import DashboardIcon from '../assets/icons/dashboard.svg';
import DashboardIcon from "../../assets/icons/dashboard.svg";
import ShippingIcon from '../../assets/icons/shipping.svg';
import ProductIcon from '../../assets/icons/product.svg';
import UserIcon from '../../assets/icons/user.svg';

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: '/profile',
    title: 'Profile',
  },
  {
    id: 2,
    icon: ProductIcon,
    path: '/orderspage',
    title: 'My orders',
  },
  {
    id: 3,
    icon: ProductIcon,
    path: '/contactDetailsPage',
    title: 'Address',
  }
]

export default sidebar_menu;