import styles from '../styles/InputField.module.css';

type InputFieldProps = {
  label: string;
  type: 'text' | 'email' | 'password';
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({ label, type, id, value, onChange }: InputFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}