const todoList = [];

function renderTodoList() {

  let todoListHtml = '';

  todoList.forEach((todoObject, index) => {
    // const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject; //{ name } - this takes the name out of the object and put it in a varibale with its name 
    const html = `
  <div>${name}</div>
  <div>${dueDate}</div>
  <button class="delete-todo-button js-delete-todo-button">Delete</button>
   `;
    todoListHtml += html
  });
  /*
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name,dueDate } = todoObject; //{ name } - this takes the name out of the object and put it in a varibale with its name 
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
    todoList.splice(${i},1);
    renderTodoList();
    " class="delete-todo-button">Delete</button>
     `;
    todoListHtml += html
  }*/
  document.querySelector('.js-todo-list').innerHTML = todoListHtml;
/*
document.querySelector('.js-todo-list').innerHTML = todoListHtml; => this part is the one that is printing the button in the webpage 
so that we have to add the eventlistener next to this part 
if not the event listener work will not happed
*/
document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
  deleteButton.addEventListener('click', () => {
    todoList.splice(index, 1);
    renderTodoList();
  });
});

}
/* 
we used forEach because when we click the add button the vlues will be pushed to the array
to loop through the array we use forEach
forEach has two parameter
value => in this list the value is the delete button
index => it refers to the position of the values in the list 
forEach delete button we added a click eventListener to delete when we click
*/


document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    // name:name,
    // dueDate:dueDate,
    // shorthand for the above is below
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}