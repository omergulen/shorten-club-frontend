import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"



const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className={'loading-spinner'}></div>
  </Layout>
)

export default NotFoundPage
