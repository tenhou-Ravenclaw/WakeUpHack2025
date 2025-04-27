FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 必要な依存関係をインストール
RUN npm install react-scripts react react-dom

# 他の依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# React 開発サーバーを起動
CMD ["npm", "start"]

# スクリプトを設定
RUN echo '{"scripts": {"start": "react-scripts start --host 0.0.0.0"}}' > package.json