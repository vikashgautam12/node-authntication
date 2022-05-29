module.exports.isValidEmail =(email) => {
    const re =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

module.exports.isValidPassword =(password) => {
    // const re = /^(?=.*\d).{8,}$/
    // const re =  /^[A-Za-z]\w{7,14}$/
    // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    console.log(password);
    return re.test(password)

}