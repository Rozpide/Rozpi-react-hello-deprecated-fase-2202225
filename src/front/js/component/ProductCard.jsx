// js/components/ProductCard.jsx
import React from 'react';
import '../../styles/productCard.css'; // Importa el archivo CSS

const ProductCard = ({ product }) => {
  // Se espera que el objeto product tenga: id, name, price, description, image_url
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
