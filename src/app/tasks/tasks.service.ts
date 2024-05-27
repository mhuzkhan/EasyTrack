import { Injectable } from "@angular/core";
import { dummyTasks } from "../data/dummy-tasks"
import { NewTaskData } from "./task/task.model";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = dummyTasks;

    constructor() {
        const tasks = localStorage.getItem('tasks');

        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    }

    getTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    addTask(task: NewTaskData, userId: string) {
        this.tasks.push({
            id: Math.random().toString(),
            title: task.title,
            summary: task.summary,
            dueDate: task.dueDate,
            userId: userId
        });
        this.saveTasks();
    }

    removeTask(taskId: string) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
