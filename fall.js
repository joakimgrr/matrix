var Matrix = {
    position: 0,
    positionX: 0,
    fontSize: 18,
    char: 'abcdefghijklmnopqrstuABCDEFGHIJKLMNOPQRSTU123456789',
    charLength: 0,
    ctx: null,
    win: null,
    yPos: [],
    cn: 0,
    maxHeight: 100,

    init: function() {
        var canvas = document.getElementById("c");
        this.win = window;

        canvas.width = this.win.innerWidth;
        canvas.height = this.win.innerHeight;

        this.ctx = canvas.getContext('2d');

        this.cn = Math.floor(canvas.width / this.fontSize); //number of columns

        // rather than checking for undefines when rendering, prefill arrays
        for(var i = 0; i < this.cn; i++){
            this.yPos[i] = -Math.floor(Math.random() * 600);
        }

        this.charLength = this.char.length;

        setInterval(this.step.bind(this), 60);
    },

    step: function() {

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
        this.ctx.fillRect(0, 0, c.width, c.height);

        this.ctx.fillStyle = '#40FF00';
        this.ctx.font = this.fontSize + 'px matrix';

        for(var i = 0; i < this.cn; i++){
            var positionX = i * this.fontSize;
            var character = this.getChar();

            this.ctx.fillText(character, positionX, this.yPos[i]);

            /**
            *  Insert black blocks to clean up the canvas
            *  TODO: fix so that zeroing of y-position wont stop clearing
            *       of ghostbloks, maybe they should have their own pos array
            */
            if(this.yPos[i] > (this.fontSize * this.maxHeight)){
                this.ctx.fillStyle = '#000';
                var position = this.yPos[i] - (this.fontSize * this.maxHeight);
                this.ctx.fillText('█', positionX, position);
                this.ctx.fillStyle = '#40FF00';
            }

            if(this.yPos[i] > this.win.innerHeight && this.randomizer(0.98)) {
                this.yPos[i] = 0;
            }

            this.yPos[i] += this.fontSize;

            if(this.randomizer(0.99)){
                this.changeRandomCharacter();
            }
        }
    },

    changeRandomCharacter: function() {
        var rndm = Math.floor(Math.random() * this.cn);
        var x = rndm * this.fontSize;
        var y = this.yPos[rndm];
        var char = this.getChar();

        this.ctx.fillStyle = '#40FF00';
        this.ctx.font = this.fontSize + 'px matrix';

        this.ctx.fillText(char, x, y);
    },

    getChar: function() {
        return this.char[Math.floor(Math.random() * this.charLength)];
    },

    randomizer: function(threshold) {
        if(Math.random() > threshold) {
            return true;
        }else{
            return false;
        }
    }
}

Matrix.init();
