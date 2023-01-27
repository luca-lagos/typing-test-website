const progress_bar_son = document.querySelector(".progress-bar div");
const btn_start = document.getElementById("btn_start");
const cor_words = document.querySelector("#correct_letters span");
const incor_words = document.querySelector("#incorrect_letters span");
const wpm = document.querySelector("#wpm span");
const finish = document.getElementById("finish");
const btn_restart = document.getElementById("btn_restart");
const playtime = 2;

const start = () => {
  console.log("TIME STARTED");
  finish.classList.toggle("disabled", true);
  progress_bar_son.classList.toggle("time-completed", true);
  btn_start.classList.toggle("disabled", true);
};

btn_start.addEventListener("click", (e) => {
  start();
});

btn_restart.addEventListener("click", (e) => {
  start();
});

progress_bar_son.addEventListener("animationend", (e) => {
  console.log("TIME FINISHED");
  progress_bar_son.classList.toggle("time-completed", false);
  cor_words.textContent = "CHANGE";
  incor_words.textContent = "CHANGE";
  wpm.textContent = "CHANGE";
  finish.classList.toggle("disabled", false);
});

document.documentElement.style.setProperty("--time", playtime + "s");
