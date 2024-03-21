import React, { useState } from 'react'
import axios from 'axios';
import { getAllSiteConfig } from '../../../redux/actions/siteConfig';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { server } from '../../../server';
import { DeleteImageModal } from './DeleteImageModal';

const cardImages = ({ logoLoading, setLogoLoading, uploadedImages, name }) => {
    // const { handleImageUploadAPI, handleLogoChange, handleRemoveImage } = useImagesHandler()
    const [allImages, setAllImages] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalDeleteId, setModalDeleteId] = useState('');
    const dispatch = useDispatch();

    const handleDeleteConfirmModel = (e, public_id) => {
        e.preventDefault();
        setModalShow(true);
        setModalDeleteId(public_id)
    }

    const handleImageUploadAPI = async ({ allImages, name, setLogoLoading, setAllImages }) => {
        if (allImages.length > 0) {
            try {
                setLogoLoading(true)
                await axios.put(`${server}/site/site-config-imgs-upload`, { allImages, name })
                toast.success("Uploaded Image Successfully")
                setAllImages([])
                setLogoLoading(false);
                dispatch(getAllSiteConfig())
            } catch (error) {
                setLogoLoading(false)
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("No Image is selected to upload")
        }
    }

    const handleRemoveImage = ({ e, index, allImages, setAllImages }) => {
        e.preventDefault();
        let updatedState = [...allImages];
        updatedState = updatedState.filter((val, index1) => index1 !== index)
        setAllImages(updatedState)
    }

    const handleLogoChange = ({ e, setAllImages }) => {
        const files = e.target.files;
        const updatedState = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Image = reader.result;
                    updatedState.push(base64Image);

                    if (updatedState.length === files.length) {
                        setAllImages(updatedState);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const onHideCallback = () => {
        // Handle the props sent from DeleteImageModal
        console.log('Props received after modal close:', name);
        // You can perform additional actions here if needed
      };


    return (
        <>
            <div className='row gap-3 my-4 mb-5'>
                {uploadedImages?.length > 0 && uploadedImages.map((val, index) => (
                    <div className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-1'>
                        <button onClick={(e) => handleDeleteConfirmModel(e, val.public_id)} className=' btn btn-primary hidden group-hover:flex absolute inset-0 space-x-3 z-50 group-hover:h-full w-full justify-center items-center transition-transform transform-gpu filter-blur-[5px]' >
                            {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}delete icon
                        </button>
                        <img src={val?.url} alt='cardsImages' className='w-full h-full group-hover:opacity-20' width="100px" />
                    </div>))}
            </div>

            <div>
                <input type='file' multiple onChange={(e) => handleLogoChange({ e, setAllImages })} />
                <div className='flex flex-row row flex-wrap gap-3 my-4'>
                    {allImages?.length > 0 && allImages.map((val, index) => (
                        <div key={index} className='w-[130px] h-[80px] rounded overflow-hidden object-contain group relative border-1'>
                            <button onClick={(e) => handleRemoveImage({ e, index, allImages, setAllImages })} className='btn btn-primary hidden group-hover:flex absolute inset-0 space-x-3 z-50 group-hover:h-full w-full justify-center items-center transition-transform transform-gpu filter-blur-[5px]' >
                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}delete Icon
                            </button>
                            <img src={val} alt='cardsImages' className='w-full h-full group-hover:opacity-20' width="100px"/>
                        </div>
                    ))}
                </div>
                {logoLoading ? <button
                    className=' btn btn-primary w-[150px] h-[40px] rounded bg-green-500 text-white'>Loading...</button> : <button
                        className='btn btn-primary w-[150px] h-[40px] rounded bg-green-500 text-white' onClick={() => handleImageUploadAPI({ allImages, name: name, setAllImages, setLogoLoading })}>Upload Images</button>}
            </div>
            <DeleteImageModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onHideCallback={onHideCallback}
                modalDeleteId={modalDeleteId}
                setModalShow={setModalShow}
                objName={name}
            />
        </>
    )
}

export default cardImages