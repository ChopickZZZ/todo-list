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
	if (description) {
		isModalOpen.value = false
		taskStore.addTask(description)
	}
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
					<svg>
						<use xlink:href="/sprite.svg#icon-Plus"></use>
					</svg>
				</button>
			</div>
			<Teleport to="body">
				<TaskModal v-if="isModalOpen" @close="isModalOpen = false" @create="createTask" :active="isModalOpen" />
			</Teleport>
			<div class="list__utils utiils">
				<div class="utils__search">
					<span class="utils__icon">
						<svg>
							<use xlink:href="/sprite.svg#icon-search"></use>
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
							<div class="select__selected" @click="isSelectActive = !isSelectActive"
								v-click-outside="() => (isSelectActive = false)">
								{{selectTextBase[sortQuery]}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class=" list__tasks tasks">
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
		top: 25px;
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

	&__option {
		padding: .5rem .75rem;
	}

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

	&__add-btn svg {
		width: 2rem;
		height: 2rem;
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

	&__icon svg {
		width: 1.8rem;
		height: 1.8rem;
	}
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
