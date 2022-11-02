import React from 'react'
import { Container } from 'react-bootstrap'

function Contact() {
    return (
        <Container style={{marginBottom: '10rem'}}>
            <h3 className='mt-5 fw-bold mb-3'>Наши контакты</h3>
            <div className='shadow rounded-3 p-4'>
                <h4 className='lead fw-normal mb-4'>Контактные данные</h4>
                <p className='lead'>Телефон:  +7 747 370 39 87</p>
                <p className='lead'>Почта:  222083@mail.ru</p>
                <p>Связывайтесь с нами по вашим вопросам и комментарием</p>
            </div>
        </Container>
    )
}

export default Contact