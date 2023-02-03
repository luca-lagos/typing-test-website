const start_panel = document.querySelector(".start div");
const progress_bar_son = document.querySelector(".progress-bar div");
const btn_start = document.getElementById("btn_start");
const cor_words = document.querySelector("#correct_letters span");
const incor_words = document.querySelector("#incorrect_letters span");
const wpm_element = document.querySelector("#wpm span");
const finish_element = document.getElementById("finish");
const btn_restart = document.getElementById("btn_restart");
const word_container = document.querySelector("#actual_word");
const word_input = document.querySelector("input");
const total_points = document.getElementById("total_points");

const playtime = 60;
let correct_letters;
let incorrect_letters;
let finished_words;
let array_letters;
let actual_index;
let playing = false;
document.documentElement.style.setProperty("--time", playtime + "s");

const new_word = () => {
  actual_index = 0;
  const word_id = Math.floor(Math.random() * words.length);
  const word_selected = words[word_id];
  remove_word(word_container);
  array_letters = [];
  for (let i = 0; i < word_selected.length; i++) {
    const letter_element = document.createElement("span");
    letter_element.textContent = word_selected[i];
    word_container.appendChild(letter_element);
    array_letters.push(letter_element);
    letter_element.addEventListener("animationend", () => {
      letter_element.classList.toggle("disabled", false);
    });
  }
};

const remove_word = (e) => {
  Array.from(e.children).forEach((child) => e.removeChild(child));
};

const reset = () => {
  correct_letters = 0;
  incorrect_letters = 0;
  finished_words = 0;
  cor_words.textContent = correct_letters;
  incor_words.textContent = incorrect_letters;
};

const start = () => {
  playing = true;
  word_container.classList.toggle("disabled", false);
  finish_element.classList.toggle("disabled", true);
  start_panel.classList.toggle("disabled", true);
  btn_start.classList.toggle("disabled", true);
  reset();
  new_word();
  array_letters[0].classList.toggle("actual-letter");
  progress_bar_son.classList.toggle("time-completed", true);
};

const finish = () => {
  playing = false;
  word_container.classList.toggle("disabled", true);
  finish_element.classList.toggle("disabled", false);
  progress_bar_son.classList.toggle("time-completed", false);
  wpm_element.textContent = finished_words;
  if (finished_words > 0 && finished_words <= 5) {
    total_points.style = "background-color: rgb(250, 124, 7); color: black;";
    total_points.innerHTML = `"Podrías practicar un poco más" <span class="material-icons">
    sentiment_dissatisfied
    </span>`;
  }
  if (finished_words > 5 && finished_words <= 10) {
    total_points.style = "background-color: rgb(221, 190, 15); color: black;";
    total_points.innerHTML = `"Bastante bien pibe/a" <span class="material-icons">
    sentiment_neutral
    </span>`;
  }
  if (finished_words > 10 && finished_words <= 15) {
    total_points.style = "background-color: rgb(182, 255, 13); color: black;";
    total_points.innerHTML = `"Un poquito ma Edwin/a" <span class="material-icons">
    sentiment_satisfied
    </span>`;
  }
  if (finished_words > 15) {
    total_points.style = "background-color: rgb(47, 179, 113); color: black;";
    total_points.innerHTML = `"Sos la bestia" <span class="material-icons">
    sentiment_very_satisfied
    </span>`;
  }
  if (finished_words == 0) {
    total_points.style = "background-color: rgb(211, 61, 61);";
    total_points.innerHTML = `"Ponele voluntad querido/a" <span class="material-icons">
    sentiment_very_dissatisfied
    </span>`;
  }
};

const letter_effect = (e) => {
  const letter = e.textContent;
  const position = e.getBoundingClientRect();
  e.classList.add("invisible");
  const new_letter = document.createElement("span");
  new_letter.textContent = letter;
  new_letter.style = `
  --top: ${position.top}px;
  --left: ${position.left}px;
  `;
  new_letter.classList.add("hide");
  document.body.appendChild(new_letter);
  new_letter.addEventListener("animationend", () => {
    document.body.removeChild(new_letter);
  });
};

progress_bar_son.addEventListener("animationend", (e) => {
  finish();
});

btn_start.addEventListener("click", (e) => {
  start();
});

btn_restart.addEventListener("click", (e) => {
  start();
});

word_input.addEventListener("input", (e) => {
  if (!playing) {
    if (e.data === " ") {
      start();
    }
  }
  if (e.data === array_letters[actual_index].textContent) {
    letter_effect(array_letters[actual_index]);
    actual_index++;
    correct_letters++;
    cor_words.textContent = correct_letters;
    if (actual_index === array_letters.length) {
      new_word();
      finished_words++;
    }
    array_letters[actual_index].classList.toggle("actual-letter");
  } else {
    incorrect_letters++;
    incor_words.textContent = incorrect_letters;
  }
});
word_input.addEventListener("blur", (e) => {
  word_input.focus();
});

word_input.focus();
