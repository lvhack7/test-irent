import React, { useState, useEffect } from 'react'
import { Card, Container, Col, Image, Row, ListGroup, Badge, Button, Form } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import ApartmentService from '../../services/ApartmentService';
import CheckoutService from '../../services/CheckoutService';
import kaspi_logo from '../../assets/imgs/kaspi_logo.png'

const Billing = () => {
    const location = useLocation()
    const history = useHistory()
    const { user } = useSelector(state => state.userReducer)
    const [id, setId] = useState(location?.state?.id)
    const [data, setData] = useState({})
    const [carousel, setCarousel] = useState([])

    const [fullName, setFullName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [validated, setValidated] = useState()

    useEffect(() => {
        fetchApartment()
    }, [])

    async function fetchApartment() {
        const response = await ApartmentService.findApt(id)
        let arr = []

        for (let i = 0; i < response.data.numberOfPhotos; i++) {
            arr.push(i)
        }

        console.log(arr)
        setData(response.data)
        setCarousel(arr)
    }

    const checkOut = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity) {
            setValidated(true)
            const response = await CheckoutService.checkout({
                fullName, phoneNumber, userId: user?.id, aptId: id
            })
            await ApartmentService.removeApartment({ userId: user.id, aptId: id })
            alert(response.data.message)
            history.push('/profile')
        }
    }

    return (
        <Container className="mt-3">
            <h3 className='mt-5 text-center mb-5'><Badge>Оформление квартиры</Badge></h3>
            <Card className='p-3'>
                <h4 className='fw-bold p-4'>Информация о апартаменте</h4>
                <Row>
                    <Col md={5} className='mt-4 ms-4'>
                        <Carousel>
                            {
                                carousel.map(i => (
                                    <Carousel.Item key={i}>
                                        <img
                                            width={400}
                                            className="d-block w-100"
                                            src={`https://irent-app.herokuapp.com/images/${data.folder}/${i}.webp`}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Col>
                    <Col md={5}>
                        <div className="mt-4 ms-3 d-flex flex-column align-items-left">
                            <div>
                                <h4>{data.title}</h4>
                                <div className='mt-4 d-flex justify-content-between' style={{ width: 400, borderBottom: '1px solid grey' }}>
                                    {!data.occupied ?
                                        <div className='text-secondary text-success fw-bold'>
                                            Есть в наличии
                                        </div>
                                        :
                                        <div className='text-secondary text-danger fw-bold'>
                                            Нет в наличии
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mt-4 d-flex align-items-center" style={{ fontSize: 16, fontWeight: '600' }}>
                                <div><span style={{ fontSize: 16 }}>От: </span><span style={{ fontSize: 22, marginRight: '4.4rem' }}><Badge>{data.price} KZT/мес.</Badge></span></div>
                            </div>
                            <div style={{ fontSize: 17, fontWeight: 500 }} className="mt-3">Характеристики: </div>
                            <ListGroup as="ul" className='m-3'>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold">Адресс</div>
                                    </div>
                                    <div style={{ fontSize: '16px' }}>
                                        {data.address}, Нур-Султан
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold">Количество комнат</div>
                                    </div>
                                    <div style={{ fontSize: '18px' }}>
                                        {data.numberOfRooms}
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold">Этаж</div>
                                    </div>
                                    <div style={{ fontSize: '16px' }}>
                                        {data.floor} этаж
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="me-auto">
                                        <div className="fw-bold">Тип погашения</div>
                                    </div>
                                    <div style={{ fontSize: '16px' }}>
                                        Ежемесячная аренда
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Form className='p-4 bg-body mt-5' noValidate validated={validated}>
                    <h5 className='mb-4'>Контактные данные</h5>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите ваше ФИО"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                        <Form.Control.Feedback type='invalid'>Пожалуйста введите ваше ФИО</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Телефонный номер</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Введите номер телефона"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required />
                        <Form.Text>Примечание: Введенный вами номер будет привязан к способу оплаты</Form.Text>
                        <Form.Control.Feedback type='invalid'>Пожалуйста введите ваш номер телефона</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Способ опалаты:</Form.Label>
                        <div className=' d-flex align-items-center rounded-3 shadow-lg mb-3 p-3' style={{ width: '200px' }}>
                            <img width={45} src={kaspi_logo} />
                            <h5 className="fw-bold text-danger ms-2">
                                Kaspi bank
                            </h5>
                        </div>
                        <Form.Text>В данный момент другие методы оплаты не поддерживаются. Поэтому мы рекомендуем вам использовать Kaspi Bank.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Подтвердите коректность контактов" required />
                        <Form.Control.Feedback type='invalid'>Пожалуйста подтвердите контактные данные</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit" className='w-25 mx-auto float-end' onClick={checkOut}>
                        Оформить
                    </Button>
                </Form>
            </Card>
        </Container >
    )
}

export default Billing