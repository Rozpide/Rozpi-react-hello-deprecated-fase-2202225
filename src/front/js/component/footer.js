import React, { Component } from "react";
import "../../styles/footer.css"

export const Footer = () => (
	<footer className="footer mt-auto py-3 bg-dark text-white d-flex justify-content-between align-items-center">
	
	<p className="mb-0">© {new Date().getFullYear()} PadelZone. Todos los derechos reservados.</p>

	
	<button 
	  className="btn text-light footer__button--hover" 
	  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	>
	  ↑
	</button>
  </footer>
);