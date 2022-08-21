const { User } = require("../../models");
const { generateToken, verifyToken } = require("../../utils/tokenHandler");
const { hashPassword, verifyPassword } = require("../../utils/passwordHandler");

class AuthController {
    static register = async (req, res) => {
        try {
            const { name, email, password, address } = req.body;
            const isEmailExist = await User.findOne({ where: {email}});
            if (isEmailExist) return res.status(400).json({ message: "Email Already Taken"});

            const payload = { name, email, password: hashPassword(password), address }
            const user = await User.create(payload);
            if (user) return res.status(201).json({ message: "user created"});
        } catch (err) {
            console.log(err)
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { email }
            });
            if (!user) return res.status(404).json({ message: "user not found" });
            const isPasswordMatch = await verifyPassword(password, user.password)
            if (!isPasswordMatch) return res.status(409).json({ message: "invalid password"});
            const token = await generateToken({
                id: user.id,
                email: user.email
            });
            res.cookie("UserId", user.id, {
                httpOnly: true
            });
            res.cookie("token", token, {
                httpOnly: true
            });
            return res.status(200).json({
                id: user.id,
                name: user.name,
                message: `user berhasil login`
            });
        } catch (err) {
            return res.status(500).json({ message: "internal server error"});
        }
    }    
}

module.exports = AuthController;