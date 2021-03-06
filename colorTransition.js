function formatRgbaColorFromArray(color) {
    return {
        r: color[0],
        g: color[1],
        b: color[2],
        a: color[3],
        rgba: 'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'
    }
}

function colorTransition(colorStops, width, height) {

    if (!width) {
        width = 1000;
    }
    if (!height) {
        height = 1;
    }

    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d');

    this.setDimensions(width, height);
    this.setColorStops(colorStops);

    this.draw();
}

colorTransition.prototype = {
    createGradient(colorStops) {
        let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);

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
    /**
     * Get color at current progress
     * @param number Progress value between  0 and 1
     */
    getColor(progress) {
        return formatRgbaColorFromArray(this.context.getImageData(this.canvas.width * progress, 0, 1, 1).data); 
    },
    /**
     * Return canvas dom element
     */
    getCanvasEl() {
        return this.canvas;
    }
}

export default colorTransition
