# Real Time Chat

This project is a Real Time Chat application that allows users to communicate with each other in real time. 

**Tech Stack:** Next.js, TailwindCSS, NextUI, Pusher, Redis.

Mechanism :-

![realtimechat_mapper](https://github.com/Ravipandey24/realtimechat/assets/79630119/83e3f9d3-6cae-44c6-ad37-c6adb59298ce)

- *why using pusher?* because vercel's Serverless Functions [don't support WebSocket](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections).

## Run Locally

Prerequisits :- 
- create a redis db instance on [Upstash](https://upstash.com/).
- create a channel on [Pusher](https://pusher.com/).

clone this repo
```bash
  git clone https://github.com/Ravipandey24/realtimechat.git
```
Go to the project directory

```bash
  cd realtimechat
```

set up .env
```bash
  PUSHER_APP_ID=your_pusher_id
  NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
  PUSHER_APP_SECRET=your_pusher_app_secret
  
  UPSTASH_REDIS_REST_URL=your_upstash_url
  UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```


Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```


