import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[server]: API is running at http://localhost:${PORT}`);
  console.log(`[server]: Health check at http://localhost:${PORT}/api/health`);
});
