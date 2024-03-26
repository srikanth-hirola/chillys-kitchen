import React, { useState } from 'react'
import { SelectImgModal } from '../Modals/SelectImageModal';
import ImageSelect from './ImageSelect';

const MainImage = ({ logoLoading, aboutUsOneContent, uploadedImages, setAboutUsOneContent, title, name }) => {

    const [selectedModalShow, setSelectedModalShow] = useState(false);
    const [modalLayoutName, setModalLaayoutName] = useState('');

    const handleSelectImgModal = (e, name) => {
        e.preventDefault();
        setSelectedModalShow(true);
        setModalLaayoutName(name);
    }

    return (
        <div className='my-2'>
            <label className='font-semibold text-xs mb-2'>{title}</label><br />
            <div className='w-[180px] h-[100px]'>
                <ImageSelect handleSelectImgModal={handleSelectImgModal} logoLoading={logoLoading} name={name} image={aboutUsOneContent?.[name]?.image?.url} />
            </div>
            {selectedModalShow && 
            <SelectImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setAboutUsOneContent} layout={aboutUsOneContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} />
            }
        </div>
    )
}

export default MainImage