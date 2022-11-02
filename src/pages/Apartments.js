import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ApartmentService from '../services/ApartmentService'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container, Badge, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { APARTMENT_ROUTE } from '../utils/consts';

const Apartments = () => {
    const history = useHistory()
    const [data, setData] = useState([])

    useEffect(() => {
        fetchAll()
    }, [])

    async function fetchAll() {
        const response = await ApartmentService.getAll()
        setData(response.data)
    }

    return (
        <Container>
            <h2 className='text-center mt-5'><Badge bg="primary">Наш каталог апартаментов</Badge></h2>
            <Row xs={1} md={2} className="g-5 mt-3">
                {
                    data.map((item, i) => (
                        <Col md={4} key={i}>
                            <Card className='shadow' style={{cursor: 'pointer'}} onClick={() => history.push(APARTMENT_ROUTE + '/' + item.id)}>
                                <Card.Img variant="top" src={`https://irent-app.herokuapp.com/images/${item?.folder}/0.webp`}
                                    style={{ height: '250px' }} />
                                <Card.Body>
                                    <Card.Title className='mb-3'>{item?.title}</Card.Title>
                                    <Card.Text>
                                        Адресс: {item?.address}
                                    </Card.Text>
                                    <Card.Text>
                                        Комнаты: {item?.numberOfRooms}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='d-flex justify-content-between align-items-center'>
                                    <Button variant='primary' className='float-right'>Подробнее</Button>
                                    {!item.occupied ?
                                        <div className='text-secondary text-success fw-bold'>
                                            Есть в наличии
                                        </div>
                                        :
                                        <div className='text-secondary text-danger fw-bold'>
                                            Нет в наличии
                                        </div>
                                    }
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Apartments