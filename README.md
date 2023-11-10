# Aplikacja do notatek backend

Jest to aplikacja do notatek napisana na potrzeby projektu zaliczeniowego na studia z przedmiotu szkielety programistyczne.

## Wykorzystane Technologie

Lista technologii wykorzystanych w projekcie:

### Technologie Serwera

- **Node.js**: Środowisko uruchomieniowe do uruchamiania serwera.
- **Express**: Framework aplikacji sieciowych do tworzenia API w Node.js.
- **bcrypt**: Biblioteka do szyfrowania haseł.
- **cors**: Moduł do obsługi zasobów poza stroną (CORS) w aplikacjach Express.
- **dotenv**: Moduł do ładowania zmiennych środowiskowych z pliku `.env`.
- **Joi**: Walidator schematów dla JavaScript.
- **joi-password-complexity**: Rozszerzenie Joi do sprawdzania złożoności hasła.
- **jsonwebtoken**: Implementacja tokenów JWT do uwierzytelniania.
- **mongoose**: Narzędzie modelowania obiektowo-szeregowego dla MongoDB.
- **Nodemon**: Narzędzie do restartowania serwera w trybie deweloperskim po zmianach w pliku.

## Uruchomienie aplikacji

### Aplikacja Klienta (Frontend)
1. **Sklonuj repozytorium do wybranego katalogu:**
    ```bash
    git clone https://github.com/kcarol3/NoteApp-front.git
    ```

2. **Uruchom serwer klienta:**
    ```bash
    npm run server
    ```

### Serwer (Backend)
1. **Sklonuj repozytorium serwera z repo:**
    ```bash
    git clone https://github.com/kcarol3/NoteApp-backend.git
    ```
2. **Ustaw wartości dotyczące bazy danych MongoDB w pliku `.env`:**
    Otwórz plik `.env` w głównym katalogu serwera i upewnij się, że posiada on odpowiednie wartości dla bazy danych MongoDB. Sprawdź, czy w pliku `.env` znajduje się wpis `DB` o treści:
    ```
    DB=mongodb+srv://<uzytkownik>:<haslo>@<adres_hosta>/<nazwa_bazy_danych>?retryWrites=true&w=majority
    ```
    Zastąp `<uzytkownik>`, `<haslo>`, `<adres_hosta>` i `<nazwa_bazy_danych>` odpowiednimi danymi dostępowymi do Twojej bazy danych MongoDB.

3. **Uruchom serwer:**
    ```bash
    npm run dev
    ```

## Użycie

Opis funkcjonalności

> *Strona logowania lub rejestracji*
![Opis obrazu](https://github.com/kcarol3/NoteApp-front/blob/master/screens/screen1.png)

<br/><br/>

> *Strona domowa*
![Opis innego obrazu](https://github.com/kcarol3/NoteApp-front/blob/master/screens/screen2.png)


<br/><br/>

> *Dodanie nowej notatki*
![Opis innego obrazu](https://github.com/kcarol3/NoteApp-front/blob/master/screens/screen3.png)


<br/><br/>

> *Podgląd notatek pogrupowanych pod względem pilności*
![Opis innego obrazu](https://github.com/kcarol3/NoteApp-front/blob/master/screens/screen4.png)


<br/><br/>

> *Edycja lub usuwanie notatek*
![Opis innego obrazu](https://github.com/kcarol3/NoteApp-front/blob/master/screens/screen5.png)


## Autor

Karol Kurowski Politechnika lubelska
