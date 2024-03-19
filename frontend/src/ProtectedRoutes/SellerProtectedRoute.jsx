import { Navigate } from "react-router";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSeller } = useSelector((state) => state.seller);

    if (isLoading === true) {
        return <Loader />;
    } else {
        if (!isSeller) {
            return <Navigate to={`/login`} replace />;
        }
        return children;
    }
}

SellerProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SellerProtectedRoute