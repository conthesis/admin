<script context="module">
	export async function preload(page, session) {
        const data = (await (await this.fetch(`/cfsList.json?path=/`)).json())
        const fsTree = (data.contents || []).map(name => ({ name, children: []}))
        return {fsTree}
    }
    function insertSubtree(tree, path, data) {
        console.log(data)
        if(path.length === 0) {
            for (let d of data) {
                tree.push(d)
            }
            return
        }
        for(let node of tree) {
            console.log(node)
            const {name, children} = node
            if (name == path[0]) {
                insertSubtree(children, path.slice(1), data)
                return
            }
        }
        const newEnt = {name: path[0], children: []}
        tree.push(newEnt)
        insertSubtree(newEnt, path.slice(1), data)
    }
    
    
</script>

<script>
    import TreeView from "../components/TreeView.svelte"
    import { children } from "svelte/internal";
    let cfsPath = "";
    let data = "";
    
    async function read() {
        const res = await this.fetch(`/cfsGet.json?path=${cfsPath}`)
        data = (await res.json()).data

    }
    async function list(name) {
        return await (await fetch(`/cfsList.json?path=${name}`)).json()
    }

    async function ls() {
        const res = await fetch(`/cfsList.json?path=${cfsPath}`)
        data = JSON.stringify(await res.json())
    }
    export let fsTree = []

    async function expandTree({detail: {name}}) {
        const path = name.join("/")
        const res = ((await list("/" + path)).contents ?? []).map(name => ({ name, children: []}))
        console.log(fsTree, name, res)
        insertSubtree(fsTree, name, res)
        fsTree = fsTree
    }
</script>

<div>
    <TreeView on:expand={expandTree} tree={fsTree} />
</div>


<input bind:value="{cfsPath}" name="path" />
<input type="button" value="Read" on:click="{read}" />
<input type="button" value="List" on:click="{ls}" />

<div>{data}</div>

