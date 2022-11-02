import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { BsPersonLinesFill } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'
import logo from '../../assets/imgs/irent_logo.png'


function Questions() {
    return (
        <div className="container px-4 py-5" id="custom-cards">
            <h2 className="pb-2 border-bottom">Почему мы?</h2>
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <div className="col" data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="100"
                    data-aos-once="true">
                    <div className="card card-cover h-100 overflow-hidden text-white bg-danger rounded-4 shadow-lg">
                        <div className="d-flex flex-column h-100 px-2 py-5 pb-3 mt-2 text-white text-shadow-1">
                            <BiHomeAlt className='mx-auto mb-1' style={{ width: '40px', height: '40px' }} />
                            <h2 className="mb-5 fw-bold text-center">Широкий ассортимент квартир</h2>
                        </div>
                        <ul className="d-flex list-unstyled mt-auto px-3">
                            <li className="me-auto">
                                <img src={logo} alt="Logo" width={32} height={32} className="rounded-circle border border-white" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col" data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="150"
                    data-aos-once="true">
                    <div className="card card-cover h-100 overflow-hidden text-white bg-warning rounded-4 shadow-lg">
                        <div className="d-flex flex-column h-100 px-2 py-5 pb-3 mt-4 text-white text-shadow-1">
                            <BsPersonLinesFill className='mx-auto mb-2' style={{ width: '40px', height: '40px' }} />
                            <h2 className="mb-5 fw-bold text-center">Удобное оформление</h2>
                        </div>
                        <ul className="d-flex list-unstyled mt-auto px-3">
                            <li className="me-auto">
                                <img src={logo} alt="Logo" width={32} height={32} className="rounded-circle border border-white" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col" data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="200"
                    data-aos-once="true">
                    <div className="card card-cover h-100 overflow-hidden text-white bg-primary rounded-4 shadow-lg">
                        <div className="d-flex flex-column h-100 px-2 py-5 pb-3 mt-5 text-shadow-1">
                            <TbWorld className='mx-auto mb-2' style={{ width: '45px', height: '45px' }} />
                            <h2 className="mb-4 lh-1 fw-bold text-center">Все онлайн</h2>
                        </div>
                        <ul className="d-flex list-unstyled mt-auto px-3">
                            <li className="me-auto">
                                <img src={logo} alt="Logo" width={32} height={32} className="rounded-circle border border-white" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Questions