import React from 'react';
interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
}

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, toggleTodo}) => {
    return (
        <div style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
        </div>
    );
};
