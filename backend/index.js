const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const pool = require("./config/database");
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword])

        return res.status(201).json({
            message: "Registration Successful!"
        });
    } catch (error) {
        console.log(error) //remind me to delete this before production.`
        return res.status(500).json({
            error: "Account already exist"
        })
    }
})

app.post ("/login", async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if(!usernameOrEmail || !password) {
            return res.status(400).json({
                message: "All input is required"
            })
        }

        const [result] = await pool.query("SELECT * FROM users WHERE email = ? OR username = ?", [usernameOrEmail, usernameOrEmail]);

        if (result.length <= 0) {
            return res.status(401).json({
                error: "Invalid username/email or password"
            });
        }

        const userInfo = result[0];

        const checkPassword = await bcrypt.compare(password, userInfo.password_hash);

        if (checkPassword === false) {
            return res.status(401).json({
                error: "Password is incorrect"
            });
        }
        const token = jwt.sign(
            {
                id: userInfo.id,
                username: userInfo.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "5h"
            }
        );

        const {
            password_hash, created_at, updated_at, ...otherInfo} = userInfo;

                return res.status(200).json({
                message: "Login Successful!",
                token: token,
                otherInfo: otherInfo
            })

        
    } catch (error) {
        console.log(error) //delete the console.log later oo
        return res.status(500).json({
            message:"An error occured"
        });
        
    }
});

    const authenticator = (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    message: "Access Denied, Token Required to Login"
                });
            }

            const token = authHeader.split(" ")[1];

            const decode = jwt.verify(
                token, 
                process.env.JWT_SECRET
            );

            req.user = decode;

            next();

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                message: "Invalid or expired token"
            });
            
        }
    }

    app.get("/dashboard", authenticator, (req, res) => {
        return res.status(200).json({
            message: "Welcome!",
            user: req.user
        })
    })

    app.post("/message", async (req, res) => {
        try {

            const {username, content} = req.body;

            if (!username || !content) {
                return res.status(400).json({
                    message: "Field cannot be empty"
                });
            }

            if (content.length > 250) {
                return res.status(400).json({
                    message: "Message must not exceed 250 characters"
                })
            }

            const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]); 

            
            if (users.length === 0) {
                    return res.status(401).json({
                        message: "User not found"
                    });           
            }

            const recipientId = users[0].id;
            
            const [results] = await pool.query("INSERT INTO messages (recipient_id, content) VALUES (?, ?)", [recipientId, content]);

            return res.status(201).json({
                message: "Message sent"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error in sending message"
            });
            
        }
    })

app.get("/message", authenticator, async (req, res) => {
    try {
        const userId = req.user.id;

        const [results] = await pool.query("SELECT * FROM messages WHERE recipient_id = ? ORDER BY created_at DESC", [userId]);

        return res.status(200).json({
            message: results
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Error in retrieving messages"
        });
        
    }
})

app.get("/mylink", authenticator, (req, res) => {
    const username = req.user.username;

    const link = `http://localhost:5173/${username}`;

    return res.status(200).json({
        message: "Link generated successfully",
        link: link
    });
});



app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
});

