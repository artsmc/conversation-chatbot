/* eslint-disable import/no-anonymous-default-export */
// src/setupProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app: any) {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    })
  );
}
