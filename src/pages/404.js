import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"



const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>test</h1>
    <span className={'loading-spinner'}></span>
  </Layout>
)

export default NotFoundPage
