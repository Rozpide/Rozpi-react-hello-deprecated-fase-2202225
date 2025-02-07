import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/slider.css'

export default function Slider() {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
        <img 
        className='d-block fluid w-auto'
        src='https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?cs=srgb&dl=pexels-janetrangdoan-1128678.jpg&fm=jpg'
        alt=''
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img 
        className='d-block w-auto fluid'
        src='https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?cs=srgb&dl=pexels-janetrangdoan-1092730.jpg&fm=jpg'
        alt=''
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img 
        className='d-block w-auto fluid'
        src='https://images.unsplash.com/photo-1490818387583-1baba5e638af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGxpdmluZ3xlbnwwfHwwfHx8MA%3D%3D'
        alt=''
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
