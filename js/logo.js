const canvas = document.getElementById("logo");
const ctx = canvas.getContext("2d");
const start = new Date();
const width = ctx.canvas.width;
const height = ctx.canvas.height;

// params
const circleCount = 30;
const vertSep = 120
const strokeWidth = 5
const distance = 10
const speed = 0.4
const dopplerFactor = 1
// const xOffset = maxRadius*dopplerFactor

const radius = (height-vertSep)/2
const maxRadius = radius*Math.sqrt(2)
const dopplerMargin = radius*dopplerFactor*2

function drawCircle(ms, y) {
    const opacity = 1-ms/radius
    ctx.beginPath();
    ctx.lineWidth = Math.min(ms/radius*12, strokeWidth);
    ctx.strokeStyle = `rgba(255,255,255,${opacity})`
    ctx.arc(maxRadius*dopplerFactor + radius - dopplerMargin + ms*dopplerFactor,
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

  function resizeTheCanvasToDisplaySize(entries) {
    const entry = entries[0];
    let width;
    let height;
    if (entry.devicePixelContentBoxSize) {
      width = entry.devicePixelContentBoxSize[0].inlineSize;
      height = entry.devicePixelContentBoxSize[0].blockSize;
    } else if (entry.contentBoxSize) {
      // fallback for Safari that will not always be correct
      width = Math.round(entry.contentBoxSize[0].inlineSize * devicePixelRatio);
      height = Math.round(entry.contentBoxSize[0].blockSize * devicePixelRatio);
    }
    canvas.width = width;
    canvas.height = height;
  }

  const observer = new ResizeObserver(resizeTheCanvasToDisplaySize)
  observer.observe(canvas);

  window.requestAnimationFrame(clock);
  