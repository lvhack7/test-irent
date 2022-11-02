import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { registration } from '../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Registration = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isLoading, message } = useSelector(state => state.userReducer)

    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)

    const register = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        dispatch(registration(email, userName, password))
    }

    return (
        <div className="d-flex justify-content-center">
            <Form noValidate validated={validated} className='shadow p-4 mb-5 bg-body rounded mt-5' style={{ width: '550px' }}
                onSubmit={register}>
                <h2 className='text-center mb-4'>Регистрация</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Создайте имя пользователя</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Пожалуйста создайте имя пользователя</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Адресс электронной почты</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Введите почту"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Пожалуйста введите вашу почту</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Создайте пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        Введите пароль минимум из 6 симболов
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>Пожалуйста создайте пароль</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicCheckbox">
                    <Form.Check required type="checkbox" label="Я даю свое согласие на сбор, обработку и использование моих персональных данных" />
                </Form.Group>

                <Button variant="primary" type="submit" className='w-100'>
                    Создать аккаунт
                </Button>
            </Form>
        </div>
    )
}

export default Registration