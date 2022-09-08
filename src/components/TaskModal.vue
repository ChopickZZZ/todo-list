<script setup lang="ts">

</script>

<template>
	<div class="modal">
		<div class="modal__backdrop"></div>
		<div class="modal__content">
			<div class="modal__top">
				<h2 class="modal__title">Создать новую задачу</h2>
				<button class="modal__close-btn">
					<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L4 4M7 7L4 4M4 4L7 1M4 4L1 7" stroke="white" stroke-linecap="round" />
					</svg>
				</button>
			</div>
			<div class="modal__input-container">
				<label class="modal__label" for="description">Описание</label>
				<input class="modal__input" placeholder="Введите описание">
			</div>
			<button class="modal__main-btn">Создать</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	z-index: 100;

	&__backdrop {
		width: 100%;
		height: 100vh;
		background-color: rgba(255, 255, 255, 0.01);
		backdrop-filter: blur(2px);
		justify-content: center;
		cursor: pointer;
	}

	&__content {
		width: 40rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border: 1px solid #DDE2E4;
		border-radius: 6px;
		box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
		padding: 4rem 4rem 5rem 4rem;
		z-index: 150;
	}

	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 3.2rem;
	}

	&__title {
		font-family: 'Montserrat';
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	&__close-btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: .7rem;
		border: none;
		outline: none;
		background-color: #314B99;
		border-radius: 5px;
		transition: background-color .3s ease;
		cursor: pointer;
	}

	&__close-btn:hover {
		background-color: darken(#314B99, 5);
	}

	&__input-container {
		margin-bottom: 3rem;
	}

	&__label {
		font-family: 'AGAvantGardeCyr', sans-serif;
		font-size: 1.4rem;
		color: var(--color-primary);
	}

	&__input {
		font-family: 'Vela Sans', sans-serif;
		color: var(--color-primary);
		font-size: 1.4rem;
		width: 100%;
		padding: 1.1rem 1.6rem;
		background-color: #fff;
		border: 1px solid #DDE2E4;
		border-radius: 8px;
		outline: none;
	}

	&__input::placeholder {
		color: rgba(0, 0, 0, 0.5);
	}

	&__main-btn {
		align-self: center;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1.2rem 4rem;
		font-size: 1.8rem;
		color: #314B99;
		background-color: #F0F5FF;
		border: none;
		border-radius: 8px;
		outline: none;
		transition: background-color .3s ease;
		cursor: pointer;
	}

	&__main-btn:hover {
		background-color: darken(#F0F5FF, 5);
	}
}
</style>