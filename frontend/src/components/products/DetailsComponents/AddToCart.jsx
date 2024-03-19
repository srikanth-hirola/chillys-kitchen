import PropTypes from 'prop-types';

const AddToCart = ({ addToCart, id }) => {
    return (
        <div className="add-to-btn">
            <button onClick={(e) => addToCart({ e, id })}>ADD TO CART</button>
        </div>
    )
}

AddToCart.propTypes = {
    id: PropTypes.string,
    addToCart: PropTypes.func.isRequired,
}

export default AddToCart