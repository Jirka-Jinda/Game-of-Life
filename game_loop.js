// Loop variables:
var frame_id;

var started = false,
    running = false,
    last_frame_time_ms = 0,
    max_FPS = 13;

function begin() {
    if (!started) {
        started = true;
        running = true;
        requestAnimationFrame(loop);
    }
}

function loop(timestamp) {
    if (timestamp < last_frame_time_ms + (1000 / max_FPS)) {
        frame_id = requestAnimationFrame(loop);
        return;
    }

    last_frame_time_ms = timestamp;
    update();
    render();
    frame_id = requestAnimationFrame(loop);
}

function end() {
    if (running) {
        running = false;
        started = false;
        cancelAnimationFrame(frame_id);
    }
}

function update() {
    game_state = update_game();
    update_generation();
}

function update_game() {
    var result = [],
        game_length = game_state.length;
    for (let k = 0; k < game_state.length; k++) {
        result[k] = [];
        for (let i = 0; i < game_state[k].length; i++) {
            // 0=dead, 1=alive
            let center = game_state[k][i];
            let surroundings = 0;
            for (let x = -1; x <= 1; x++) {
                let x_coord = k + x;
                for (let y = -1; y <= 1; y++) {
                    let y_coord = i + y;
                    if (x==0 && y==0) continue; //Center square
                    // Add valid Surroundings squares, wrap around for calculating
                    else {
                        surroundings += game_state[(x_coord + game_length) % game_length][(y_coord + game_length) % game_length];
                    }
                }
            }
            // Use rules to alter center square
            if (center == 1) { // If center square is alive
                if (surroundings < 2) result[k][i] = 0;
                else if (surroundings > 3) result[k][i] = 0;
                else result[k][i] = center;
            }
            else { // If center square is dead
                if (surroundings == 3) result[k][i] = 1;
                else result[k][i] = center;
            }
        }
    }
    return result;
}
