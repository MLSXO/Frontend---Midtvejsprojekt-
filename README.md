# Pokébase frontend

Dette er frontend-delen af vores Pokébase-projekt. Siden henter data fra vores backend og viser Pokémon, trainers og statistik.

[Link til backend](https://github.com/MLSXO/Backend---Midtvejsprojekt-)

## Teknologier

- HTML
- CSS
- JavaScript
- Fetch API
- Chart.js

## Funktioner

- Vis alle Pokémon
- Søg efter navn
- Filtrér efter type og minimum attack
- Se og opret trainers
- Tilføj Pokémon til en trainer
- Se statistik på Dashboardet

## Sådan starter du projektet

Klon repositoryet:

```bash
git clone https://github.com/MLSXO/Frontend---Midtvejsprojekt-.git
cd Frontend---Midtvejsprojekt-
```

Start backendserveren på `http://localhost:3000`. Åbn derefter `Pokebase.html` med eksempelvis Live Server i WebStorm eller Visual Studio Code.

## Sider

### Pokebase.html

Her vises alle Pokémon. Man kan søge efter navn og filtrere efter type eller minimum attack.

### Trainer.html

Her kan man se trainers, oprette en ny trainer og tilføje Pokémon til en trainer.

### Dashboard.html

Dashboardet viser:

- Antal Pokémon pr. type
- Gennemsnitlig attack pr. type
- Antal Pokémon pr. trainer

Diagrammerne er lavet med Chart.js.

## API-kald

Frontenden sender kald til `http://localhost:3000`.

| Metode | Endpoint | Funktion |
|---|---|---|
| GET | `/pokemons` | Henter alle Pokémon |
| GET | `/pokemon-name?name=pika` | Søger efter navn |
| GET | `/pokemon-type?type=Fire` | Søger efter type |
| GET | `/pokemon-attack?attack=80` | Filtrerer efter attack |
| GET | `/trainers` | Henter trainers |
| GET | `/trainers/:id/pokemons` | Henter en trainers Pokémon |
| POST | `/trainers` | Opretter en trainer |
| POST | `/trainers/:id/pokemons` | Tilføjer en Pokémon |
| GET | `/stats/types` | Henter antal Pokémon pr. type |
| GET | `/stats/average-attack` | Henter gennemsnitlig attack pr. type |
| GET | `/stats/trainers` | Henter antal Pokémon pr. trainer |

## Filer

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
└── README.md
```

## Screenshots

[Se screenshots af hjemmesiden](https://docs.google.com/document/d/1eBUwOFHsgZOMGOtz2M4mKh7oXTGrot_c9JLSak25wBs/edit?usp=sharing)

## Gruppe

- Marcus Larn Sperling
- Emil Frost
- Nikolaj Falck Gutfeld
- John
