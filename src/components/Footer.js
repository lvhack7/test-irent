import React from 'react'
import { useHistory } from 'react-router-dom'

function Footer() {
    const history = useHistory()
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 px-4 my-4 mt-5 border-top">
            <p className="col-md-4 mb-0 text-muted">© 2022 Welhome</p>
            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none text-primary fs-5 fw-bold">
                Welhome
            </a>
            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a onClick={() => history.push('/')} className="nav-link px-2 text-muted">Главная</a></li>
                <li className="nav-item"><a onClick={() => history.push('/apartment')} className="nav-link px-2 text-muted">Апартаменты</a></li>
                <li className="nav-item"><a onClick={() => history.push('/pricing')} className="nav-link px-2 text-muted">Цены</a></li>
                <li className="nav-item"><a onClick={() => history.push('/about-us')} className="nav-link px-2 text-muted">Про нас</a></li>
            </ul>
        </footer>
    )
}

export default Footer