# ベースイメージを指定
FROM node:18-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ビルドを実行
RUN npm run build

# 本番用の軽量イメージを使用
FROM nginx:alpine

# Nginxのデフォルト設定を削除
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 3000

# ビルド成果物をコピー
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]