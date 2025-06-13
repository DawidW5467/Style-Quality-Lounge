# Instrukcja uruchomienia projektu: Style Quality

Projekt składa się z dwóch głównych części:

- **Backend** (Node.js) — folder `style-quality-backend`
- **Frontend** (Angular) — folder `style-quality-lounge`

---

## Wymagania wstępne

Proszę upewnić się, że zainstalowano:

- [Node.js](https://nodejs.org/) (zalecana wersja LTS)
- [Angular CLI](https://angular.io/cli)
- [npm](https://www.npmjs.com/) (instalowany wraz z Node.js)

---

## Uruchomienie Backend (Node.js)

1. Uruchomić serwer MySQL i zaimportować bazę danych z pliku `sklep10.sql`.

2. Przejść do folderu backendu:

   ```bash
   cd style-quality-backend
   ```

3. Zainstalować zależności:

   ```bash
   npm install
   ```

4. Utworzyć plik `.env` (jeśli nie istnieje) i uzupełnić go odpowiednimi danymi zgodnymi z serwerem (`HOST`, `USER`, `PASSWORD`, `DATABASE`).

5. Uruchomić serwer:

   ```bash
   node server.js
   ```

   Backend będzie nasłuchiwał zapytań HTTP i komunikował się z bazą danych.

---

## Uruchomienie Frontend (Angular)

1. Przejść do folderu frontendowego:

   ```bash
   cd style-quality-lounge
   ```

2. Zainstalować zależności:

   ```bash
   npm install
   ```

3. Uruchomić aplikację Angular:

   ```bash
   ng serve
   ```

4. Otworzyć przeglądarkę i przejść pod adres:

   ```
   http://localhost:4200
   ```

---

## Struktura projektu (skrótowo)

- **`style-quality-backend/`** – API + logika serwera + dostęp do bazy danych
- **`style-quality-lounge/src/app/`** – komponenty Angulara i logika interfejsu użytkownika
- **`style-quality-lounge/src/app/services/`** – logika biznesowa (np. uwierzytelnianie, produkty)
- **`style-quality-lounge/src/assets/`** – multimedia (np. obrazy)

---

## Uwagi

- Proszę uruchomić backend i frontend jednocześnie.
- W przypadku działania frontend i backend na różnych portach, może być konieczne skonfigurowanie **CORS** lub pliku **proxy** w Angularze.
