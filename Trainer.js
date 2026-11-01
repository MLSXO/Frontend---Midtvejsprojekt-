const API_URL = "http://localhost:3000";

let selectedTrainer = null;

const messageBox = document.getElementById("message");
const trainerList = document.getElementById("trainer-list");
const pokemonList = document.getElementById("trainer-pokemon-list");
const selectedTitle = document.getElementById("selected-trainer-title");

const createTrainerForm = document.getElementById("createTrainerForm");
const addPokemonForm = document.getElementById("addPokemonForm");
const pokemonSelect = document.getElementById("pokemonSelect");


// MESSAGES

function showMessage(text, type) {

    messageBox.textContent = text;
    messageBox.className = "message " + type;
    messageBox.hidden = false;
}

function clearMessage() {

    messageBox.textContent = "";
    messageBox.hidden = true;
}

async function request(path, options) {

    let response;

    try {
        response = await fetch(API_URL + path, options);
    } catch (error) {
        throw new Error(
            "Could not reach the server. Is the API running on " + API_URL + "?"
        );
    }

    let data = null;

    try {
        data = await response.json();
    } catch (error) {
    }

    if (!response.ok) {
        throw new Error(
            (data && data.error) || "Request failed (status " + response.status + ")"
        );
    }

    return data;
}

function postJson(path, body) {

    return request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
}

function setBusy(form, busy) {

    form.querySelector("button[type='submit']").disabled = busy;
}

async function loadTrainers() {

    if (!trainerList.hasChildNodes()) {
        trainerList.textContent = "Loading trainers...";
    }

    try {
        const trainers = await request("/trainers");

        renderTrainers(trainers);

    } catch (error) {

        console.error(error);
        trainerList.textContent = "";
        showMessage(error.message, "error");
    }
}

function renderTrainers(trainers) {

    trainerList.innerHTML = "";

    if (trainers.length === 0) {
        trainerList.textContent = "No trainers yet. Create one below.";
        return;
    }

    trainers.forEach(trainer => {

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("trainer-card");
        button.dataset.id = trainer.trainer_id;

        const name = document.createElement("span");
        name.classList.add("trainer-card-name");
        name.textContent = trainer.trainer_name;

        const meta = document.createElement("span");
        meta.classList.add("trainer-card-meta");
        const details = [];

        if (trainer.age !== null && trainer.age !== undefined) {
            details.push("Age " + trainer.age);
        }

        if (trainer.hometown) {
            details.push(trainer.hometown);
        }

        meta.textContent = details.join(", ");

        button.appendChild(name);
        button.appendChild(meta);

        button.addEventListener("click", function () {
            selectTrainer(trainer);
        });

        trainerList.appendChild(button);
    });

    highlightSelectedTrainer();
}

