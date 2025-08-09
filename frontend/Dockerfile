FROM node:24.5.0-alpine3.22 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build 


FROM nginxinc/nginx-unprivileged:1.29-bookworm-perl AS runner
USER nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT [ "nginx", "-c", "/etc/nginx/nginx.conf" ]
CMD ["-g", "daemon off;"]