import React from "react"
import { Router } from "@reach/router"

import Home from "../components/home"
import Links from "../components/links"
import Notes from "../components/notes"
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Router>
      <Home path="/" />
      <Home path="/:id" />
      <Links path="/links/" />
      <Links path="/links/:id" />
      <Notes path="/notes/" />
      <Notes path="/notes/:id" />
    </Router>
  </Layout>
)

export default IndexPage
