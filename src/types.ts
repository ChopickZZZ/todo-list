export type Status = 'done' | 'progress'

export interface Task {
	id: string,
	description: string,
	status: Status,
	date: number
}