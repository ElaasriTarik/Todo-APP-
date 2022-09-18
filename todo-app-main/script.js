let userInput = document.querySelector('.userInput');
let todos = document.querySelector('.todos');
let clearCompleted = document.querySelector('.clearCompleted');
const allH = document.querySelector('.all');
const activeH = document.querySelector('.activeH');
const completedH = document.querySelector('.completed');

let parsedAll = JSON.parse(localStorage.getItem("noteAll"));
let parsedActive = JSON.parse(localStorage.getItem("noteActive"));
let parsedCompleted = JSON.parse(localStorage.getItem("noteCompleted"));
console.log(parsedCompleted);
let items = 0;
let all = [];
let active = [];
let completed = [];
console.log(todos);
window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {

let todo = document.querySelectorAll('.todo');
 todos.innerHTML += `
    <section class="todo">
      <span class="todoCheckBox"></span>
      <p>${userInput.value}</p>
      <img class="delete" src="/images/icon-cross.svg" alt="">
    </section>
    `;
    all.push(`${userInput.value}`);
    let allToLocalStorage = localStorage.setItem("noteAll", JSON.stringify(all));
    let itemsLeft = document.querySelector('.itemsLeft');
    items +=1;
    itemsLeft.textContent = `${items} items left`;
    userInput.value = '';

  }
let deleteBtn = document.querySelectorAll('.delete');
deleteBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.target.parentNode.remove();
      let itemsLeft = document.querySelector('.itemsLeft');
      items -=1;
      itemsLeft.textContent = `${items} items left`;
    })
})

})

window.addEventListener('click', (e) => {
  let todoCheckBox = document.querySelectorAll('.todoCheckBox');
  todoCheckBox.forEach((item) => {
      item.addEventListener('click', (e) => {
        item.classList.toggle('active');
        completed.push(`${item.parentNode.innerText}`);
        let completedToLocalStorage = localStorage.setItem("noteCompleted", JSON.stringify(completed));
      })
  });
})
clearCompleted.addEventListener('click', (e) => {
   let todoCheckBox = document.querySelectorAll('.todoCheckBox');
   todoCheckBox.forEach((item) => {
     if (item.classList[1] === 'active') {
        item.parentNode.remove();
        let itemsLeft = document.querySelector('.itemsLeft');
        items -=1;
        itemsLeft.textContent = `${items} items left`;
     }
   });
})
let htmlString = '';
allH.addEventListener('click', (e) => {
  htmlString = parsedAll.map((note) => {
    return `
    <section class="todo">
      <span class="todoCheckBox"></span>
      <p>${note}</p>
      <img class="delete" src="/images/icon-cross.svg" alt="">
    </section>
    `
  }).join('');
  todos.innerHTML = htmlString;
})


completedH.addEventListener('click', (e) => {
  htmlString = parsedCompleted.map((note) => {
    return `
    <section class="todo">
      <span class="todoCheckBox"></span>
      <p>${note}</p>
      <img class="delete" src="/images/icon-cross.svg" alt="">
    </section>
    `
  }).join('');
  todos.innerHTML = htmlString;
})
