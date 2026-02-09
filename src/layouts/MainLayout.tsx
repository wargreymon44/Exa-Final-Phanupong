import { Outlet } from 'react-router';
import Header from '../component/Header';

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
