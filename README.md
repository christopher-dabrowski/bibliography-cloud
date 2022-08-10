# Zarządzanie źródłami do prac naukowych <!-- omit in toc -->

[![Board Status](https://dev.azure.com/01133318/58577f27-c36e-47d0-9166-d776046c9d72/b8c46cd8-ad29-4083-8158-d84b59d074b3/_apis/work/boardbadge/1c7d0226-0595-4aa6-b9e1-2e99eadfd43d)](https://dev.azure.com/01133318/Bibliography%20Cloud/_workitems)

Projekt na Programowanie aplikacji mobilnych i webowych.  
Realizacja kolejnych etapów projektów laboratoryjnych.

## Cel projektu

Napisanie aplikacji do zarządzania źródłami w pracach naukowych.

## Spis treści

- [Cel projektu](#cel-projektu)
- [Spis treści](#spis-treści)
- [Etap 1 - Formularz rejestracyjny](#etap-1---formularz-rejestracyjny)
  - [Istotne elementy](#istotne-elementy)
  - [Uruchomienie Formularza](#uruchomienie-formularza)
    - [Web deployment](#web-deployment)
    - [Docker](#docker)
    - [Docker-compose](#docker-compose)
  - [Opis plików](#opis-plików)
    - [Pliki projektu](#pliki-projektu)
    - [Pliki konfiguracji (serwer)](#pliki-konfiguracji-serwer)
  - [Zakończenie etapu](#zakończenie-etapu)
- [Etap 2 - Logowanie i przechowywanie plików](#etap-2---logowanie-i-przechowywanie-plików)
  - [Uruchomienie projektu](#uruchomienie-projektu)
  - [Istotne elementy](#istotne-elementy-1)
  - [Projekt systemu](#projekt-systemu)
  - [Rest API](#rest-api)
  - [Logowanie](#logowanie)
- [Etap 3 - Publikacje, RESTFull i klient mobilny](#etap-3---publikacje-restfull-i-klient-mobilny)
  - [Uruchomienie projektu](#uruchomienie-projektu-1)
  - [Szyfrowanie połączenia](#szyfrowanie-połączenia)
  - [Usługa sieciowa](#usługa-sieciowa)
  - [Klient webowy](#klient-webowy)
    - [Konfiguracja](#konfiguracja)
    - [Działanie](#działanie)
    - [Responsywność](#responsywność)
  - [Klient mobilny](#klient-mobilny)
- [Etap 4](#etap-4)
  - [Uruchomienie projektu](#uruchomienie-projektu-2)
  - [OAuth2.0](#oauth20)
    - [Implementacja](#implementacja)
  - [Powiadomienia o serwera](#powiadomienia-o-serwera)
    - [Implementacja](#implementacja-1)
- [Przydatne materiały](#przydatne-materiały)

## Etap 1 - Formularz rejestracyjny

Opracowanie formularza rejestracyjnego dla nowych użytkowników. Formularz musi pozwalać na **walidowanie wszystkich pól na bieżąco**. Kod JavaScript, HTML i CSS muszą być od siebie **odseparowane**. Komunikaty błędów muszą być tworzone dynamicznie przez kod JS. Polę login użytkownika będzie sprawdzane pod kątem dostępności **asynchronicznie**. Dane do rejestracji będą przesyłane do na zewnętrzny serwer. Kod HTML i CSS musi przechodzić walidację.

### Istotne elementy

* czy kod HTML posiada puste węzły na komunikaty (źle, powinny być one dodawane dynamicznie),
* czy wykorzystywane są elementy HTML5 zamiast generycznych, np. `<div class='menu'/>`, `<span id='footer'></span>`,
* jak analizowana jest odpowiedź o dostępności loginu (czy sprawdzany tylko tekst odpowiedzi, czy też kod statusu).

### Uruchomienie Formularza

Strona wymaga **połączenia z Internetem**, ponieważ ładuje biblioteki z CDN oraz sprawdza poprawność loginu na zewnętrznym serwerze.

#### Web deployment

Stan projektu po pierwszym kroku milowym można zobaczyć pod [adresem](https://bibliography-cloud.azurewebsites.net).

Projekt jest hostowany na platformie _Microsoft Azure_ na **darmowym** poziomie - F1.  
:exclamation: Jeśli aplikacja nie była ostatnio uruchamiana start może zająć nawet **5 minut**. :exclamation:

#### Docker

Zbudowanie obrazu z pliku [Dockerfile](./Dockerfile).  
`docker build -t biblio-cloud .`

Uruchomienie kontenera.  
`run --rm  --name nginx -p 8080:80 -it biblio-cloud`

Następnie strona powinna być dostępna pod adresem [http://localhost:8080](http://localhost:8080/).

#### Docker-compose

Alternatywnie można uruchomić projekt poleceniem `docker-compose up`.

Następnie strona powinna być dostępna pod adresem [http://localhost:8080](http://localhost:8080/).

### Opis plików

Informacja o plikach składających się na projekt.

#### Pliki projektu

- **login.html** - Struktura strony logowania
- **styles/login.css** - Wygląd strony logowania
- **img/** - Obrazy znajdujące się na stronie
- **scripts/script.js** - Skrypt bezpośrednio związany z ekranem logowania
- **scripts/utils.js** - Przydatne funkcje nie będące bezpośrednio związane z projektem
- **scripts/validateExtensions.js** - Dodatkowe funkcje i walidatory związane z biblioteką _validate.js_

#### Pliki konfiguracji (serwer)

- **nginx.conf** - Konfiguracja serwera _Nginx_
- **Dockerfile** - Opis jak zbudować kontener serwujący stronę

### Zakończenie etapu

Projekt w stanie bezpośrednio po tym etapie można znaleźć w zakładce [release](https://github.com/SiwyKrzysiek/bibliography-cloud/releases/tag/v1.0).

## Etap 2 - Logowanie i przechowywanie plików

Opracowanie modułu służącego do bezpiecznego logowania i wylogowywania użytkownika. Moduł logowania otrzymuje od użytkownika hasło i login – w przypadku poprawnych danych generowany jest **identyfikator sesji**. Dane sesyjne przechowywane są w bazie danych **Redis**. Należy opracować formularz pozwalający na przechowywanie przez użytkownika plików **PDF** w systemie. Pliki PDF powinny być dostępne do pobrania i serwowane przez **bezstanową aplikację**. Należy wykorzystać **JWT** z krótką datą ważności.

### Uruchomienie projektu

Stan projektu po tym etapie można znaleźć w zakładce [release](https://github.com/SiwyKrzysiek/bibliography-cloud/releases/tag/Milestone2).

By uruchomić projekt należy wykonać `docker-compose up` w głównym katalogu projektu.  
Domyślnie projekt będzie dostępny pod adresem [http://localhost:8080](http://localhost:8080).

### Istotne elementy

- czy w ciasteczku generowany jest identyfikator sesji czy bezterminowy JWT (to drugie nie pozwala wylogować),
- czy przy wylogowaniu usuwane są wpisy z _Redis_,
- czy w formularzu jest `enctype=multipart/form-data`
- czy aplikacja serwująca dostęp do pliku korzysta z sesji (czy innych informacji poza tymi w żetonie) - jeżeli tak, to źle,
- czy żeton do pobrania ma krótki czas ważności (kilka minut)

### Projekt systemu

System będzie podzielony na 3 główne komponenty.

Pierwszy z nich będzie rozbudowaniem aplikacji we _Falsk_ z etapu 1. Jego zdaniem jest serwowanie stron internetowych i bezpośrednia komunikacja z użytkownikiem.

Do przechowywania danych sesyjnych oraz bazy użytkowników wykorzystana zostanie baza nosql _Redis_.

Do obsługi plików wykorzystana zostanie oddzielna usługa typu REST.

![Component diagram displaying system](./doc/ComponentDiagram.svg)

### Rest API

Dokumentacja API jest opisana w pliku [restAPI.yml](./doc/resAPI.yml). Dzięki wykorzystaniu usługi Swagger łatwo można je [zobaczyć](https://app.swaggerhub.com/apis-docs/oakbit/biblography-cloud/1.0.0).

Zarządzanie plikami użytkownika jest realizowane przez **oddzielny serwer**.

Serwer jest napisany w języku Java przy pomocy biblioteki _spring_.
Odpowiada on za przechowywanie plików użytkownika. Komunikacja z nim jest możliwa tylko
przy podaniu tokenu **JWT** generowanego dynamicznie przez serwer we _Flasku_.

Tokeny mają **krótki czas ważności** i są przydzielane bezpośrednio przy podjęciu akcji przez użytkownika. Odpowiednie ścieżki na serwerze _web_ generują tokeny i zwracają **przekierowanie z zapisanym tokenem**

### Logowanie

Jest kilka kont użytkownika wpisanych na stałe do bazy

- **Login:** jan **hasło:** AAA
- **Login:** zupan **hasło:** gros
- **Login:** Atrox **hasło:** password

Moduł kreacji kont aktualnie **nie działa**.

Stan zalogowania oraz dane związane z sesją są trzymane w bazie _Redis_.
Po wylogowaniu wpisy z bazy są kasowane. Na tej podstawie odbywa się dalsze uwierzytelnianie użytkownika.
Użytkownik dostaje jedynie ciastko z **id sesji**.

## Etap 3 - Publikacje, RESTFull i klient mobilny

Celem etapu jest przygotowanie usługi sieciowej pozwalającej na przechowywanie i modyfikację pozycji bibliograficznych. Usługa sieciowa powinna zwracać powiązane elementy zgodnie z **HATEOAS**.  
Do aplikacji mają powstać **dwie aplikacje** klienckie. Jedna ma być rozszerzeniem aplikacji webowej, a druga może być aplikacją mobilną, konsolową lub biurkową. Klient powinien dostosowywać swój interface do danych zawartych w HATEOAS.

Usługa sieciowa musi pozwalać na:

- dodawanie pozycji bibliograficznej,
- listowanie pozycji bibliograficznych,
- usuwaniu pozycji bibliograficznych,
- podpinanie i odpinanie plików przy pozycji bibliograficznej,
- dodawanie, pobieranie i usuwanie plików.

### Uruchomienie projektu

Stan projektu po tym etapie można znaleźć w zakładce [release](https://github.com/SiwyKrzysiek/bibliography-cloud/releases/tag/Milestone3).

By uruchomić projekt należy wykonać `docker-compose up` w głównym katalogu projektu.  
Domyślnie projekt będzie dostępny pod adresem [https://localhost:443](https://localhost:443).

### Szyfrowanie połączenia

Dodatkowo został dodany serwer Nginx pośredniczący w komunikacji z aplikacjami. Dzięki temu możliwe jest połączenie się przez **protokół https**.  
Konfiguracja serwera znajduje się w pliku [nginx.conf](./nginx.conf).

### Usługa sieciowa

Na potrzeby zarządzania publikacjami została napisana usługa sieciowa zgodnie ze stylem REST i uwzględnieniem HATEOAS.

[Dokumentacja interfejsu](https://app.swaggerhub.com/apis/oakbit/bibliography-cloud-publications/1.0.0) została opisana przy pomocy Open API.

Serwer obsługujący usługę sieciową został napisany przy pomocy frameworka Spring. Dane publikacji są przechowywanie w basie SQL H2.  
Kod źródłowy serwera znajduje się w katalogu [publications](./publications).

Usługa generuje **odpowiednie kody HTTP** oraz wysyła metadane przy pomocy **json+hal**.

Działanie samej usługi sieciowej można obserwować przy pomocy [kolekcji gotowych zapytań HTTP](https://documenter.getpostman.com/view/6368494/SWLe8ToM). Kolekcja została utworzona z myślą o aplikacji Postman i programie `curl`. Zapytania związane z tym krokiem milowym znajdują się w **katalogu Publications**.

### Klient webowy

W celu urozmaicenia projektu i poznania nowych technologi zdecydowałem się na renderowanie po stronie klienta i wykorzystanie frameworka **React**.

Główne pliki klienta można znaleźć w katalogu [components](./app/react-publications/src/components).

#### Konfiguracja

Połączenie serwera Flask z elementem w React nie było łatwe.   
Projekt React został utworzony w katalogu [react-publications](./react-publications) przy pomocy skryptu [create-react-app](https://github.com/facebook/create-react-app). Następnie została wyizolowana konfiguracja tworzenia projektu poleceniem `npm reject`.

Dzięki edycji plików [webpack.config.js](./react-publications/config/webpack.config.js), [paths.js](react-publications/config/paths.js) i [package.json](./react-publications/package.json) miejsce tworzenia plików wynikowych przez _webpack_ zostało zmienione na katalogi `static/react/publications` i `templates` w aplikacji Flask.

Dodatkowo połączenie aplikacji z szablonami Flaks (templates) wymagało ręcznej zmiany w [skrypcie budującym](./react-publications/scripts/build.js). Ponieważ _webpack_ dopisuje tag `<script>` na koniec pliku nie znajdował się on w bloku `{% block main %}` i nie był częścią strony. Żeby to naprawić skrypt budujący wykonuje dodatkowy krok ręcznie przenoszący zamknięcie bloku na koniec pliku.

Zbudowanie komponentu React można wykonać poleceniem `npm run buld`.

#### Działanie

Klient wykorzystuje asynchroniczne zapytania HTTP w celu pobrania danych z usług całej aplikacji. Jedyne dane, jakie dostaje bezpośrednio to adresy końcówek (endpoints).

Możliwe **akcje są ustalane dynamicznie** na podstawie danych HATEOAS.

Przykład tworzenia guzika dodawania publikacji:

![Fantastic HATEOAS in action](./doc/HATEOAS_example_1.png)

Interfejs pozwala na pracę w trybie edycji dzięki czemu można łatwo anulować niechciane zmiany.

![Edit mode example](./doc/Edit_mode_example.png)

#### Responsywność

Cały klient webowy był tworzony z myślą wsparciu urządzeń mobilnych. Aplikacja webowa w wersji na telefon jest **głównym klientem na urządzenia przenośne**.

Dzięki zastosowaniu biblioteki Bootstrap oraz własnych CSS media query aplikacja wygląda dobrze za równo na dużych jak i małych ekranach.

Przykład trybu edycji publikacji na telefonie:

![Edit mode on phone example](doc/Edit_mode_phone_example.png)

### Klient mobilny

Zostały utworzone dwie proste aplikacje będące klientami mobilnymi. Aplikacja Flutter będąca prototypem znajduje się w katalogu [mobile_client_flutter](./mobile/mobile_client_flutter).  
Aplikacja React Native, która jest uproszczeniem klienta webowego jest w katalogu [mobile_client_react_native](./mobile/mobile_client_react_native).

## Etap 4

Celem etapu jest rozszerzenie aplikacji `web` o powiadomienia ze strony serwera o dodaniu nowych publikacji.
Powiadomienia powinny pojawiać się we wszystkich przeglądarkach, w których zalogowany jest użytkownik.
Powiadomienia powinny wyświetlać się tylko użytkownikowi, który jest zalogowany.
Dopuszczalne jest wykorzystanie: long-polling, Server Sent Events (EventStream) lub WebSocket. Co do ostatniego, to warto pamiętać, że WebSocket jest wykorzystywany **głównie** w przypadku, gdy wymagana jest dwukierunkowa komunikacja (wykorzystanie tego w kontekście powiadomień jest pewnym naciągnięciem, ale w tym kamieniu milowym jest dopuszczalne).

Należy również o zintegrowanie logowania do aplikacji z wykorzystaniem **OAuth2.0**. Najlepiej wykorzystać auth0.com.

### Uruchomienie projektu

Stan projektu po tym etapie można znaleźć w zakładce [release](https://github.com/SiwyKrzysiek/bibliography-cloud/releases/tag/Milestone4).

**Przed uruchomieniem należy wpisać dane Auth0.**  
W tym celu trzeba ustawić zmienne w pliku [/app/docker.env](./app/docker.env).

By uruchomić projekt należy wykonać `docker-compose up` w głównym katalogu projektu.  
Domyślnie projekt będzie dostępny pod adresem [https://localhost:5000](https://localhost:5000).

:exclamation: Adres aplikacji jest **inny** niż w poprzednich etapach.

### OAuth2.0

W celu przejścia na autoryzacje przy pomocy zewnętrznej usługi OAuth2.0 została utworzona aplikacja na stronie **Auth0**. Ponieważ aplikacja jest w głównej części klasyczną aplikacją webową jest w stanie bezpiecznie przechować sekret aplikacji. Dzięki temu możliwe jest zastosowanie modelu [Authorization Code](https://auth0.com/docs/flows/concepts/auth-code).

#### Implementacja

Zostało utworzone konto testowe na stronie Auth0.  
**Email:** 293101@pw.edu.pl  
**Login:** jan  
**Hasło:** Pa$$word

Po stronie aplikacji został zdefiniowany adres powrotu, pod który zostanie przekierowany użytkownik po uwierzytelnieniu przy pomocy Auth0. Po poprawnej weryfikacji następne kroki pozostały takie jak w kamieniu milowym 2 (własny moduł logowania użytkowników oparty na ciasteczkach i redisie oraz własny dekorator `login_required`).

### Powiadomienia o serwera

W celu informowania użytkownika o zmianach przeprowadzanych na różnych urządzeniach wykorzystana została technologia Server Send Events. Dzięki temu po zmianie publikacji (utworzenie, aktualizacja, usunięcie) we wszystkich oknach przeglądarki, na których otwarta jest aplikacja użytkownik zobaczy **powiadomienie** o akcji, a lista publikacji zostanie **automatycznie odświeżona**.

Niestety wystąpiły problemy przy połączeniu tej funkcjonalności z przejściem przez serwer Nginx. Z tego powodu w tym kamieniu milowym nie jest aktualnie wspierane połączenie htts. Mimo tego ciągle jest serwowane przez rozwiązanie produkcyjne (gunicorn).

#### Implementacja

Po stronie serwera `web` wykożystnana została biblioteka _flaks-sse_, która wykorzystuje funkcjonalność [pubsub serwera Redis](https://redis.io/topics/pubsub) jako kolejkę komunikatów.

Za rejestrowanie i przekazywanie powiadomień SSE odpowiada aplikacja `web`. Klient po wprowadzeniu zmiany może wykonać zapytanie pod odpowiedni adres. Jeśli zapytanie jest poprawne odpowiednia wiadomość zostanie dodana do kolejki komunikatów **danego użytkownika**.

Pod odpowiednim adresem dostępny jest strumień komunikatów (.../api/stream).

Klientem odpowiadającym za wyświetlanie i zgłaszanie komunikatów jest moduł UI publikacji napisany w React jako część kamienia milowego 4. Tworzy on obiekt `EventSource` i nasłuchuje wiadomości dla aktualnego użytkownika. (Plik [app/react-publications/src/components/App.js](./app/react-publications/src/components/App.js) linia 82). Po otrzymaniu komunikatu klient aktualizuję listę publikacji.
Do bazowego szablonu został dodany kod łączący się ze strumieniem SSE i wyświetlający notyfikacje dla zalogowanego użytkownika. Dzięki temu są one widoczne na dowolnej stronie.  
Łączenie, tak jak w App.js: [app/templates/base.html](./app/templates/base.html) linia 120  
Generowanie powiadomień: [app/static/js/sse.js](./app/static/js/sse.js)

Gdy klient wykona zmianę publikacji i otrzyma prawidłową odpowiedź od serwera wysyła powiadomienie o akcji do aplikacji `web`. (Przykład: Plik [app/react-publications/src/components/Publication.js](./app/react-publications/src/components/Publication.js) linia 70)

----------------------

## Przydatne materiały

- [Pozbywanie się Callback Hell](https://www.nafrontendzie.pl/jak-pozbyc-sie-callback-hell)
- [Czysty kod js](https://github.com/ryanmcdermott/clean-code-javascript)
- [Testy i mockowanie AJAXa](https://www.nafrontendzie.pl/jquery-deffered-oraz-promise-pigulce)
- [Kurs Webpack 2](https://www.youtube.com/watch?v=8vnkM8JgjpU&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=4)
- [Integracja Flask + Webpack](https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-8925800503d9)
- [Kody odpowiedzi HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
