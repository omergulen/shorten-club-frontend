import React from "react"

import Home from "../components/home"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Home />
  </Layout>
)

export default IndexPage
