# EuroGuesser (PlaceGuesser)

Abschlussprojekt für WebTech

## Getting Started



### Prerequisites

* node.js (tested with v13.7.0)
* [PostgreSQL  database server](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (tested with version 12.1)
* [Angular CLI (ng)](https://angular.io/cli) (tested with version 8.3.23)




### Installing
(Falls mein Pi läuft, hier als Vorschau: http: // fischly . freemy ip .com:8080)

Das git Repository clonen:

```
git clone https://github.com/fischly/placeguesser.git
cd placeguesser
```

Nun sieht man zwei Ordner, "place-server" für  den node.js Server und "test-app" für die Angular app.
In jedem der beiden müssen die notwendigen node.js Abhängigkeiten installiert werden:

```
cd place-server
npm install

cd ../test-app
npm install
```

Nun müssen die Tabellen von `place-server/postgres_database_import/export.sql`in eine Postgres Datenbank importiert werden und gegebenenfalls die Konfigurationsdatei des Servers (`place_server/config.json`) für die Datenbankverbindung mit den zutreffenden Credentials und Datenbanknamen angepasst werden.

Der Server kann nun gestartet werden:
```
cd place-server
node server.js
```

Um den von webpack bei Angular beinhaltenden live development server zu starten, reicht folgendes Command:
```
cd test-app
ng serve
```
Nun sollte die Seite unter `http://localhost:4200/` aufrufbar sein. 



## Achtung!
Hin und wieder, wenn man die Applikation nach längerer Zeit startet, kommt es unvorhersehbar zu 
folgender Fehlermeldung seitens der Google Maps API:

![alt text](https://i.imgur.com/G3Zb86K.png "Google Maps CORS Error")

Abhilfe schafft, oft auf den "Submit" und danach auf den "Next" Button zu drücken, 
um so eine neue Street View Location zu laden. Sollten im Street View Panel 
"Bewegungspfeile" zu sehen sein, hilft es anscheinend diese anzuklicken. Auch in den Inkognite Modus zu wechseln löst dieses seltsame CORS/localhost Problem manchmal. Das Problem scheint auch zeitabhängig zu sein, oft verschwindet es nach wenigen Minuten Wartezeit.

Ist diese Fehlermeldung einmal verschwunden, kommt sie nicht mehr wieder, erst wenn 
man die App länger wieder nicht benutzt.

Zum Glück tritt dieses CORS Problem nicht auf, wenn man die App buildet und zum Beispiel auf einen (lokalen) Webserver lädt, da scheint der Google API "localhost" keine Probleme mehr für Google Maps.

Siehe auch folgenden Kommentar: [https://stackoverflow.com/questions/41654047/google-street-view-api-cors-issue-when-trying-to-access-street-view-from-localho#comments-43887347](https://stackoverflow.com/questions/41654047/google-street-view-api-cors-issue-when-trying-to-access-street-view-from-localho#comments-43887347)




## Authors

* **__Felix Mitterer__** 
	- **Google Maps Stuff** (Map- and Street View interactions, Calculations)
	- **Frontend** (Home/main game, Results, Favorites, State Managament service, Position Service, JWT verification)
	- **Backend** (Login, Register, Favoriten, Locations und Location preparation)
	- **Datenbank**


* **__Robert Vukoja__**
	- **Frontend** (Design, Navigation, Login, Register, restliche Unterseiten)
	- **Backend** (Grundstruktur, geplantes Usermanagament)
	- **Datenbank**

