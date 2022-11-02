import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import logo from '../assets/imgs/irent_logo.png'


const Header = () => {
    const history = useHistory()
    const { isLoggedIn, user } = useSelector(state => state.userReducer)

    return (
        <Navbar className='shadow-sm' bg="light" expand="lg" style={{ padding: '10px' }}>
            <Container fluid>
                <Navbar.Brand onClick={() => history.push}>Welhome</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => history.push("/")}>Главная</Nav.Link>
                        <Nav.Link onClick={() => history.push("/apartment")}>Апартаменты</Nav.Link>
                        <Nav.Link onClick={() => history.push("/pricing")}>Цена</Nav.Link>
                        <Nav.Link onClick={() => history.push("/contact-us")}>Контакты</Nav.Link>
                    </Nav>
                    {
                        isLoggedIn ?
                            <Nav className="d-flex">
                                <Button style={{ marginRight: '16px' }} variant="primary"
                                    onClick={() => history.push('/profile')}>{user?.userName}</Button>
                            </Nav>
                            :
                            <Nav className="d-flex">
                                <Button style={{ marginRight: '16px' }} variant="warning"
                                    onClick={() => history.push('/registration')}>Регистрация</Button>
                                <Button variant="outline-warning"
                                    onClick={() => history.push('/login')}>Войти</Button>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header