import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

const BannerTextContent = ({ bannerContent, setBannerContent, handleChange }) => {

  return (
    <>
        <Form>
          <Form.Group>
          <Form.Label>Title</Form.Label>
            <Form.Control value={bannerContent?.title} onChange={(e) => handleChange({ value: e.target.value, key: "title", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>SubTitle</Form.Label>
            <Form.Control value={bannerContent?.subTitle} onChange={(e) => handleChange({ value: e.target.value, key: "subTitle", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} value={bannerContent?.description} onChange={(e) => handleChange({ value: e.target.value, key: "description", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Button One</Form.Label>
            <Form.Control value={bannerContent?.buttonOneText} onChange={(e) => handleChange({ value: e.target.value, key: "buttonOneText", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Button One Link</Form.Label>
            <Form.Control value={bannerContent?.buttonOneLink} onChange={(e) => handleChange({ value: e.target.value, key: "buttonOneLink", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Button Two</Form.Label>
            <Form.Control value={bannerContent?.buttonTwoText} onChange={(e) => handleChange({ value: e.target.value, key: "buttonTwoText", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Button Two Link</Form.Label>
            <Form.Control value={bannerContent?.buttonTwoLink} onChange={(e) => handleChange({ value: e.target.value, key: "buttonTwoLink", myState: bannerContent, setMyState: setBannerContent })} />
          </Form.Group>
        </Form>
    </>
  )
}

export default BannerTextContent