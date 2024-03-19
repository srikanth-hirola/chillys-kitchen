import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate } from "react-router";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading === false) {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return children;
    } else {
        return <Loader />
    }
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute;
