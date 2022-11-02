import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import AuthService from '../../services/AuthService'

const ForgotPassword = () => {
    const history = useHistory()
    const { link } = useParams()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword && password !== null) {
            await AuthService.forgotPassword({ activationLink: link, newPassword: password })
            alert("Пароль успешно изменен, теперь можете войти в аккаунт")
            history.push('/login')
        } else {
            alert('Пароли не совпадают')
        }
    }

    return (
        <Container>
            <Form className='shadow p-4 bg-body mt-5 mx-auto' onSubmit={onSubmit} style={{ width: '550px' }}>
                <h4 className='text-center'>Востановление пароля</h4>
                <Form.Group className='mb-3'>
                    <Form.Label>Новый Пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholer="Введите новый пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholer="Подтвердите новый пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Сохранить</Button>
            </Form>
        </Container>
    )
}

export default ForgotPassword