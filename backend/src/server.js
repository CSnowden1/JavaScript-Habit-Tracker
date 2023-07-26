// server.js

// ... your existing imports ...

const authRoutes = require('./routes/auth');
const habitRoutes = require('./src/routes/habits');

// ... your existing code ...

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

// ... the rest of your code ...
