<script lang="ts">
	import type { WebLesson, TypingLesson } from '$lib/types';

	interface Props {
		lessons: WebLesson[] | TypingLesson[];
		baseURL: string;
		oncompleted?: (id: string) => void;
	}

	let { lessons, baseURL, oncompleted }: Props = $props();

	function slugify(name: string): string {
		return name.toLowerCase().split(' ').join('_');
	}
</script>

<div class="lesson-table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Done</th>
				<th>Lesson Name</th>
				<th>Difficulty</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each lessons as lesson}
				<tr class:completed={lesson.hasCompleted}>
					<td class="col-done">
						{#if lesson.hasCompleted}
							<span class="check">✓</span>
						{/if}
					</td>
					<td class="col-title">{lesson.title}</td>
					<td class="col-difficulty">{lesson.difficulty}</td>
					<td class="col-action">
						<a class="btn-start" href={`/${baseURL}/${slugify(lesson.title)}`}>
							Start Lesson
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.lesson-table-wrapper {
		max-height: 75vh;
		overflow-y: auto;
		border: 1px solid var(--color-grey-light);
		border-radius: 4px;
		background: var(--color-white);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	th {
		background: var(--color-grey-lighter);
		padding: 0.6rem var(--padding);
		text-align: left;
		font-weight: 600;
		font-size: var(--size-7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-dark);
	}

	td {
		padding: 0.6rem var(--padding);
		border-bottom: 1px solid var(--color-grey-lighter);
		vertical-align: middle;
	}

	tr:last-child td {
		border-bottom: none;
	}

	tr:nth-child(even) td {
		background: #fafaf8;
	}

	tr:hover td {
		background: #f0f0ea;
	}

	tr.completed td {
		background: #edf7ed;
		color: var(--color-dark);
	}

	tr.completed:hover td {
		background: #e3f2e3;
	}

	.col-done {
		width: 5%;
		text-align: center;
	}

	.col-title {
		width: 60%;
	}

	.col-difficulty {
		width: 20%;
		text-transform: capitalize;
		font-size: var(--size-7);
		color: var(--color-grey-dark);
	}

	.col-action {
		width: 15%;
	}

	.check {
		color: #3a9a3a;
		font-weight: bold;
		font-size: 1rem;
	}

	.btn-start {
		display: inline-block;
		padding: 0.25rem 0.6rem;
		background: var(--color-blue);
		color: var(--color-white);
		text-decoration: none;
		border-radius: 3px;
		font-size: var(--size-7);
		transition: background 0.2s ease;
		white-space: nowrap;
	}

	.btn-start:hover {
		background: #2787b3;
	}
</style>
