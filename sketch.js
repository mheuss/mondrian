// Global variables
let rand;  // Placeholder for the random number generator object
let seedValue = Date.now(); // Default seed value. Using the current timestamp.
const canvasSize = 900; // Size of the canvas
const colsAndRows = 5; // Number of columns and rows in the grid
const squareSize = canvasSize / colsAndRows; // Size of each square in the grid

// Predefined templates for square subdivisions. Adding more entries here will generate more complex patterns.
const templates = [
	[[0, 0, 1, 1]], // Single square
	[[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]], // Two horizontal squares
	[[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]], // Two vertical squares
	[[0, 0, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0, 0.5, 0.5]], // Four squares
	[[0, 0, 1, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]], // Three squares, top
	[[0, 0, 0.5, 0.5], [0.5, 0, 0.5, 0.5], [0, 0.5, 1, 0.5]], // Three squares, bottom
	[[0, 0, 0.5, 1], [0.5, 0, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]], // Three squares, left
	[[0.5, 0, 0.5, 1], [0, 0.5, 0.5, 0.5], [0, 0, 0.5, 0.5]] //	Three squares, right
];

// Basic color palette. Adding more here will add more vareity to a pattern.
const basicColors = [
	[255, 0, 0], [0, 255, 0], [0, 0, 255],
	[255, 255, 0], [0, 255, 255], [255, 0, 255],
	[192, 192, 192], [128, 128, 128], [128, 0, 0],
	[128, 128, 0], [0, 128, 0], [128, 0, 128],
	[0, 128, 128], [0, 0, 128], [255, 165, 0],
	[255, 215, 0], [255, 255, 255]
];

// Interval to update seed value for generating new patterns. Every 5 seconds a new pattern will be generated.
// Set at the global level to avoid creating a new interval on every draw call. Yeah, I made that
// mistake already.
setInterval(() => {
	seedValue = Date.now();
}, 5000);

// p5.js Setup function. Create the dynamic canvas
function setup() {
	createCanvas(canvasSize, canvasSize);
}

// Function to get a random integer between min and max.
function getRandomValue(min, max) {
	return Math.floor(rand.random() * (max - min) + min);
}

// p5.js Draw function
function draw() {
	// Seeded random generator for consistent patterns. We seed each draw, since we know
	// that the same seed will generate the same pattern. When the interval updates the seed,
	// a new pattern will be generated.
	rand = new Srand(seedValue);

	// Define stroke weight for square boundaries.
	strokeWeight(12);

	// Iterate over grid columns and rows.
	for (let x = 0; x < colsAndRows; x++) {
		for (let y = 0; y < colsAndRows; y++) {
			// Call divide square function, which will worry about rendering the various patterns in a square.
			divideSquare(x * squareSize, y * squareSize);
		}
	}
}

// Makes use of the defined templates to draw a pattern in a square.
function divideSquare(xOffset, yOffset) {
	const template = templates[getRandomValue(0, templates.length)];
	template.forEach(entry => {
		drawRectangle(xOffset + (squareSize * entry[0]), yOffset + (squareSize * entry[1]), squareSize * entry[2], squareSize * entry[3]);
	});
}

// Function to draw a rectangle at a specific location
function drawRectangle(x, y, width, height) {
	let color = getColor();
	fill(color[0], color[1], color[2]);
	rect(x, y, width, height);
}

// Function to retrieve a random color from the palette
function getColor() {
	return basicColors[getRandomValue(0, basicColors.length)];
}