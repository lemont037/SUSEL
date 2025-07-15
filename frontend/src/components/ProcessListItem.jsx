import React from 'react';

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 0', // Padding superior e inferior
  borderBottom: '1px solid #e0e0e0', // Linha divisória
  color: 'var(--foreground)', // Cor do texto global
  cursor: 'pointer',
  transition: 'background-color 0.2s ease', // Transição suave para o hover
};

const itemIconStyle = {
  fontSize: '20px', // Tamanho do ícone de documento
  marginRight: '10px',
  color: 'var(--branco-primario)', // Cor do ícone, baseada nas variáveis globais
};

const itemTextStyle = {
  fontSize: '16px',
};

// Estilo para o efeito de hover
const itemHoverStyle = {
  backgroundColor: 'var(--branco-primario)', // Cor de fundo no hover, baseada nas variáveis globais
};

export default function ProcessListItem({ title }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{ ...itemStyle, ...(isHovered ? itemHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ícone de documento com canto dobrado (Unicode) */}
      <span style={itemIconStyle}>&#x1F4C4;</span>
      <span style={itemTextStyle}>{title}</span>
    </div>
  );
}