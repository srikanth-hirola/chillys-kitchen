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

    const useAppendParam = ({ data }) => {
        const location = window.location.href;
        const paramsString = data.map(item => `${encodeURIComponent(item.param)}=${encodeURIComponent(item.value)}`).join('&');
        const separator = location.includes('?') ? '&' : '?';
        const newUrl = `${location}${separator}${paramsString}`;
        return newUrl;
    };

    return { useQueryParam, useQueryParams, useAppendParam }
}

export default useUrlHandler