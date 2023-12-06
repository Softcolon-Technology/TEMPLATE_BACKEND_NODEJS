import express from 'express'
import { check } from 'express-validator'
import { isAdmstr } from '../middleware/admin_validator/admin_validator.js'
import { validateField } from '../middleware/field_validator/index.js'
import { createExchange, deleteExchange, exchangeInAddSymbols, exchangeInRemoveSymbols, getExchange, updateExchange } from '../controllers/exchangeController.js'
import messages from '../utilities/messages.js'

const router = express.Router()

router.post('/create', isAdmstr, [
  check('name').exists().withMessage(messages.exchangeNameIsRequired)
], validateField, createExchange)

router.put('/update/:exchangeId', isAdmstr, updateExchange)

router.get('/get', isAdmstr, getExchange)

router.delete('/delete/:exchangeId', isAdmstr, deleteExchange)

router.put('/add_symbol/:exchangeId', isAdmstr, exchangeInAddSymbols)

router.put('/remove_symbol/:exchangeId',isAdmstr , exchangeInRemoveSymbols)

export default router