import React, {Component} from "react";
import { Route } from 'react-router-dom';
import './Home.css';
import {getFromStorage} from "../../utils/storage";

//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'

import { Form } from 'semantic-ui-react';
import { Button} from 'mdbreact';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            tweet : ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const tweet = target.tweet;

        this.setState({ [tweet]: target.value });
    }

    componentWillMount(){
        const obj = getFromStorage('bebas');
        this.setState({
            userId: obj.userId
        });
    }

    handleSubmit(e){
      e.preventDefault();
    }

  render(){
        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

    return(
      <div>
        <div id="navbar">
            <Navbar success={true}
            userId={this.state.userId} />
        </div>
        <div>
            <Route path={this.props.match.url+'/profile'} component={editProfile}/>
        </div>
        <br />
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input required type="label"
                      placeholder='Whats happening?'
                      className={this.state.formStatus}
                      onChange={this.handleInputChange}
                      name="email"
            />
            <Button type="submit">Tweet!</Button>
          </Form>
        </div>


      </div>
    )
  }
}


export default Home;
