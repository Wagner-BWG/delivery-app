import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function CustomerOrdersDetails() {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <h2>
        Página de Pedidos
        { id }
        - Teste
      </h2>
    </div>
  );
}

export default CustomerOrdersDetails;
