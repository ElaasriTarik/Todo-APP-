let userInput = document.querySelector('.userInput');
let todos = document.querySelector('.todos');
let clearCompleted = document.querySelector('.clearCompleted');
const allH = document.querySelector('.all');
const activeH = document.querySelector('.activeH');
const completedH = document.querySelector('.completed');
const dragNdrop = document.querySelector('.dragNdrop');
let parsedAll = JSON.parse(localStorage.getItem("noteAll"));
let parsedActive = JSON.parse(localStorage.getItem("noteActive"));
let parsedCompleted = JSON.parse(localStorage.getItem("noteCompleted"));
let items = 0;
let all = [];
let active = [];
let completed = [];
let todo = '';
function dragStart(e) {
   e.target.classList.add('changeColorOnDragStart');
//   setTimeout((e.target.classList.add('changeVisibilityOndragStart')), 0);
}
function dragEnd(e) {
  e.target.classList.remove('changeColorOnDragStart');
}
window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
 let welcome = document.querySelector('.welcoming');
 if (!welcome) {
   return null;
 } else {
    welcome.style.display = 'none';
 }

 todos.innerHTML += `
    <section class="todo" draggable="true">
    <span class="todoCheckBox"></span>
      <p>${userInput.value}</p>
      <img class="delete" src="/images/icon-cross.svg" alt="">
    </section>
    `;
    todo = document.querySelectorAll('.todo');
    if (todo === '') { null}
    else {
      todo.forEach((item) => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
      });
    }
    todos.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todos, e.clientY);
        const draggable = document.querySelector('.changeColorOnDragStart');
        if (afterElement == null) {
        return null
      } else {
        todos.insertBefore(draggable, afterElement);
      }
       })
       let draggedArr = [];
    function getDragAfterElement(todos, y) {
      const draggableElements = [...todos.querySelectorAll('.todo:not(.changeColorOnDragStart)')];
    return draggableElements.reduce((closest, child) => {
       const box = child.getBoundingClientRect();
       const offset = y - box.top - box.height / 2;
       if(offset < 0 && offset > closest.offset) {
              return {offset: offset, element: child}
       }
       else {
         return closest
       }
     }, { offset: Number.NEGATIVE_INFINITY}).element
    }
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
  if (completedH.classList[1] === 'changeColor') {
   allH.classList.add('changeColor');
   completedH.classList.remove('changeColor');
 } else {
   allH.classList.add('changeColor');
 }
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
  if (allH.classList[1] === 'changeColor') {
   allH.classList.remove('changeColor');
   completedH.classList.add('changeColor');
 } else {
   completedH.classList.add('changeColor');
 }

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
