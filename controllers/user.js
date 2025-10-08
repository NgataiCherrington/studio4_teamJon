import prisma from "../prisma/client.js";

const createUser = async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
    });

    const newUser = await prisma.user.findMany();

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUserID = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
          });

        if(!user) {
            return res.status(404).json({ message: "No user found" });
        }

        return res.status(200).json({ data: user });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        let user = await prisma.user.findUnique({
            where: { id: req.params.id },
        });

        if(!user) {
            return res.status(404).json({
                message: `No User with id: ${req.params.id} found`,
            });
        }

        user = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                dob: req.body.dob,
                email: req.body.email,
            },
        });

        return res.status(200).json({
            message: `User with id: ${req.params.id} successfully updated`,
            data: user,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
  
      if (!user) {
        return res.status(404).json({
          message: `No User with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.user.delete({
        where: { id: req.params.id },
      });
  
      return res.status(200).json({
        message: `User with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

export { createUser, getUsers, getUserID, updateUser, deleteUser };
