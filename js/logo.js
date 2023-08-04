const canvas = document.getElementById("logo");
const ctx = canvas.getContext("2d");
const start = new Date();
const dpr = window.devicePixelRatio || 1;
const width = ctx.canvas.width * dpr;
const height = ctx.canvas.height * dpr;
ctx.scale(1/dpr, 1/dpr)

// params
const circleCount = 30;
const vertSep = 100
const strokeWidth = 5
const distance = 5
const speed = 0.3
const dopplerFactor = 0.4

const radius = (height-vertSep)/2
const maxRadius = radius*Math.sqrt(2)
const dopplerMargin = radius*dopplerFactor

function drawCircle(ms, y) {
    const opacity = 1-ms/radius
    ctx.beginPath();
    ctx.lineWidth = Math.min(ms/radius*12, strokeWidth);
    ctx.strokeStyle = `rgba(255,255,255,${opacity})`
    ctx.arc(radius - dopplerMargin + ms*dopplerFactor,
            y + vertSep/2,
            ms,
            0,
            Math.PI * 2,
            true);
    ctx.stroke();
}

function clock() {
    const now = new Date();
    const ms = now.getTime() - start.getTime()
    ctx.save();
    ctx.fillStyle = "#006972";
    ctx.fillRect(0, 0, width, height);
  
    for (let circ = 0; circ < circleCount; circ++) {
        const delayedMs = Math.max(radius + ms/radius*speed % radius - circ*radius*2/circleCount, 0)
        drawCircle(delayedMs, radius+vertSep/2)
        drawCircle(delayedMs, radius-vertSep/2)
    }
  
    ctx.restore();
    window.requestAnimationFrame(clock);
  }
  
  window.requestAnimationFrame(clock);
  