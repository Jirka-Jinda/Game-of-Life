var canvas,
    ctx,
    generation = 0,
    game_worker;

    
// inicializce
function init_js() {
    document.getElementById("body").style.backgroundColor = site_background_color;
    canvas = document.getElementById("canvas");
    canvas.style.borderColor = canvas_border_color;
    ctx = canvas.getContext("2d");
    render_grid();
}

// Game controls:
function start() {
    begin();
}

function stop() {
    end();
}

function reset() {
    end();
    game_state = init_game_state();
    render();
    reset_generation();
}

function generate() {
    const probability = 0.15;
    for (let k = 0; k < game_state.length; k++) {
        for (let i = 0; i < game_state[k].length; i++) {
            let randomValue = Math.random();
            if (randomValue < probability) {
                game_state[k][i] = 1;
            }
            else {
                game_state[k][i] = 0;
            }
        }
    }
    render();
}

// Canvas click handlers
function handle_canvas_click(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    select_square(clickX, clickY);
}

// Generation field functions
function update_generation() {
    generation++;
    set_generation(generation);
}

function reset_generation() {
    generation = 0;
    set_generation(0);
}

function set_generation(gen) {
    var output = document.getElementById('gen'),
        text = "Generace: ";
    output.textContent = text.concat(gen);
}