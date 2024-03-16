import { useLocation } from "react-router";

const useUrlHandler = () => {

    const useQueryParams = () => {
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const params = {};
        for (const [key, value] of queryParams.entries()) {
            params[key] = value;
        }
        return params;
    };

    const useQueryParam = (paramKey) => {
        const queryParams = useQueryParams();
        return queryParams[paramKey];
    }

    return { useQueryParam, useQueryParams }
}

export default useUrlHandler