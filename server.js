const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route
app.get('*', (req, res) => {
  const slug = req.path === '/' ? 'home' : req.path.slice(1);
  res.render('index', { slug });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 