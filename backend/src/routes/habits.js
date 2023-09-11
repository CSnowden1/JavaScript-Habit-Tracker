const express = require('express');
const router = express.Router();

router.get('/habits', (req, res) => {
  res.send("This is a test route in habits.js");
});

module.exports = router;
