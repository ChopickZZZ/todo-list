<script setup lang="ts">
import { timestampToDate } from '../helpers'
import { Task } from '../types';

defineProps<{
	task: Task
}>()

const emit = defineEmits<{
	(events: 'toggle', id: string): void
}>()
</script>

<template>
	<li class="tasks__item" @click="emit('toggle', task.id)">
		<div class="tasks__status-mark">
			<svg v-if="task.status === 'progress'" width="20" height="20" viewBox="0 0 20 20" fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="10" cy="10" r="9.5" stroke="#16191D" />
			</svg>
			<svg v-else height="28" width="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_d_13_2211)">
					<circle cx="14" cy="10" r="10" fill="white" />
					<circle cx="14" cy="10" r="9.5" stroke="#134EC1" />
				</g>
				<path d="M10 9L14 14.5L18.5 5" stroke="#134EC1" stroke-linecap="round" stroke-linejoin="round" />
				<defs>
					<filter id="filter0_d_13_2211" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha" />
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix"
							values="0 0 0 0 0.0745098 0 0 0 0 0.305882 0 0 0 0 0.756863 0 0 0 0.15 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2211" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2211" result="shape" />
					</filter>
				</defs>
			</svg>
		</div>
		<p class="tasks__task">{{task.description}}</p>
		<div :class="['tasks__status', {done: task.status === 'done'}]">
			{{task.status === 'done' ? 'Выполнено' : 'В работе'}}
		</div>
		<div class="tasks__date">{{timestampToDate(task.date)}}</div>
	</li>
</template>

<style scoped lang="scss">
.tasks {

	&__item {
		display: grid;
		padding: 1.8rem 0;
		grid-template-columns: 10rem auto 15rem 13rem;
		transition: background-color .3s ease;
		border-bottom: 1px solid #EEEBE9;

		>* {
			padding-left: 2rem;
		}

		&:hover {
			background-color: #F6F9FF;
		}

		cursor: pointer;
	}

	&__status-mark {
		position: relative;
		max-height: 2rem;
		background-color: transparent;
		padding-left: 0;
	}

	&__status-mark svg {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	&__status {
		color: var(--color-blue);
	}
}

.tasks__status.done {
	color: var(--color-orange);
}
</style>