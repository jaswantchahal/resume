import { Outlet } from 'react-router-dom';


export default function AppLayout() {
  return (
    <>
      <div className="app-layout">
        <div style={{ padding: '0 16px', height: '100%', overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
