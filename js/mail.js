function sendMail() {
    let link = 'mailto:sasha_bon@inbox.ru' + '?subject="My Portfolio from "' + 
    document.getElementById('m_name').value + ' ' + 
    document.getElementById('m_lastname').value + '&body=' + 
    document.getElementById('m_message').value + '. email: ' + 
    document.getElementById('m_email').value;

    window.location.href = link;
}