import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (decoded) {          
            next();
        }

        res.status(400).json({msg:"Invalid token"})

    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};


