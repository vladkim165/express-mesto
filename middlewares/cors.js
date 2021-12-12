const allowedCors = [
  'https://mesto-prod.nomoredomains.rocks/',
  'http://mesto-prod.nomoredomains.rocks/',
  'https://api.mesto-prod.nomoredomains.rocks/',
  'http://api.mesto-prod.nomoredomains.rocks/',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['Access-Control-Request-Headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', requestHeaders);
    return res.end();
  }

  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
