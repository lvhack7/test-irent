import React, { useEffect, useState } from 'react'
import Advantages from '../components/home/Advantages'
import Hero from '../components/home/Hero'
import Questions from '../components/home/Questions'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'

const Home = () => {
    const { user, isLoggedIn } = useSelector(state => state.userReducer)

    return (
        <div>
            {
                isLoggedIn && !user.isActivated &&
                <div className='container p-3 mb-5'>
                    <Alert show={!user?.isActivated} variant='warning'>
                        Пожалуйста подтвердите вашу почту!
                    </Alert>
                </div>
            }
            <div className='bg-primary shadow'>
                <Hero />
            </div>
            <Questions className='mt-5' />
            <Advantages />
        </div>
    )
}

export default Home