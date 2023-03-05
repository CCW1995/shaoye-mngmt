import React, { Component } from 'react'
import { 
  Col, Row, Button, Label,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import Slider from "react-slick"
import { GrView, GrFormViewHide } from 'react-icons/gr'

import LoadingOverlay from 'components/Indicator/LoadingOverlay'

import bg1 from 'assets/shaoye/location.jpg'
import bg2 from 'assets/shaoye/message.jpg'
import icon from 'assets/shaoye/mask.jpg'
import logotext from 'assets/shaoye/logotext.jpg'

import WithLogin from './actions'

const SliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  initialSlide: 0,
  autoplay: true,
  adaptiveHeight: true
}

class Login extends Component {
  state = {
    email: '',
    password: '',
    statusModal: false
  }

  handleKeyPress = e => {
    if(e.key === 'Enter'){
      
      if ( this.state.email.length < 1 || this.state.password.length < 1){
        return false
      }

      this.props.onClickLogin({
        email: this.state.email, 
        password: this.state.password
      })
    }
  }


  render = () => {
    const { 
      onChangeHOC,
      showPassword
    } = this.props
    return (
      <>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider { ...SliderSettings }>
                  <div
                    className="h-100 d-flex justify-content-center align-items-center">
                    <div
                      className="slide-img-bg"
                      style={{ backgroundImage: 'url(' + bg1 + ')' }}/>
                    <div className="slider-content"></div>
                  </div>
                  <div
                    className="h-100 d-flex justify-content-center align-items-center">
                    <div
                      className="slide-img-bg"
                      style={{ backgroundImage: 'url(' + bg2 + ')' }}/>
                    <div className="slider-content"></div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col 
                lg="9" md="10" sm="12" className="mx-auto app-login-box" 
                style={{ position: 'relative' }}
              >
                <img src={ icon } style={{ width: 200, marginLeft: -50 }} />
                <h4 className="mb-0">
                  <div>欢迎归来</div>
                  <span className="login-title">Please sign in to your account.</span>
                </h4>
                <Row className="divider"/>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          onChange={ e => {
                            this.setState({ email: e.target.value })
                          }}
                          type="email"
                          name="email"
                          id="exampleEmail"
                          onKeyPress={this.handleKeyPress}
                          value={ this.state.email }
                          placeholder="Email here..."
                          required />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div className={ 'd-flex' }>
                          <Label for="examplePassword">Password</Label>
                          <div
                            style={{ width: 14, height: 14, marginLeft: 10, cursor: 'pointer' }}
                            onClick={ () => onChangeHOC( !showPassword, 'showPassword' )}>
                            {
                              showPassword 
                                ? <GrView style={{ width: '100%', height: '100%' }}/>
                                : <GrFormViewHide style={{ width: '100%', height: '100%' }}/>
                            }
                          </div>
                        </div>
                        <Input
                          onChange={ e => {
                            this.setState({ password: e.target.value })
                          }}
                          type={ showPassword ? 'text' : 'password' }
                          name="password"
                          id="examplePassword"
                          value={ this.state.password }
                          onKeyPress={this.handleKeyPress}
                          placeholder="Password here..."
                          required />
                      </FormGroup>
                    </Col>
                  </Row>
                  { 
                    this.props.showErrorMessage && (
                      <p style={{ color: '#ff0000' }}>
                        { `This combination of email and password is incorrect. `}
                        <strong>Forgot Password ?</strong>
                      </p>
                  )}
                  <Row className="divider" />
                  <div className="ml-auto">
                    <Button
                      color={ 'warning' }
                      size="lg"
                      onClick={() => {
                        this.props.history.push( '/dashboard' )
                      }}>Login</Button>
                  </div>
                </Form>
              </Col>
            </Col>
          </Row>
        </div>
        { this.props.onLoadLogin && <LoadingOverlay /> }
      </>
    )
  }
}   


export default WithLogin( Login )