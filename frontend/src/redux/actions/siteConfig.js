import axios from 'axios';
import { server } from '../../server';


export const getAllSiteConfig = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllSiteConfig',
        });
        const { data } = await axios.get(
            `${server}/site/site-config`,
            {
                withCredentials: true,
            }
        );

        const site = data.siteConfig
        dispatch({
            type: 'getAllSiteConfigSuccess',
            payload: site,
        });


    } catch (error) {
        dispatch({
            type: 'getAllSitConfigFailed',
            payload: error.response.data.message,
        });

    }
};

// update Site Config
export const updateSiteConfig = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'siteConfigRequest',
        });

        await axios.post(
            `${server}/site/site-config`,
            { formData }, {
            withCredentials: true,
        }
        );
        dispatch({
            type: 'siteConfigCreateSuccess',
        });
        dispatch({ type: 'resetSiteCongSuccess' });
    } catch (error) {
        dispatch({
            type: 'siteConfigCreateFail',
            payload: error.response.data.message,
        });
    }
};


// actions.js
export const ColorConfig = (data) => async (dispatch) => {
    if (data?.state === true) {
        dispatch({
            type: 'setColorOpen',
            payload: data,
        });
    } else {
        dispatch({
            type: 'setColorClose',
            payload: data,
        });
    }
};

export const TwoSideBarConfig = (data) => async (dispatch) => {
    dispatch({
        type: 'setTwoSideBarContentType',
        payload: data,
    });
};
