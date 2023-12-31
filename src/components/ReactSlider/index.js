import React, {Component} from 'react'
import Slider from 'react-slick'

import './index.css'

const ReactSlick = props => {
  const settings = {
    //  dots: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const {userStories} = props

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {userStories.map(i => {
          const {userId, userName, storyUrl} = i
          return (
            <div className="item" key={userId}>
              <div className="img-container">
                <img
                  width="100%"
                  className="img"
                  src={storyUrl}
                  alt="user story"
                />
              </div>
              <h6 className="text-center">{userName}</h6>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default ReactSlick
