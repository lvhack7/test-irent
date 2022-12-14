import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Button, Form, Badge, Row, Col, Table, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import ApartmentService from '../services/ApartmentService';
import AuthService from '../services/AuthService';
import CheckoutService from '../services/CheckoutService'
import { createApartment } from '../store/actions/apartmentAction';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')


const Admin = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [users, setUsers] = useState([])
    const [apartments, setApartments] = useState([])
    const [files, setFiles] = useState([])
    const [data, setData] = useState({
        title: '',
        rating: 5,
        price: '',
        numberOfRooms: '',
        numberOfPhotos: 0,
        occupied: false,
        floor: '',
        address: ''
    })
    const [checkedApts, setCheckedApts] = useState([])
    const [checkOutId, setcheckOutId] = useState()

    useEffect(() => {
        if (user?.role !== 'ADMIN') {
            history.push("/")
            return;
        }

        fetchData()
        fetchAllCheckedApts()
    }, [user])

    const fetchData = async () => {
        const dataUsers = await AuthService.getUsers()
        const dataApartments = await ApartmentService.getAll()

        setUsers(dataUsers.data)
        setApartments(dataApartments.data)
    }

    async function fetchAllCheckedApts() {
        const response = await CheckoutService.findAll()
        const data = response.data
        data.map(async (item) => {
            let apt = await ApartmentService.findApt(item.apartmentId)
            setCheckedApts(
                [...checkedApts,
                {
                    id: item.id,
                    title: apt.data.title,
                    billingType: item.billingType,
                    clientName: item.clientName,
                    phoneNumber: item.phoneNumber,
                    price: apt.data.price,
                    passed: item.passed,
                    datetime: formatDate(item.createdAt)
                }
                ]
            )
        })
    }

    function formatDate(string) {
        let date = dayjs(string).format('MMMM DD, YYYY')
        return date.charAt(0).toUpperCase() + date.slice(1)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createApartment(files, JSON.stringify(data)))
    }

    const passCheckout = async (e) => {
        e.preventDefault()
        const response = await CheckoutService.passApartment({ checkOutId })
        alert(response?.data?.message)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFiles = (e) => {
        setFiles(e.target.files)
        setData(prevState => ({
            ...prevState,
            ['numberOfPhotos']: e.target.files.length
        }))
    }

    return (
        <Container className="d-flex flex-column">
            {console.log(checkedApts)}
            <h2 className='text-center mb-5 mt-5'><Badge bg="primary">?????????? ????????????</Badge></h2>
            <Row>
                <Col md={8}>
                    <div className='shadow p-4 bg-body rounded'>
                        <h4 className='mb-4'>?????????????? ???????????? ???? ??????????????????????</h4>
                        {
                            checkedApts ?
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>????????????????</th>
                                            <th>?????????????????? ??????????????</th>
                                            <th>?????? ??????????????????????</th>
                                            <th>??????????????</th>
                                            <th>?????????????????? ?? ??????????</th>
                                            <th>???????? ????????????????</th>
                                            <th>???????????? ????????????????????</th>
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
                                                    <td>{item.price} ????</td>
                                                    <td>{item.datetime}</td>
                                                    <td>
                                                        {
                                                            item.passed ? <p>????????????</p> : <p>?? ??????????????????</p>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                :
                                <p className='lead'>???????? ?????? ?????????????????????? ??????????????</p>
                        }
                    </div>
                </Col>
                <Col md={4}>
                    <Form className='shadow p-4 mb-5 bg-body rounded' onSubmit={passCheckout}>
                        <h4>???????????????? ????????????????</h4>
                        <p className='lead'>???????????????? ???????????????? ?????????? ???????? ?????? ?????????????????????? ?? ???????????????? ?? ???????????? ??????????</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ID ????????????</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder='?????????????? ID ????????????'
                                value={checkOutId}
                                onChange={(e) => setcheckOutId(e.target.value)} />
                        </Form.Group>
                        <Button type="submit">????????????????</Button>
                    </Form>
                </Col>
            </Row>
            <div className='shadow p-4 mb-5 bg-body rounded mt-5'>
                <h4 className='text-center mb-4'>???????????? ??????????????????????????</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>?????? ????????????????????????</th>
                            <th>??????????</th>
                            <th>???????????? ??????</th>
                            <th>??????????????</th>
                            <th>?????????????? ??????????????????????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.fullName}</td>
                                    <td>{user?.phoneNumber}</td>
                                    <td>{user.isActivated
                                        ? "??????????????????????" : "???? ??????????????????????"
                                    }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='shadow p-4 mb-5 bg-body rounded mt-5'
                onSubmit={onSubmit}>
                <h4 className='text-center mb-4'>???????????? ???? ??????????????????</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>????????????????</th>
                            <th>????????????</th>
                            <th>??????. ????????????</th>
                            <th>???????? (????/??????.)</th>
                            <th>????????????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apartments.map((apt) => (
                                <tr key={apt.id}>
                                    <td>{apt.id}</td>
                                    <td style={{ wordWrap: 'break-word', width: '250px' }}>{apt.title}</td>
                                    <td>{apt.address}</td>
                                    <td>{apt.numberOfRooms}</td>
                                    <td>{apt.price}</td>
                                    <td>{apt.occupied ? "??????????????????????" : "?? ??????????????"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <Row>
                <Col md={5}>
                    <Form className='shadow p-4 mb-5 bg-body rounded mt-5'
                        onSubmit={onSubmit}>
                        <h4 className='text-center mb-4'>???????????????? ????????????????</h4>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>???????????????? ????????????????</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                value={data.title}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                ?????????????? ???????????????? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>????????????</Form.Label>
                            <Form.Control
                                name="address"
                                type="text"
                                value={data.address}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                ?????????????? ???????????? ???????????? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>???????????????????? ????????????</Form.Label>
                            <Form.Control
                                name="numberOfRooms"
                                type="text"
                                value={data.numberOfRooms}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                ?????????????? ???????????????????? ???????????? ?? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>????????</Form.Label>
                            <Form.Control
                                name="floor"
                                type="text"
                                value={data.floor}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                ?????????????? ???????? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>????????</Form.Label>
                            <Form.Control
                                name="price"
                                type="text"
                                value={data.price}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                ?????????????? ?????????????????????? ?????????????????? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>?????????? ????????????????</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFiles}
                                multiple />
                            <Form.Text className="text-muted">
                                ???????????????? ?????????? ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-3 w-100'>
                            ????????????????
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin