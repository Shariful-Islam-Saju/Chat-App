import express from 'express'

const router = express.Router()

router.get('/', loginController)

export default  router