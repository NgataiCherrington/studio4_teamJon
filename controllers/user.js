import prisma from "../prisma/client.js";
import userRepository from "../repositories/user.js";

const createUser = async (req, res) => {
  try {
    await userRepository.create(req.body);
    const newUser = await userRepository.findAll();
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
    const users = await userRepository.findAll();
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
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No User with id: ${req.params.id} found`,
      });
    }
    user = await userRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `User with id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No User with the id: ${req.params.id} found`,
      });
    }
    await userRepository.delete(req.params.id);
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
