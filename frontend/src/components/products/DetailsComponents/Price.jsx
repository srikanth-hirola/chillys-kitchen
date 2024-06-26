import PropTypes from 'prop-types'

const Price = ({ originalPrice, discountPrice }) => {
    console.log("originalPrice", originalPrice)
    console.log("discountPrice", discountPrice)
    return (
        <h4>{discountPrice}<span>{parseInt(((originalPrice - discountPrice) / originalPrice) * 100)
        }%</span></h4>
    )
}

Price.propTypes = {
    originalPrice: PropTypes.number.isRequired,
    discountPrice: PropTypes.number.isRequired
}

export default Price