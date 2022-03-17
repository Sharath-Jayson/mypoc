import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import styled from 'styled-components';

const MainLayout = styled.div`
  flex: 4;
`;

function NavbarSidebar(props) {
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <MainLayout>{props.children}</MainLayout>
      </div>
    </>
  );
}

export default NavbarSidebar;
