
let ctx = null;
let canvas = null;

Vue.createApp({
  data() {
    return {
      drag: false,
      old: null,
      eraser: false,
      color: "#000000",
      lineWidth: 1
    }
  },
  watch: {
    eraser(n) {
      ctx.globalCompositeOperation = n ? "destination-out" : "source-over";
    },
    lineWidth(w) {
      ctx.lineWidth = w;
    }
  },
  methods: {
    down(ev) {
      canvas.setPointerCapture(ev.pointerId);
      this.drag = true;
      this.old = {
        x: ev.offsetX,
        y: ev.offsetY
      };
    },
    up() {
      this.drag = false;
    },
    move(ev) {
      if (this.drag) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.old.x, this.old.y);
        ctx.lineTo(ev.offsetX, ev.offsetY);
        ctx.stroke();
        // ctx.closePath();
        this.old = {
          x: ev.offsetX,
          y: ev.offsetY
        };
      }
    },
    clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    save() {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "download.png";
      a.click();
    }
  },
  mounted() {
    canvas = this.$refs.canvas;
    ctx = canvas.getContext("2d", {
      desynchronized: true
    });
    ctx.lineCap = "round";
  }
}).mount('#app')
