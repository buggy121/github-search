import Koa from 'koa';
import Router from 'koa-router';
import qs from 'querystring';
import https from 'https';
import github from 'octonode';

import config from './githubConfig';

const srv = new Koa();
const router = new Router();
const SRV_PORT = 3001;

function auth(token) {
  const promise = new Promise(
    (resolve) => {
      const data = qs.stringify({
        client_id: config.id,
        client_secret: config.secret,
        code: token,
      });
      const reqOptions = {
        host: 'github.com',
        port: 443,
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: { 'content-length': data.length },
      };
      let body = '';
      const req = https.request(reqOptions, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          const response = qs.parse(body);
          resolve(response);
        });
      });
      req.write(data);
      req.end();
      req.on('error', (e) => {
        resolve(e);
      });
    });
  return promise;
}

function getUserData(token) {
  const promise = new Promise((resolve) => {
    github.auth.config(config);
    github.client(token)
      .me()
      .info((error, result) => {
        const response = {};
        if (error) {
          response.error = error;
        }
        if (result) {
          response.result = result;
        }
        resolve(response);
      });
  });
  return promise;
}

router.get('/api/auth/:token', function* (next) {
  let response = {};
  let token = '';
  yield next;
  console.log(`authenticating token: ${this.params.token}`);
  yield auth(this.params.token)
    .then((res) => {
      console.log(res);
      if (res.error) {
        response.error = res.error;
      } else {
        token = res.access_token;
      }
    });
  if (token.length > 0) {
    yield getUserData(token)
      .then((userRes) => {
        response = userRes;
      });
  }
  this.body = JSON.stringify(response);
});

router.get('*', function* (next) {
  this.set('Access-Control-Allow-Origin', '*');
  this.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  this.set('Access-Control-Allow-Headers', 'Content-Type');
  yield next;
});

srv.use(router.routes());

srv.listen(SRV_PORT);
console.log(`Auth server started on port: ${SRV_PORT}`);
