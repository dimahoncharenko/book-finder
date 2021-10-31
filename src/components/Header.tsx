/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { NavLink } from "react-router-dom";

import BasicTile from "./BasicTile";
import Container from "./Container";

const Header = () => {
    return (
    <BasicTile color="hsl(0, 0%, 30%)">
        <Container width="min(1100px, 100% - 1em)"> 
          <BasicTile.Content> 
            <NavLink to="/" css={css`text-decoration: none;`}>
              <span css={css`
                color: white;
              `}>
                Book Finder
              </span>
            </NavLink>
          </BasicTile.Content>
        </Container>
      </BasicTile>
    );
};

export default Header;