import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Col, Image, Row, ListGroup, Badge } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import ApartmentService from '../services/ApartmentService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addBasketApartment } from '../store/actions/apartmentAction';


const ApartmentPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, isLoggedIn } = useSelector(state => state.userReducer)
    const [data, setData] = useState({})
    const [carousel, setCarousel] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchApartment()
    }, [user])

    async function fetchApartment() {
        const response = await ApartmentService.findApt(id)
        let arr = []

        for (let i = 0; i < response.data.numberOfPhotos; i++) {
            arr.push(i)
        }
        setData(response.data)
        setCarousel(arr)
    }

    const insertApartment = () => {
        dispatch(addBasketApartment(user.id, id))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={5} className='mt-5 ms-4'>
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
                    <div className="mt-5 ms-3 d-flex flex-column align-items-left">
                        <div>
                            <h4>{data.title}</h4>
                            <div className='mt-4 d-flex justify-content-between' style={{ width: 400, borderBottom: '1px solid grey' }}>
                                <div>Рэйтинг: <span className='text-secondary'>{data.rating}/5</span></div>
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
                            {
                                isLoggedIn ?
                                    <div>
                                        {
                                            user?.basket?.includes(parseInt(id)) ?
                                                <span className="mr-4">У вас в списке</span>
                                                :
                                                <Button className="mr-4" variant={'outline-warning'} onClick={insertApartment}>Добавить в профиль</Button>
                                        }
                                    </div>
                                    :
                                    <Button variant='primary' onClick={() => history.push('/registration')}>Оформить</Button>
                            }
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
        </Container >
    )
}

export default ApartmentPage