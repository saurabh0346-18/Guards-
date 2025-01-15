import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  standalone: false
})
export class TodosComponent implements OnInit {
  todos: { id: number; task: string; completed: boolean }[] = [];
  newTask: string = '';
  searchQuery: string = '';
  filter: 'all' | 'completed' | 'pending' = 'all';

  ngOnInit() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) this.todos = JSON.parse(savedTodos);
  }

  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push({
        id: Date.now(),
        task: this.newTask,
        completed: false,
      });
      this.newTask = '';
      this.saveTodos();
    }
  }

  toggleComplete(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  get filteredTodos() {
    return this.todos.filter((t) => {
      if (this.filter === 'all') return true;
      return this.filter === 'completed' ? t.completed : !t.completed;
    }).filter(t => t.task.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
