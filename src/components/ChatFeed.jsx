import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    const renderMessages = () => {
        //Take the keys from messages and put them right here
        const keys = Object.keys(messages);

        //Loop trought messages 
        return keys.map((key, index) => {
            //Find one specific message dynamically
            const message = messages[key];

            //find last message. If index is 0, there is no last message
            const lastMessageKey = index === 0 ? null : keys[index - 1];

            //Find out if the message is mine
            const isMyMessage = userName === message.sender.username;

            //find people that read the message and render their avatar
            const renderReadReceipts = (message, isMyMessage) => {
                return chat.people.map((person, index) => person.last_read === message.id && (
                    <div
                        key={`read_${index}`}
                        className="read-receipt"
                        style={{
                            float: isMyMessage ? 'right' : 'left',
                            backgroundImage: `url(${person?.person?.avatar})`
                        }}
                    />
                ))
            }

            //render messages
            return (
                <div key={`msg_${index}`} style={{ width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage ? <MyMessage message={message} /> : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if(!chat) return 'Loading...';
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px'}} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;