import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Hero() {
    const history = useHistory()
    const { isLoggedIn } = useSelector(state => state.userReducer)

    const click = () => {
        if (isLoggedIn) {
            history.push('/profile')
        } else {
            history.push('/registration')
        }
    }

    return (
        <div className="container px-3 pb-5 mb-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src="https://cdn.britannica.com/65/89765-050-50F5F6C0/Nursultan-Kazakhstan.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width={700} height={500} loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h2 className="display-6 fw-bold lh-1 mb-4 text-white">Аренда квартир - Welhome</h2>
                    <p className="lead mb-4 text-white">Компания по аренде квартир Welhome предостовляет ассортимент квартир по городу Нур-Султан в разных регионов. Оформите квартиру онлайн быстро и легко!</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" className="btn btn-warning btn-lg px-4 me-md-2" onClick={click}>Оформить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero