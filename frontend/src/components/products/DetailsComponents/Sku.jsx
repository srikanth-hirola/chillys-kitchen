import PropTypes from 'prop-types'

const Sku = ({ sku }) => {
    return (
        <>SkU<span>{sku}</span></>
    )
}


Sku.propTypes = {
    sku: PropTypes.string.isRequired
}

export default Sku