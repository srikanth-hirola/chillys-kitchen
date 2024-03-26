/* eslint-disable no-unused-vars */
import React from 'react'
import CateringCounter from './CateringCounter'
import CateringStoryVideo from './CateringStoryVideo'

const CateringStory = () => {
  return (
    <>
    <div className="category-story">
      <div className="category-story-sub">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-5">
              <CateringStoryVideo/>
            </div>
            <div className="col-md-7">
              <CateringCounter/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CateringStory