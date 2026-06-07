const express = require('express');
const router = express.Router();

// a small list of curated links (replace or expand)
const links = [
  { name: 'Merham', url: 'https://merham.pk', description: 'Find eye specialists' },
  { name: 'Sehat Sahulat', url: 'https://www.sehat.com', description: 'Health services' },
  { name: 'Local Optometrists', url: 'https://www.google.com/search?q=optometrist+near+me', description: 'Search nearby' }
];

router.get('/doctor-search', (req, res) => {
  res.json({ links });
});

module.exports = router;
