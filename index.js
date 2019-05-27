// Extended Classes

class ArrayExtended extends Array {
    constructor(...content) {
        super(...content)
    }
    dot(arr) {
        let finalArray = [];
        for (var i = 0; i < this.length; i++) {
            finalArray[i] = this[i] * arr[i]
        }
        return finalArray;
    }
    dotSigmoid(arr) {
        let finalArray = [];
        for (var i = 0; i < this.length; i++) {
            finalArray.push(sigmoid(this[i] * arr[i]));
        }
        return finalArray;
    }
}

// Machine Learning

class Neury {
    constructor(layer1, layer2, layer3) {
        this.layers = new ArrayExtended();
        this.layersInfo = [layer1, layer2, layer3];
        for (var j = 0; j < 3; j++) {
            let layer = new ArrayExtended();
            for (var i = 0; i < this.layersInfo[j]; i++) {
                layer[i] = Math.random();
            }
            this.layers[j] = layer
        }
    }
    resolve(inputs) {
        if (inputs.length != this.layersInfo[0]) return console.error('Input values must be equal to layer 1 input shape !');
        let layer1_output = this.layers[0].dotSigmoid(inputs);

        let layer2_output = new ArrayExtended();

        this.layers[1].forEach(neuron => {
            var current_output = 0;
            layer1_output.forEach(out => {
                current_output += sigmoid(out * neuron);
            });
            layer2_output.push(current_output);
        });
        let output = layer2_output.dotSigmoid(this.layers[2]);
        return output;
    }
    mutate(rate) {
        this.layers.forEach((layer, i) => {
            layer.forEach((weigth, j) => {
                let op = Math.random() < 0.50
                console.log(this.layers[i][j] * (rate/100))
                if (op) this.layers[i][j] = this.layers[i][j]+this.layers[i][j] * (rate/100);
                else this.layers[i][j] = this.layers[i][j]-this.layers[i][j] * (rate/100);
            })
        })
    }
}

// Utils Functions

function colorize(strings, ...values) {
    const colors = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underline: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        bgBlack: "\x1b[40m",
        bgRed: "\x1b[41m",
        bgGreen: "\x1b[42m",
        bgYellow: "\x1b[43m",
        bgBlue: "\x1b[44m",
        bgMagenta: "\x1b[45m",
        bgCyan: "\x1b[46m",
        bgWhite: "\x1b[47m"
    }
    let str = '';
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    for (const [name, color] of Object.entries(colors)) {
        let regex = new RegExp("@" + name,
            "g")
        str = str.replace(regex, color)
    }
    return str;
}


function random(min, max) {
    return Math.floor(Math.random() *
        (min - max)) * -min
}

function randomColor() {
    return [random(0, 255), random(0, 255),
        random(0, 255)
    ]
}

function sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
}


// Utils Classes

class JsonManager {
    constructor(path, saveInterval) {
        this.path = path
        this.saveInterval = saveInterval
        this.fs = require('fs')
        this.content;
        this._beforeContentParsed;

        setInterval(() => {
            if (this._beforeContentParsed != this.content) this.save()
        }, saveInterval)
    }

    load() {
        this._fileContent = this.fs.readFileSync(this.path)
        this.content = JSON.parse(fileContent)
    }

    save() {
        this.fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2));
        this._before = this.content
    }
}

// Exports

exports.JsonManager = JsonManager
exports.colorize = colorize
exports.random = random
exports.randomColor = randomColor
exports.sigmoid = sigmoid
exports.ArrayExtended = ArrayExtended
exports.Neury = Neury
