import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.send('Hi There3!')
})

export { router as signoutRouter}