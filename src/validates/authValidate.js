module.exports.login = (req, res, next) => {
    var errors = [];
    if(req.body.email && req.body.password) {
        next();
    } else {
        if(!req.body.email) errors.push("Email is required!");
        else if(!req.body.email.includes('@')) errors.push("Please enter email!")
        if(!req.body.password) errors.push("Password is required");
        res.render('users/login', {
            email: req.body.email,
            password: req.body.password,
            errors: errors
        })
    }
}

module.exports.register = (req, res, next) => {
    var errors = [];
    const {name, email, password} = req.body;
    if(email && password && name) {
        next();
        return;
    } else {
        if(!name) errors.push("Name is required!");
        if(!email) errors.push("Email is required!");
        else if(!email.includes('@')) errors.push("Please enter email!")
        if(!password) errors.push("Password is required");
        res.render('users/register', {
            email: email,
            password: password,
            errors: errors
        })
    }
}