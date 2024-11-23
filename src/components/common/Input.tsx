interface InputProps {
  width: string;
  height: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  borderRadius?: string;
}

const Input: React.FC<InputProps> = ({
  width,
  height,
  placeholder,
  value,
  onChange,
  onKeyDown,
  borderRadius = '8px',
}) => {
  return (
    <input
      type="text"
      className={`bg-white border border-gray-300 p-14pxr transition duration-200 focus:outline-none focus:border-blue-500`}
      style={{ width, height, borderRadius }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
