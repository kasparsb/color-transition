function formatRgbaColorFromArray(color) {
    return {
        r: color[0],
        g: color[1],
        b: color[2],
        a: color[3],
        rgba: 'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'
    }
}

function colorTransition(colorStops, width) {

    if (!width) {
        width = 1000;
    }

    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d');

    this.setDimensions(width, 1);
    this.setColorStops(colorStops);

    this.draw();
}

colorTransition.prototype = {
    createGradient(colorStops) {
        let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);

        // Color stops are proportionaly divided by width
        let step = 1 / (colorStops.length-1);
        let gradPos = 0;

        for (let i = 0; i < colorStops.length; i++) {
            gradient.addColorStop(gradPos, colorStops[i]);

            gradPos += step;
        }

        return gradient;
    },
    setColorStops(colorStops) {
        this.colorStops = colorStops;
    },
    setDimensions(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    },
    draw() {
        this.context.fillStyle = this.createGradient(this.colorStops);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    resize(width, height) {
        this.setDimensions(width, height);
        this.setColorStops(this.colorStops);

        this.draw();
    },
    getColor(percentOfWidth) {
        return formatRgbaColorFromArray(this.context.getImageData((this.canvas.width-1) * (percentOfWidth/100), 0, 1, 1).data); 
    }
}

export default colorTransition