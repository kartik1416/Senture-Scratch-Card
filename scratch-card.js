
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const rewardText = document.getElementById("rewardText");

const rewards = [
  { text: "🎉 Congratulations! You get 5% Off on orders above Rs 399\nCoupon Code - SPSCRATCH5", weight: 40 },
  { text: "🎁 Woah! You get a stunning 10% off on orders above Rs 399\nCoupon Code - SPSCRATCH10", weight: 20 },
  { text: "🎉 Free! Free! Free! You got a free 15ml Tester worth Rs 499 on orders above Rs 399\nCoupon code - SPTEST15", weight: 20 },
  { text: "😢 Better luck next time. Uh Oh! Don't Worry, Your luck can be bad sometimes, but our Perfumes never!", weight: 40 },
  { text: "💥 Hacker or What! You get Rs 100 off on orders above Rs 399\nCoupon Code - SPSCRATCH100", weight: 10 },
];

function getWeightedReward() {
  const totalWeight = rewards.reduce((acc, r) => acc + r.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const reward of rewards) {
    if (rand < reward.weight) return reward.text;
    rand -= reward.weight;
  }
}

let isDrawing = false;
const reward = getWeightedReward();
rewardText.textContent = reward;
rewardText.classList.remove("hidden");

ctx.fillStyle = "#FFD700";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
});
