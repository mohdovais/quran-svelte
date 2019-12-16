<script>
    import { onMount, afterUpdate } from 'svelte';
    import resizeSelect from '../utils/resize-select.js';
    export let store;

    let showDropdown = false;
    let selectPaging;
    let selectPage;

    function nextHandler() {
        const { pagingIndex, pagingTotal } = $store;
        store.gotoPage({
            pagingIndex: (pagingIndex + 1) % pagingTotal || 1
        });
    }

    function prevHandler() {
        const { pagingIndex, pagingTotal } = $store;
        store.gotoPage({
            pagingIndex: (pagingTotal + pagingIndex - 1) % pagingTotal ||
                (pagingTotal - 1)
        });
    }

    function selectPageHandler(event) {
        store.gotoPage({
            pagingIndex: parseInt(event.target.value, 10)
        });
        resizeSelect(event.target)
    }

    function selectPagingHandler(event) {
        store.gotoPage({
            pagingType: event.target.value
        });
        resizeSelect(event.target)
    }

    function resizeSelects() {
        resizeSelect(selectPaging);
        resizeSelect(selectPage);
    }

    onMount(resizeSelects);
    afterUpdate(resizeSelects);

</script>

<nav>
    <button type="button" on:click="{nextHandler}">
        <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true">
            <path d="M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z" fill="#0151a9"></path>
        </svg>
        <span>&nbsp;Next</span>
    </button>
    <div>
        <select aria-label="Select paging type" on:change="{selectPagingHandler}" bind:this="{selectPaging}"
            value="{$store.pagingType}">
            <option value="page">Page</option>
            <option value="sura">Sura</option>
        </select>
        <select aria-label="Select page" on:change="{selectPageHandler}" bind:this="{selectPage}"
            value="{$store.pagingIndex}">
            {#each $store.pagingMeta as option, index }
                <option value={index + 1}>{option}</option>
            {/each}
        </select>
    </div>
    <button type="button" on:click="{prevHandler}">
        <span>Previous&nbsp;</span>
        <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true">
            <path d="M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z" fill="#0151a9"></path>
        </svg>
    </button>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 2px;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        border: none;
        cursor: pointer;
        color: #0151a9;
        padding: 0.3rem 0.5rem;
        font-size: 1em;
        line-height: 1.5;
        display: inline-flex;
        align-items: center;
        border-radius: 2px;

    }

    button:focus,
    button:active {
        box-shadow: 0 0 0 1px #0151a9;
        outline: none;
    }

    select:hover,
    button:hover {
        background-color: rgba(0,0,0, 0.2);
    }

    button * {
        pointer-events: none;
    }

    select {
        font-size: 16px;
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        color: #0151a9;
        padding: 0 15px 0 0;
        margin: 5px 0;
        cursor: pointer;
        background: transparent url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2012%2020%22%3E%3Cg%20fill%3D%22%230151a9%22%3E%3Cpath%20d%3D%22m%2012%2C6%20-1.2%2C1.2%20-4.8%2C-4.8%20-4.8%2C4.8%20L%20-1.95e-7%2C6%206%2C0%2012%2C6%20Z%22%20/%3E%3Cpath%20d%3D%22m%2012%2C14%20-1.2%2C-1.2%20-4.8%2C4.8%20-4.8%2C-4.8%20-1.2%2C1.2%206%2C6%20L%2012%2C14%20Z%22%20/%3E%3C/g%3E%3C/svg%3E") no-repeat 100% 50%
    }

    select::-ms-expand {
        display: none
    }
</style>