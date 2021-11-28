import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi There1!')
})

export { router as currentUserRouter }
