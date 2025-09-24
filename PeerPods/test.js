import http from 'http'; // For Node 22 with ES modules
const server = http.createServer((req, res) => {
  res.end('Server works');
});
server.listen(3000, () => console.log('Listening on http://localhost:3000'));
setInterval(() => {}, 1000); // Keep alive
