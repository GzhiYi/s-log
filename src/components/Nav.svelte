<script lang="ts">
	export let segment: string;
</script>

<style>
	nav {
		font-weight: 300;
		padding: 0 1em;
		position: fixed;
    top: 0;
    background-color: #ffffffbd;
    width: 100%;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">文章列表</a></li>
	</ul>
</nav>
