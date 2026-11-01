# Pokébase – Frontend

Frontend til midtvejsprojektet Pokébase. Hjemmesiden viser data fra projektets Express-API og giver brugeren mulighed for at søge efter Pokémon, administrere trainers og se statistik i Dashboardet.

[Backend-repository](https://github.com/MLSXO/Backend---Midtvejsprojekt-)

## Teknologier

- HTML
- CSS
- JavaScript
- Fetch API
- Chart.js

## Funktioner

- Visning af Pokémon fra MySQL-databasen
- Søgning efter Pokémon-navn
- Filtrering efter Pokémon-type
- Filtrering efter minimum attack
- Visning og oprettelse af trainers
- Tilføjelse af Pokémon til en trainer
- Dashboard med diagrammer og trainerstatistik
- Kommunikation med backend gennem `fetch()`

## Installation og start

Klon repositoryet:

```bash
git clone https://github.com/MLSXO/Frontend---Midtvejsprojekt-.git
cd Frontend---Midtvejsprojekt-
```

Frontenden kræver ingen npm-installation. Start først backendserveren på `http://localhost:3000`, og åbn derefter `Pokebase.html` gennem eksempelvis WebStorm eller Visual Studio Codes Live Server.

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

Dashboardet viser:

- Antal Pokémon pr. type i et cirkeldiagram
- Gennemsnitlig attack pr. type i et søjlediagram
- Antal Pokémon pr. trainer i en tabel

Chart.js bruges til diagrammerne, mens data hentes fra backendens statistik-endpoints.

## API-integration

Frontenden sender forespørgsler til `http://localhost:3000`.

| Metode | Endpoint | Funktion |
|---|---|---|
| GET | `/pokemons` | Henter alle Pokémon |
| GET | `/pokemon-name?name=pika` | Søger efter navn |
| GET | `/pokemon-type?type=Fire` | Søger efter type |
| GET | `/pokemon-attack?attack=80` | Filtrerer efter minimum attack |
| GET | `/trainers` | Henter trainers |
| GET | `/trainers/:id/pokemons` | Henter en trainers Pokémon |
| POST | `/trainers` | Opretter en trainer |
| POST | `/trainers/:id/pokemons` | Tilføjer en Pokémon |
| GET | `/stats/types` | Henter antal Pokémon pr. type |
| GET | `/stats/average-attack` | Henter gennemsnitlig attack pr. type |
| GET | `/stats/trainers` | Henter antal Pokémon pr. trainer |

## Dashboardets beregninger

En Pokémon tæller med i både sin primære og sekundære type, men kun én gang i samme type. Derfor kan summen i cirkeldiagrammet være større end det samlede antal Pokémon.

Gennemsnitlig attack beregnes for hver type og afrundes til to decimaler. Manglende attack-værdier tæller ikke som nul.

Trainer-tabellen viser alle trainers, også dem der endnu ikke har Pokémon. Dashboardet viser desuden loading-, tom- og fejltilstande for de enkelte datakald.

## Projektstruktur

```text
Frontend---Midtvejsprojekt-/
├── vendor/
│   ├── Chart.js-LICENSE.md
│   └── chart.umd.js
├── Dashboard.html
├── Dashboard.js
├── Pokebase.html
├── Pokebase.js
├── Trainer.html
├── Trainer.js
├── poke.css
├── trainer.css
├── pokebase-logo.png
├── .gitignore
└── README.md
```

## Screenshots

[Se frontendens screenshots](https://docs.google.com/document/d/1eBUwOFHsgZOMGOtz2M4mKh7oXTGrot_c9JLSak25wBs/edit?usp=sharing)

Screenshot-dokumentationen viser Pokémon-oversigten, søgefunktionerne, trainersiden, oprettelse og tilknytning af Pokémon samt Dashboardet.

## Gruppemedlemmer

- Marcus Larn Sperling
- Emil Frost
- Nikolaj Falck Gutfeld
- John
