import redis from 'redis';
const client = redis.createClient();
client.on('error', (err) => {
    console.error('Redis error:', err);
});

export default client;