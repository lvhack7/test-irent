import React from 'react'

const Advantages = () => {
    return (
        <div className='mt-5 container px-4 py-5'>
            <h2 className="pb-2 border-bottom">Наши преимущества</h2>
            <div className="row featurette mt-5">
                <div className="col-md-7" data-aos="fade-right"
                    data-aos-duration="1200"
                    data-aos-delay="50"
                    data-aos-once="true">
                    <h4 className="featurette-heading fw-normal lh-1">1. Удобное расположение</h4>
                    <p className="lead">Наши жилый комплекс раположены в самях уютных и развитых районов города Нур-Султан. Возле домов есть большое количество магазинов, торговых центров и всего что вам нужно.</p>
                </div>
                <div className="col-md-5">
                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width={500} height={500} src="https://vlast.kz/media/pages/id/edel2.jpg" role="img" focusable="true" />
                </div>
            </div>
            <hr className="featurette-divider" />
            <div className="row featurette">
                <div className="col-md-7 order-md-2" data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="50"
                    data-aos-once="true">
                    <h4 className="featurette-heading fw-normal lh-1">2. Хорошый фассат квартир</h4>
                    <p className="lead">Наши апартаменты имеют самый качественный и хроший фассат квартир. Туда фходит отличная мебель, планировка и состояния квартиры.</p>
                </div>
                <div className="col-md-5 order-md-1">
                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width={500} height={500} src="https://www.aveliving.com/AVE/media/Property_Images/Florham%20Park/hero/flor-apt-living-(2)-hero.jpg?ext=.jpg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false" />
                </div>
            </div>
            <hr className="featurette-divider mt-5" />
            <div className="row featurette">
                <div className="col-md-7" data-aos="fade-right"
                    data-aos-duration="1200"
                    data-aos-delay="50"
                    data-aos-once="true">
                    <h4 className="featurette-heading fw-normal lh-1">3. Быстрое оформление</h4>
                    <p className="lead">С помощью сервиса IRent вы способны оформить квартиру быстро и просто. Вы можете оформить квартиру за одни сутки. Онлайн сервис создан для вашего удобства поэтому мы сделали этот процесс очень интуитивным.</p>
                </div>
                <div className="col-md-5">
                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width={500} height={500} src="https://www.ivd.ru/images/cache/2021/10/20/fit_930_519_false_crop_1800_1012_0_94_q90_1989702_b036c2c7fe3356834bc0c427f.jpeg" />
                </div>
            </div>
            <hr className="featurette-divider" />
        </div>
    )
}

export default Advantages