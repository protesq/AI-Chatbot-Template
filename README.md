# AI Chatbot

LoRa Tech API kullanarak çalışan modern bir AI chatbot uygulaması.

## Özellikler

- Modern ve responsive arayüz
- Gerçek zamanlı sohbet
- Konuşma geçmişi takibi
- Grok model desteği

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd apitest
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun:
```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyip API anahtarlarınızı ekleyin:
```
API_KEY=your_api_key_here
MODEL_ID=your_model_id_here
API_BASE_URL=https://api.loratech.dev
PORT=3000
```

## Kullanım

Server'ı başlatın:
```bash
npm start
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Teknolojiler

- Node.js
- Express.js
- Grok AI API

## Lisans

ISC

