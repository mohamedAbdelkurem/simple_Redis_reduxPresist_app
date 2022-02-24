//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

import { Media } from "../utilities/Artsy";
import { MAIN_COLOR } from "../utilities/theme";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//

import Footer from "./Layout";

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

const NavItems = [
  {
    name: "Home",
    path: "/",
  },





];
const Navbar = ({ children }) => {
  // ────────────────────────────────────────────────────────────────────────────────
  const dispatch = useDispatch();
  const location = useLocation();
  const [sidebarOpened, setSidebar] = useState(false);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            direction="right"
            inverted
            onHide={() => setSidebar(false)}
            vertical
            visible={sidebarOpened}
          >
        
              <>
                {NavItems.map((item) => (
                  <Menu.Item
                    as={Link}
                    to={item.path}
                    active={item.path === location.pathname}
                    onClick={() => setSidebar(false)}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
     
              </>
        
          
         
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment inverted textAlign="center" vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item as={Link} to="/">
                    <Icon name="earlybirds" size="large" />
                  </Menu.Item>
                  
            
                
                    <Menu.Item
                      position="right"
                      onClick={() => setSidebar(true)}
                    >
                      <Icon name="align right" />
                    </Menu.Item>
              
                </Menu>
              </Container>
            </Segment>
            <div style={{ minHeight: "100vh", marginTop: "5vh" }}>
              {children}
            </div>
            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
      <Media greaterThan="mobile">
        <Menu inverted fixed="top" pointing size="large">
          <Container>
            {NavItems.map((item) => (
              <Menu.Item
                as={Link}
                to={item.path}
                active={item.path === location.pathname}
                onClick={() => setSidebar(false)}
                pointing={item.path === location.pathname}
              >
                {item.name}
              </Menu.Item>
            ))}
         
         
          
      
        
          </Container>
        </Menu>
        <div style={{ minHeight: "100vh", marginTop: "10vh" }}>{children}</div>
        <Footer />
      </Media>
    </>
  );
};

export default Navbar;
