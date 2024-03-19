import { Select } from "antd";
const { Option } = Select;
import PropTypes from 'prop-types'

const VarientSelect = ({ data, setSelectedColor, setCount, setLimited, selectedColor }) => {

    const handleOptionChange = (value) => {
        const option = data?.colorInputs?.find(opt => opt._id === parseInt(value));
        if (option) {
            setSelectedColor(option);
            setCount(1);
            setLimited();
        }
    };

    return (
        <>
            {data?.showInputs &&
                <div className="select-variant" >
                    <h4>Select an Option</h4>
                    <Select onChange={handleOptionChange} value={selectedColor?._id} placeholder="Select an option">
                        {data?.colorInputs?.map((option) => (
                            <Option disabled={option?.stock === 0 ? true : false} key={option._id} value={option._id} >{option.imageColor
                            }</Option>
                        ))}
                    </Select>
                    {selectedColor && (
                        <div className="variation-product" >
                            <div className="var-title"><h3>{selectedColor?.imageColor
                            }</h3></div>
                            <div className="var-price"><p><strong>Price:</strong> {selectedColor.price}</p></div>
                            <div className="var-desc"><p><strong>Description:</strong> {selectedColor.description}</p></div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

VarientSelect.propTypes = {
    data: PropTypes.object.isRequired,
    setSelectedColor: PropTypes.func.isRequired,
    setCount: PropTypes.func.isRequired,
    setLimited: PropTypes.func.isRequired,
    selectedColor: PropTypes.object,
}

export default VarientSelect