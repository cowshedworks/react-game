let colours = [
    'red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple', 'violet', 'teal', 'turquoise'
];

function generateTiles() {
    return [...colours, ...colours]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .map((colour) => ({
            colour: colour,
            id: Math.random(),
            matched: false,
            revealed: false,
        }));
}

export { colours, generateTiles };