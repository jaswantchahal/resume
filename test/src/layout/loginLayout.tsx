import { Outlet } from 'react-router-dom';
import FixedFooter from '../components/FixedFooter/FixedFooter';


export default function LoginLayout() {
  return (
    <>
      <div style={{ position: 'relative', margin: '0 -16px', height: '100%' }}>
          <Outlet />
          <FixedFooter />
      </div>
    </>
  );
}
