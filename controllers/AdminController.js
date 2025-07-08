import { Admin } from "../models/admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// controller for admin registration

export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Optionally, you can set the token in a cookie or return it in the response
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60 * 1000,// 1 hour
            sameSite: 'Strict', // Set SameSite attribute for security
        });

        await newAdmin.save();


        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// controller for admin login


export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate a token for the admin
        const token = jwt.sign({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    message : admin.message
  }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // setting the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'None', // Optional: Set SameSite attribute for security
        });
        res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
         if (error.response) {
        // Backend responded with status code like 401 or 404
        setStatus(`Error: ${error.response.data.message}`);
    } else if (error.request) {
        // Request was sent but no response
        setStatus("No response from server");
    } else {
        // Something else
        setStatus(`Error: ${error.message}`);
    }
    }
}

// controller for admin logout

export const logoutAdmin = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'None', // Optional: Set SameSite attribute for security
    });
    res.status(200).json({ message: "Logout successful" });
}