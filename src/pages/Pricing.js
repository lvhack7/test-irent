import React from 'react'
import { Badge, Container } from 'react-bootstrap'
import kaspi_logo from '../assets/imgs/kaspi_logo.png'
import credit_card from '../assets/imgs/credit-card.png'

const Pricing = () => {
  return (
    <Container>
      <h2 className='mt-5 text-center'><Badge bg='success'>Оплата</Badge></h2>
      <div className='lead text-center' style={{ fontSize: '23px', fontWeight: '500', marginTop: '3rem' }}>Наши Способы оплаты</div>
      <div className="row row-cols-1 row-cols-md-2 mb-3 justify-content-md-center text-center mt-3">
        <div className="col col-lg-5">
          <div className="card mb-4 rounded-3 shadow">
            <div className='card-header py-3 mb-2'>
              <img width={50} src={kaspi_logo} />
              <h4 className="fw-bold text-danger">
                Kaspi bank
              </h4>
            </div>
            <div className="card-body p-4 mb-4">
              <h5 className="card-title pricing-card-title">Ежемесячная аренда</h5>
              <div>
                С помощью Kaspi bank вы можете погасить ежемесячную арендную плату за квартиру из нашего каталога. Перевод суммы будет осуществлен с помощью платоформы от Kaspi bank с договоренными сроками платежа.
              </div>
            </div>
          </div>
        </div>
        <div className="col col-lg-5">
          <div className="card mb-4 rounded-3 shadow">
            <div className="card-header py-3 mb-2">
              <img width={45} src={credit_card}/>
              <h4 className="my-0 fw-normal">Банковская кредитка</h4>
            </div>
            <div className="card-body p-4 mb-4">
              <h5 className="card-title pricing-card-title">Ежемесячная аренда</h5>
              <div>
                С помощью банковской карты вы можете погасить ежемесячную арендную плату за квартиру из нашего каталога. Перевод суммы будет осуществлен с помощью банковской карточке с договоренными сроками платежа и деталями при оформлений.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Pricing