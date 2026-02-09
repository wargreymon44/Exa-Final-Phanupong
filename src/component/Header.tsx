import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-yellow-400 w-full flex justify-between items-center">
      <div className="text-2xl text-blue-700 font-bold">
        <Link to="/">Healthcare System</Link>
      </div>
      <nav className="space-x-4">
        <Link to="auth/login">Login</Link>
        <Link to="auth/register">Register</Link>
      </nav>
    </header>
  );
}
