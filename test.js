const input = document.querySelector(".input");
const val = document.querySelector(".val");
let man;
input.addEventListener("keyup", () => {
  man = input.value;
  console.log(man);
});

val.addEventListener("click", () => {
  input.value = 99;
});
