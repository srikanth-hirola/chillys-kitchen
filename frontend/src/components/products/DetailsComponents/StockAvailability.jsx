import PropTypes from 'prop-types'

const StockAvailability = ({ soldOut, limited }) => {
    return (
        <div className='laptop-productdetails-available'>
            <h6>Availability:</h6>
            {soldOut ? <p style={{ color: 'red' }}>{limited}</p> : <>{limited ? <p style={{ color: 'yellowgreen' }}>{limited}</p> : <p>In Stock</p>
            }</>}
        </div>
    )
}

StockAvailability.propTypes = {
    soldOut: PropTypes.string,
    limited: PropTypes.string
}

export default StockAvailability