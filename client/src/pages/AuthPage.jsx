import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMassage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

function AuthPage() {
  const auth = React.useContext(AuthContext)
  const message = useMassage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  React.useEffect(() => {
    window.M.updateTextFields()
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async e => {
    e.preventDefault()
    try {
      const data = await request('api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async e => {
    e.preventDefault()
    try {
      const data = await request('api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ССылку</h1>
        <div className="card blue darkened-1">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>

            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  name="email"
                  type="email"
                  id="email"
                  value={form.email}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  name="password"
                  value={form.password}
                  type="password"
                  id="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darkened-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
