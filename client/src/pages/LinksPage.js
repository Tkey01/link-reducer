import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { LinksList } from '../components/LinksList'
import { Loader } from '../components/Loader'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchedLinks = useCallback(async () => {
    try {
      const data = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      setLinks(data)
    } catch (e) {

    }
  }, [])

  useEffect(() => {
    fetchedLinks()
  }, [fetchedLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}
