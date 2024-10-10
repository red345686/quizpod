const canvas=document.getElementById('timer');
const ctx=canvas.getContext('2d');
const radius = 60; // Radius of the circle
const totalTime = 30; // Total countdown time in seconds
let currentTime = totalTime;
const startAngle = -Math.PI / 2; // Start at the top
const endAngle = 2 * Math.PI; // Full circle

function drawTimer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw outer circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, endAngle, false);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw progress
  const remainingAngle = (currentTime / totalTime) * endAngle;
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    startAngle,
    startAngle + remainingAngle,
    false
  );
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#FF0000";
  ctx.stroke();

  // Draw the text in the center
  ctx.fillStyle = "#000";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(currentTime, canvas.width / 2, canvas.height / 2);
}