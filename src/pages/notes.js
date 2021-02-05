import React from "react"

import Notes from "../components/notes"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LinksPage = () => (
  <Layout>
    <SEO title="Create Notes" keywords={[`gatsby`, `application`, `react`]} />
    <Notes />
  </Layout>
)

export default LinksPage
