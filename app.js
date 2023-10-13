
const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;
const githubToken = process.env.GITHUB_TOKEN;

app.use(express.json());
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


app.get('/api/github/contributors', async (req, res) => {
  try {
    const owner = 'Pavilion-devs';
    const repo = 'My-Favorite-SuperHero';
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
