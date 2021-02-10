import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"

import LinkIcon from '../images/link2.png';

const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
`

const NavLink = styled(Link)`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const GitHubLink = styled.a`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const HomeLink = styled(NavLink)`
  img {
    width: 20px;
    margin-right: 4px
  }
  margin-left: 0;
`

const SiteHeader = styled.header`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;
`

const PHButton = styled.a`
  display: flex;
  width: 100%;
  height: 54px;
  justify-content: center;
`;

const Header = () => (
  <SiteHeader>
    <Content>
      <p>
        <HomeLink to="/">
          <img src={LinkIcon} />
          Home
        </HomeLink> |
        <NavLink to="/links">Create Links</NavLink> |
        <NavLink to="/notes">Create Notes</NavLink>
      </p>
      <p>
        <PHButton
          href="https://www.producthunt.com/posts/shorten-club?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-shorten-club"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=284067&theme=dark"
            alt="👋 shorten.club - URL shortener to voice for Clubhouse 👋 | Product Hunt"
          />
        </PHButton>
      </p>
    </Content>
  </SiteHeader>
);

export default Header;
