"use client"

import { useEffect, useState } from "react"

type Task = {
    title: string,
    desc: string,
    completed: boolean
}



export default function Todo() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if(storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }, [tasks])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         if (!title.trim() || !desc.trim()) return;

        setTasks([...tasks, {title, desc, completed: false}]);
        setTitle("");
        setDesc("");
    };

    const deleteTask = (index: number) => {
        setTasks(() => tasks.filter((_,i) => i !== index))
    };

    const toggleTask = (index: number) => {
        setTasks(
            tasks.map((task, i) => (
                i === index 
                    ? {...task, completed: !task.completed}
                    : task
            ))
        )
    };

    return (
        <>
            <h1 className="text-2xl font-semibold mx-auto">To-Do List</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="px-4 py-2 font-medium border-white border-2 rounded m-8"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    className="px-4 py-2 font-medium border-white border-2 rounded m-8"
                    placeholder="Enter description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button
                    className="rounded bg-white p-4 text-zinc-800"
                >
                    Add Task
                </button>
            </form>
            <div className="p-6 bg-slate-800">
                {tasks.length < 1 && <div>No tasks.</div>}
                {tasks.map((task,index) => (
                    <ul key={index} className="my-4 p-4 bg-white rounded text-black flex justify-between">
                        <div className="flex flex-col">
                            <p className={`text-xl font-semibold ${
                                task.completed ? 'line-through text-gray-500' : ''}`}
                            >{task.title}</p>
                            <p className="text-md font-medium">{task.desc}</p>
                        </div>
                        <div className="flex gap-6 ">
                            <button 
                                className="p-4 rounded bg-green-500 text-white cursor-pointer"
                                onClick={() => toggleTask(index)}
                            >Done</button>
                            <button 
                                className="p-4 rounded bg-red-500 text-white cursor-pointer"
                                onClick={() => deleteTask(index)}
                            >Delete</button>
                        </div>
                    </ul>
                ))}
            </div>
        </>
    )

}