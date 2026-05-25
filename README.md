# Dashboard Proiecte

Aplicatie full stack pentru gestionarea proiectelor academice. Frontend-ul este realizat in React, iar backend-ul foloseste Node.js, Express si MongoDB pentru salvarea proiectelor si calcularea statisticilor.

## Tehnologii folosite

- React
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Structura proiectului

- `src/` - frontend React
- `server/` - backend Express + MongoDB

## Instalare

1. Cloneaza proiectul.
2. Instaleaza dependentele frontend:

```bash
npm install
```

3. Instaleaza dependentele backend:

```bash
cd server
npm install
```

## Configurare variabile de mediu

In folderul `server/`, creeaza un fisier `.env` cu:

```env
MONGO_URI=mongodb://localhost:27017/dashboard
PORT=3000
```

Poti folosi si un string MongoDB Atlas in loc de `MONGO_URI`.

Optional, in radacina proiectului poti crea un fisier `.env` pentru frontend:

```env
VITE_API_URL=http://localhost:3000
```

## Pornire proiect

1. Porneste backend-ul:

```bash
cd server
npm start
```

2. Porneste frontend-ul:

```bash
npm run dev
```

Frontend-ul va rula implicit pe `http://localhost:5173`, iar serverul pe `http://localhost:3000`.

## Functionalitati

- Afisare proiecte din MongoDB
- Adaugare proiect nou
- Editare inline
- Stergere proiect cu confirmare
- Schimbare status proiect
- Filtrare si cautare pe partea de client
- Statistici reale pe pagina Home

## Autor

Andrei
