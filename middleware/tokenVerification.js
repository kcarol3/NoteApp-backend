const jwt = require("jsonwebtoken")
function tokenVerification(req, res, next) {
    //pobranie tokenu z nagłówka:
    let token = req.headers.authorization;
    if (!token) {
        console.log("No token provided!")
        res.status(403).send({ message: "No token provided!" });
    }
    //jeśli przesłano token - weryfikacja jego poprawności:
    try {
        const decodeduser = jwt.verify(token, process.env.JWTPRIVATEKEY);
        console.log("Token poprawny, użytkownik: " + decodeduser._id);
        req.user = decodeduser;
        next()
    } catch (err) {
        console.log("Unauthorized!");
        res.status(401).send({ message: "Unauthorized!" });
    }

}
module.exports = tokenVerification