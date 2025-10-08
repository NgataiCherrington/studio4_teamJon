import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    try {
        // Look for the Authorization header which should start with 'Bearer'
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Split the header and grab the token part after 'Bearer '
        const token = authHeader.split(' ')[1];
        
        // Verify the token using the secret key from the environment variables
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload; // Attach the payload to the request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

export default jwtAuth;