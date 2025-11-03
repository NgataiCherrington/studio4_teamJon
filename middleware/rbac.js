// Creating messages for Role-Based Access Controls
const rbac = (allowedRoles = []) => {
    return (req, res, next) => {
        // Check if the user is authenticated
        if(!req.user || !req.user.role) {
            return res.status(403).json({ message: "Forbidden" })
        }

        // Normalize role string to avoid casing issues
        const userRole = req.user.role.toUpperCase();

        // map allowedRoles to uppercase for comparison
        const rolesUpper = allowedRoles.map(role => role.toUpperCase());

        // Check if the user's role matches the required role
        if(!rolesUpper.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden"})
        }

        next();
    };
};

export default rbac;