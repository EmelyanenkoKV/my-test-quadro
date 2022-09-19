import "./styles.css";

let detail = {
  width: 350,
  height: 250,
  lt: {radius: 0},
  lb: {radius: 0},
  rt: {radius: 50},
  rb: {radius: 0},
  radius: 50
};

const app = document.getElementById("app");
const heightInput = document.getElementById("heightInput");
const widthInput = document.getElementById("widthInput");
const rightAngleInput = document.getElementById("rightAngleInput");
const rotateZ = document.getElementById("rotateZ");

let degree = 0;
const canvas = document.getElementById("myCanvas");
canvas.width = detail.width;
canvas.height = detail.height;
const ctx = canvas.getContext("2d");

let rotating = false;
const rotateFunc = () => {
  if (!rotating) {
    rotating = true;

    var myImageData = new Image();
    myImageData.src = canvas.toDataURL();

    myImageData.onload = () => {
      const w = canvas.width;
      const h = canvas.height;
      canvas.width = h;
      canvas.height = w;

      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(myImageData, 0, 0);
      ctx.restore();

      myImageData = null;
      rotating = false;
    };
  }
};

const drawDetail = () => {
  let width = detail.width;
  let height = detail.height;

  switch (degree) {
    case 90:
      detail.lt.radius = 0;
      detail.lb.radius = 0;
      detail.rt.radius = 0;
      detail.rb.radius = detail.radius;
      width = detail.height;
      height = detail.width;
      break;

    case 180:
      detail.lt.radius = detail.radius;
      detail.lb.radius = 0;
      detail.rt.radius = 0;
      detail.rb.radius = 0;
      break;

    case 270:
      detail.lt.radius = 0;
      detail.lb.radius = detail.radius;
      detail.rt.radius = 0;
      detail.rb.radius = 0;
      width = detail.height;
      height = detail.width;
      break;

    case 0:
    default:
      detail.lt.radius = 0;
      detail.lb.radius = 0;
      detail.rt.radius = detail.radius;
      detail.rb.radius = 0;
      break;
  }

  canvas.width = width;
  canvas.height = height;

  const x = 0;
  const y = 0;

  ctx.beginPath();
  ctx.moveTo(detail.lb.radius + detail.rt.radius, y);
  ctx.arcTo(x + canvas.width, y, x + canvas.width, y + canvas.height, detail.rt.radius);
  ctx.arcTo(x + canvas.width, y + canvas.height, x, y + canvas.height, detail.rb.radius);
  ctx.arcTo(x, y + canvas.height, x, y, detail.lt.radius);
  ctx.arcTo(x, y, x + canvas.width, y, detail.lb.radius);
  ctx.closePath();
  ctx.stroke();
};

drawDetail();

heightInput.value = detail.height;
widthInput.value = detail.width;
rightAngleInput.value = detail.rt.radius;

heightInput.addEventListener("input", (e) => {
  const newValue = Number(e.currentTarget.value);
  if (!Number.isNaN(newValue)) {
    detail.height = newValue;
    drawDetail();
  }
});

widthInput.addEventListener("input", (e) => {
  const newValue = Number(e.currentTarget.value);
  if (!Number.isNaN(newValue)) {
    detail.width = newValue;
    drawDetail();
  }
});

rightAngleInput.addEventListener("input", (e) => {
  const newValue = Number(e.currentTarget.value);
  if (!Number.isNaN(newValue)) {
    detail.radius = newValue;
    drawDetail();
  }
});

rotateZ.addEventListener("click", (e) => {
  e.preventDefault();
  degree = (degree + 90) % 360;
  rotateFunc();
});

