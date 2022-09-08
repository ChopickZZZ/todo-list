import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { Task, Status } from '../types'

export const useTaskStore = defineStore('tasks', () => {
	const tasks: Ref<Task[]> = ref([])

	const addTask = (description: string) => {
		const task = {
			id: 't' + Math.random(),
			description,
			status: 'progress' as Status,
			date: Date.now()
		}

		tasks.value.push(task)
		localStorage.setItem('tasks', JSON.stringify(tasks.value))
	}

	const toggleTask = (id: string) => {
		const task = tasks.value.find(t => t.id === id)
		if (!task) {
			throw TypeError('No task found in store')
		}
		if (task.status === 'progress') {
			task.status = 'done'
		}
		else task.status = 'progress'
		localStorage.setItem('tasks', JSON.stringify(tasks.value))
	}

	const loadTasks = () => {
		if (localStorage.getItem('tasks') !== null) {
			tasks.value = JSON.parse(localStorage.getItem('tasks')!)
		}
	}

	return {
		tasks,
		addTask,
		toggleTask,
		loadTasks
	}
})