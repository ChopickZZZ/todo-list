export type Status = 'done' | 'progress'
export type SortQuery = 'date' | 'status'

export interface Task {
	id: string,
	description: string,
	status: Status,
	date: number
}