<script>
    import { arabicBismillahUthmani } from '../quran/bismillah';
    import { toArabicNumerals } from '../utils/arabic';
    //import Sajda from './IconSajda.svelte';

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
        {#if hero && meta.position !== 9}
        <div dir="rtl" class="bismillah">{arabicBismillahUthmani}</div>
        {/if} 
    </header>
    <ol start="{data[0].aya}" style="{olStyle}" dir="rtl">
        {#each sura as aya}
            <li id="{`${aya.sura}:${aya.aya}`}" class="{
                [aya.ruku ? 'ruku' : '', aya.sajda ? 'sajda' : ''].join(' ')
            }"><span class="text">{aya.text}</span>{#if aya.sajda}<span class="icon icon-sajda" title="Sajda">Sajda</span>{/if}<span class="icon icon-aya" aria-hidden="true">{toArabicNumerals(aya.aya)}</span>{#if aya.ruku}<span class="icon icon-ruku" aria-label="Ruku" title="{'Ruku ' + aya.ruku}">{toArabicNumerals(aya.ruku)}</span>{/if}</li>
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
        font-size: 150%;
        word-spacing: 0.5rem;
    }

    li {
        display: inline;
        border-bottom: 1px dotted #e5bea1;
        position: relative;
        padding-left: 0.5em;
    }

    li.sajda {
        color: red;
    }

    .text + .icon {
        margin-right: 0.5em;
    }

    .icon {
        font-family: sans-serif;
        font-size: 1rem;
        letter-spacing: -0.1rem;
        display: inline-block;
        vertical-align: middle;
        line-height: 1.3;
        height: 2.5em;
        width: 2.5em;
        text-align: center;
    }

    .icon-aya {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1250 1625'%3E%3Cg stroke='%235c3219' stroke-width='30'%3E%3Ccircle r='605' cx='633' cy='822' fill='%23e5bea1'/%3E%3Ccircle r='510' cx='633' cy='822' fill='%23f5eed2'/%3E%3Cpath fill='%23e5bea1' d='M625 29.833c-103.84 178.52-196.29 123.51-353.51 236.32-72.27 51.866-146.27 134.606-229.57 148.02 40.92 54.082 105.585 76.11 201.66 30.11h.041c107.37 116.17 142.759-192.06 381.379 10.33 238.62-202.39 274.009 105.84 381.379-10.33h.04c96.076 46 160.741 23.972 201.661-30.11-83.3-13.414-157.3-96.154-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32z'/%3E%3C/g%3E%3Ccircle fill='%235c3219' r='69' cx='620' cy='266'/%3E%3Cpath fill='%235c3219' d='M774.852 255.602a15.002 15.002 0 0 0-4.367 29.16c74.866 27.215 111.261 45.649 161.848 81.652a15.002 15.002 0 1 0 17.394-24.441c-52.253-37.19-92.918-57.752-168.992-85.406a15.002 15.002 0 0 0-5.883-.965zm-309.518 0a15.002 15.002 0 0 1 4.367 29.16c-74.866 27.215-111.261 45.649-161.848 81.652a15.002 15.002 0 1 1-17.394-24.441c52.254-37.19 92.918-57.752 168.992-85.406a15.002 15.002 0 0 1 5.883-.965z'/%3E%3Cpath stroke-width='30' stroke='%235c3219' fill='%23e5bea1' d='M625 1595.167c-103.84-178.52-196.29-123.51-353.51-236.32-72.27-51.866-146.27-134.606-229.57-148.02 40.92-54.082 105.585-76.11 201.66-30.11h.041c107.37-116.17 142.759 192.06 381.379-10.33 238.62 202.39 274.009-105.84 381.379 10.33h.04c96.076-46 160.741-23.972 201.661 30.11-83.3 13.414-157.3 96.154-229.57 148.02-157.22 112.81-249.67 57.8-353.51 236.32z'/%3E%3Ccircle r='69' cx='620' cy='1358' fill='%235c3219'/%3E%3Cpath fill='%235c3219' d='M774.852 1369.398a15.002 15.002 0 0 1-4.367-29.16c74.866-27.215 111.261-45.649 161.848-81.652a15.002 15.002 0 1 1 17.394 24.441c-52.253 37.19-92.918 57.752-168.992 85.406a15.002 15.002 0 0 1-5.883.965zm-309.518 0a15.002 15.002 0 0 0 4.367-29.16c-74.866-27.215-111.261-45.649-161.848-81.652a15.002 15.002 0 1 0-17.394 24.441c52.254 37.19 92.918 57.752 168.992 85.406a15.002 15.002 0 0 0 5.883.965z'/%3E%3C/svg%3E") 50% 50% no-repeat;
        padding: 0.75em 0;
        color: red;
    }

    li.ruku .icon-aya {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1250 1625'%3E%3Cg stroke='%2319435c' stroke-width='30'%3E%3Ccircle r='605' cx='633' cy='822' fill='%23a1c8e5'%3E%3C/circle%3E%3Ccircle r='510' cx='633' cy='822' fill='%23d2d9f5'%3E%3C/circle%3E%3Cpath fill='%23a1c8e5' d='M625 29.833c-103.84 178.52-196.29 123.51-353.51 236.32-72.27 51.866-146.27 134.606-229.57 148.02 40.92 54.082 105.585 76.11 201.66 30.11h.041c107.37 116.17 142.759-192.06 381.379 10.33 238.62-202.39 274.009 105.84 381.379-10.33h.04c96.076 46 160.741 23.972 201.661-30.11-83.3-13.414-157.3-96.154-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32z'%3E%3C/path%3E%3C/g%3E%3Ccircle fill='%2319435c' r='69' cx='620' cy='266'%3E%3C/circle%3E%3Cpath fill='%2319435c' d='M774.852 255.602a15.002 15.002 0 0 0-4.367 29.16c74.866 27.215 111.261 45.649 161.848 81.652a15.002 15.002 0 1 0 17.394-24.441c-52.253-37.19-92.918-57.752-168.992-85.406a15.002 15.002 0 0 0-5.883-.965zm-309.518 0a15.002 15.002 0 0 1 4.367 29.16c-74.866 27.215-111.261 45.649-161.848 81.652a15.002 15.002 0 1 1-17.394-24.441c52.254-37.19 92.918-57.752 168.992-85.406a15.002 15.002 0 0 1 5.883-.965z'%3E%3C/path%3E%3Cpath stroke-width='30' stroke='%2319435c' fill='%23a1c8e5' d='M625 1595.167c-103.84-178.52-196.29-123.51-353.51-236.32-72.27-51.866-146.27-134.606-229.57-148.02 40.92-54.082 105.585-76.11 201.66-30.11h.041c107.37-116.17 142.759 192.06 381.379-10.33 238.62 202.39 274.009-105.84 381.379 10.33h.04c96.076-46 160.741-23.972 201.661 30.11-83.3 13.414-157.3 96.154-229.57 148.02-157.22 112.81-249.67 57.8-353.51 236.32z'%3E%3C/path%3E%3Ccircle r='69' cx='620' cy='1358' fill='%2319435c'%3E%3C/circle%3E%3Cpath fill='%2319435c' d='M774.852 1369.398a15.002 15.002 0 0 1-4.367-29.16c74.866-27.215 111.261-45.649 161.848-81.652a15.002 15.002 0 1 1 17.394 24.441c-52.253 37.19-92.918 57.752-168.992 85.406a15.002 15.002 0 0 1-5.883.965zm-309.518 0a15.002 15.002 0 0 0 4.367-29.16c-74.866-27.215-111.261-45.649-161.848-81.652a15.002 15.002 0 1 0-17.394 24.441c52.254 37.19 92.918 57.752 168.992 85.406a15.002 15.002 0 0 0 5.883.965z'%3E%3C/path%3E%3C/svg%3E");
    }

    .icon-ruku {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1250 1625'%3E%3Cpath fill='%2319435c' d='M1002.612 1402.795L752.454 1567.92q-205.664 0-318.384-16.81-194.788-28.673-300.586-114.696Q0 1328.638 0 1126.929q0-122.608 37.573-220.496 30.652-80.09 88-151.282 27.686-33.618 96.9-101.843-94.922-47.46-131.506-82.068-81.08-76.135-81.08-192.81 0-104.81 88.001-205.664Q198.743 57.08 342.114 57.08q64.27 0 136.45 37.573 48.45 24.72 121.62 82.068-96.9 0-198.744 12.854-131.506 16.81-212.585 48.45-98.877 38.562-98.877 94.922 0 60.315 113.709 114.697 95.91 45.483 217.529 64.27 98.877-53.393 192.81-90.967 104.81-41.528 217.53-69.214l-41.53 154.248q-205.663 80.09-296.63 122.608-183.911 87.012-281.8 177.978-125.573 116.675-125.573 250.16 0 139.416 104.81 219.506 90.966 69.214 267.956 97.888 140.405 22.742 357.935 22.742 46.472 0 92.944-.989l92.944-1.978v8.9z'%3E%3C/path%3E%3C/svg%3E") 0 50% no-repeat;
        padding: 1em 0.5em 0.5em 0.5em;
        color:blue;
    }

    .icon-sajda {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 99 147'%3E%3Cpath fill='%23900' d='M99.229 147.305H0l20.04-22.94v-51.68L0 49.923 49.57 0 99.23 49.922l-20.04 22.764v51.68l20.04 22.939zm-6.856-97.383L49.57 6.855 6.855 49.922l18.457 20.83v55.547L11.25 142.383h76.729l-14.063-16.084V70.752l18.457-20.83zm-9.316 0l-13.184 15.03v70.839H29.355v-70.84l-13.183-15.03L49.57 16.437l33.487 33.486zm-6.416 0l-27.07-27.07-26.983 27.07 11.074 12.305v68.73h31.904v-68.73l11.075-12.305zm-7.823 0l-7.734 8.525v65.39h-22.94v-65.39l-7.734-8.525 19.16-19.6 19.248 19.6zm-4.658 0L49.57 34.98 35.068 49.922l6.504 7.119v63.105h15.996V57.041l6.592-7.12z'%3E%3C/path%3E%3C/svg%3E") 50% 50% no-repeat;
        text-indent: 100vw;
    }

    li :global(svg),
    .text {
        vertical-align: middle;
    }

    li :global(svg) {
        margin-right: 0.25em;
    }
</style>