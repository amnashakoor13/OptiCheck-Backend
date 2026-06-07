// This is a simple in-memory store. For production use a persistent store like Redis.
const blacklist = new Map();

module.exports = {
  add: (token, ttlSeconds) => {
    const expireAt = Date.now() + ttlSeconds * 1000;
    blacklist.set(token, expireAt);
  },
  has: (token) => {
    if (!blacklist.has(token)) return false;
    const expireAt = blacklist.get(token);
    if (Date.now() > expireAt) {
      blacklist.delete(token);
      return false;
    }
    return true;
  }
};
