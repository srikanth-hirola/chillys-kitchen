import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../../server';
import { getAllSiteConfig } from '../../../redux/actions/siteConfig';



export const DeleteImageModal = (props) => {

    const dispatch = useDispatch();

    const handleDeleteImage = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`${server}/site/site-config-image-delete`, { data: { objName: props?.objName, public_id: props?.modalDeleteId } });
            toast.success('Deleted Image successfully')
            props.setModalShow(false)
        } catch (error) {
            console.log(error.response.data.message)
        }
        dispatch(getAllSiteConfig())
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => {
                props.setModalShow(false);
                props.onHideCallback(); // Callback to send props back to parent
              }}
            
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation for Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-lg'>Image will be deleted permanently!</p>
            </Modal.Body>

            <div>
                <button className='btn btn-primary py-2 ml-4 mb-4 w-[150px] rounded bg-red-500 text-white' onClick={handleDeleteImage}>Delete</button>
            </div>
        </Modal>
    );
}   
