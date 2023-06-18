> Autor [@JTu2001](https://github.com/JTu2001)

# Inhaltsverzeichnis
- [Inhaltsverzeichnis](#inhaltsverzeichnis)
- [Bug Report](#bug-report)
  - [Erwartete Ergebnisse (Soll-Zustand)](#erwartete-ergebnisse-soll-zustand)
  - [Tatsächliche Ergebnisse (Ist-Zustand)](#tatsächliche-ergebnisse-ist-zustand)
- [Testumgebung](#testumgebung)
  - [Einrichtung der Testumgebung](#einrichtung-der-testumgebung)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Schritte zur Reproduktion](#schritte-zur-reproduktion)
- [Lösung](#lösung)
- [Sonstiges](#sonstiges)
- [Fazit](#fazit)
  - [Kontaktdaten](#kontaktdaten)
 
# Bug Report
Dieses Dokument beinhaltet die detaillierte Beschreibung eines aufgetretenen Fehlers sowie die Lösung des Problems. Bei dem Fehler handelt es sich um eine Top 10 OWASP Schwachstelle ([OWASP 01 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)). Es wurde eine Applikation von [Patrick Pusch](https://github.com/m1sjo) & [Daniel Karner](https://github.com/HowAboutACupOfTea) bereitgestellt. Folgende Schwachstellen wurden im Video präsentiert:
- Es kann (ohne Anmeldung) zum Dashboard navigiert werden.
- Die API kann ohne Berechtigung angesprochen werden.    

## Erwartete Ergebnisse (Soll-Zustand)
Es wird erwartet, dass man nach dem Anmeldevorgang zum Dashboard weitergeleitet wird. Am Dashboard befinden sich jegliche Informationen zu den Sensoren/Aktoren. Es dürfen nur berechtigte Benutzer auf die sensiblen Daten zugreifen. 

## Tatsächliche Ergebnisse (Ist-Zustand)
Es kann zum Dashboard navigiert werden, ohne sich dabei anmelden zu müssen. Dadurch ist es auch möglich, dass jeder die Informationen aus der API auszulesen kann. Des Weiteren sind auch API Calls uneingeschränkt möglich (d.h. mittels eine einfache Eingabe in der URL können die Daten aus der API ausgelesen werden).

# Testumgebung
Es wurde unter folgenden Bedingungen getestet:
- Betriebssystem: Windows 11 Home
- Browser: Firefox

Technologieplattform:
- Backend: C#
- Frontend: Angular
- ~~Datenbank: MySQL~~

## Einrichtung der Testumgebung
Dieses Kapitel beschreibt, wie die Umgebung eingerichtet wurde. Klonen des Repos:
```
git clone https://github.com/JTu2001/broken-access-control-scenario.git
```

### Backend
Dieses Kapitel beschreibt, wie das Backend eingerichtet wurde.
1. Navigiere zu: `.\src\webapi`.
2. Führe folgenden Befehl aus, um das Backend zu starten:
```
dotnet run --launch-profile "http"
```
Als Alternative kann natülich auch direkt im Visual Studio das Backend gestartet werden (Startoption: "http"). Anschließend sollte das Backend unter `http://localhost:5058` laufen. Unter `http://localhost:5058/swagger` kann das Swagger UI gefunden werden.

### Frontend
Für die einrichtung des Frontends sind folgende Schritte notwendig:
1. Navigiere zu `.\src\angularapp`.
2. Führe `npm i` aus. 
3. Navigiere zu `.\src\app`.
4. Führe folgenden Befehl aus um das Frontend zu starten:
```
ng serve --open
```
Das Frontend sollte nun unter `http://localhost:4200` erreichbar sein.

# Schritte zur Reproduktion
Dieses Kapitel beschreibt die Schritte zur Reproduktion des Fehlers:
- Navigation zum Dashboard (ohne Anmeldung)
  1. Eingabe von `localhost:4200/dashboard` in der URL
       - Da der Fehler behoben wurde, wird man automatisch zum Login weitergeleitet.
       - Es kann hier zusätzliche Logik implementiert werden (MessageBox, ...).
- API Call ohne Berechtigung:
  1. Eingabe von `http://localhost:5058/SmartHomeInformation/GetInfo` in die URL
       - Da der Fehler behoben wurde ist nur eine leere Seite zu sehen.

# Lösung
Für die Lösung wurde ein JWT (JSON Web Token) verwendet. Das Token wird im Backend generiert. Dadurch kann nicht direkt zum Dashboard navigiert werden, da das Token fehlt. Erst nach einer erfolgreichen Anmeldung erhält man vom Backend als Response ein Token, der sich in der *Local Storage* befindet. Beim Abmelden wird der Token aus der *Local Storage* gelöscht, und man wird zur Login-Seite weitergeleitet. 

Das Token wird außerdem verwenden, damit nur Berechtigte Zugriff auf die API haben. Dies wird durch ein `Authorization`-Header gewährleistet. Im Backend wurde dafür ein `Authorize`-Attribut verwendet. Aufgrund des `Authorization`-Header ist kein uneingeschränkter API-Call mehr möglich. Um den Lösungsweg nachzuvollziehen, wurde der Code an den gegebenen Stellen dokumentiert.

# Sonstiges
- Bei den Controllern wurden die return types durch ein `ActionResult<T>` ausgetauscht. Dadurch ist es möglich den HTTP-Statuscode zu setzten (z.B.: 200, 404, ...). Hierfür ein Beispiel:
  ```C#
  [HttpGet("GetInfo")]
  [Authorize]
  public ActionResult<SmartHomeInformation> GetSmartHomeInfo()
  {
      return Ok(_smartHomeInformation);
      // Alternative: 
      // return StatusCode(200, _smartHomeInformation);
  }
  ```
- Zusätzlich wurde ein Logout-Button hinzugefügt, welches dazu dient den Token aus der LocalStorage zu löschen.

# Fazit
Es wurden beide Schwachstellen behoben. Dadurch dass der `LoginDataController` durch einen `AuthController` ausgetauscht wurde, kann ein JWT generiert werden. Um den Zugriff auf das Dashboard zu ermöglichen, muss der Benutzer angemeldet sein. Hierzu müssen gültige Anmeldeinformationen angegeben werden, um ein Token als Response zu erhalten. Zusätzlich können sich Benutzer noch abmelden (dadurch erlischt das Token). Des Weiteren wurden die API insgesamt verbessert, und somit ist nur ein autorisierter Zugriff möglich.

## Kontaktdaten
- Name: TUNJIC Josip (Git: [JTu2001](https://github.com/JTu2001))
- Matrikelnummer: 52109190
- E-Mail: 122325@fhwn.ac.at
