import AboutUs from "../components/home/AboutUs";
import Blog from "../components/home/Blog";
import Home from "../pages/Home";


const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: AboutUs,
    exact: true,
  },
  {
    path: '/blog',
    component: Blog,
    exact: true,
  },
];

export default routes;
