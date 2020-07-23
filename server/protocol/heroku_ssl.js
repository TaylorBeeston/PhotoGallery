const withSSL = (request, response, next) =>
  request.headers['x-forwarded-proto'] !== 'https'
    ? response.redirect(
        302,
        `https://${request.hostname}${request.originalUrl}`,
      )
    : next();

export default withSSL;
