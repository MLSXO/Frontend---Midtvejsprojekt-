#Screenshots 
- https://docs.google.com/document/d/1eBUwOFHsgZOMGOtz2M4mKh7oXTGrot_c9JLSak25wBs/edit?usp=sharing


# Pokébase – Frontend

Frontend til vores midtvejsprojekt Pokébase. Hjemmesiden viser Pokémon-data fra vores Express-API og giver brugeren mulighed for at søge efter Pokémon, se trainers, oprette trainers og tilføje Pokémon til dem.

Backend-repository:  
https://github.com/MLSXO/Backend---Midtvejsprojekt-

## Teknologier

- HTML
- CSS
- JavaScript
- Fetch API

## Funktioner

- Visning af Pokémon fra MySQL-databasen
- Søgning efter Pokémon-navn
- Filtrering efter Pokémon-type
- Filtrering efter minimum attack
- Visning af trainers
- Oprettelse af nye trainers
- Tilføjelse af Pokémon til en trainer
- Kommunikation med backend gennem `fetch()`

## Installation

Klon repositoryet:

```bash
git clone https://github.com/MLSXO/Frontend---Midtvejsprojekt-.git
cd Frontend---Midtvejsprojekt-
```

Frontenden kræver ingen npm-installation.

Start først backendserveren på:

```text
http://localhost:3000
```

Åbn derefter `Pokebase.html` gennem eksempelvis IntelliJ, WebStorm eller Visual Studio Codes Live Server.

## Forbindelse til backend

Frontenden sender HTTP-forespørgsler til:

```text
http://localhost:3000
```

Eksempel:

```js
fetch("http://localhost:3000/pokemons")
```

Backendserveren og MySQL-databasen skal derfor køre, før hjemmesiden kan vise data.

## Sider

### Pokebase.html

Projektets hovedside. Her kan brugeren:

- Se alle Pokémon
- Søge efter navn
- Filtrere efter type
- Filtrere efter minimum attack
- Nulstille søgningen

### Trainer.html

Her kan brugeren:

- Se alle trainers
- Oprette en ny trainer
- Vælge en trainer
- Se trainerens Pokémon
- Tilføje en Pokémon til traineren

### Dashboard.html

Dashboardside til projektets øvrige information og funktionalitet.

## Projektstruktur

```text
Frontend---Midtvejsprojekt-/
├── Dashboard.html
├── Pokebase.html
├── Pokebase.js
├── Trainer.html
├── Trainer.js
├── poke.css
├── trainer.css
└── pokebase-logo.png
```

## API-integration

Frontenden bruger blandt andet følgende endpoints:

| Metode | Endpoint | Funktion |
|---|---|---|
| GET | `/pokemons` | Henter alle Pokémon |
| GET | `/pokemon-name` | Søger efter navn |
| GET | `/pokemon-type` | Søger efter type |
| GET | `/pokemon-attack` | Filtrerer efter attack |
| GET | `/trainers` | Henter trainers |
| GET | `/trainers/:id/pokemons` | Henter trainerens Pokémon |
| POST | `/trainers` | Opretter en trainer |
| POST | `/trainers/:id/pokemons` | Tilføjer en Pokémon |

## Screenshots og video

Til den endelige aflevering tilføjes:

- Screenshot af Pokémon-oversigten
- Screenshot af søgefunktionen
- Screenshot af trainersiden
- Link til demonstrationsvideo


# Dashboard til Pokébase

Dashboardet viser tre statistikker fra vores database:

| Statistik | Visning | Endpoint |
| --- | --- | --- |
| Antal Pokémon pr. type | Cirkeldiagram | `GET /stats/types` |
| Gennemsnitlig attack pr. type | Søjlediagram | `GET /stats/average-attack` |
| Antal Pokémon pr. trainer | Tabel | `GET /stats/trainers` |

JavaScript henter data fra backend med `fetch()`. Chart.js bruges til diagrammerne. Dashboardet bruger projektets eksisterende CSS og navigation.

## Sådan beregnes statistikken

En Pokémon tæller med i både sin primære og sekundære type, men kun én gang i samme type. Derfor kan summen i cirkeldiagrammet være større end antallet af Pokémon.

Gennemsnitlig attack beregnes for hver type og afrundes til to decimaler. Manglende attack-værdier tæller ikke som 0.

Tabellen viser alle trainers, også dem med 0 Pokémon. Den tæller forskellige Pokémon-arter hos hver trainer.

SQL-forespørgslerne er forklaret i backendens README

## Loading, tomme resultater og fejl

Mens data hentes, vises en loading-besked. Hvis et endpoint svarer med en tom liste, vises en besked om, at der ikke er data.

Hvis API'et eller databasen fejler, vises en forståelig fejlbesked. De andre statistikker kan stadig vises, selvom ét kald fejler.

## Gruppemedlemmer

- Marcus Larn Sperling
- Emil Frost
- Nikolaj Falck Gutfeld
- John
