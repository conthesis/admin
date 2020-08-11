<script>
    let cfsPath = "";
    let data = "";
    
    async function read() {
        const res = await fetch(`/cfs.json?path=${cfsPath}`)
        data = (await res.json()).data
    }
</script>



<input bind:value="{cfsPath}" name="path" />
<input type="button" value="Read" on:click="{read}" />

<div>{data}</div>

