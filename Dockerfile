# 第一阶段：node镜像打包
ARG NODE_VERSION=node:20-alpine
FROM $NODE_VERSION AS dependency-base

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM dependency-base AS production-base
COPY . .
RUN pnpm run build 

# 第二阶段：nginx打包
FROM nginx:latest
EXPOSE 80
WORKDIR /app
# 替换nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 将第一阶段的静态文件复制到nginx中
RUN rm -rf /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html
COPY --from=frontend-builder /build-app/dist /usr/share/nginx/html

# 运行
CMD ["nginx", "-g", "daemon off;"]
