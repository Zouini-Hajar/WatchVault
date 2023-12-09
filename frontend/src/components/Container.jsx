import { Outlet } from 'react-router';

const Container = () => {
  return (
    <div className="p-4 sm:ml-64 h-full">
      <Outlet />
    </div>
  );
}

export default Container;
