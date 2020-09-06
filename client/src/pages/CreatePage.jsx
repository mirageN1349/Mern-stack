import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

function CreatePage() {
  const history = useHistory()
  const auth = React.useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = React.useState('')

  const pressHandler = async e => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        history.push(`/detail/${data.link._id}`)
      } catch (error) {}
    }
  }

  React.useEffect(() => {
    window.M.updateTextFields()
  })

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            type="text"
            id="link"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
