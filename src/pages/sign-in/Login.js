import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { login } from '../../store/actions/userActions';


const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.userReducer)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fEmail, setFEmail] = useState('')
  const [forgotModal, setForgotModal] = useState(false)
  const [validated, setValidated] = useState(false)

  const onSubmit = async (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    dispatch(login(email, password))
  }

  const forgotPass = async (e) => {
    e.preventDefault()
    try {
      const data = await AuthService.sendForgotPassMail({ email: fEmail })
      alert("Письмо было отправлено на вашу почту")
      setForgotModal(false)
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Form noValidate validated={validated} className='shadow p-4 mb-5 bg-body rounded mt-5' style={{ width: '550px' }}
        onSubmit={onSubmit}>
        <h2 className='text-center mb-4'>Войти</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Адрес электронной почты</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Введите вашу почту"
            value={email}
            autoComplete="new-password"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйста введите вашу почту
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Введите пароль"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Пожалуйста введите пароль
        </Form.Control.Feedback>
        <Button variant='link' onClick={() => setForgotModal(true)}>Забыли пароль?</Button>
        <Form.Group className="mb-5 mt-2" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Запомнить меня на 30 дней" />
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100'>
          Войти
        </Button>
      </Form>
      <Modal show={forgotModal} onHide={() => setForgotModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить пароль</Modal.Title>
        </Modal.Header>
        <Form className='p-4'>
          <Form.Group>
            <Form.Label>Почта</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Введите вашу почту"
              value={fEmail}
              onChange={(e) => setFEmail(e.target.value)}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setForgotModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={forgotPass}>
              Продолжить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Login
