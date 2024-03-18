import FillHeart from "../../Cards/FillHeart";
import PropTypes from 'prop-types';

const WishList = ({ data, click, setClick }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
            <div className='laptop-productdetails-wishlist'>
                <FillHeart data={data} click={click} setClick={setClick} key={1} />
                <h6>Add to Wishlist</h6>
            </div>
        </div>
    )
}

WishList.propTypes = {
    data: PropTypes.object.isRequired,
    click: PropTypes.bool.isRequired,
    setClick: PropTypes.func.isRequired,
}

export default WishList