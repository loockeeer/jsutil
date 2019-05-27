const {
    random, // Done
    randomColor, // Done
    colorize, // Done
    ArrayExtended, // Done
    Neury, 
    sigmoid, // Done
    JsonManager
} = require('../index.js')
const assert = require('assert')


describe('random', () => {

    it('Returns differents numbers at each call', (done) => {
        let a = random(0, 500)
        let b = random(0, 500)
        let c = random(0, 500)

        if (a == b && b == c) done()
        else done("Random returns same numbers at each call")
    })

})

describe('randomColor', () => {
    it('Must return colors between 0 and 255', done => {
        let color = randomColor()
        let trigger = false
        for (c of color) {
            if (c < 0 || c > 255) trigger = true
        }
        if (trigger) done('Color is higher than 255 or lower than 0')
        else done()
    })
})

describe('ArrayExtended', () => {
    it('Can multiply two arrays with #dot', done => {
        let one = new ArrayExtended(2, 2)
        let two = new ArrayExtended(2, 2)

        let three = one.dot(two)
        if (three[0] == 4 && three[1] == 4) {
            done()
        } else {
            done('The multiplication between two arrays do not works')
        }
    })
})

describe('sigmoid', () => {
    it('should return sigmoid version of x', done => {
        let x = 3
        if((1 / (1 + Math.pow(Math.E, -x))) == sigmoid(x)) {
            done()
        }
        else {
            done('Sigmoid is not working.')
        }
    })
})

describe('Neury', () => {
    it('should raise no error when creating the network', done => {
        try {
            let nn = new Neury(3,6,3)

        } catch(e) {
            return done('Error raised when creating the neural net, e : '+e)
        }
        done()
    })
    it('should resolve an array with no error', done => {
        let nn = new Neury(3,6,3)
        try {
            nn.resolve([0.1,0.1,0.1])
        } catch(e) {
            return done('neury do no resolve with no error, error : '+e)
        }
        done()
    })
})