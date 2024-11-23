import login from '@/api/user/login';
import { useState } from 'react';

interface LoginFormProps {
  onSuccess: (email: string) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        onSuccess(email);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">로그인API호출</button>
    </form>
  );
};

export default LoginForm;
