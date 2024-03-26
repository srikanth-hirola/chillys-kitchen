import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export const SelectContentImgModal = (props) => {


    const [imageIndexes, setImageIndexes] = useState([]);

    useEffect(() => {
        if (props && props?.multiple && props?.uploadedImages?.length > 0) {
            let updatedIndex = [...imageIndexes];
            props?.uploadedImages.forEach((val, index) => {
                let found = props?.layout.find(
                    (layoutItem) => layoutItem.image.url === val.url
                );
                if (found) {
                    updatedIndex.push(index);
                }
            });
            setImageIndexes(updatedIndex);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);


    // const handleSelectImage = (e, index) => {
    //     e.preventDefault();
    //     let foundImage = props?.uploadedImages[index];
    //     console.log("foundImage", foundImage)
    //     props.setlayout((prevState) => {
    //         let updatedState = { ...prevState };
    //         updatedState[props?.name][props?.curindex] = { ...updatedState[props?.name][props?.curindex], image: foundImage };
    //         return updatedState;
    //     })
    // }
    const handleSelectImage = (e, index) => {
        e.preventDefault();
        let foundImage = props?.uploadedImages[index];
        console.log("foundImage", foundImage)
        props.setlayout((prevState) => {
            let updatedState = { ...prevState };
            // Make a deep copy of the array to avoid modifying the original state directly
            let newArray = [...updatedState[props?.name]];
            // Update the specific element in the copied array
            newArray[props?.curindex] = { ...newArray[props?.curindex], image: foundImage };
            // Update the state with the modified array
            updatedState[props?.name] = newArray;
            props.setModalShow(false)
            // props.onHide();
            return updatedState;
        });
        
    }
    

    const handleSelectMultipleImage = (e, index) => {
        e.preventDefault();

        let foundImage = props?.uploadedImages[index];

        let updatedIndexes = [...imageIndexes];
        updatedIndexes.push(index);
        setImageIndexes(updatedIndexes);

        const layoutArray = [...(props.layout[props.name] || [])];

        layoutArray.push({
            image: foundImage,
            url: ''
        });

        props.setlayout({
            ...props.layout,
            [props.name]: layoutArray
        });
    };


    const handleUnSelectMultipleImage = (e, url, index) => {
        e.preventDefault();
        let foundImage = props?.layout[props.name].filter((val) => val?.image?.url !== url)
        let updatedIndexes = [...imageIndexes];
        updatedIndexes = updatedIndexes.filter((val) => val !== index)
        setImageIndexes(updatedIndexes)
        props.setlayout({
            ...props.layout,
            [props.name]: foundImage
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Icon
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props?.uploadedImages?.length > 0 ?
                    <div className='flex flex-wrap gap-3 my-4'>
                        {props?.uploadedImages?.map((val, index) => (
                            props?.multiple ? (imageIndexes?.includes(index) ?
                                <div className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-2 border-green-600' onClick={(e) => handleUnSelectMultipleImage(e, val?.url, index)}>
                                    <img src={val?.url} alt='icon' className='w-full h-full ' />
                                </div>
                                :
                                <div className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-1' onClick={(e) => handleSelectMultipleImage(e, index)}>
                                    <img src={val?.url} alt='icon' className='w-full h-full' />
                                </div>)
                                :
                                (
                                    <>
                                        {props?.layout && props?.layout[props?.name] && props?.layout[props?.name][props?.curindex]?.image?.url === val?.url ?
                                            <div className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-2 border-green-600'>
                                                <img src={val?.url} alt='icon' className='w-full h-full ' />
                                            </div>
                                            :
                                            <div className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-1' onClick={(e) => handleSelectImage(e, index)}>
                                                <img src={val?.url} alt='icon' className='w-full h-full' />
                                            </div>
                                        }
                                    </>
                                )
                        ))}
                    </div> : <p>No Images are uploaded</p>}
            </Modal.Body>
        </Modal>
    );
}
