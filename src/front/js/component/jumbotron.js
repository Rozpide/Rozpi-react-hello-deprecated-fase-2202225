import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
  
  
export default function JumbotronFix() { 
  return ( 
    <> 
    <Jumbotron> 
      <h1>Regular, Jumbotron!</h1> 
      <p> 
        This is a simple Jumbotron example. 
      </p> 
  
      <p> 
        <Button variant="primary"> 
          Primary Button 
        </Button> 
      </p> 
    </Jumbotron> 
    <br/> 
    <Jumbotron fluid> 
      <Container> 
        <h1>Fluid jumbotron !</h1> 
        <p> 
           This is a modified fluid jumbotron which 
           stretches the whole horizontal space.     
        </p> 
        <Button variant="primary"> 
         Primary Button 
        </Button> 
      </Container> 
    </Jumbotron> 
    </> 
  ); 
}