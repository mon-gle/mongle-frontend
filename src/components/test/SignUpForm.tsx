import { useState } from 'react';
import signup from '@/api/test/signUp';

interface SignupFormProps {
  onSuccess: () => void;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signup({
        email,
        name,
        password,
      });
      console.log(response);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <form onSubmit={handleSubmit} className="w-200pxr">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">회원가입API호출</button>
    </form>
  );
};

export default SignupForm;
