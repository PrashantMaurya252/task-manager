import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addTask, deleteTask, editTask, getUserTasks, login, logout, register } from '../controllers/userController.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/getAllTasks',authMiddleware,getUserTasks)
router.post('/add-task',authMiddleware,addTask)
router.post('/edit-task',authMiddleware,editTask)
router.post('/delete-task',authMiddleware,deleteTask)

export default router