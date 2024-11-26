const input = document.getElementById('input');
const button = document.getElementById('btn');
const result = document.getElementById('result');


let todoList = JSON.parse(localStorage.getItem('todos')) || [];

const saveToLocalStorage = (key = 'todos') => {
    localStorage.setItem(key, JSON.stringify(todoList));
}

button.addEventListener('click', () => {
    if (input.value.trim()) {
        todoList.push(input.value);
        saveToLocalStorage();
        render();
    }
});

const render = () => {
    result.innerHTML = ''
    todoList.forEach((todo, index) => {
        const list = document.createElement('list');
        list.classList.add('main__list');
    
        const res = document.createElement('p');
        res.classList.add('main__res');
        res.innerHTML = todo
    

        const containerBtn = document.createElement('div');
        containerBtn.classList.add('main__buttons')
    
        const checkBtn = document.createElement('input');
        checkBtn.type = 'button';
        checkBtn.value = '✓';
        checkBtn.classList.add('main__checed');

        
        const checkBtnTwo = document.createElement('input');
        checkBtnTwo.type = 'button';
        checkBtnTwo.classList.add('main__checed-2');
        
        if (checkBtn.classList.contains('main__checed')) {
            checkBtn.addEventListener('click', () => {
                checkBtn.classList.toggle('main__checed-2');
                res.classList.toggle('main__res-2');
    
                if (checkBtn.value === '✓') {
                    checkBtn.value = 'X';
                } else {
                    checkBtn.value = '✓';
                }
            });
        }

        const crossBtn = document.createElement('input');
        crossBtn.type = 'button';
        crossBtn.classList.add('main__cross');
        crossBtn.value = 'x';
        
        crossBtn.addEventListener('click', () => {
            const rem = confirm('Вы правда хотите удалить?')
            if (rem === true) {
                todoList.splice(index, 1);
                saveToLocalStorage();
                render();
            }
        });
    
        list.appendChild(res);
        list.appendChild(containerBtn);
        containerBtn.appendChild(checkBtn);
        containerBtn.appendChild(crossBtn);
        result.prepend(list);
    
        input.value = '';
    });
}


render();