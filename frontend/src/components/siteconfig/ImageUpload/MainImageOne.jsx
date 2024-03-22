import React, { useState } from 'react'
import { SelectImgModal } from '../Modals/SelectImageModal';
import ImageSelect from './ImageSelect';

const MainImageOne = ({ logoLoading, deliverySectionContent, uploadedImages, setDeliverySectionContent, title, name }) => {

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
                <ImageSelect handleSelectImgModal={handleSelectImgModal} logoLoading={logoLoading} name={name} image={deliverySectionContent?.[name]?.image?.url} />
            </div>
            {selectedModalShow && 
            <SelectImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setDeliverySectionContent} layout={deliverySectionContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} />
            }
        </div>
    )
}

export default MainImageOne