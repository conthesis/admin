<script>
    import { createEventDispatcher } from 'svelte';
import { each } from 'svelte/internal';
    const dispatch = createEventDispatcher();
    export let tree = []
    export let name = ""
    function openDispatcher(event) {
        dispatch("expand", { name: name == "" || name == null ? event.detail.name : [name].concat(event.detail.name) })
    }
    function dispatchUp() {
        dispatch("expand", { name: [name] })
    }
</script>

<ul>
    {#if name != ""}
    <a role="button" on:click={dispatchUp}>{name}</a>
    {/if}
    {#each tree as {name, children}}
    <li>
        <svelte:self on:expand={openDispatcher} name={name} tree={children} />
    </li>
    {/each}
</ul>