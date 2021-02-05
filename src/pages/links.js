import React from "react"

import Links from "../components/links"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LinksPage = () => (
  <Layout>
    <SEO title="Create Links" keywords={[`gatsby`, `application`, `react`]} />
    <Links />
  </Layout>
)

export default LinksPage
