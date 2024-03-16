/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import useBlogApi from '../../../../customHooks/API/useBlogApI';

const DeleteButton = ({ id, setLoading, endpoint, message }) => {
    const { deleteData } = useBlogApi();

    return (
        <>
            <Button type="button" variant="outline-danger" onClick={(e) => deleteData(e, setLoading, endpoint, message)}>
                Delete
            </Button>
        </>
    );
};

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    setLoading: PropTypes.func,
    endpoint: PropTypes.string,
    message: PropTypes.string
};

export default DeleteButton;
