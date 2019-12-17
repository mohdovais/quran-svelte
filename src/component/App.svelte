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
</section>

<style>
    main {
        padding: 0 0 75px 0;
        padding-bottom: calc(75px + env(safe-area-inset-bottom));
    }
    .topbar {
        background: gold;
        border-top: 1px solid goldenrod;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    @media (min-width: 1025px){
        main {
            padding: 50px 0 0 0;
            padding-top: calc(50px + env(safe-area-inset-top))
        }

        .topbar {
            border-top: none;
            border-bottom: 1px solid goldenrod;
            top: 0;
            bottom: auto;
        }
    }
</style>