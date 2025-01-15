const router = require("express").Router();

const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGN-IN API
router.post("/sign-in", async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          return res.status(400).json({ message: "Username is already exists" });
        } else if (username.length < 4) {
          return res
            .status(400)
            .json({ message: "Username should have atleast 4 characters" });
        }
      
        const { email } = req.body;
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
          return res.status(400).json({ message: "Email is already exists" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);
      
        const newUser = new User({username: req.body.username, email: req.body.email, password: hashPassword});
      
        await newUser.save();
        return res.status(200).json({ message: "SignIn Successfully",user:newUser});
    } catch (error) {
        console.log("Error : ", error);
        res.status(400).json({message: "Internal Server Error 404"});
    }
});


// LOGIN
router.post("/log-in", async(req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if(!existingUser){
            return res.status(400).json({message: "Username or password is incorrect"});
        }

        bcrypt.compare(password, existingUser.password, (err, data) => {
            if(data){
                console.log(data)
                const authClaims = [ {name: username}, {jti: jwt.sign({}, "abhiY")} ];
                const token = jwt.sign({ authClaims}, "abhiY", {expiresIn: "2d"});
                res.status(200).json({id: existingUser._id , token: token});
            } else {
                return res.status(400).json({message: "Invalid Credentials"});
            }
        })
    } catch (error) {
        return res.status(500).json({message: "Login error : " + error.message})
    }
});

module.exports = router;
