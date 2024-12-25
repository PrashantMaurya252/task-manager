import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addTask, dashboardTable, deleteTask, editTask, getTaskStatistics, getUserTasks, login, logout, register } from '../controllers/userController.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/getAllTasks',authMiddleware,getUserTasks)
router.get('/dashboardStats',authMiddleware,getTaskStatistics)
router.get('/dashboardTable',authMiddleware,dashboardTable)
router.post('/add-task',authMiddleware,addTask)
router.post('/edit-task/:id',authMiddleware,editTask)
router.get('/delete-task/:id',authMiddleware,deleteTask)

export default router