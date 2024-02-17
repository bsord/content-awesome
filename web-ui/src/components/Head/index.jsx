import { Helmet } from 'react-helmet-async'

export const Head = ({ title = '', description = '' }) => {
  const appName = 'Content Awesome'
  return (
    <Helmet title={appName + ' | ' + title} defaultTitle="Content Awesome">
      <meta name="description" content={description} />
    </Helmet>
  )
}
