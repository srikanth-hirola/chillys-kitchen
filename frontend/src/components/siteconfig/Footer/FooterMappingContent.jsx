import React, { useEffect, useState } from 'react'
import useSaveLayoutContent from '../../../hooks/site-Config/UseSaveLayoutContent';
import { useHandleFooter } from '../../../hooks/site-Config/UseHandleFooter';


const FooterMappingContent = ({ logoLoading, styles, setLogoLoading }) => {

    const { handleFooterAddCol, handleFooterDeleteContent, handleContentChange } = useHandleFooter();

    const { saveLayoutContent } = useSaveLayoutContent()

    const [OtherFooterContent, setOtherFooterContent] = useState([])

    useEffect(() => {
        setOtherFooterContent(styles?.OtherFooterContent)
    }, [styles])

    const stage1 = {
        heading: '',
        items: [{
            title: '',
            url: ''
        }]
    }

    const stage2 = {
        title: '',
        url: ''
    }

   

  return (
    <div className='my-8 border-1 rounded py-6 px-3 '>
            <div className='flex justify-between mb-3'>
                <h4 className='mb-4'>Other Footer Content</h4>
                {logoLoading ? <button className='py-2 w-2/12 px-3 rounded h-fit bg-green-500 text-white'>Loading...</button> : <button className='py-2 w-2/12 px-3 rounded h-fit bg-green-500 text-white' onClick={(e) => saveLayoutContent(OtherFooterContent, "OtherFooterContent", setLogoLoading)}>Save</button>}
            </div>
            {OtherFooterContent?.length > 0 && OtherFooterContent?.map((content, index1) => (
                <div key={index1}>
                    <div className='mb-2'>
                        <div className='flex justify-between'>
                            <label>Heading {index1 + 1}</label>
                            <button className='bg-red-300 py-1 px-2 rounded' onClick={(e) => handleFooterDeleteContent(e, OtherFooterContent, setOtherFooterContent, index1)}>
                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: "#e10909", fontSize: "15px" }} /> */}delete icon
                            </button>
                        </div>
                        <input type='text' name='heading' value={content?.heading} className='border-1 w-full py-2 px-2 my-2 rounded' onChange={(e) => handleContentChange(e, OtherFooterContent, setOtherFooterContent, index1)} />
                        <div className='flex'>
                            <p className='w-5/12 mb-0'>Title</p>
                            <p className='w-5/12 mb-0'>URL</p>
                        </div>
                        {content?.items.length > 0 && content?.items.map((item, index2) => (
                            <div className='flex gap-2 items-center' key={index2}>
                                <input type='text' name='title' value={item?.title} className='border-1 w-5/12 py-2 px-2 my-2 rounded' onChange={(e) => handleContentChange(e, OtherFooterContent, setOtherFooterContent, index1, 'items', index2)} />
                                <input type='text' name='url' value={item?.url} className='border-1 w-5/12 py-2 px-2 my-2 rounded' onChange={(e) => handleContentChange(e, OtherFooterContent, setOtherFooterContent, index1, 'items', index2)} />
                                <button className='bg-red-300 py-2 px-2 rounded h-fit' onClick={(e) => handleFooterDeleteContent(e, OtherFooterContent, setOtherFooterContent, index1, "items", index2)}>
                                    {/* <FontAwesomeIcon icon={faTrash} style={{ color: "#e10909", fontSize: "15px" }} /> */}delete icon
                                </button>
                                <button className='py-2 w-2/12 px-3  bg-blue-500 text-white rounded' onClick={(e) => handleFooterAddCol(e, OtherFooterContent, setOtherFooterContent, stage2, "items", index1)}>Add Item</button>
                            </div>
                        ))}

                    </div>
                    <hr />
                </div>

            ))}
            <button className='py-2 px-3 rounded bg-blue-500 text-white ' onClick={(e) => handleFooterAddCol(e, OtherFooterContent, setOtherFooterContent, stage1)}>Add Column</button>
        </div>
  )
}

export default FooterMappingContent