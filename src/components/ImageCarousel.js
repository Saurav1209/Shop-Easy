import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = (props) => {
  return (
    <Carousel>
      {props.images.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} style={{height:'250px', width:'400px'}} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
