import React from 'react';

const headerStyle = {
  // Cor de fundo tirada do .header do Register.module.css
  backgroundColor: '#1e194d',
  color: 'white', 
  padding: '1rem 2rem', // '16px 32px' também funcionaria
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer', // Adiciona cursor pointer para o container do logo (incluindo o texto SUSEL)
};

const logoIconStyle = {
  fontSize: '28px', 
  color: 'white', // Garante que o ícone seja branco
};

const logoTextStyle = {
  // Tamanho da fonte tirado do .logo do Register.module.css
  fontSize: '2rem', // Equivalente a 32px
  fontWeight: 'bold',
  color: 'white', // Garante que o texto seja branco
};

const userIconStyle = {
  fontSize: '30px',
  cursor: 'pointer',
  color: 'white', // Garante que o ícone de usuário seja branco
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        {/* Ícone para o logo SUSEL */}
        <span style={logoTextStyle}>SUSEL</span>
      </div>
      <div style={userIconStyle}>
        {/* Ícone de usuário */}
        <span>&#x1F464;</span>
        {/* Se estiver usando react-icons: <FaUserCircle size={30} /> */}
      </div>
    </header>
  );
}