<script>
    import Nav from "./Nav.svelte";
    import Sura from './Sura.svelte';
    export let store;
</script>

<section>
    <header class="topbar">
        <Nav store={store} />
    </header>
    <main role="main">
        {#each $store.page as sura}
            <Sura {...sura} />
        {/each}
    </main>
    {#if $store.page.length > 0}
    <footer>
        <Nav store={store} />
    </footer>
    {/if}
</section>

<style>
    section{
        padding-top: 50px;
    }
    .topbar {
        background: gold;
        border-bottom: 1px solid goldenrod;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
</style>