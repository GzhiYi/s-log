<script context="module" lang="ts">
	export function preload() {
		return this.fetch(`./blog.json`).then((r: { json: () => any; }) => r.json()).then((posts: { slug: string; title: string, html: any }[]) => {
			return { posts };
		});
	}
</script>

<script lang="ts">
	import config from '../config.js'
	export let posts: {
		title: string,
		description: string,
		keywords: string,
		labels: any,
		date: string,
		path: string,
		slug: string,
		html: string
	}[]
	export const site = config.site
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description}>
	<meta name="keywords" content={site.keywords}>
</svelte:head>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>