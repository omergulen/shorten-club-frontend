/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import { getAuthToken, initialSlug } from '../api';
import Header from "./header"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`

const Layout = ({ children }) => {
  const [aToken, setAToken] = useState('');

  // useEffect(() => {
  //   initialSlug();
  // }, []);

  // useEffect(() => {
  //   async function getInitials() {
  //     const res = await initialSlug();
  //     console.log('res: ', res);
  //     const { token } = res.data;
  //     setAToken(token);
  //     window.localStorage.setItem('authToken', token);
  //   }

  //   const authToken = window.localStorage.getItem('authToken');
  //   console.log('authToken: ', authToken);
  //   if (authToken) {
  //     if (authToken == aToken) return;
  //     console.log('aToken: ', aToken);
  //     setAToken(authToken);
  //   } else {
  //     getInitials();
  //   }
  // }, []);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>
            <main>{children}</main>
            <Footer>
              <p>
              © {new Date().getFullYear()}, Built with
              {` `}
              </p>
              <GatsbyLink href="https://www.gatsbyjs.org">Gatsby</GatsbyLink>
            </Footer>
          </Content>
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
