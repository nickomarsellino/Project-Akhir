import React, {Component} from "react";
import {Route} from 'react-router-dom';
import FadeIn from 'react-fade-in';
import ScrollUpButton from "react-scroll-up-button";
import './Home.css';
import {Container} from "mdbreact"
import LoadingGif from '../../LoadingGif.gif';

//load another component
import Navbar from "../Navbar/Navigationbar";
import Profile from '../Form_editProfile/Edit_Profile'
import ChangePassword from '../Form_Change_Password/Change_Password'
import TwittBox from "../Twitt_Box/Twitt_Box";
import TwittContainer from "../Twitt_Container/Twitt_Container";
import axios from "axios/index";
import ProfilePage from '../Profile_Page/Profile_Page'
import MyProfilePage from '../Profile_Page/Profile_Page'
import SearchPage from '../Search_Page/Search_Page'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            profilePicture: '',
            isLoading:true
        };
    }

    getData() {
        axios.get('/api/users', {
            credentials: 'include',
            withCredentials: true
        })
            .then(res => {
                this.setState({
                    username: res.data.username,
                    userId: res.data._id,
                    profilePicture: res.data.profilePicture
                });
                localStorage.setItem("myThings",res.data._id);
                this.setState({
                  isLoading:false
                })
            });
    }


    verify() {
        axios.get('/api/authentication/verify', {
            credentials: 'include',
            withCredentials: true
        })
            .then(res => {
                if (res.data.success) {
                    this.props.history.push("/home");
                }
                else {
                    this.props.history.push("/signin");
                }
            });
    }

    componentWillMount() {
        this.verify();
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const editProfile = () => (
            <Profile userId={this.state.userId}/>
        );

        // get the local storage
        const parentChangePw = () => (
            <ChangePassword userId={this.state.userId}/>
        );

        const home = () => (
            <Container className="col-lg-6 col-lg-offset-2" style={{marginBottom: "5%"}}>
                <TwittBox username={this.state.username}
                          userId={this.state.userId}
                          profilePicture={this.state.profilePicture}
                />
                <TwittContainer userId={this.state.userId}
                                located="home"
                                isHome="home"
                                history={this.props.history}
                                profilePicture={this.state.profilePicture}
                                username={this.state.username}
                />
            </Container>
        );

        const profile = () => (
            <ProfilePage userIdProfile={this.props.location.state}
                         userLoginId={localStorage.getItem("myThings")}
                         username={this.state.username}
                         history={this.props.history}
                         profilePicture={this.state.profilePicture}
            />
        );

        const myProfile = () => (
            <MyProfilePage userId={localStorage.getItem("myThings")}
                           history={this.props.history}
                           profilePicture={this.state.profilePicture}
            />
        );

        const search = () => (
          <SearchPage userId={this.state.userId}
                      history={this.props.history}
                      searchData={this.props.location.state}
          />
        );

        if(this.state.isLoading){
          return(
            <center>
                <div className="LoadingGif">
                    <img className="LoadingGif" src={LoadingGif} alt={" "}/>
                </div>
            </center>
          )
        }

        return (
            <div>
                <ScrollUpButton TransitionBtnPosition={150} ToggledStyle={{paddingLeft: "4px"}}/>
                <FadeIn>
                    <div>
                        <Navbar className="navbarFixed" success={true}/>
                    </div>

                    <div>
                        <Route exact path={this.props.match.url} component={home}/>

                        <Route path={this.props.match.url + '/editProfile'} component={editProfile}/>

                        <Route path={this.props.match.url + '/changePassword'} component={parentChangePw}/>

                        <Route path={this.props.match.url + '/myProfile'} component={myProfile}/>

                        <Route path={this.props.match.url + '/profile'} component={profile}/>

                        <Route path={this.props.match.url + '/search'} component={search}/>

                    </div>
                </FadeIn>
            </div>
        )
    }
}


export default Home;
