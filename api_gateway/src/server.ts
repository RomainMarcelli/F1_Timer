import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Redirige les requêtes pour les utilisateurs vers le service User
app.use('/api/users', createProxyMiddleware({ target: 'http://user-service:3002', changeOrigin: true }));

// Redirige les requêtes pour les timers vers le service Timer
app.use('/api/timers', createProxyMiddleware({ target: 'http://timer-service:3003', changeOrigin: true }));

app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

app.listen(3001, () => {
    console.log('API Gateway running on port 3001');
});
