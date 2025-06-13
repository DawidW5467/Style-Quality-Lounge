\# Instrukcja uruchomienia projektu: Style Quality



Projekt składa się z dwóch głównych części:

\- \*\*Backend\*\* (Node.js) — folder `style-quality-backend`

\- \*\*Frontend\*\* (Angular) — folder `style-quality-lounge`



---



\##  Wymagania wstępne



Upewnij się, że masz zainstalowane:

\- \[Node.js](https://nodejs.org/) (zalecana wersja LTS)

\- \[Angular CLI](https://angular.io/cli)

\- \[npm](https://www.npmjs.com/) (instalowany wraz z Node.js)



---



\##  Uruchomienie Backend (Node.js)



1\. Uruchom serwer MySQL i zaimportuj bazę danych z pliku `sklep10.sql`







2\. Przejdź do folderu backendu:



&nbsp;  ```bash

&nbsp;  cd style-quality-backend

&nbsp;  ```



3\. Zainstaluj zależności:



&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  ```



4\. Utwórz plik `.env` (jeśli nie istnieje) i uzupełnij go odpowiednimi danymi zgodnymi z serwerem (`HOST`, `USER`, `PASSWORD`,`DATABASE`).



5\. Uruchom serwer:



&nbsp;  ```bash

&nbsp;  node server.js

&nbsp;  ```



&nbsp;  Backend będzie nasłuchiwał zapytań HTTP i komunikował się z bazą danych.



---



\##  Uruchomienie Frontend (Angular)



1\. Przejdź do folderu frontendowego:



&nbsp;  ```bash

&nbsp;  cd style-quality-lounge

&nbsp;  ```



2\. Zainstaluj zależności:



&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  ```



3\. Uruchom aplikację Angular:



&nbsp;  ```bash

&nbsp;  ng serve

&nbsp;  ```



4\. Otwórz przeglądarkę i przejdź pod adres:



&nbsp;  ```

&nbsp;  http://localhost:4200

&nbsp;  ```



---



\##  Struktura projektu (skrótowo)



\- \*\*`style-quality-backend/`\*\* – API + logika serwera + dostęp do bazy danych

\- \*\*`style-quality-lounge/src/app/`\*\* – komponenty Angulara i logika interfejsu użytkownika

\- \*\*`style-quality-lounge/src/app/services/`\*\* – logika biznesowa (np. uwierzytelnianie, produkty)

\- \*\*`style-quality-lounge/src/assets/`\*\* – multimedia (np. obrazy)



---



\##  Uwagi



\- Upewnij się, że backend i frontend są uruchomione jednocześnie.

\- Możesz potrzebować skonfigurować \*\*CORS\*\* lub \*\*proxy\*\* w Angularze, jeśli frontend i backend działają na różnych portach.



