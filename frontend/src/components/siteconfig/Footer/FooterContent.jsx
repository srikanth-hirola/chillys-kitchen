import React, { useState, useEffect } from 'react';
import MainImage from '../ImageUpload/MainImage';
import Form from "react-bootstrap/Form";
import { SelectContentImgModal } from '../Modals/SiteContentImgModal';
import useHandleChange from '../../../hooks/site-Config/UseHandleChange';
import useSaveLayoutContent from '../../../hooks/site-Config/UseSaveLayoutContent';
import toast from 'react-hot-toast';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'

const FooterContent = ({ logoLoading, setLogoLoading, siteConfigData, uploadedImages }) => {

    const [selectedModalShow, setSelectedModalShow] = useState(false);
    const [modalLayoutName, setModalLaayoutName] = useState('');
    const [curindex, setCurIndex] = useState(0);
    const { handleChange, handleInputChange, handleRemoveFromArray } = useHandleChange();
    const { hanldeSubmit } = useSaveLayoutContent();

    const [footerContent, setFooterContent] = useState({});
      console.log("footerContent", footerContent);
    
      useEffect(() => {
        setFooterContent(siteConfigData?.footerContent);
      }, [siteConfigData]);

      const handleAddSocialMedia = () => {
        const { socialMedia } = footerContent;
        if (socialMedia.length >= 5) {
          toast.error('Cannot add more than 5 Social Media!');
        } else {
          const newSocialMedia = [...socialMedia, {image: {public_id: "", url: "",}, link:"",}];
          setFooterContent({ ...footerContent, socialMedia: newSocialMedia });
        }
      };
    
    const handleSelectImgModal = (e, name, index) => {
        e.preventDefault();
        setSelectedModalShow(true);
        setModalLaayoutName(name);
        setCurIndex(index)
    };

  return (
    <>
    <h4>Footer First Section</h4>
     <MainImage title={"Footer Logo"} aboutUsOneContent={footerContent} logoLoading={logoLoading} setAboutUsOneContent={setFooterContent} uploadedImages={uploadedImages} key={1} name={"footerlogo"} />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Footer Summary</Form.Label>
            <Form.Control
              value={footerContent?.summary}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "summary",
                  myState: footerContent,
                  setMyState: setFooterContent,
                })
              }
            />
          </Form.Group>
          {footerContent?.socialMedia?.length > 0 && footerContent?.socialMedia?.map((socialmedia, i) => (
            <div className="menu-cards mt-5" key={i}>
              <h5>Social Media {i + 1}</h5>
              <div className="flex justify-between items-start h-[100px] w-[180px] relative group border-1 rounded">
                {logoLoading ? (
                  <>
                    <p className="absolute inset-0 flex justify-center items-center ">
                      Loading...
                    </p>
                    {socialmedia?.image?.url && (
                      <img
                        src={socialmedia?.image?.url}
                        alt="icon"
                        className="w-full h-full opacity-10"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="images-delete-btn hidden group-hover:flex absolute inset-0 space-x-3 z-50 group-hover:h-full justify-center items-center transition-transform transform-gpu filter-blur-[5px]">
                      <label
                        className="rounded bg-blue-400 p-2"
                        onClick={(e) => {
                          handleSelectImgModal(e, "socialMedia", i);
                        }}
                      >
                        {/* <FontAwesomeIcon icon={faUpload} /> */}
                        <UploadOutlined style={{ fontSize: '20px' }} />
                      </label>
                    </div>
                    {socialmedia?.image?.url && (
                      <img
                        src={socialmedia?.image?.url}
                        alt="icon"
                        className="w-full h-full opacity-10"
                      />
                    )}
                  </>
                )}
                <button
                  onClick={() =>
                    handleRemoveFromArray({
                      index: i,
                      state: footerContent,
                      setState: setFooterContent,
                      key: "socialMedia",
                    })
                  }
                  type='button'
                  className="bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none  mb-[2px] cursor-pointer z-50"
                >
                  {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}
                  <DeleteOutlined /> delete card
                </button>
              </div>
              <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  value={socialmedia?.link}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'socialMedia', myState: footerContent, setMyState: setFooterContent, index: i, arrObj: "link" })}
                />
              </Form.Group>
            </div>
          ))}
          <button
            className="btn btn-primary btn-sm mt-4"
            type="button"
            onClick={handleAddSocialMedia}
          >
            Add Social Media
          </button>
        </Form>
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type="submit"
          onClick={(e) =>
            hanldeSubmit(e, footerContent, "footerContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      {selectedModalShow && 
      <SelectContentImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setFooterContent} layout={footerContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} curindex={curindex} />
    }
    </>
  )
}

export default FooterContent