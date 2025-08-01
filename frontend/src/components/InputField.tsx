import styles from '../styles/InputField.module.css';

// 1. Adicionamos a propriedade 'name' ao tipo
type InputFieldProps = {
  label: string;
  type: 'text' | 'email' | 'password' | 'tel'; // Adicionado 'tel' para telefone
  name: string; // A propriedade 'name' é essencial
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string; // O 'id' agora é opcional, pois podemos usar o 'name'
};

export default function InputField({ label, type, name, value, onChange, id }: InputFieldProps) {
  const inputId = id || name; // Usa o 'id' se for fornecido, senão usa o 'name'

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        // 2. O atributo 'name' agora vem da prop 'name'
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}