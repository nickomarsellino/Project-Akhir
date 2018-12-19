import React, {Component} from "react";
import { Image } from 'semantic-ui-react'
import profile from '../../../daniel.jpg';
import './Inbox_Chat_Container.css'
import InboxChatComponent from '../Inbox_Chat_Component/Inbox_Chat_Component'
import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://10.183.28.155:8000');

class Inbox_Chat_Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatMessageDetail: [],
            chatMessageId: '',
            roomMessagesId: this.props.chatMessageDetail.roomMessagesId
        };
    }

    // Pertama render iniiii
    componentWillMount() {


        this.setState({
            chatMessageDetail: this.props.chatMessageDetail.messages
        })

        if(this.props.isClearMessage){
            this.setState({
                chatMessageDetail: []
            })
        }

        socket.on(this.state.roomMessagesId + 'getMessage', bebasnamavariabel => {
            const allInboxMessage = this.state.chatMessageDetail;
            const newMessage = [bebasnamavariabel];
            this.setState({
                chatMessageDetail: (allInboxMessage.concat(newMessage))
            });

            // axios.get('/api/inbox/changeUnReadMessage/' + this.props.chatMessageDetail._id)
            //     .then(res => {
            //
            //     });
        });
    }

    componentWillReceiveProps(props) {

        this.setState({
            chatMessageDetail: props.chatMessageDetail.messages
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    setProfileImage(profilePicture) {
        let imageUrl = profilePicture;
        if (imageUrl) {
            return (
                <img alt=" "
                     src={require(`../../../uploads/${imageUrl}`)}
                     className="float-right"
                />
            );
        }
        else {
            return (
                <img alt=" "
                     src={profile}
                />
            );
        }
    }

    clearChatHistoy(roomMessagesId){
        const pullChatData = {
            roomMessagesId: roomMessagesId,
        };
        axios({
            method: 'PUT',
            responseType: 'json',
            url: `http://localhost:3001/api/inbox/unSendMessage/` + this.props.chatMessageDetail._id,
            data: pullChatData
        })
        this.setState({
            chatDetailMessage : pullChatData
        })
        this.props.history.replace({
            pathname: '/home/inbox',
            state: {
                chatDetailMessage: this.props.chatMessageDetail,

                //Ini Untuk Menandakan dia menekan Clear Chat.
                isClearMessage: true
            }
        })
    }

    render() {
        return (
            <div className="inboxChatContainer">
                <div id="avatarProfileUserContainer">
                    <Image avatar id="avatarProfileUser">
                        {this.setProfileImage(this.props.chatMessageDetail.profileReceiverPicture)}
                    </Image>
                    <span>
                        <p>{this.props.chatMessageDetail.userReceiverName}</p>
                    </span>
                    <div onClick={ () => this.clearChatHistoy(this.props.chatMessageDetail.roomMessagesId)}
                    className="clearHistory"><span className="X">Clear chat history</span></div>
                </div>
                <div id="chatContainer">
                    {this.state.chatMessageDetail.map(chatData =>
                        <InboxChatComponent
                        chatData={chatData}
                        userChatData={this.props.chatMessageDetail}
                        >
                        </InboxChatComponent>
                    )}
                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>

            </div>
        )
    }
}

export default Inbox_Chat_Container;
