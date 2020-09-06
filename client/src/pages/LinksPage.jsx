import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import LinkList from '../components/LinkList'

function LinksPage() {
  const [links, setLinks] = React.useState([])
  const { loading, request } = useHttp()
  const { token } = React.useContext(AuthContext)

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  React.useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) return <Loader />
  return <>{!loading && <LinkList links={links} />}</>
}

export default LinksPage
