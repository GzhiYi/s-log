<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>
<Nav {segment}/>
<div style="width: 100%;height: 56px;background-color: #DEE2E8;"></div>
<main style="padding: 1rem">
	<slot></slot>
</main>
<style>
main {
	background-color: #DEE2E8;
}
</style>