import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import Logo from './Logo.jsx';

import NavLinks from './NavLinks.jsx';
const SmallSidebar = () => {
  const { showSidebar=false, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
