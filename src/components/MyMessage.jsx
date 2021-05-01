const MyMessage = ({ message }) => {
    //if length is greater than 0, message is an image
    if(message?.attachments?.length > 0){
        //render image message
        return (
            <img 
                src={message.attachments[0].file}
                alt="message-attchment"
                className="message-image"
                style={{ float: 'right' }}
            />
        )
    }
    //render text message
    return (
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50'}}>
            {message.text}
        </div>
    );
}

export default MyMessage;