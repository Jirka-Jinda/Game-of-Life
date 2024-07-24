const square_size = 12;
var game_state = init_game_state();

function init_game_state() {
    var res = [];
    for (let k = 0; k < (840 / square_size); k++) {
        res[k] = [];
        for (let i = 0; (i < 840 / square_size); i++) {
            res[k][i] = 0;
        }
    }
    return res;
}

function select_square(x_coord, y_coord) {
    // Coordinates relative to canvas
    let x_square = Math.floor(x_coord/square_size),
        y_square = Math.floor(y_coord/square_size);
    game_state[x_square][y_square] = (game_state[x_square][y_square] + 1) % 2;
    render_squares();
}

// Colors
const canvas_grid_color = '#E7E5DF',
    canvas_border_color = 'black',
    canvas_square_color = '#910002',
    site_background_color = '#E7BB41';

function render() {
    render_grid();
    render_squares();
}

function render_grid() {
    const h = canvas.height,
        w = canvas.width;
    // vertical lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = canvas_grid_color;
    ctx.beginPath();
    for (let k = 1; k < w / square_size; k++) {
        ctx.moveTo(k * square_size, 0);
        ctx.lineTo(k * square_size, h);
    }
    // horizontal lines
    for (let k = 1; k < h / square_size; k++) {
        ctx.moveTo(0, k * square_size);
        ctx.lineTo(w, k * square_size);
    }
    ctx.stroke();
}

function render_squares() {
    var square_fill_size = square_size - 1;
    var square;
    for (let k = 0; k < canvas.height / square_size; k++) {
        for (let i = 0; i < canvas.width / square_size; i++) {
            square = game_state[k][i];
            if (square == 1) {
                ctx.fillStyle = canvas_square_color;
                ctx.fillRect(k * square_size, i * square_size, square_fill_size, square_fill_size);
            }
            else {
                ctx.clearRect(k * square_size, i * square_size, square_fill_size, square_fill_size);
            }
        }
    }
}