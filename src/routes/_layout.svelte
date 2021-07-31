<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>
<Nav {segment}/>
<main>
	<slot></slot>
</main>
<style>
main {
	background-color: #DEE2E8;
}
</style>