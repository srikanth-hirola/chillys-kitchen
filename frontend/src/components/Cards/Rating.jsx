/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const Rating = ({ rating }) => {
    return (
        <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
        </div>
    )
}


Rating.propTypes = {
    rating: PropTypes.number.isRequired
}

export default Rating