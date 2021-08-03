<svelte:head>
	<title>{post.title}-GzhiYi's blog</title>
	<meta name="description" content="{post.description || site.description}">
	<meta name="keywords" content="{post.keywords || site.keywords}">
</svelte:head>

<div class="base">
	<div class="title">{post.title}</div>
	<span class="author">GzhiYi · {post.date}</span>
	{#each post.labels as label}
		<div class="label">{label}</div>
	{/each}
</div>
<div class="content">{@html post.html}</div>

<div class="contact">
	<div>如果你对这页内容有疑问，欢迎联系我！</div>
	<a target="_blank" href="mailto:zhiyi.gong@outlook.com?subject=【重要】{post.title}&body=gzhiyi.top/blog/{post.slug}">
		邮箱
	</a>
	<br>
	<a target="_blank" href="https://github.com/gzhiyi">
		github
	</a>
</div>

<script context="module" lang="ts">
	export async function preload({ params }) {
		const res = await this.fetch(`blog/${params.slug}.json`)
		const data = await res.json()
		if (res.status === 200) {
			return { post: data }
		} else {
			this.error(res.status, data.message)
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import config from '../../config'

	let zoom = null

	onMount(() => {
		try {
			import('../../../static/medium-zoom.esm.js').then(mediumZoom => {
				zoom = mediumZoom.default('[data-zoomable]')
			})
		} catch (error) {
			console.log('import zoom error', error)
		}
	})
	export let post: {
		title: string,
		description: string,
		keywords: string,
		labels: any,
		date: string,
		path: string,
		slug: string,
		html: string
	}
	export const site = config.site
</script>

<style>
.base {
	background-color: #DEE2E8;
	text-align: center;
	margin-bottom: 20px;
}
.title {
	font-size: 48px;
	font-weight: 500;
	padding: 80px 0 20px;
}
.author {
	font-size: 18px;
	font-weight: 400;
}
.content {
	overflow: hidden;
	color: #3C3C3C;
	margin: 0 auto;
	max-width: 1000px;
}
.contact {
	text-align: center;
	padding: 100px;
	line-height: 40px;
}

:global(pre) {
	padding: 20px;
	border-radius: 8px;
	background-color: #f8fdf3;
}
:global(code) {
	background-color: #f8fdf3;
	margin: 0 4px;
}
:global(blockquote) {
	background: #DEE2E8;
	padding: 10px;
	margin: 0 0 0 20px;
	border-radius: 16px;
	border-left: 4px solid #a5a5a5;
}
</style>