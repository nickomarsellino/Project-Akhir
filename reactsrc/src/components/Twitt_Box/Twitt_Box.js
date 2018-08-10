import React, {Component} from "react";
import {Card, CardBody, Button} from "mdbreact"
import {Form, TextArea, Image, Icon} from 'semantic-ui-react'
import profile from '../../daniel.jpg';
import './Twiit_Box.css'
import axios from "axios/index";


class Twitt_Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            userTweet: '',
            tweetImage: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const userId = this.props.userId;
        const username = this.props.username;

        this.setState({
            userId: userId,
            username: username
        });
    }


    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        this.setState({[name]: target.value});
    }

    handleSubmit(e) {

        e.preventDefault();

        const tweet = {
            tweetText: this.state.userTweet,
            username: this.state.username,
            userId: this.state.userId,
            tweetImage: this.state.tweetImage
        };

        const method = 'post';
        axios({
            method: method,
            responseType: 'json',
            url: `api/users/tweet`,
            data: tweet
        })
            .then(() => {
                window.location.reload();
            });
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    fileSelectedHandler = event => {
      this.setState({
        imageUpload: event.target.files[0]
      })
      console.log(event.target.files[0]);
    }

    render() {
        return (
            <div className="Tweet-Container">
                <Card>
                    <CardBody>
                        <div className="profileBox">
                            <Image src={profile} avatar id="avatarBox"/>
                            <span><h5 id="nameBox">{this.state.username}</h5></span>
                        </div>
                        <Form id="Form_Container" onSubmit={this.handleSubmit}>
                            <Form.Field
                                id='form-textarea-control-opinion'
                                type="text"
                                control={TextArea}
                                placeholder={"Have a nice day " + this.state.username}
                                style={{maxHeight: "100px"}}
                                name="userTweet"
                                onChange={this.handleInputChange}
                            />
                            <div className="buttonBox">
                                <div>
                                    <Icon.Group size='large' id="addImageButton" onClick={this.handleClick.bind(this)}>
                                        <Icon name='images'/>
                                        <Icon corner name='add'/>
                                    </Icon.Group>
                                </div>
                                <input type="file" id="tweetImage" ref="fileUploader" style={{display: "none"}} onChange={this.fileSelectedHandler} />


                                <Button color="default"
                                        size="md"
                                        id="postButton"
                                        type="submit"
                                        style={{borderRadius: "100px"}}
                                        disabled={!this.state.userTweet}
                                >Post</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Twitt_Box;
