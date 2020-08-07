const bcrypt = require('bcrypt');

module.exports = {
    register: async(req, res) => {
        console.log(req.body)
        const { first_name, last_name, username,   password, email, profile_pic } =  req.body,
            db = req.app.get('db');

        const foundUser = await db.check_user({email});
        if(foundUser[0]){
            return res.status(400).send('Already a User')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
           
        const newUser = await db.register_user
             ( [first_name, last_name, username, hash, email, profile_pic]);
                req.session.w_user = newUser[0];
                res.status(201).send(req.session.w_user);
               

    },
   
    login: async (req,res) => {
        const {email, password} = req.body,
            db = req.app.get('db');

        let foundUser = await db.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email not found');
        }
        const authenitcated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenitcated){
            return res.status(401).send('Password not Congreunt')
        }
        delete foundUser[0].password;
        req.session.w_user = foundUser[0];
        res.status(202).send(req.session.w_user);

    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    logMeIn: async (req,res) => {
        db = req.app.get('db');
        if(req.session.w_user){
    const me = await db.get_user_id(+req.session.w_user.id)
    res.status(200).send(me[0])
        }
    }


};