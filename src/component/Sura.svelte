<script>
    import { arabicBismillahUthmani, arabicBismillah } from '../quran/bismillah';
    import Ruku from './IconRuku.svelte';
    import Sajda from './IconSajda.svelte';

    export let data = [];
    export let meta = {};


    $: sura = meta.position === 1 ? data.slice(1) : data;
    $: olStyle = data.length > 0 ? `counter-reset: section ${data[0].aya - 1}` : undefined;
    $: hero = data.length > 0 && data[0].aya === 1;
</script>

<article>
    <header class={hero && "hero" }>
        <img src="assets/sura-title/{meta.position}.svg" alt={meta.name} class="sura-title" loading="lazy" height="125">
        <div class="meta">
            <span>{meta.tname}</span>
            <span>{meta.ename}</span>
            <span>{meta.type}</span>
        </div>
        {#if hero}
        <div dir="rtl" class="bismillah">{arabicBismillahUthmani}</div>
        {/if} 
    </header>
    <ol start="{data[0].aya}" style="{olStyle}" dir="rtl">
        {#each sura as aya}
            <li id="{`${aya.sura}:${aya.aya}`}" class="{
                [aya.ruku ? 'ruku' : '', aya.sajda ? 'sajda' : ''].join(' ')
            }">
                <span class="text">{aya.text}</span>{#if aya.sajda}<Sajda />{/if}{#if aya.ruku}<Ruku text="{aya.ruku}" />{/if}</li>
        {/each}
    </ol>
</article>

<style>
    article {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    header {
        margin-bottom: 1rem;
    }

    header.hero{
        text-align: center;
    }

    header:not(.hero){
        display: flex;
        border-bottom: 1px dotted green;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;
    }

    .sura-title{
        height: 3rem;
        width: auto;
        max-width: 100%;
        border: 0.3rem solid transparent;
        transition: all 0.3s ease-in-out;
    }

    .hero .sura-title{
        height: 6rem;
        background:gold;
        border-radius: 1rem;
        border-color:gold;
        padding: 0 2rem;
    }

    .meta {
        color: #5c3219;
    }

    .meta span + span {
        display: block;
    }

    .hero .meta span + span {
        display: inline;
    }

    .hero .meta span + span::before {
        content: ' | ';
    }

    @media screen and (min-width: 376px) {
        .meta span + span {
            display: inline;
        }
        .meta span + span::before {
            content: ' | ';
        }
    }

    .bismillah {
        color: #ba8156;
        font-size: 1.5rem;
    }

    ol {
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 1.5rem;
        word-spacing: 0.5rem;
    }

    li {
        display: inline;
        border-bottom: 1px dotted #e5bea1;
        position: relative;
    }

    li.sajda {
        color: red;
    }

    li:focus{
        background-color: gold;
        outline: none;
    }

    li::after {
        counter-increment: section;
        content: counter(section);
        content: counter(section, arabic-indic);
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        letter-spacing: -0.1rem;
        padding: 0.6rem 1.1rem 0.4rem 0.9rem;
        font-size: 1rem;
        vertical-align: middle;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1250 1625'%3E%3Cg stroke='%235c3219' stroke-width='30'%3E%3Ccircle r='605' cx='633' cy='822' fill='%23e5bea1'/%3E%3Ccircle r='510' cx='633' cy='822' fill='%23f5eed2'/%3E%3Cpath fill='%23e5bea1' d='M625 29.833c-103.84 178.52-196.29 123.51-353.51 236.32-72.27 51.866-146.27 134.606-229.57 148.02 40.92 54.082 105.585 76.11 201.66 30.11h.041c107.37 116.17 142.759-192.06 381.379 10.33 238.62-202.39 274.009 105.84 381.379-10.33h.04c96.076 46 160.741 23.972 201.661-30.11-83.3-13.414-157.3-96.154-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32z'/%3E%3C/g%3E%3Ccircle fill='%235c3219' r='69' cx='620' cy='266'/%3E%3Cpath fill='%235c3219' d='M774.852 255.602a15.002 15.002 0 0 0-4.367 29.16c74.866 27.215 111.261 45.649 161.848 81.652a15.002 15.002 0 1 0 17.394-24.441c-52.253-37.19-92.918-57.752-168.992-85.406a15.002 15.002 0 0 0-5.883-.965zm-309.518 0a15.002 15.002 0 0 1 4.367 29.16c-74.866 27.215-111.261 45.649-161.848 81.652a15.002 15.002 0 1 1-17.394-24.441c52.254-37.19 92.918-57.752 168.992-85.406a15.002 15.002 0 0 1 5.883-.965z'/%3E%3Cpath stroke-width='30' stroke='%235c3219' fill='%23e5bea1' d='M625 1595.167c-103.84-178.52-196.29-123.51-353.51-236.32-72.27-51.866-146.27-134.606-229.57-148.02 40.92-54.082 105.585-76.11 201.66-30.11h.041c107.37-116.17 142.759 192.06 381.379-10.33 238.62 202.39 274.009-105.84 381.379 10.33h.04c96.076-46 160.741-23.972 201.661 30.11-83.3 13.414-157.3 96.154-229.57 148.02-157.22 112.81-249.67 57.8-353.51 236.32z'/%3E%3Ccircle r='69' cx='620' cy='1358' fill='%235c3219'/%3E%3Cpath fill='%235c3219' d='M774.852 1369.398a15.002 15.002 0 0 1-4.367-29.16c74.866-27.215 111.261-45.649 161.848-81.652a15.002 15.002 0 1 1 17.394 24.441c-52.253 37.19-92.918 57.752-168.992 85.406a15.002 15.002 0 0 1-5.883.965zm-309.518 0a15.002 15.002 0 0 0 4.367-29.16c-74.866-27.215-111.261-45.649-161.848-81.652a15.002 15.002 0 1 0-17.394 24.441c52.254 37.19 92.918 57.752 168.992 85.406a15.002 15.002 0 0 0 5.883.965z'/%3E%3C/svg%3E") 50% 50% no-repeat;
    }

    li :global(svg),
    .text {
        vertical-align: middle;
    }
</style>