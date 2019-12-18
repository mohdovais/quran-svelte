
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            $$.fragment && $$.fragment.p($$.ctx, $$.dirty);
            $$.dirty = [-1];
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    function getSelectWidth(node, text) {
        var doc = document;
        var body = doc.body;
        var select = node.cloneNode();
        var option = doc.createElement('option');
        var width;

        option.text = text;
        select.add(option, null);
        select.style.opacity = 0;
        select.style.width = 'auto';
        body.appendChild(select);
        width = select.scrollWidth;
        body.removeChild(select);

        return width;
    }

    function resizeSelect(select) {
        var selected = select && select.options[select.selectedIndex];
        if (selected) {
            select.style.width = getSelectWidth(select, selected.innerText) + 'px';
        }
    }

    /* src/component/Nav.svelte generated by Svelte v3.16.4 */
    const file = "src/component/Nav.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    // (63:12) {#each $store.pagingMeta as option, index }
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*option*/ ctx[11] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*index*/ ctx[13] + 1;
    			option.value = option.__value;
    			add_location(option, file, 63, 16, 1886);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$store*/ 8 && t_value !== (t_value = /*option*/ ctx[11] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(63:12) {#each $store.pagingMeta as option, index }",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let nav;
    	let button0;
    	let svg0;
    	let path0;
    	let t0;
    	let span0;
    	let t2;
    	let div;
    	let select0;
    	let option0;
    	let option1;
    	let select0_value_value;
    	let t5;
    	let select1;
    	let select1_value_value;
    	let t6;
    	let button1;
    	let span1;
    	let t8;
    	let svg1;
    	let path1;
    	let dispose;
    	let each_value = /*$store*/ ctx[3].pagingMeta;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = " Next";
    			t2 = space();
    			div = element("div");
    			select0 = element("select");
    			option0 = element("option");
    			option0.textContent = "Page";
    			option1 = element("option");
    			option1.textContent = "Sura";
    			t5 = space();
    			select1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			button1 = element("button");
    			span1 = element("span");
    			span1.textContent = "Previous ";
    			t8 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z");
    			attr_dev(path0, "fill", "#0151a9");
    			attr_dev(path0, "class", "svelte-1lfsvku");
    			add_location(path0, file, 50, 12, 1273);
    			attr_dev(svg0, "width", "12");
    			attr_dev(svg0, "height", "20");
    			attr_dev(svg0, "viewBox", "0 0 12 20");
    			attr_dev(svg0, "aria-hidden", "true");
    			attr_dev(svg0, "class", "svelte-1lfsvku");
    			add_location(svg0, file, 49, 8, 1193);
    			attr_dev(span0, "class", "svelte-1lfsvku");
    			add_location(span0, file, 52, 8, 1364);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "svelte-1lfsvku");
    			add_location(button0, file, 48, 4, 1137);
    			option0.__value = "page";
    			option0.value = option0.__value;
    			add_location(option0, file, 57, 12, 1574);
    			option1.__value = "sura";
    			option1.value = option1.__value;
    			add_location(option1, file, 58, 12, 1621);
    			attr_dev(select0, "aria-label", "Select paging type");
    			attr_dev(select0, "class", "svelte-1lfsvku");
    			add_location(select0, file, 55, 8, 1420);
    			attr_dev(select1, "aria-label", "Select page");
    			attr_dev(select1, "class", "svelte-1lfsvku");
    			add_location(select1, file, 60, 8, 1682);
    			add_location(div, file, 54, 4, 1406);
    			attr_dev(span1, "class", "svelte-1lfsvku");
    			add_location(span1, file, 68, 8, 2039);
    			attr_dev(path1, "d", "M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z");
    			attr_dev(path1, "fill", "#0151a9");
    			attr_dev(path1, "class", "svelte-1lfsvku");
    			add_location(path1, file, 70, 12, 2155);
    			attr_dev(svg1, "width", "12");
    			attr_dev(svg1, "height", "20");
    			attr_dev(svg1, "viewBox", "0 0 12 20");
    			attr_dev(svg1, "aria-hidden", "true");
    			attr_dev(svg1, "class", "svelte-1lfsvku");
    			add_location(svg1, file, 69, 8, 2075);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "svelte-1lfsvku");
    			add_location(button1, file, 67, 4, 1983);
    			attr_dev(nav, "class", "svelte-1lfsvku");
    			add_location(nav, file, 47, 0, 1127);

    			dispose = [
    				listen_dev(button0, "click", /*nextHandler*/ ctx[4], false, false, false),
    				listen_dev(select0, "change", /*selectPagingHandler*/ ctx[7], false, false, false),
    				listen_dev(select1, "change", /*selectPageHandler*/ ctx[6], false, false, false),
    				listen_dev(button1, "click", /*prevHandler*/ ctx[5], false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(button0, t0);
    			append_dev(button0, span0);
    			append_dev(nav, t2);
    			append_dev(nav, div);
    			append_dev(div, select0);
    			append_dev(select0, option0);
    			append_dev(select0, option1);
    			select0_value_value = /*$store*/ ctx[3].pagingType;

    			for (var i = 0; i < select0.options.length; i += 1) {
    				var option = select0.options[i];

    				if (option.__value === select0_value_value) {
    					option.selected = true;
    					break;
    				}
    			}

    			/*select0_binding*/ ctx[9](select0);
    			append_dev(div, t5);
    			append_dev(div, select1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select1, null);
    			}

    			select1_value_value = /*$store*/ ctx[3].pagingIndex;

    			for (var i_1 = 0; i_1 < select1.options.length; i_1 += 1) {
    				var option_1 = select1.options[i_1];

    				if (option_1.__value === select1_value_value) {
    					option_1.selected = true;
    					break;
    				}
    			}

    			/*select1_binding*/ ctx[10](select1);
    			append_dev(nav, t6);
    			append_dev(nav, button1);
    			append_dev(button1, span1);
    			append_dev(button1, t8);
    			append_dev(button1, svg1);
    			append_dev(svg1, path1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$store*/ 8 && select0_value_value !== (select0_value_value = /*$store*/ ctx[3].pagingType)) {
    				for (var i = 0; i < select0.options.length; i += 1) {
    					var option = select0.options[i];

    					if (option.__value === select0_value_value) {
    						option.selected = true;
    						break;
    					}
    				}
    			}

    			if (dirty[0] & /*$store*/ 8) {
    				each_value = /*$store*/ ctx[3].pagingMeta;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty[0] & /*$store*/ 8 && select1_value_value !== (select1_value_value = /*$store*/ ctx[3].pagingIndex)) {
    				for (var i_1 = 0; i_1 < select1.options.length; i_1 += 1) {
    					var option_1 = select1.options[i_1];

    					if (option_1.__value === select1_value_value) {
    						option_1.selected = true;
    						break;
    					}
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			/*select0_binding*/ ctx[9](null);
    			destroy_each(each_blocks, detaching);
    			/*select1_binding*/ ctx[10](null);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $store,
    		$$unsubscribe_store = noop,
    		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(3, $store = $$value)), store);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
    	let { store } = $$props;
    	validate_store(store, "store");
    	$$subscribe_store();
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
    			pagingIndex: (pagingTotal + pagingIndex - 1) % pagingTotal || pagingTotal - 1
    		});
    	}

    	function selectPageHandler(event) {
    		store.gotoPage({
    			pagingIndex: parseInt(event.target.value, 10)
    		});

    		resizeSelect(event.target);
    	}

    	function selectPagingHandler(event) {
    		store.gotoPage({ pagingType: event.target.value });
    		resizeSelect(event.target);
    	}

    	function resizeSelects() {
    		resizeSelect(selectPaging);
    		resizeSelect(selectPage);
    	}

    	onMount(resizeSelects);
    	afterUpdate(resizeSelects);
    	const writable_props = ["store"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	function select0_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(1, selectPaging = $$value);
    		});
    	}

    	function select1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(2, selectPage = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    	};

    	$$self.$capture_state = () => {
    		return { store, selectPaging, selectPage, $store };
    	};

    	$$self.$inject_state = $$props => {
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    		if ("selectPaging" in $$props) $$invalidate(1, selectPaging = $$props.selectPaging);
    		if ("selectPage" in $$props) $$invalidate(2, selectPage = $$props.selectPage);
    		if ("$store" in $$props) store.set($store = $$props.$store);
    	};

    	return [
    		store,
    		selectPaging,
    		selectPage,
    		$store,
    		nextHandler,
    		prevHandler,
    		selectPageHandler,
    		selectPagingHandler,
    		resizeSelects,
    		select0_binding,
    		select1_binding
    	];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { store: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*store*/ ctx[0] === undefined && !("store" in props)) {
    			console.warn("<Nav> was created without expected prop 'store'");
    		}
    	}

    	get store() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set store(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function charCodesAt(str) {
        return String(str).split('').map(function (char) {
            return char.charCodeAt()
        }).join(',')
    }

    function fromCharCodes(str) {
        return String(str).split(',').map(function (code) {
            return String.fromCharCode(code)
        }).join('')
    }

    const bismillahCharCodes =
      "1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616";

    const bismillahCharCodesUthmani =
      "1576,1616,1587,1618,1605,1616,32,1649,1604,1604,1617,1614,1607,1616,32,1649,1604,1585,1617,1614,1581,1618,1605,1614,1648,1606,1616,32,1649,1604,1585,1617,1614,1581,1616,1610,1605,1616";

    const bismillahRegExp = new RegExp(bismillahCharCodesUthmani, "g");

    function removeBismillah(str) {
      const charCodes = charCodesAt(str).replace(bismillahRegExp, "");
      return charCodes.length === 0 ? '' : fromCharCodes(charCodes);
    }

    const arabicBismillah = (function() {
      return fromCharCodes(bismillahCharCodes);
    })();

    const arabicBismillahUthmani = (function() {
      return fromCharCodes(bismillahCharCodesUthmani);
    })();

    // "٠١٢٣٤٥٦٧٨٩"
    const arabicNumerals =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";

    const toArabicNumerals = num => String(num).replace(/\d/g, i => arabicNumerals[i]);

    /* src/component/Sura.svelte generated by Svelte v3.16.4 */
    const file$1 = "src/component/Sura.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (22:8) {#if hero && meta.position !== 9}
    function create_if_block_2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = `${arabicBismillahUthmani}`;
    			attr_dev(div, "dir", "rtl");
    			attr_dev(div, "class", "bismillah svelte-1u0xid8");
    			add_location(div, file$1, 22, 8, 816);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(22:8) {#if hero && meta.position !== 9}",
    		ctx
    	});

    	return block;
    }

    // (30:51) {#if aya.sajda}
    function create_if_block_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Sajda";
    			attr_dev(span, "class", "icon-sajda svelte-1u0xid8");
    			attr_dev(span, "title", "Sajda");
    			add_location(span, file$1, 29, 66, 1196);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(30:51) {#if aya.sajda}",
    		ctx
    	});

    	return block;
    }

    // (30:166) {#if aya.ruku}
    function create_if_block(ctx) {
    	let span;
    	let t_value = toArabicNumerals(/*aya*/ ctx[5].ruku) + "";
    	let t;
    	let span_title_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "icon-ruku svelte-1u0xid8");
    			attr_dev(span, "aria-label", "Ruku");
    			attr_dev(span, "title", span_title_value = "Ruku " + /*aya*/ ctx[5].ruku);
    			add_location(span, file$1, 29, 180, 1310);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*sura*/ 4 && t_value !== (t_value = toArabicNumerals(/*aya*/ ctx[5].ruku) + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*sura*/ 4 && span_title_value !== (span_title_value = "Ruku " + /*aya*/ ctx[5].ruku)) {
    				attr_dev(span, "title", span_title_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(30:166) {#if aya.ruku}",
    		ctx
    	});

    	return block;
    }

    // (27:8) {#each sura as aya}
    function create_each_block$1(ctx) {
    	let li;
    	let span0;
    	let t_value = /*aya*/ ctx[5].text + "";
    	let t;
    	let span1;
    	let li_id_value;
    	let li_class_value;
    	let if_block0 = /*aya*/ ctx[5].sajda && create_if_block_1(ctx);
    	let if_block1 = /*aya*/ ctx[5].ruku && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			span0 = element("span");
    			t = text(t_value);
    			if (if_block0) if_block0.c();
    			span1 = element("span");
    			if (if_block1) if_block1.c();
    			attr_dev(span0, "class", "text svelte-1u0xid8");
    			add_location(span0, file$1, 29, 15, 1145);
    			attr_dev(span1, "class", "icon-aya svelte-1u0xid8");
    			attr_dev(span1, "aria-hidden", "true");
    			add_location(span1, file$1, 29, 122, 1252);
    			attr_dev(li, "id", li_id_value = `${/*aya*/ ctx[5].sura}:${/*aya*/ ctx[5].aya}`);
    			attr_dev(li, "class", li_class_value = "" + (null_to_empty([/*aya*/ ctx[5].ruku ? "ruku" : "", /*aya*/ ctx[5].sajda ? "sajda" : ""].join(" ")) + " svelte-1u0xid8"));
    			add_location(li, file$1, 27, 12, 1008);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, span0);
    			append_dev(span0, t);
    			if (if_block0) if_block0.m(li, null);
    			append_dev(li, span1);
    			if (if_block1) if_block1.m(li, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*sura*/ 4 && t_value !== (t_value = /*aya*/ ctx[5].text + "")) set_data_dev(t, t_value);

    			if (/*aya*/ ctx[5].sajda) {
    				if (!if_block0) {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(li, span1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*aya*/ ctx[5].ruku) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(li, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty[0] & /*sura*/ 4 && li_id_value !== (li_id_value = `${/*aya*/ ctx[5].sura}:${/*aya*/ ctx[5].aya}`)) {
    				attr_dev(li, "id", li_id_value);
    			}

    			if (dirty[0] & /*sura*/ 4 && li_class_value !== (li_class_value = "" + (null_to_empty([/*aya*/ ctx[5].ruku ? "ruku" : "", /*aya*/ ctx[5].sajda ? "sajda" : ""].join(" ")) + " svelte-1u0xid8"))) {
    				attr_dev(li, "class", li_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(27:8) {#each sura as aya}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let article;
    	let header;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div;
    	let span0;
    	let t1_value = /*meta*/ ctx[1].tname + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = /*meta*/ ctx[1].ename + "";
    	let t3;
    	let t4;
    	let span2;
    	let t5_value = /*meta*/ ctx[1].type + "";
    	let t5;
    	let t6;
    	let header_class_value;
    	let t7;
    	let ol;
    	let ol_start_value;
    	let if_block = /*hero*/ ctx[4] && /*meta*/ ctx[1].position !== 9 && create_if_block_2(ctx);
    	let each_value = /*sura*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article = element("article");
    			header = element("header");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			span2 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			if (if_block) if_block.c();
    			t7 = space();
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (img.src !== (img_src_value = "assets/sura-title/" + /*meta*/ ctx[1].position + ".svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*meta*/ ctx[1].name);
    			attr_dev(img, "class", "sura-title svelte-1u0xid8");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "height", "125");
    			add_location(img, file$1, 15, 8, 498);
    			attr_dev(span0, "class", "svelte-1u0xid8");
    			add_location(span0, file$1, 17, 12, 650);
    			attr_dev(span1, "class", "svelte-1u0xid8");
    			add_location(span1, file$1, 18, 12, 688);
    			attr_dev(span2, "class", "svelte-1u0xid8");
    			add_location(span2, file$1, 19, 12, 726);
    			attr_dev(div, "class", "meta svelte-1u0xid8");
    			add_location(div, file$1, 16, 8, 619);
    			attr_dev(header, "class", header_class_value = "" + (null_to_empty(/*hero*/ ctx[4] && "hero") + " svelte-1u0xid8"));
    			add_location(header, file$1, 14, 4, 457);
    			attr_dev(ol, "start", ol_start_value = /*data*/ ctx[0][0].aya);
    			attr_dev(ol, "style", /*olStyle*/ ctx[3]);
    			attr_dev(ol, "dir", "rtl");
    			attr_dev(ol, "class", "svelte-1u0xid8");
    			add_location(ol, file$1, 25, 4, 913);
    			attr_dev(article, "class", "svelte-1u0xid8");
    			add_location(article, file$1, 13, 0, 443);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, header);
    			append_dev(header, img);
    			append_dev(header, t0);
    			append_dev(header, div);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(div, t4);
    			append_dev(div, span2);
    			append_dev(span2, t5);
    			append_dev(header, t6);
    			if (if_block) if_block.m(header, null);
    			append_dev(article, t7);
    			append_dev(article, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*meta*/ 2 && img.src !== (img_src_value = "assets/sura-title/" + /*meta*/ ctx[1].position + ".svg")) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty[0] & /*meta*/ 2 && img_alt_value !== (img_alt_value = /*meta*/ ctx[1].name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty[0] & /*meta*/ 2 && t1_value !== (t1_value = /*meta*/ ctx[1].tname + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*meta*/ 2 && t3_value !== (t3_value = /*meta*/ ctx[1].ename + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*meta*/ 2 && t5_value !== (t5_value = /*meta*/ ctx[1].type + "")) set_data_dev(t5, t5_value);

    			if (/*hero*/ ctx[4] && /*meta*/ ctx[1].position !== 9) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(header, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*hero*/ 16 && header_class_value !== (header_class_value = "" + (null_to_empty(/*hero*/ ctx[4] && "hero") + " svelte-1u0xid8"))) {
    				attr_dev(header, "class", header_class_value);
    			}

    			if (dirty[0] & /*sura*/ 4) {
    				each_value = /*sura*/ ctx[2];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty[0] & /*data*/ 1 && ol_start_value !== (ol_start_value = /*data*/ ctx[0][0].aya)) {
    				attr_dev(ol, "start", ol_start_value);
    			}

    			if (dirty[0] & /*olStyle*/ 8) {
    				attr_dev(ol, "style", /*olStyle*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { data = [] } = $$props;
    	let { meta = {} } = $$props;
    	const writable_props = ["data", "meta"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sura> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    		if ("meta" in $$props) $$invalidate(1, meta = $$props.meta);
    	};

    	$$self.$capture_state = () => {
    		return { data, meta, sura, olStyle, hero };
    	};

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    		if ("meta" in $$props) $$invalidate(1, meta = $$props.meta);
    		if ("sura" in $$props) $$invalidate(2, sura = $$props.sura);
    		if ("olStyle" in $$props) $$invalidate(3, olStyle = $$props.olStyle);
    		if ("hero" in $$props) $$invalidate(4, hero = $$props.hero);
    	};

    	let sura;
    	let olStyle;
    	let hero;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*meta, data*/ 3) {
    			 $$invalidate(2, sura = meta.position === 1 ? data.slice(1) : data);
    		}

    		if ($$self.$$.dirty[0] & /*data*/ 1) {
    			 $$invalidate(3, olStyle = data.length > 0
    			? `counter-reset: section ${data[0].aya - 1}`
    			: undefined);
    		}

    		if ($$self.$$.dirty[0] & /*data*/ 1) {
    			 $$invalidate(4, hero = data.length > 0 && data[0].aya === 1);
    		}
    	};

    	return [data, meta, sura, olStyle, hero];
    }

    class Sura extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { data: 0, meta: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sura",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get data() {
    		throw new Error("<Sura>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Sura>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<Sura>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<Sura>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/component/App.svelte generated by Svelte v3.16.4 */
    const file$2 = "src/component/App.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (12:8) {#each $store.page as sura}
    function create_each_block$2(ctx) {
    	let current;
    	const sura_spread_levels = [/*sura*/ ctx[2]];
    	let sura_props = {};

    	for (let i = 0; i < sura_spread_levels.length; i += 1) {
    		sura_props = assign(sura_props, sura_spread_levels[i]);
    	}

    	const sura = new Sura({ props: sura_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sura.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sura, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sura_changes = (dirty[0] & /*$store*/ 2)
    			? get_spread_update(sura_spread_levels, [get_spread_object(/*sura*/ ctx[2])])
    			: {};

    			sura.$set(sura_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sura.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sura.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sura, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(12:8) {#each $store.page as sura}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let header;
    	let t;
    	let main;
    	let current;

    	const nav = new Nav({
    			props: { store: /*store*/ ctx[0] },
    			$$inline: true
    		});

    	let each_value = /*$store*/ ctx[1].page;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			create_component(nav.$$.fragment);
    			t = space();
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(header, "class", "topbar svelte-cledrn");
    			add_location(header, file$2, 7, 4, 130);
    			attr_dev(main, "role", "main");
    			attr_dev(main, "class", "svelte-cledrn");
    			add_location(main, file$2, 10, 4, 202);
    			add_location(section, file$2, 6, 0, 116);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			mount_component(nav, header, null);
    			append_dev(section, t);
    			append_dev(section, main);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const nav_changes = {};
    			if (dirty[0] & /*store*/ 1) nav_changes.store = /*store*/ ctx[0];
    			nav.$set(nav_changes);

    			if (dirty[0] & /*$store*/ 2) {
    				each_value = /*$store*/ ctx[1].page;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(main, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $store,
    		$$unsubscribe_store = noop,
    		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(1, $store = $$value)), store);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
    	let { store } = $$props;
    	validate_store(store, "store");
    	$$subscribe_store();
    	const writable_props = ["store"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    	};

    	$$self.$capture_state = () => {
    		return { store, $store };
    	};

    	$$self.$inject_state = $$props => {
    		if ("store" in $$props) $$subscribe_store($$invalidate(0, store = $$props.store));
    		if ("$store" in $$props) store.set($store = $$props.$store);
    	};

    	return [store, $store];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { store: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*store*/ ctx[0] === undefined && !("store" in props)) {
    			console.warn("<App> was created without expected prop 'store'");
    		}
    	}

    	get store() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set store(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function extend(obj, props) {
        for (let i in props) obj[i] = props[i];
        return obj;
    }

    function objectAssign() {
        const args = arguments;
        let target = args[0];

        for (let i = 1, l = args.length; i < l; i++) {
            target = extend(target, args[i]);
        }

        return target;
    }

    const assign$1 = Object.assign || objectAssign;

    function megabytes(bytes){
      return `${Math.round(bytes * 100/1048576)/100} MB`;
    }

    function kilobytes(bytes){
      return bytes < 1048576 ? `${Math.round(bytes * 100/1024)/100} KB` : megabytes(bytes);
    }

    function bytes(bytes){
      return bytes < 1024 ? `${bytes} B` : kilobytes(bytes);
    }

    function ajax(config) {
      return doAJAX(new XMLHttpRequest(), assign$1({}, config));
    }

    function readyStateDone(progressEvent, config) {
      return progressEvent.target.status < 400
        ? config.success(progressEvent)
        : config.error(progressEvent);
    }

    function onReadyStateChange(progressEvent, config) {
      return (
        progressEvent.target.readyState === 4 &&
        readyStateDone(progressEvent, config)
      );
    }

    function doAJAX(xhr, config) {
      xhr.onprogress = config.progress;
      xhr.onreadystatechange = function onreadystatechange(progressEvent) {
        onReadyStateChange(progressEvent, config);
      };
      xhr.open(config.method || "GET", config.url, true);
      xhr.send(config.data);
      return xhr;
    }

    function getProgress(loaded, total) {
      return total === 0
        ? bytes(loaded)
        : `${Math.round((loaded * 100) / total)}%`;
    }

    function getError(xhr) {
      return xhr.statusText + ": " + xhr.responseURL;
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const PAGE = 'page';
    const SURA = 'sura';

    // Quran Metadata (ver 1.0)
    // Copyright (C) 2008-2009 Tanzil.info
    // License: Creative Commons Attribution 3.0

    //------------------ Sura Data ---------------------

    const Sura$1 = [
    	// [start, ayas, order, rukus, name, tname, ename, type]
    	[],
    	[0, 7, 5, 1, 'الفاتحة', "Al-Faatiha", 'The Opening', 'Meccan'],
    	[7, 286, 87, 40, 'البقرة', "Al-Baqara", 'The Cow', 'Medinan'],
    	[293, 200, 89, 20, 'آل عمران', "Aal-i-Imraan", 'The Family of Imraan', 'Medinan'],
    	[493, 176, 92, 24, 'النساء', "An-Nisaa", 'The Women', 'Medinan'],
    	[669, 120, 112, 16, 'المائدة', "Al-Maaida", 'The Table', 'Medinan'],
    	[789, 165, 55, 20, 'الأنعام', "Al-An'aam", 'The Cattle', 'Meccan'],
    	[954, 206, 39, 24, 'الأعراف', "Al-A'raaf", 'The Heights', 'Meccan'],
    	[1160, 75, 88, 10, 'الأنفال', "Al-Anfaal", 'The Spoils of War', 'Medinan'],
    	[1235, 129, 113, 16, 'التوبة', "At-Tawba", 'The Repentance', 'Medinan'],
    	[1364, 109, 51, 11, 'يونس', "Yunus", 'Jonas', 'Meccan'],
    	[1473, 123, 52, 10, 'هود', "Hud", 'Hud', 'Meccan'],
    	[1596, 111, 53, 12, 'يوسف', "Yusuf", 'Joseph', 'Meccan'],
    	[1707, 43, 96, 6, 'الرعد', "Ar-Ra'd", 'The Thunder', 'Medinan'],
    	[1750, 52, 72, 7, 'ابراهيم', "Ibrahim", 'Abraham', 'Meccan'],
    	[1802, 99, 54, 6, 'الحجر', "Al-Hijr", 'The Rock', 'Meccan'],
    	[1901, 128, 70, 16, 'النحل', "An-Nahl", 'The Bee', 'Meccan'],
    	[2029, 111, 50, 12, 'الإسراء', "Al-Israa", 'The Night Journey', 'Meccan'],
    	[2140, 110, 69, 12, 'الكهف', "Al-Kahf", 'The Cave', 'Meccan'],
    	[2250, 98, 44, 6, 'مريم', "Maryam", 'Mary', 'Meccan'],
    	[2348, 135, 45, 8, 'طه', "Taa-Haa", 'Taa-Haa', 'Meccan'],
    	[2483, 112, 73, 7, 'الأنبياء', "Al-Anbiyaa", 'The Prophets', 'Meccan'],
    	[2595, 78, 103, 10, 'الحج', "Al-Hajj", 'The Pilgrimage', 'Medinan'],
    	[2673, 118, 74, 6, 'المؤمنون', "Al-Muminoon", 'The Believers', 'Meccan'],
    	[2791, 64, 102, 9, 'النور', "An-Noor", 'The Light', 'Medinan'],
    	[2855, 77, 42, 6, 'الفرقان', "Al-Furqaan", 'The Criterion', 'Meccan'],
    	[2932, 227, 47, 11, 'الشعراء', "Ash-Shu'araa", 'The Poets', 'Meccan'],
    	[3159, 93, 48, 7, 'النمل', "An-Naml", 'The Ant', 'Meccan'],
    	[3252, 88, 49, 8, 'القصص', "Al-Qasas", 'The Stories', 'Meccan'],
    	[3340, 69, 85, 7, 'العنكبوت', "Al-Ankaboot", 'The Spider', 'Meccan'],
    	[3409, 60, 84, 6, 'الروم', "Ar-Room", 'The Romans', 'Meccan'],
    	[3469, 34, 57, 3, 'لقمان', "Luqman", 'Luqman', 'Meccan'],
    	[3503, 30, 75, 3, 'السجدة', "As-Sajda", 'The Prostration', 'Meccan'],
    	[3533, 73, 90, 9, 'الأحزاب', "Al-Ahzaab", 'The Clans', 'Medinan'],
    	[3606, 54, 58, 6, 'سبإ', "Saba", 'Sheba', 'Meccan'],
    	[3660, 45, 43, 5, 'فاطر', "Faatir", 'The Originator', 'Meccan'],
    	[3705, 83, 41, 5, 'يس', "Yaseen", 'Yaseen', 'Meccan'],
    	[3788, 182, 56, 5, 'الصافات', "As-Saaffaat", 'Those drawn up in Ranks', 'Meccan'],
    	[3970, 88, 38, 5, 'ص', "Saad", 'The letter Saad', 'Meccan'],
    	[4058, 75, 59, 8, 'الزمر', "Az-Zumar", 'The Groups', 'Meccan'],
    	[4133, 85, 60, 9, 'غافر', "Al-Ghaafir", 'The Forgiver', 'Meccan'],
    	[4218, 54, 61, 6, 'فصلت', "Fussilat", 'Explained in detail', 'Meccan'],
    	[4272, 53, 62, 5, 'الشورى', "Ash-Shura", 'Consultation', 'Meccan'],
    	[4325, 89, 63, 7, 'الزخرف', "Az-Zukhruf", 'Ornaments of gold', 'Meccan'],
    	[4414, 59, 64, 3, 'الدخان', "Ad-Dukhaan", 'The Smoke', 'Meccan'],
    	[4473, 37, 65, 4, 'الجاثية', "Al-Jaathiya", 'Crouching', 'Meccan'],
    	[4510, 35, 66, 4, 'الأحقاف', "Al-Ahqaf", 'The Dunes', 'Meccan'],
    	[4545, 38, 95, 4, 'محمد', "Muhammad", 'Muhammad', 'Medinan'],
    	[4583, 29, 111, 4, 'الفتح', "Al-Fath", 'The Victory', 'Medinan'],
    	[4612, 18, 106, 2, 'الحجرات', "Al-Hujuraat", 'The Inner Apartments', 'Medinan'],
    	[4630, 45, 34, 3, 'ق', "Qaaf", 'The letter Qaaf', 'Meccan'],
    	[4675, 60, 67, 3, 'الذاريات', "Adh-Dhaariyat", 'The Winnowing Winds', 'Meccan'],
    	[4735, 49, 76, 2, 'الطور', "At-Tur", 'The Mount', 'Meccan'],
    	[4784, 62, 23, 3, 'النجم', "An-Najm", 'The Star', 'Meccan'],
    	[4846, 55, 37, 3, 'القمر', "Al-Qamar", 'The Moon', 'Meccan'],
    	[4901, 78, 97, 3, 'الرحمن', "Ar-Rahmaan", 'The Beneficent', 'Medinan'],
    	[4979, 96, 46, 3, 'الواقعة', "Al-Waaqia", 'The Inevitable', 'Meccan'],
    	[5075, 29, 94, 4, 'الحديد', "Al-Hadid", 'The Iron', 'Medinan'],
    	[5104, 22, 105, 3, 'المجادلة', "Al-Mujaadila", 'The Pleading Woman', 'Medinan'],
    	[5126, 24, 101, 3, 'الحشر', "Al-Hashr", 'The Exile', 'Medinan'],
    	[5150, 13, 91, 2, 'الممتحنة', "Al-Mumtahana", 'She that is to be examined', 'Medinan'],
    	[5163, 14, 109, 2, 'الصف', "As-Saff", 'The Ranks', 'Medinan'],
    	[5177, 11, 110, 2, 'الجمعة', "Al-Jumu'a", 'Friday', 'Medinan'],
    	[5188, 11, 104, 2, 'المنافقون', "Al-Munaafiqoon", 'The Hypocrites', 'Medinan'],
    	[5199, 18, 108, 2, 'التغابن', "At-Taghaabun", 'Mutual Disillusion', 'Medinan'],
    	[5217, 12, 99, 2, 'الطلاق', "At-Talaaq", 'Divorce', 'Medinan'],
    	[5229, 12, 107, 2, 'التحريم', "At-Tahrim", 'The Prohibition', 'Medinan'],
    	[5241, 30, 77, 2, 'الملك', "Al-Mulk", 'The Sovereignty', 'Meccan'],
    	[5271, 52, 2, 2, 'القلم', "Al-Qalam", 'The Pen', 'Meccan'],
    	[5323, 52, 78, 2, 'الحاقة', "Al-Haaqqa", 'The Reality', 'Meccan'],
    	[5375, 44, 79, 2, 'المعارج', "Al-Ma'aarij", 'The Ascending Stairways', 'Meccan'],
    	[5419, 28, 71, 2, 'نوح', "Nooh", 'Noah', 'Meccan'],
    	[5447, 28, 40, 2, 'الجن', "Al-Jinn", 'The Jinn', 'Meccan'],
    	[5475, 20, 3, 2, 'المزمل', "Al-Muzzammil", 'The Enshrouded One', 'Meccan'],
    	[5495, 56, 4, 2, 'المدثر', "Al-Muddaththir", 'The Cloaked One', 'Meccan'],
    	[5551, 40, 31, 2, 'القيامة', "Al-Qiyaama", 'The Resurrection', 'Meccan'],
    	[5591, 31, 98, 2, 'الانسان', "Al-Insaan", 'Man', 'Medinan'],
    	[5622, 50, 33, 2, 'المرسلات', "Al-Mursalaat", 'The Emissaries', 'Meccan'],
    	[5672, 40, 80, 2, 'النبإ', "An-Naba", 'The Announcement', 'Meccan'],
    	[5712, 46, 81, 2, 'النازعات', "An-Naazi'aat", 'Those who drag forth', 'Meccan'],
    	[5758, 42, 24, 1, 'عبس', "Abasa", 'He frowned', 'Meccan'],
    	[5800, 29, 7, 1, 'التكوير', "At-Takwir", 'The Overthrowing', 'Meccan'],
    	[5829, 19, 82, 1, 'الإنفطار', "Al-Infitaar", 'The Cleaving', 'Meccan'],
    	[5848, 36, 86, 1, 'المطففين', "Al-Mutaffifin", 'Defrauding', 'Meccan'],
    	[5884, 25, 83, 1, 'الإنشقاق', "Al-Inshiqaaq", 'The Splitting Open', 'Meccan'],
    	[5909, 22, 27, 1, 'البروج', "Al-Burooj", 'The Constellations', 'Meccan'],
    	[5931, 17, 36, 1, 'الطارق', "At-Taariq", 'The Morning Star', 'Meccan'],
    	[5948, 19, 8, 1, 'الأعلى', "Al-A'laa", 'The Most High', 'Meccan'],
    	[5967, 26, 68, 1, 'الغاشية', "Al-Ghaashiya", 'The Overwhelming', 'Meccan'],
    	[5993, 30, 10, 1, 'الفجر', "Al-Fajr", 'The Dawn', 'Meccan'],
    	[6023, 20, 35, 1, 'البلد', "Al-Balad", 'The City', 'Meccan'],
    	[6043, 15, 26, 1, 'الشمس', "Ash-Shams", 'The Sun', 'Meccan'],
    	[6058, 21, 9, 1, 'الليل', "Al-Lail", 'The Night', 'Meccan'],
    	[6079, 11, 11, 1, 'الضحى', "Ad-Dhuhaa", 'The Morning Hours', 'Meccan'],
    	[6090, 8, 12, 1, 'الشرح', "Ash-Sharh", 'The Consolation', 'Meccan'],
    	[6098, 8, 28, 1, 'التين', "At-Tin", 'The Fig', 'Meccan'],
    	[6106, 19, 1, 1, 'العلق', "Al-Alaq", 'The Clot', 'Meccan'],
    	[6125, 5, 25, 1, 'القدر', "Al-Qadr", 'The Power, Fate', 'Meccan'],
    	[6130, 8, 100, 1, 'البينة', "Al-Bayyina", 'The Evidence', 'Medinan'],
    	[6138, 8, 93, 1, 'الزلزلة', "Az-Zalzala", 'The Earthquake', 'Medinan'],
    	[6146, 11, 14, 1, 'العاديات', "Al-Aadiyaat", 'The Chargers', 'Meccan'],
    	[6157, 11, 30, 1, 'القارعة', "Al-Qaari'a", 'The Calamity', 'Meccan'],
    	[6168, 8, 16, 1, 'التكاثر', "At-Takaathur", 'Competition', 'Meccan'],
    	[6176, 3, 13, 1, 'العصر', "Al-Asr", 'The Declining Day, Epoch', 'Meccan'],
    	[6179, 9, 32, 1, 'الهمزة', "Al-Humaza", 'The Traducer', 'Meccan'],
    	[6188, 5, 19, 1, 'الفيل', "Al-Fil", 'The Elephant', 'Meccan'],
    	[6193, 4, 29, 1, 'قريش', "Quraish", 'Quraysh', 'Meccan'],
    	[6197, 7, 17, 1, 'الماعون', "Al-Maa'un", 'Almsgiving', 'Meccan'],
    	[6204, 3, 15, 1, 'الكوثر', "Al-Kawthar", 'Abundance', 'Meccan'],
    	[6207, 6, 18, 1, 'الكافرون', "Al-Kaafiroon", 'The Disbelievers', 'Meccan'],
    	[6213, 3, 114, 1, 'النصر', "An-Nasr", 'Divine Support', 'Medinan'],
    	[6216, 5, 6, 1, 'المسد', "Al-Masad", 'The Palm Fibre', 'Meccan'],
    	[6221, 4, 22, 1, 'الإخلاص', "Al-Ikhlaas", 'Sincerity', 'Meccan'],
    	[6225, 5, 20, 1, 'الفلق', "Al-Falaq", 'The Dawn', 'Meccan'],
    	[6230, 6, 21, 1, 'الناس', "An-Naas", 'Mankind', 'Meccan'],
    	[6236, 1]
    ];


    //------------------ Ruku Data ---------------------

    const Ruku = [
    	// [sura, aya]
    	[],
    	[1, 1], 	[2, 1], 	[2, 8], 	[2, 21], 	[2, 30],
    	[2, 40], 	[2, 47], 	[2, 60], 	[2, 62], 	[2, 72],
    	[2, 83], 	[2, 87], 	[2, 97], 	[2, 104], 	[2, 113],
    	[2, 122], 	[2, 130], 	[2, 142], 	[2, 148], 	[2, 153],
    	[2, 164], 	[2, 168], 	[2, 177], 	[2, 183], 	[2, 189],
    	[2, 197], 	[2, 211], 	[2, 217], 	[2, 222], 	[2, 229],
    	[2, 232], 	[2, 236], 	[2, 243], 	[2, 249], 	[2, 254],
    	[2, 258], 	[2, 261], 	[2, 267], 	[2, 274], 	[2, 282],
    	[2, 284], 	[3, 1], 	[3, 10], 	[3, 21], 	[3, 31],
    	[3, 42], 	[3, 55], 	[3, 64], 	[3, 72], 	[3, 81],
    	[3, 92], 	[3, 102], 	[3, 110], 	[3, 121], 	[3, 130],
    	[3, 144], 	[3, 149], 	[3, 156], 	[3, 172], 	[3, 181],
    	[3, 190], 	[4, 1], 	[4, 11], 	[4, 15], 	[4, 23],
    	[4, 26], 	[4, 34], 	[4, 43], 	[4, 51], 	[4, 60],
    	[4, 71], 	[4, 77], 	[4, 88], 	[4, 92], 	[4, 97],
    	[4, 101], 	[4, 105], 	[4, 113], 	[4, 116], 	[4, 127],
    	[4, 135], 	[4, 142], 	[4, 153], 	[4, 163], 	[4, 172],
    	[5, 1], 	[5, 6], 	[5, 12], 	[5, 20], 	[5, 27],
    	[5, 35], 	[5, 44], 	[5, 51], 	[5, 57], 	[5, 67],
    	[5, 78], 	[5, 87], 	[5, 94], 	[5, 101], 	[5, 109],
    	[5, 116], 	[6, 1], 	[6, 11], 	[6, 21], 	[6, 31],
    	[6, 42], 	[6, 51], 	[6, 56], 	[6, 61], 	[6, 71],
    	[6, 83], 	[6, 91], 	[6, 95], 	[6, 101], 	[6, 111],
    	[6, 122], 	[6, 130], 	[6, 141], 	[6, 145], 	[6, 151],
    	[6, 155], 	[7, 1], 	[7, 11], 	[7, 26], 	[7, 32],
    	[7, 40], 	[7, 48], 	[7, 54], 	[7, 59], 	[7, 65],
    	[7, 73], 	[7, 85], 	[7, 94], 	[7, 100], 	[7, 109],
    	[7, 127], 	[7, 130], 	[7, 142], 	[7, 148], 	[7, 152],
    	[7, 158], 	[7, 163], 	[7, 172], 	[7, 182], 	[7, 189],
    	[8, 1], 	[8, 11], 	[8, 20], 	[8, 29], 	[8, 38],
    	[8, 45], 	[8, 49], 	[8, 59], 	[8, 65], 	[8, 70],
    	[9, 1], 	[9, 7], 	[9, 17], 	[9, 25], 	[9, 30],
    	[9, 38], 	[9, 43], 	[9, 60], 	[9, 67], 	[9, 73],
    	[9, 81], 	[9, 90], 	[9, 100], 	[9, 111], 	[9, 119],
    	[9, 123], 	[10, 1], 	[10, 11], 	[10, 21], 	[10, 31],
    	[10, 41], 	[10, 54], 	[10, 61], 	[10, 71], 	[10, 83],
    	[10, 93], 	[10, 104], 	[11, 1], 	[11, 9], 	[11, 25],
    	[11, 36], 	[11, 50], 	[11, 61], 	[11, 69], 	[11, 84],
    	[11, 96], 	[11, 110], 	[12, 1], 	[12, 7], 	[12, 21],
    	[12, 30], 	[12, 36], 	[12, 43], 	[12, 50], 	[12, 58],
    	[12, 69], 	[12, 80], 	[12, 94], 	[12, 105], 	[13, 1],
    	[13, 8], 	[13, 19], 	[13, 27], 	[13, 32], 	[13, 38],
    	[14, 1], 	[14, 7], 	[14, 13], 	[14, 22], 	[14, 28],
    	[14, 35], 	[14, 42], 	[15, 1], 	[15, 16], 	[15, 26],
    	[15, 45], 	[15, 61], 	[15, 80], 	[16, 1], 	[16, 10],
    	[16, 22], 	[16, 26], 	[16, 35], 	[16, 41], 	[16, 51],
    	[16, 61], 	[16, 66], 	[16, 71], 	[16, 77], 	[16, 84],
    	[16, 90], 	[16, 101], 	[16, 111], 	[16, 120], 	[17, 1],
    	[17, 11], 	[17, 23], 	[17, 31], 	[17, 41], 	[17, 53],
    	[17, 61], 	[17, 71], 	[17, 78], 	[17, 85], 	[17, 94],
    	[17, 101], 	[18, 1], 	[18, 13], 	[18, 18], 	[18, 23],
    	[18, 32], 	[18, 45], 	[18, 50], 	[18, 54], 	[18, 60],
    	[18, 71], 	[18, 83], 	[18, 102], 	[19, 1], 	[19, 16],
    	[19, 41], 	[19, 51], 	[19, 66], 	[19, 83], 	[20, 1],
    	[20, 25], 	[20, 55], 	[20, 77], 	[20, 90], 	[20, 105],
    	[20, 116], 	[20, 129], 	[21, 1], 	[21, 11], 	[21, 30],
    	[21, 42], 	[21, 51], 	[21, 76], 	[21, 94], 	[22, 1],
    	[22, 11], 	[22, 23], 	[22, 26], 	[22, 34], 	[22, 39],
    	[22, 49], 	[22, 58], 	[22, 65], 	[22, 73], 	[23, 1],
    	[23, 23], 	[23, 33], 	[23, 51], 	[23, 78], 	[23, 93],
    	[24, 1], 	[24, 11], 	[24, 21], 	[24, 27], 	[24, 35],
    	[24, 41], 	[24, 51], 	[24, 58], 	[24, 62], 	[25, 1],
    	[25, 10], 	[25, 21], 	[25, 35], 	[25, 45], 	[25, 61],
    	[26, 1], 	[26, 10], 	[26, 34], 	[26, 53], 	[26, 70],
    	[26, 105], 	[26, 123], 	[26, 141], 	[26, 160], 	[26, 176],
    	[26, 192], 	[27, 1], 	[27, 15], 	[27, 32], 	[27, 45],
    	[27, 59], 	[27, 67], 	[27, 83], 	[28, 1], 	[28, 14],
    	[28, 22], 	[28, 29], 	[28, 43], 	[28, 51], 	[28, 61],
    	[28, 76], 	[29, 1], 	[29, 14], 	[29, 23], 	[29, 31],
    	[29, 45], 	[29, 52], 	[29, 64], 	[30, 1], 	[30, 11],
    	[30, 20], 	[30, 28], 	[30, 41], 	[30, 54], 	[31, 1],
    	[31, 12], 	[31, 20], 	[32, 1], 	[32, 12], 	[32, 23],
    	[33, 1], 	[33, 9], 	[33, 21], 	[33, 28], 	[33, 35],
    	[33, 41], 	[33, 53], 	[33, 59], 	[33, 69], 	[34, 1],
    	[34, 10], 	[34, 22], 	[34, 31], 	[34, 37], 	[34, 46],
    	[35, 1], 	[35, 8], 	[35, 15], 	[35, 27], 	[35, 38],
    	[36, 1], 	[36, 13], 	[36, 33], 	[36, 51], 	[36, 68],
    	[37, 1], 	[37, 22], 	[37, 75], 	[37, 114], 	[37, 139],
    	[38, 1], 	[38, 15], 	[38, 27], 	[38, 41], 	[38, 65],
    	[39, 1], 	[39, 10], 	[39, 22], 	[39, 32], 	[39, 42],
    	[39, 53], 	[39, 64], 	[39, 71], 	[40, 1], 	[40, 10],
    	[40, 21], 	[40, 28], 	[40, 38], 	[40, 51], 	[40, 61],
    	[40, 69], 	[40, 79], 	[41, 1], 	[41, 9], 	[41, 19],
    	[41, 26], 	[41, 33], 	[41, 45], 	[42, 1], 	[42, 10],
    	[42, 20], 	[42, 30], 	[42, 44], 	[43, 1], 	[43, 16],
    	[43, 26], 	[43, 36], 	[43, 46], 	[43, 57], 	[43, 68],
    	[44, 1], 	[44, 30], 	[44, 43], 	[45, 1], 	[45, 12],
    	[45, 22], 	[45, 27], 	[46, 1], 	[46, 11], 	[46, 21],
    	[46, 27], 	[47, 1], 	[47, 12], 	[47, 20], 	[47, 29],
    	[48, 1], 	[48, 11], 	[48, 18], 	[48, 27], 	[49, 1],
    	[49, 11], 	[50, 1], 	[50, 16], 	[50, 30], 	[51, 1],
    	[51, 24], 	[51, 47], 	[52, 1], 	[52, 29], 	[53, 1],
    	[53, 26], 	[53, 33], 	[54, 1], 	[54, 23], 	[54, 41],
    	[55, 1], 	[55, 26], 	[55, 46], 	[56, 1], 	[56, 39],
    	[56, 75], 	[57, 1], 	[57, 11], 	[57, 20], 	[57, 26],
    	[58, 1], 	[58, 7], 	[58, 14], 	[59, 1], 	[59, 11],
    	[59, 18], 	[60, 1], 	[60, 7], 	[61, 1], 	[61, 10],
    	[62, 1], 	[62, 9], 	[63, 1], 	[63, 9], 	[64, 1],
    	[64, 11], 	[65, 1], 	[65, 8], 	[66, 1], 	[66, 8],
    	[67, 1], 	[67, 15], 	[68, 1], 	[68, 34], 	[69, 1],
    	[69, 38], 	[70, 1], 	[70, 36], 	[71, 1], 	[71, 21],
    	[72, 1], 	[72, 20], 	[73, 1], 	[73, 20], 	[74, 1],
    	[74, 32], 	[75, 1], 	[75, 31], 	[76, 1], 	[76, 23],
    	[77, 1], 	[77, 41], 	[78, 1], 	[78, 31], 	[79, 1],
    	[79, 27], 	[80, 1], 	[81, 1], 	[82, 1], 	[83, 1],
    	[84, 1], 	[85, 1], 	[86, 1], 	[87, 1], 	[88, 1],
    	[89, 1], 	[90, 1], 	[91, 1], 	[92, 1], 	[93, 1],
    	[94, 1], 	[95, 1], 	[96, 1], 	[97, 1], 	[98, 1],
    	[99, 1], 	[100, 1], 	[101, 1], 	[102, 1], 	[103, 1],
    	[104, 1], 	[105, 1], 	[106, 1], 	[107, 1], 	[108, 1],
    	[109, 1], 	[110, 1], 	[111, 1], 	[112, 1], 	[113, 1],
    	[114, 1]
    ];


    //------------------ Page Data ---------------------

    const Page = [
    	// [sura, aya]
    	[],
    	[1, 1], 	[2, 1], 	[2, 6], 	[2, 17], 	[2, 25],
    	[2, 30], 	[2, 38], 	[2, 49], 	[2, 58], 	[2, 62],
    	[2, 70], 	[2, 77], 	[2, 84], 	[2, 89], 	[2, 94],
    	[2, 102], 	[2, 106], 	[2, 113], 	[2, 120], 	[2, 127],
    	[2, 135], 	[2, 142], 	[2, 146], 	[2, 154], 	[2, 164],
    	[2, 170], 	[2, 177], 	[2, 182], 	[2, 187], 	[2, 191],
    	[2, 197], 	[2, 203], 	[2, 211], 	[2, 216], 	[2, 220],
    	[2, 225], 	[2, 231], 	[2, 234], 	[2, 238], 	[2, 246],
    	[2, 249], 	[2, 253], 	[2, 257], 	[2, 260], 	[2, 265],
    	[2, 270], 	[2, 275], 	[2, 282], 	[2, 283], 	[3, 1],
    	[3, 10], 	[3, 16], 	[3, 23], 	[3, 30], 	[3, 38],
    	[3, 46], 	[3, 53], 	[3, 62], 	[3, 71], 	[3, 78],
    	[3, 84], 	[3, 92], 	[3, 101], 	[3, 109], 	[3, 116],
    	[3, 122], 	[3, 133], 	[3, 141], 	[3, 149], 	[3, 154],
    	[3, 158], 	[3, 166], 	[3, 174], 	[3, 181], 	[3, 187],
    	[3, 195], 	[4, 1], 	[4, 7], 	[4, 12], 	[4, 15],
    	[4, 20], 	[4, 24], 	[4, 27], 	[4, 34], 	[4, 38],
    	[4, 45], 	[4, 52], 	[4, 60], 	[4, 66], 	[4, 75],
    	[4, 80], 	[4, 87], 	[4, 92], 	[4, 95], 	[4, 102],
    	[4, 106], 	[4, 114], 	[4, 122], 	[4, 128], 	[4, 135],
    	[4, 141], 	[4, 148], 	[4, 155], 	[4, 163], 	[4, 171],
    	[4, 176], 	[5, 3], 	[5, 6], 	[5, 10], 	[5, 14],
    	[5, 18], 	[5, 24], 	[5, 32], 	[5, 37], 	[5, 42],
    	[5, 46], 	[5, 51], 	[5, 58], 	[5, 65], 	[5, 71],
    	[5, 77], 	[5, 83], 	[5, 90], 	[5, 96], 	[5, 104],
    	[5, 109], 	[5, 114], 	[6, 1], 	[6, 9], 	[6, 19],
    	[6, 28], 	[6, 36], 	[6, 45], 	[6, 53], 	[6, 60],
    	[6, 69], 	[6, 74], 	[6, 82], 	[6, 91], 	[6, 95],
    	[6, 102], 	[6, 111], 	[6, 119], 	[6, 125], 	[6, 132],
    	[6, 138], 	[6, 143], 	[6, 147], 	[6, 152], 	[6, 158],
    	[7, 1], 	[7, 12], 	[7, 23], 	[7, 31], 	[7, 38],
    	[7, 44], 	[7, 52], 	[7, 58], 	[7, 68], 	[7, 74],
    	[7, 82], 	[7, 88], 	[7, 96], 	[7, 105], 	[7, 121],
    	[7, 131], 	[7, 138], 	[7, 144], 	[7, 150], 	[7, 156],
    	[7, 160], 	[7, 164], 	[7, 171], 	[7, 179], 	[7, 188],
    	[7, 196], 	[8, 1], 	[8, 9], 	[8, 17], 	[8, 26],
    	[8, 34], 	[8, 41], 	[8, 46], 	[8, 53], 	[8, 62],
    	[8, 70], 	[9, 1], 	[9, 7], 	[9, 14], 	[9, 21],
    	[9, 27], 	[9, 32], 	[9, 37], 	[9, 41], 	[9, 48],
    	[9, 55], 	[9, 62], 	[9, 69], 	[9, 73], 	[9, 80],
    	[9, 87], 	[9, 94], 	[9, 100], 	[9, 107], 	[9, 112],
    	[9, 118], 	[9, 123], 	[10, 1], 	[10, 7], 	[10, 15],
    	[10, 21], 	[10, 26], 	[10, 34], 	[10, 43], 	[10, 54],
    	[10, 62], 	[10, 71], 	[10, 79], 	[10, 89], 	[10, 98],
    	[10, 107], 	[11, 6], 	[11, 13], 	[11, 20], 	[11, 29],
    	[11, 38], 	[11, 46], 	[11, 54], 	[11, 63], 	[11, 72],
    	[11, 82], 	[11, 89], 	[11, 98], 	[11, 109], 	[11, 118],
    	[12, 5], 	[12, 15], 	[12, 23], 	[12, 31], 	[12, 38],
    	[12, 44], 	[12, 53], 	[12, 64], 	[12, 70], 	[12, 79],
    	[12, 87], 	[12, 96], 	[12, 104], 	[13, 1], 	[13, 6],
    	[13, 14], 	[13, 19], 	[13, 29], 	[13, 35], 	[13, 43],
    	[14, 6], 	[14, 11], 	[14, 19], 	[14, 25], 	[14, 34],
    	[14, 43], 	[15, 1], 	[15, 16], 	[15, 32], 	[15, 52],
    	[15, 71], 	[15, 91], 	[16, 7], 	[16, 15], 	[16, 27],
    	[16, 35], 	[16, 43], 	[16, 55], 	[16, 65], 	[16, 73],
    	[16, 80], 	[16, 88], 	[16, 94], 	[16, 103], 	[16, 111],
    	[16, 119], 	[17, 1], 	[17, 8], 	[17, 18], 	[17, 28],
    	[17, 39], 	[17, 50], 	[17, 59], 	[17, 67], 	[17, 76],
    	[17, 87], 	[17, 97], 	[17, 105], 	[18, 5], 	[18, 16],
    	[18, 21], 	[18, 28], 	[18, 35], 	[18, 46], 	[18, 54],
    	[18, 62], 	[18, 75], 	[18, 84], 	[18, 98], 	[19, 1],
    	[19, 12], 	[19, 26], 	[19, 39], 	[19, 52], 	[19, 65],
    	[19, 77], 	[19, 96], 	[20, 13], 	[20, 38], 	[20, 52],
    	[20, 65], 	[20, 77], 	[20, 88], 	[20, 99], 	[20, 114],
    	[20, 126], 	[21, 1], 	[21, 11], 	[21, 25], 	[21, 36],
    	[21, 45], 	[21, 58], 	[21, 73], 	[21, 82], 	[21, 91],
    	[21, 102], 	[22, 1], 	[22, 6], 	[22, 16], 	[22, 24],
    	[22, 31], 	[22, 39], 	[22, 47], 	[22, 56], 	[22, 65],
    	[22, 73], 	[23, 1], 	[23, 18], 	[23, 28], 	[23, 43],
    	[23, 60], 	[23, 75], 	[23, 90], 	[23, 105], 	[24, 1],
    	[24, 11], 	[24, 21], 	[24, 28], 	[24, 32], 	[24, 37],
    	[24, 44], 	[24, 54], 	[24, 59], 	[24, 62], 	[25, 3],
    	[25, 12], 	[25, 21], 	[25, 33], 	[25, 44], 	[25, 56],
    	[25, 68], 	[26, 1], 	[26, 20], 	[26, 40], 	[26, 61],
    	[26, 84], 	[26, 112], 	[26, 137], 	[26, 160], 	[26, 184],
    	[26, 207], 	[27, 1], 	[27, 14], 	[27, 23], 	[27, 36],
    	[27, 45], 	[27, 56], 	[27, 64], 	[27, 77], 	[27, 89],
    	[28, 6], 	[28, 14], 	[28, 22], 	[28, 29], 	[28, 36],
    	[28, 44], 	[28, 51], 	[28, 60], 	[28, 71], 	[28, 78],
    	[28, 85], 	[29, 7], 	[29, 15], 	[29, 24], 	[29, 31],
    	[29, 39], 	[29, 46], 	[29, 53], 	[29, 64], 	[30, 6],
    	[30, 16], 	[30, 25], 	[30, 33], 	[30, 42], 	[30, 51],
    	[31, 1], 	[31, 12], 	[31, 20], 	[31, 29], 	[32, 1],
    	[32, 12], 	[32, 21], 	[33, 1], 	[33, 7], 	[33, 16],
    	[33, 23], 	[33, 31], 	[33, 36], 	[33, 44], 	[33, 51],
    	[33, 55], 	[33, 63], 	[34, 1], 	[34, 8], 	[34, 15],
    	[34, 23], 	[34, 32], 	[34, 40], 	[34, 49], 	[35, 4],
    	[35, 12], 	[35, 19], 	[35, 31], 	[35, 39], 	[35, 45],
    	[36, 13], 	[36, 28], 	[36, 41], 	[36, 55], 	[36, 71],
    	[37, 1], 	[37, 25], 	[37, 52], 	[37, 77], 	[37, 103],
    	[37, 127], 	[37, 154], 	[38, 1], 	[38, 17], 	[38, 27],
    	[38, 43], 	[38, 62], 	[38, 84], 	[39, 6], 	[39, 11],
    	[39, 22], 	[39, 32], 	[39, 41], 	[39, 48], 	[39, 57],
    	[39, 68], 	[39, 75], 	[40, 8], 	[40, 17], 	[40, 26],
    	[40, 34], 	[40, 41], 	[40, 50], 	[40, 59], 	[40, 67],
    	[40, 78], 	[41, 1], 	[41, 12], 	[41, 21], 	[41, 30],
    	[41, 39], 	[41, 47], 	[42, 1], 	[42, 11], 	[42, 16],
    	[42, 23], 	[42, 32], 	[42, 45], 	[42, 52], 	[43, 11],
    	[43, 23], 	[43, 34], 	[43, 48], 	[43, 61], 	[43, 74],
    	[44, 1], 	[44, 19], 	[44, 40], 	[45, 1], 	[45, 14],
    	[45, 23], 	[45, 33], 	[46, 6], 	[46, 15], 	[46, 21],
    	[46, 29], 	[47, 1], 	[47, 12], 	[47, 20], 	[47, 30],
    	[48, 1], 	[48, 10], 	[48, 16], 	[48, 24], 	[48, 29],
    	[49, 5], 	[49, 12], 	[50, 1], 	[50, 16], 	[50, 36],
    	[51, 7], 	[51, 31], 	[51, 52], 	[52, 15], 	[52, 32],
    	[53, 1], 	[53, 27], 	[53, 45], 	[54, 7], 	[54, 28],
    	[54, 50], 	[55, 17], 	[55, 41], 	[55, 68], 	[56, 17],
    	[56, 51], 	[56, 77], 	[57, 4], 	[57, 12], 	[57, 19],
    	[57, 25], 	[58, 1], 	[58, 7], 	[58, 12], 	[58, 22],
    	[59, 4], 	[59, 10], 	[59, 17], 	[60, 1], 	[60, 6],
    	[60, 12], 	[61, 6], 	[62, 1], 	[62, 9], 	[63, 5],
    	[64, 1], 	[64, 10], 	[65, 1], 	[65, 6], 	[66, 1],
    	[66, 8], 	[67, 1], 	[67, 13], 	[67, 27], 	[68, 16],
    	[68, 43], 	[69, 9], 	[69, 35], 	[70, 11], 	[70, 40],
    	[71, 11], 	[72, 1], 	[72, 14], 	[73, 1], 	[73, 20],
    	[74, 18], 	[74, 48], 	[75, 20], 	[76, 6], 	[76, 26],
    	[77, 20], 	[78, 1], 	[78, 31], 	[79, 16], 	[80, 1],
    	[81, 1], 	[82, 1], 	[83, 7], 	[83, 35], 	[85, 1],
    	[86, 1], 	[87, 16], 	[89, 1], 	[89, 24], 	[91, 1],
    	[92, 15], 	[95, 1], 	[97, 1], 	[98, 8], 	[100, 10],
    	[103, 1], 	[106, 1], 	[109, 1], 	[112, 1], 	[115, 1]
    ];


    //------------------ Sajda Data ---------------------

    const Sajda = [
    	// [sura, aya, type]
    	[],
    	[7, 206, 'recommended'],
    	[13, 15, 'recommended'],
    	[16, 50, 'recommended'],
    	[17, 109, 'recommended'],
    	[19, 58, 'recommended'],
    	[22, 18, 'recommended'],
    	[22, 77, 'recommended'],
    	[25, 60, 'recommended'],
    	[27, 26, 'recommended'],
    	[32, 15, 'obligatory'],
    	[38, 24, 'recommended'],
    	[41, 38, 'obligatory'],
    	[53, 62, 'obligatory'],
    	[84, 21, 'recommended'],
    	[96, 19, 'obligatory'],
    ];

    var pageMeta, suraMeta;

    function computePagingMeta(pagingType) {
      switch (pagingType) {
        case PAGE:
          return (
            pageMeta ||
            (pageMeta = Page.reduce(function(accum, item, i, items) {
              if (item.length && i + 1 !== items.length) {
                accum.push(i.toString());
              }
              return accum;
            }, []))
          );
        case SURA:
          return (
            suraMeta ||
            (suraMeta = Sura$1.reduce(function(accum, item) {
              var val = item[5];
              if (val) {
                accum.push(val);
              }
              return accum;
            }, []))
          );
        default:
          return [];
      }
    }

    function getSuraMeta(number) {
      return Sura$1[number];
    }

    function doGetAyaIndex(suraMeta, aya) {
        return suraMeta[0] + Math.min(suraMeta[1], aya - 1);
    }

    function getAyaIndex(sura, aya) {
        return doGetAyaIndex(getSuraMeta(sura), aya);
    }

    function getPageStart(pagingType, index) {
        switch (pagingType) {
            case PAGE:
                return getAyaIndex.apply(null, Page[index]);
            case SURA:
                return Sura$1[index][0];
            default:
                return -1;
        }
    }

    function getPageEnd(pagingType, index) {
        switch (pagingType) {
            case PAGE:
                return getAyaIndex.apply(null, Page[index + 1]);
            case SURA:
                return Sura$1[index][0] + Sura$1[index][1];
            default:
                return -1;
        }
    }

    function getPage(array, pagingType, pagingIndex) {
        switch (pagingType) {
            case PAGE:
            case SURA:
                return array.slice(
                    getPageStart(pagingType, pagingIndex),
                    getPageEnd(pagingType, pagingIndex)
                );
            default:
                return [];
        }
    }

    function groupBySura(array) {
      return array.reduce(function reducer(accumulator, item) {
        const groupName = item["sura"].toString();
        if (!Object.prototype.hasOwnProperty.call(accumulator, groupName)) {
          accumulator[groupName] = [];
        }
        accumulator[groupName].push(item);
        return accumulator;
      }, {});
    }

    function toMetaObject(meta, position) {
      return [
        "start",
        "ayas",
        "order",
        "rukus",
        "name",
        "tname",
        "ename",
        "type"
      ].reduce(
        function(accum, propName, index) {
          accum[propName] = meta[index];
          return accum;
        },
        { position }
      );
    }

    function applySuraMeta(obj) {
      return Object.keys(obj).map(function(suraNumber) {
        const index = parseInt(suraNumber, 10);
        return {
          meta: toMetaObject(getSuraMeta(suraNumber), index),
          data: obj[index]
        };
      });
    }

    function computePage(quran, pagingType, pagingIndex) {
      return applySuraMeta(groupBySura(getPage(quran, pagingType, pagingIndex)));
    }

    const totals = {
        [PAGE]: Page.length - 1,
        [SURA]: Sura$1.length - 1
    };

    function getBoundIndex(pagingType, index) {
        return Math.max(
            1,
            Math.min(
                totals[pagingType] - 1,
                parseInt(index, 10)
            )
        )
    }

    function computePagesTotal(pagingType){
        return totals[pagingType] || 0;
    }

    function applySura(array) {
        return Array.prototype.concat.apply([], Sura$1.map(function suraMap(item, suraIndex) {
            return array.slice(item[0], item[0] + item[1])
                .map(function (text, ayaIndex) {
                    return {
                        text: ayaIndex === 0 ? removeBismillah(text) : text,
                        aya: ayaIndex + 1,
                        sura: suraIndex
                    }
                })
        }));
    }

    function applySajda(array) {
        Sajda.forEach(function (sajda, i) {
            i && (
                array[getAyaIndex(sajda[0], sajda[1])].sajda = sajda[2]
            );
        });

        return array;
    }

    function applyRuku(array) {
        Ruku.forEach(function (ruku, i) {
            i > 1 && (
                array[getAyaIndex(ruku[0], ruku[1]) - 1].ruku = i - 1
            );
        });
        array[array.length - 2].ruku = Ruku.length;

        return array;
    }

    function prepare(array) {
        return applyRuku(applySajda(applySura(array)));
    }

    const ACTION_SET_SOURCE = 1;
    const ACTION_SET_PAGE_TYPE = 2;
    const ACTION_SET_PAGE_INDEX = 3;
    const ACTION_SET_PAGE = 4;

    const pagingTotals = {
      page: computePagesTotal(PAGE),
      sura: computePagesTotal(SURA)
    };

    const initialState = {
      pagingType: PAGE,
      pagingIndex: 1,
      pagingTotal: pagingTotals[PAGE],
      pagingMeta: computePagingMeta(PAGE),
      page: []
    };

    let source = [];

    function reducer(state, action) {
      let pagingIndex, pagingType;
      switch (action.type) {
        case ACTION_SET_SOURCE:
          source = prepare(action.source.replace(/\r?\n|\r/g, "|").split("|"));
          return assign$1({}, state, {
            page: computePage(source, state.pagingType, state.pagingIndex)
          });

        case ACTION_SET_PAGE_TYPE:
          pagingType = action.pagingType;
          pagingIndex = 1;
          if (pagingType !== undefined && state.pagingType !== pagingType) {
            return assign$1({}, state, {
              pagingType,
              pagingIndex,
              pagingTotal: pagingTotals[pagingType],
              pagingMeta: computePagingMeta(pagingType),
              page: computePage(source, pagingType, pagingIndex)
            });
          }
          break;
        case ACTION_SET_PAGE_INDEX:
          pagingType = state.pagingType;
          pagingIndex = getBoundIndex(state.pagingType, action.pagingIndex);
          if (pagingIndex !== undefined && pagingIndex !== state.pagingIndex) {
            return assign$1({}, state, {
              pagingIndex,
              page: computePage(source, pagingType, pagingIndex)
            });
          }
          break;
        case ACTION_SET_PAGE:
          pagingType = action.pagingType;
          pagingIndex = getBoundIndex(action.pagingType, action.pagingIndex);
          if (
            pagingType !== state.pagingType ||
            pagingIndex !== state.pagingIndex
          ) {
            return assign$1({}, state, {
              pagingType,
              pagingIndex,
              pagingTotal: pagingTotals[pagingType],
              pagingMeta: computePagingMeta(pagingType),
              page: computePage(source, pagingType, pagingIndex)
            });
          }
      }
      return state;
    }

    function createStore() {
      const { subscribe, update } = writable(initialState);
      const dispatch = action => update(state => reducer(state, action));

      return {
        subscribe,
        dispatch,
        gotoPage: function({ pagingIndex, pagingType }) {
          const index = pagingIndex === undefined ? 0 : 1;
          const type = pagingType === undefined ? 0 : 2;
          switch (index + type) {
            case 1:
              return dispatch({
                type: ACTION_SET_PAGE_INDEX,
                pagingIndex
              });
            case 2:
              return dispatch({
                type: ACTION_SET_PAGE_TYPE,
                pagingType
              });
            case 3:
              return dispatch({
                type: ACTION_SET_PAGE,
                pagingIndex,
                pagingType
              });
          }
        },
        /**
         * 
         * @param {string} source 
         */
        setSource: function(source) {
          dispatch({
            type: ACTION_SET_SOURCE,
            source
          });
        }
      };
    }

    var store = createStore();

    const documentLocation = document.location;
    const HASHBANG = "#!/";
    const regexr = /#!\/(page|sura)\/(\d+)/;
    const DEFAULT_PATH = "page/1";

    function onLocationChange(store) {
      return function() {
        const change = validate(documentLocation.hash);
        if (change) {
          store.gotoPage({
            pagingType: change[1],
            pagingIndex: parseInt(change[2], 10)
          });
        }
      };
    }

    function navigate(path) {
      const loc = path === undefined ? getCookie() || DEFAULT_PATH : path;
      setCookie(loc);
      return (documentLocation.hash = HASHBANG + loc);
    }

    function validate(hash) {
      return regexr.exec(hash) || (navigate() && false);
    }

    function initiateRouter(store) {
      let count = 0;
      const onHashChange = onLocationChange(store);
      onHashChange();
      const unsubscribeStore = store.subscribe(state => {
        if (count !== 0) {
          navigate(state.pagingType + "/" + state.pagingIndex);
        } else {
          count++;
        }
      });
      window.addEventListener("hashchange", onHashChange);

      return function unsubscribe() {
        unsubscribeStore();
        window.removeEventListener("hashchange", onHashChange);
      };
    }

    const COOKIE_REGEX = /^location=(.+)/;
    function getCookie() {
      const cookie = document.cookie
        .split(";")
        .map(x => x.trim())
        .filter(x => COOKIE_REGEX.test(x))
        .join("");

      if (cookie !== "") {
        return decodeURIComponent(COOKIE_REGEX.exec(cookie)[1]);
      }

      return cookie;
    }

    function setCookie(loc) {
      document.cookie = `location=${encodeURIComponent(loc)}`;
    }

    const target = document.getElementById("app");
    let preloader = target.querySelector("svg");

    function showMessage(message) {
      console.info(message);
    }

    initiateRouter(store);

    new App({
      target,
      props: { store }
    });

    ajax({
      url: "data/quran-uthmani.txt",
      progress: function onProgress(progressEvent) {
        showMessage(
          `loading data ${getProgress(progressEvent.loaded, progressEvent.total)}`
        );
      },
      success: function onSuccess(progressEvent) {
        preloader.parentNode.removeChild(preloader);
        preloader = null;
        store.setSource(progressEvent.target.responseText);
      },
      error: function onError(progressEvent) {
        showMessage(getError(progressEvent.target));
      }
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");

      navigator.serviceWorker.ready.then(function() {
        //window.location.reload();
      });
    }

}());
//# sourceMappingURL=bundle.js.map
