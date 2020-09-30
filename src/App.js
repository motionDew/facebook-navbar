import React, {useState} from 'react';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import { CSSTransition } from 'react-transition-group';

function App() {

  
  return (
    <Navbar>
      <NavItem icon={<PlusIcon/>}></NavItem>
      <NavItem icon={<BellIcon/>}></NavItem>
      <NavItem icon={<MessengerIcon/>}></NavItem>

      <NavItem icon={<CaretIcon/>}> 
        <DropdownMenu/>
      </NavItem>
    </Navbar>
   );
  }
  
  const Navbar = (props) => {
    return(
      <nav className="navbar">
        <ul className="navbar-nav">
            {props.children}
        </ul>
    </nav>
  );
}

const NavItem = (props) => {
  
  const [open,setOpen] = useState(false);

  return (  
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon} 
      </a>
      {open && props.children}
    </li>
  );
}

const DropdownMenu = () => {
  
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight,setMenuHeight] = useState(null);

  const calculateHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropdownItem = (props) => {
    return ( 
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{height: menuHeight}}>
      <CSSTransition
      in={activeMenu === 'main'}
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={calculateHeight}
      >
        <div className="menu">
          <DropdownItem 
          leftIcon="🦝"
          goToMenu="animals"
          >
          Animals
          </DropdownItem>  
          <DropdownItem 
          leftIcon={<CogIcon/>}
          rightIcon={<ChevronIcon/>}
          goToMenu="settings">
          Settings
          </DropdownItem>  
        </div>
      </CSSTransition>
      <CSSTransition
      in={activeMenu === 'settings'}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={calculateHeight}
      >
        <div className="menu">
        <DropdownItem leftIcon={<ArrowIcon/>} goToMenu="main"/>
        <DropdownItem leftIcon={<BoltIcon />}>Settings</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Privacy Policy</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Don't press</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
      in={activeMenu === 'animals'}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={calculateHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon/>} goToMenu="main"/>
          <DropdownItem leftIcon="🦝">Racoon</DropdownItem>  
          <DropdownItem leftIcon="🐺">Wold</DropdownItem>  
          <DropdownItem leftIcon="🦁">Lion</DropdownItem>  
          <DropdownItem leftIcon="🐷">Pig</DropdownItem>  
          <DropdownItem leftIcon="🐑">Sheep</DropdownItem>  
          <DropdownItem leftIcon="🐧">Penguin</DropdownItem>  
        </div>
      </CSSTransition>
    </div>
    );
}
 

export default App;