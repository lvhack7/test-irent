import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux'
import { changeUserName, logout } from '../../store/actions/userActions';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApartmentService from '../../services/ApartmentService';
import { ListGroup } from 'react-bootstrap';
import CheckoutService from '../../services/CheckoutService';
import { removeBasketApartment } from '../../store/actions/apartmentAction';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')


const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [updatedUserName, setUpdatedUserName] = useState(user.userName)
    const [basket, setBasket] = useState([])
    const [checkedApts, setCheckedApts] = useState([])

    useEffect(() => {
        fetchAllApartments()
    }, [user?.basket])

    useEffect(() => {
        fetchAllCheckedApts()
    }, [])

    async function fetchAllCheckedApts() {
        const response = await CheckoutService.findAllCheckedApts(user?.id)
        const data = response.data
        data.map(async (item) => {
            let apt = await fetchApartment(item.apartmentId)
            setCheckedApts(prevState => [
                ...prevState,
                {
                    id: item.id,
                    title: apt.title,
                    billingType: item.billingType,
                    clientName: item.clientName,
                    phoneNumber: item.phoneNumber,
                    price: apt.price,
                    passed: item.passed,
                    datetime: formatDate(item.createdAt)
                }
            ])
        })
    }

    function formatDate(string) {
        let date = dayjs(string).format('MMMM DD, YYYY')
        return date.charAt(0).toUpperCase() + date.slice(1)
    }

    async function fetchApartment(id) {
        const response = await ApartmentService.findApt(id)
        return response.data
    }

    async function fetchAllApartments() {
        const list = user?.basket
        for (let i = 0; i < list?.length; i++) {
            let res = await fetchApartment(list[i])
            setBasket(prevState => [
                ...prevState,
                { id: res.id, title: res.title }
            ])
        }
    }

    async function removeApt(aptId) {
        dispatch(removeBasketApartment(user.id, aptId))
    }

    const logOut = () => {
        dispatch(logout())
        history.push("/")
    }

    const updateUser = async (e) => {
        e.preventDefault()
        if (updatedUserName !== user.userName) {
            dispatch(changeUserName(user.email, updatedUserName))
        }
    }

    return (
        <Container className='mt-5'>
            <h2 className='text-center'><Badge bg="primary">Мой профиль</Badge></h2>
            {console.log(checkedApts)}
            <Row className='mt-5'>
                <Col xs={12} md={6}>
                    <Form className='shadow p-4 mb-5 bg-body rounded mr-5' onSubmit={updateUser}>
                        <h5 className="mb-4">Мой данные</h5>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Почтовый адрес</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                defaultValue={user?.email}
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedUserName}
                                onChange={(e) => setUpdatedUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' className='mb-3'>Обновить профиль</Button>
                        {
                            user?.role === 'ADMIN' ?
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Админ панель</Form.Label>
                                    <Button variant="warning" type="submit" className='w-100'
                                        onClick={() => history.push('/admin')}>
                                        Войти в админ панель
                                    </Button>
                                </Form.Group>
                                :
                                <></>
                        }
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    <div className='shadow p-4 bg-body rounded'>
                        <h5 className="mb-4">Текущий апартаменты</h5>
                        <ListGroup className='mb-3'>
                            {
                                basket.length === 0 && <p>У вас пока нет добавленных апартаментов...</p>
                            }
                            {
                                basket.map(item => (
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                        key={item.id}
                                    >
                                        <div className="mr-3" style={{ wordWrap: 'break-word', width: '300px' }}>
                                            {item.title}
                                        </div>
                                        <div className='d-flex align-items-center' style={{ fontSize: '13px' }}>
                                            <Button onClick={() => history.push({
                                                pathname: '/billing',
                                                state: { id: item.id }
                                            })} className='me-3'>Оформить</Button>
                                            <AiOutlineCloseCircle onClick={() => removeApt(item.id)} className='text-danger' style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                                        </div>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        <p className='lead'>В этой секций вы можете добавлять квартиры которые вы в дальнейшом можете оформить</p>
                        <Button variant="primary" type="submit" className='w-100'
                            onClick={() => history.push('/apartment')}>
                            Добавить
                        </Button>
                    </div>
                </Col>
            </Row>
            <div className='shadow p-4 mb-5 bg-body rounded mt-5'>
                <h4>Мой квартиры</h4>
                {
                    checkedApts?.length > 0 ?
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Платежная система</th>
                                    <th>Имя арендующего</th>
                                    <th>Телефон</th>
                                    <th>Стоимость в месяц</th>
                                    <th>Дата создания</th>
                                    <th>Статус оформления</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkedApts.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.billingType}</td>
                                            <td>{item.clientName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.price} тг</td>
                                            <td>{item.datetime}</td>
                                            <td>
                                                {
                                                    item.passed ? <p>Выдано</p> : <p>В обработке</p>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        :
                        <p className='lead'>У вас пока нет оформленных квартир</p>
                }
            </div>
            <Button variant={'danger'} className='mx-auto' onClick={logOut}>Выйти с акканута</Button>
        </Container>
    )
}

export default Profile