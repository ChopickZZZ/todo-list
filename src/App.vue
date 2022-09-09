<script setup lang="ts">
import TaskModal from './components/TaskModal.vue';
import ListItem from './components/ListItem.vue';
import { computed, Ref, ref } from 'vue'
import { useTaskStore } from './stores/tasks'
import { SortQuery } from './types';

const taskStore = useTaskStore()
taskStore.loadTasks()
const tasks = computed(() => taskStore.tasks)

const isModalOpen = ref(false)
const createTask = (description: string) => {
	isModalOpen.value = false
	taskStore.addTask(description)
}

const filterText = ref('')
const filteredTasks = computed(() => {
	if (filterText.value) {
		return tasks.value.filter(task => task.description.toUpperCase().includes(filterText.value.toUpperCase()))
	}
	else return tasks.value
})

const isSelectActive = ref(false)

const selectTextBase = {
	'date': 'Дата',
	'status': 'Статус'
}

const sortQuery: Ref<SortQuery> = ref('date')
const sort = () => {
	setTimeout(() => {
		taskStore.sortTasks(sortQuery.value)
		isSelectActive.value = false
	}, 0)
}


const toggleStatus = (id: string) => taskStore.toggleTask(id)
</script>

<template>
	<div class="container">
		<div class="list">
			<div class="list__top">
				<h1 class="list__title">To Do List</h1>
				<button class="list__add-btn" @click="isModalOpen = true">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="9" width="2" height="20" fill="#314B99" />
						<rect x="20" y="9" width="2" height="20" transform="rotate(90 20 9)" fill="#314B99" />
					</svg>
				</button>
			</div>
			<TaskModal v-if="isModalOpen" @close="isModalOpen = false" @create="createTask" />
			<div class="list__utils utiils">
				<div class="utils__search">
					<span class="utils__icon">
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.8645 11.3208H12.0515L11.7633 11.0429C12.7719 9.86964 13.3791 8.34648 13.3791 6.68954C13.3791 2.99485 10.3842 0 6.68954 0C2.99485 0 0 2.99485 0 6.68954C0 10.3842 2.99485 13.3791 6.68954 13.3791C8.34648 13.3791 9.86964 12.7719 11.0429 11.7633L11.3208 12.0515V12.8645L16.4666 18L18 16.4666L12.8645 11.3208ZM6.68954 11.3208C4.12693 11.3208 2.05832 9.25214 2.05832 6.68954C2.05832 4.12693 4.12693 2.05832 6.68954 2.05832C9.25214 2.05832 11.3208 4.12693 11.3208 6.68954C11.3208 9.25214 9.25214 11.3208 6.68954 11.3208Z"
								fill="#59BBA6" />
						</svg>
					</span>
					<input type="text" class="utils__filter" placeholder="Поиск Имени, статуса или даты"
						v-model="filterText">
				</div>
				<div class="utils__sort-container">
					<div class="utils__sort-subtitle">Сортировать по:</div>
					<div class="utils__select select">
						<div class="select__box">
							<div :class="['select__options-container', {active: isSelectActive}]">
								<div class="select__option" @click="sort">
									<input class="select__radio" value="date" type="radio" id="date" name="sort"
										v-model="sortQuery">
									<label class="select__label" @click.stop for="date">Дата</label>
								</div>
								<div class="select__option" @click="sort">
									<input class="select__radio" value="status" type="radio" id="status" name="sort"
										v-model="sortQuery">
									<label class="select__label" @click.stop for="status">Статус</label>
								</div>
							</div>
							<div class="select__selected" @click="isSelectActive = !isSelectActive">
								{{selectTextBase[sortQuery]}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list__tasks tasks">
				<div class="tasks__top">
					<p class="tasks__description">Описание</p>
					<div class="tasks__description">Статус</div>
					<div class="tasks__description">Дата</div>
				</div>
				<TransitionGroup tag="ul" class="tasks__list" name="list">
					<ListItem v-for="task in filteredTasks" :key="task.id" :task="task" @toggle="toggleStatus" />
				</TransitionGroup>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.select {
	&__box {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	&__options-container {
		position: absolute;
		top: 20px;
		right: 0;
		background-color: #fff;
		color: var(--color-primary);
		max-height: 0;
		opacity: 0;
		border-radius: 5px;
		order: 1;
		transition: .3s ease;
		pointer-events: none;
		z-index: 10;
	}

	&__selected,
	&__option {
		cursor: pointer;
	}

	&__selected {
		position: relative;
		padding-right: 17px;
	}

	&__selected::after {
		content: '';
		background-image: url("/arrow-down.svg");
		background-position: center;
		background-repeat: no-repeat;
		width: 1.2rem;
		height: 1.2rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		transition: .3s ease;
		right: 0;
	}

	&__option {}

	&__option:hover {
		background-color: #F6F9FF;
	}

	&__radio {
		display: none;
	}

	&__label {
		cursor: pointer;
	}
}

.select__options-container.active {
	pointer-events: all;
	max-height: 8rem;
	opacity: 1;
}

.select__options-container.active+.select__selected::after {
	top: 6px;
	transform: rotateX(180deg);
}

.list {
	padding: 10rem 0;

	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 3rem;
	}

	&__title {
		padding-left: 4rem;
		font-size: 2.4rem;
		font-weight: 700;
		color: var(--color-primary);
		font-family: 'Montserrat', sans-serif;
	}

	&__add-btn {
		padding: 1rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		outline: none;
		background-color: #D6DBEB;
		border-radius: 50%;
		transition: background-color .3s ease;
		cursor: pointer;
	}

	&__add-btn:hover {
		background-color: darken(#D6DBEB, 5);
	}

	&__add-btn:active {
		background-color: darken(#D6DBEB, 3);
	}

	&__utils {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 4px;
	}

	&__tasks {
		color: var(--color-primary);
		font-size: 1.4rem;
	}
}

.utils {
	&__search {
		padding-left: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__filter {
		font-family: inherit;
		font-size: 1.4rem;
		width: 25rem;
		padding: 1rem 1.6rem;
		border: none;
		outline: none;
		color: var(--color-primary);
	}

	&__filter::placeholder {
		color: #c4c4c4;
	}

	&__sort-container {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
	}

	&__sort-subtitle {
		margin-right: 1.5rem;
	}

	&__sort {}
}

.tasks {

	&__top {
		padding: 1.8rem 0;
		display: grid;
		grid-template-columns: 10rem auto 15rem 13rem;
		border-bottom: 1px solid #EEEBE9;
	}

	&__description {
		position: relative;
		padding-left: 2rem;
	}

	&__description:first-child {
		grid-column: 2/3;
	}

	&__description::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 1px;
		height: 3.2rem;
		background-color: #c4c4c4;
	}
}

.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.35s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}

.list-leave-active {
	position: absolute;
}
</style>
