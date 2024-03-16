/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditButton = ({ path }) => {
    return (
        <>
            <Link to={path}>
                <Button type="button" variant="outline-primary">
                    Edit
                </Button>
            </Link>
        </>
    );
};

EditButton.propTypes = {
    path: PropTypes.string.isRequired,
};
export default EditButton;