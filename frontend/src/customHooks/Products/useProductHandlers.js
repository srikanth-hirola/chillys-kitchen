import useAPI from "../API/useAPI";

const useProductHandler = ({ productData, setProductData, variations, setVariations, setMainImage, setImages }) => {
    const { postApi, putApi } = useAPI();


    const handleInputChange = ({ index, event, inputs, setInputs }) => {
        const values = JSON.parse(JSON.stringify(inputs));
        values[index][event.target.name] = event.target.value;
        setInputs(values);
    };

    const handleAddInput = ({ inputs, setInputs }) => {
        const updatedState = JSON.parse(JSON.stringify(inputs));
        updatedState.push({ key: '', value: '' })
        setInputs(updatedState);
    };

    const handleRemoveInput = ({ index, inputs, setInputs }) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    };

    const handleVariationsToggle = ({ checked, setVariationsEnabled }) => {
        setVariationsEnabled(checked);
        const updatedState = JSON.parse(JSON.stringify(productData))
        updatedState.showInputs = checked;
        setProductData(updatedState)
    };

    const handleAddVariation = () => {
        setVariations([...variations, { SKU: "", imageColor: '', originalPrice: null, stock: null, discountPrice: null, image: { public_id: '', url: '' } }]);
    };

    const handleRemoveVariation = (index) => {
        const updatedVariations = [...variations];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };



    const handleProductChange = (e) => {
        const { value, name } = e.target;
        const updatedState = JSON.parse(JSON.stringify(productData))
        updatedState[name] = value;
        setProductData(updatedState)
    }

    const handleProductNumberChange = (value, name) => {
        const updatedState = JSON.parse(JSON.stringify(productData))
        updatedState[name] = value;
        setProductData(updatedState)
    }

    const handleSubmitProductData = async ({ dataParam, inputs, mainImage, images }) => {
        try {
            let updatedState = JSON.parse(JSON.stringify(dataParam));
            inputs && (updatedState.specs = inputs);
            updatedState.colorInputs = variations;
            updatedState.mainImage = { public_id: '', url: mainImage };
            updatedState.images = images;
            const { error } = await postApi({ endpoint: "/api/v2/product/requested-product", postData: updatedState });
            if (error) {
                alert(error?.response?.data?.message)
            } else {
                alert("Added Product Successfull")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitEditProductData = async ({ dataParam, inputs, mainImage, images, proId, colorInputsIndexUpdateImage }) => {
        try {
            let updatedState = JSON.parse(JSON.stringify(dataParam));
            inputs && (updatedState.specs = inputs);
            updatedState.colorInputs = variations;
            mainImage && (updatedState.mainImage = mainImage);
            let postData = {
                formData: updatedState,
                proId,
                images,
                mainImage,
                colorInputsIndexUpdateImage
            }
            console.log(postData)
            const { error } = await putApi({ endpoint: "/api/v2/product/update-product", postData });
            if (error) {
                alert(error?.response?.data?.message)
            } else {
                alert("Added Product Successfull")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setMainImage(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleVarientImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                const updatedColorInputs = [...variations];
                updatedColorInputs[index].image.url = base64Image;
                setVariations(updatedColorInputs);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVarientInputChange = (index, field, value) => {
        const updatedColorInputs = [...variations];
        if (field === "SKU") {
            const exp = /^[a-zA-Z0-9]*$/;
            if (exp.test(value)) {
                const val = value.toUpperCase();
                updatedColorInputs[index][field] = val;
            }
            setVariations(updatedColorInputs);
            return;
        }
        updatedColorInputs[index][field] = value;
        console.log(updatedColorInputs, index, field)
        setVariations(updatedColorInputs);
    };

    const handleVarientNumberInputChange = (value, index, field) => {
        const updatedColorInputs = [...variations];
        if (field === "SKU") {
            const exp = /^[a-zA-Z0-9]*$/;
            if (exp.test(value)) {
                const val = value.toUpperCase();
                updatedColorInputs[index][field] = val;
            }
            setVariations(updatedColorInputs);
            return;
        }
        updatedColorInputs[index][field] = value;
        console.log(updatedColorInputs, index, field)
        setVariations(updatedColorInputs);
    };


    return { handleInputChange, handleAddInput, handleRemoveInput, handleVariationsToggle, handleAddVariation, handleRemoveVariation, handleProductChange, handleProductNumberChange, handleSubmitProductData, handleMainImageChange, handleImageChange, handleVarientImageChange, handleVarientInputChange, handleVarientNumberInputChange, handleSubmitEditProductData }
}

export default useProductHandler