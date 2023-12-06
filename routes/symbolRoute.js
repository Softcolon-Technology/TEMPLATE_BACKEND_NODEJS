import express from 'express'
import { check } from 'express-validator'
import { isAdmstr } from '../middleware/admin_validator/admin_validator.js'
import messages from '../utilities/messages.js'
import { createSymbol, deleteSymbol, getSymbol, updateSymbol } from '../controllers/symbolController.js'
import { validateField } from '../middleware/field_validator/index.js'

const router = express.Router()

router.post('/create', isAdmstr, [
  check('name').exists().withMessage(messages.symbolNameIsRequired)
], validateField, createSymbol)

router.put('/update/:symbolId', isAdmstr, updateSymbol)

router.get('/get', isAdmstr, getSymbol)

router.delete('/delete/:symbolId', isAdmstr, deleteSymbol)

export default router