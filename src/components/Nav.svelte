<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
	}

	ul {
		margin: 0;
		padding: 0;
		display: contents;
	}

	li {
		display: block;
	}

	.text {
		padding: 1em 0.5em;	
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
	<div class="text">Conthesis</div>
	<ul>
		<li><a aria-current="{segment === undefined ? true : undefined}" href=".">Home</a></li>
		<li><a aria-current="{segment === "cfs" ? true : undefined}" href="/cfs">Explore files</a></li>
		<li><a aria-current="{segment === "actions" ? true : undefined}" href="/actions">Actions</a></li>
	</ul>
</nav>