function highlightSelectedTrainer() {

    trainerList.querySelectorAll(".trainer-card").forEach(button => {

        const isSelected =
            selectedTrainer !== null &&
            Number(button.dataset.id) === selectedTrainer.trainer_id;

        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
}

function selectTrainer(trainer) {

    selectedTrainer = {
        trainer_id: trainer.trainer_id,
        trainer_name: trainer.trainer_name
    };

    clearMessage();
    highlightSelectedTrainer();

    selectedTitle.textContent = "Pokémon owned by " + trainer.trainer_name;
    addPokemonForm.hidden = false;

    loadTrainerPokemons();
}

async function loadTrainerPokemons() {

    const trainer = selectedTrainer;

    pokemonList.textContent = "Loading Pokémon...";

    try {
        const pokemons = await request(
            "/trainers/" + trainer.trainer_id + "/pokemons"
        );

        if (selectedTrainer === null || selectedTrainer.trainer_id !== trainer.trainer_id) {
            return;
        }

        renderTrainerPokemons(pokemons, trainer);

    } catch (error) {

        console.error(error);

        if (selectedTrainer === null || selectedTrainer.trainer_id !== trainer.trainer_id) {
            return;
        }

        pokemonList.textContent = "";
        showMessage(error.message, "error");
    }
}

function renderTrainerPokemons(pokemons, trainer) {

    pokemonList.innerHTML = "";

    if (pokemons.length === 0) {
        pokemonList.textContent = trainer.trainer_name + " has no Pokémon yet.";
        return;
    }

    pokemons.forEach(pokemon => {

        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        const number = document.createElement("p");
        number.classList.add("pokemon-number");
        number.textContent = "#" + pokemon.pokedex_number;

        const name = document.createElement("h2");
        name.textContent = pokemon.name;

        const type = document.createElement("p");
        type.classList.add("pokemon-type");

        if (pokemon.secondary_type) {
            type.textContent =
                pokemon.primary_type + " / " + pokemon.secondary_type;
        } else {
            type.textContent = pokemon.primary_type;
        }

        const stats = document.createElement("div");
        stats.classList.add("pokemon-stats");

        const statList = [
            ["HP", pokemon.hp],
            ["Attack", pokemon.attack],
            ["Defense", pokemon.defence],
            ["Sp. Attack", pokemon.special_attack],
            ["Sp. Defense", pokemon.special_defence],
            ["Speed", pokemon.speed]
        ];

        statList.forEach(([label, value]) => {

            const line = document.createElement("p");
            line.textContent = label + ": " + value;
            stats.appendChild(line);
        });

        card.appendChild(number);
        card.appendChild(name);
        card.appendChild(type);
        card.appendChild(stats);

        pokemonList.appendChild(card);
    });
}

async function loadPokemonOptions() {

    try {
        const pokemons = await request("/pokemons");

        pokemonSelect.innerHTML = "";

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Choose a Pokémon";
        pokemonSelect.appendChild(placeholder);

        pokemons.forEach(pokemon => {

            const option = document.createElement("option");
            option.value = pokemon.pokedex_number;
            option.textContent = "#" + pokemon.pokedex_number + " " + pokemon.name;
            pokemonSelect.appendChild(option);
        });

    } catch (error) {

        console.error(error);
        pokemonSelect.innerHTML = "";

        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Could not load Pokémon";
        pokemonSelect.appendChild(option);

        showMessage(error.message, "error");
    }
}

createTrainerForm.addEventListener("submit", async function (event) {

    event.preventDefault();
    clearMessage();

    const ageInput = document.getElementById("trainerAge");

    const body = {
        trainer_name: document.getElementById("trainerName").value,
        age: ageInput.value === "" ? null : Number(ageInput.value),
        hometown: document.getElementById("trainerHometown").value
    };

    setBusy(createTrainerForm, true);

    try {
        const trainer = await postJson("/trainers", body);

        createTrainerForm.reset();
        showMessage('Trainer "' + trainer.trainer_name + '" was created.', "success");

        await loadTrainers();

    } catch (error) {

        showMessage(error.message, "error");

    } finally {

        setBusy(createTrainerForm, false);
    }
});

addPokemonForm.addEventListener("submit", async function (event) {

    event.preventDefault();
    clearMessage();

    if (selectedTrainer === null) {
        showMessage("Select a trainer first.", "error");
        return;
    }

    if (pokemonSelect.value === "") {
        showMessage("Choose a Pokémon first.", "error");
        return;
    }

    const trainer = selectedTrainer;

    setBusy(addPokemonForm, true);

    try {
        const added = await postJson(
            "/trainers/" + trainer.trainer_id + "/pokemons",
            { pokedex_number: Number(pokemonSelect.value) }
        );

        showMessage(
            added.name + " was added to " + trainer.trainer_name + ".",
            "success"
        );

        if (selectedTrainer !== null && selectedTrainer.trainer_id === trainer.trainer_id) {
            await loadTrainerPokemons();
        }

    } catch (error) {

        showMessage(error.message, "error");

    } finally {

        setBusy(addPokemonForm, false);
    }
});

loadTrainers();
loadPokemonOptions();