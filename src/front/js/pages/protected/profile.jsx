import React from 'react'
import Card from 'react-bootstrap/Card';
import dorian from "../../../img/dorian.png"
import Profilecard from "/workspaces/authentication_system_Spain_86_fs_txamanguillo3/src/front/styles/profileCard.css"

export const Profile = () => {
  return (
    <Card className="profile-card" style={{ maxWidth: '18rem', margin: 'auto' }}>
      <Card.Img 
        variant="top" 
        src={dorian} 
        alt="Perfil"
        className="rounded-circle" 
      />
      
      <Card.Body>
        <Card.Title className="text-center">Dorian Zuluaga</Card.Title>

        <Card.Text className="text-center text-muted">
          Desarrollador Full Stack con experiencia en aplicaciones web y móviles.
        </Card.Text>

        <div className="about-me mb-3 text-center">
          <h5>Acerca de mí</h5>
          <p>
            Espero cumplir las espectativas del profesor que es un HP y se apiade de mí! Que recuerde que el también es un inmigrante desterrado igual que yo :D
          </p>
        </div>

        <div className="details mb-3">
          <p><strong>Edad:</strong> 36</p>
          <p><strong>Ubicación:</strong> Madrid, España</p>
        </div>

        <div className="social-links text-center mb-3">
          <a href="https://www.facebook.com/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/in/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        <a href="mailto:dorian.zuluaga@hotmail.com?subject=contáctame" className="btn btn-primary btn-block">
          Contactar
        </a>
      </Card.Body>
    </Card>
  )
}
