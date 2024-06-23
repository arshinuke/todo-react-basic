import React, { useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!input.trim()) return;
        const newTodo = { id: Date.now(), text: input, completed: false };
        setTodos(todos => [...todos, newTodo]);
        setInput('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Add a todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </div>
    );
};
