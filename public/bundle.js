(function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) { tar[k] = src[k]; }
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) { tar[k] = 1; }
		return tar;
	}

	function callAfter(fn, i) {
		if (i === 0) { fn(); }
		return function () {
			if (!--i) { fn(); }
		};
	}

	function addLoc(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file: file, line: line, column: column, char: char }
		};
	}

	function exclude(src, prop) {
		var tar = {};
		for (var k in src) { k === prop || (tar[k] = src[k]); }
		return tar;
	}

	function run(fn) {
		fn();
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) { iterations[i].d(detach); }
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createSvgElement(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) { node.removeAttribute(attribute); }
		else { node.setAttribute(attribute, value); }
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function destroyDev(detach) {
		destroy.call(this, detach);
		this.destroy = function() {
			console.warn('Component was already destroyed');
		};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function _differsImmutable(a, b) {
		return a != a ? b == b : a !== b;
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) { return; }

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) { handlers.splice(index, 1); }
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) { return; }
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) { changed[key] = dirty = true; }
		}
		if (!dirty) { return; }

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) { this._bind(changed, this._state); }

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function setDev(newState) {
		if (typeof newState !== 'object') {
			throw new Error(
				this._debugName + '.set was called without an object of data key-values to update.'
			);
		}

		this._checkReadOnly(newState);
		set.call(this, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) { fns.shift()(); }
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function removeFromStore() {
		this.store._remove(this);
	}

	var protoDev = {
		destroy: destroyDev,
		get: get,
		fire: fire,
		on: on,
		set: setDev,
		_recompute: noop,
		_set: _set,
		_stage: _stage,
		_mount: _mount,
		_differs: _differs
	};

	function charCodesAt(str) {
	    return String(str).split('').map(function (char) {
	        return char.charCodeAt()
	    }).join(',')
	}

	function charCodesFrom(str) {
	    return String(str).split(',').map(function (code) {
	        return String.fromCharCode(code)
	    }).join('')
	}

	var bismillahCharCodes = '1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616';

	var bismillahRegExp = new RegExp(("^(" + bismillahCharCodes + "(,32)?(,)?)(.*)"), '');

	function executeRegExp(str) {
	    return bismillahRegExp.exec(charCodesAt(str)) || [];
	}

	function doCharCodeFrom(str) {
	    return str ? charCodesFrom(str) : '';
	}

	function removeBismillah(str) {
	    return doCharCodeFrom(executeRegExp(str)[4]) || str;
	}

	var arabicBismillah = (function(){
	    return charCodesFrom(bismillahCharCodes);
	}());

	/* src/components/SuraHeader.html generated by Svelte v2.15.3 */

	function data() {
	  return {
	    bismillah: arabicBismillah
	  }
	}
	var file = "src/components/SuraHeader.html";

	function create_main_fragment(component, ctx) {
		var header, h1, text0_value = ctx.meta[4], text0, text1, h2, text2_value = ctx.meta[5], text2, text3, text4_value = ctx.meta[6], text4, text5, text6_value = ctx.meta[7], text6, text7, h3, text8, current;

		return {
			c: function create() {
				header = createElement("header");
				h1 = createElement("h1");
				text0 = createText(text0_value);
				text1 = createText("\n  ");
				h2 = createElement("h2");
				text2 = createText(text2_value);
				text3 = createText(" | ");
				text4 = createText(text4_value);
				text5 = createText(" | ");
				text6 = createText(text6_value);
				text7 = createText("\n  ");
				h3 = createElement("h3");
				text8 = createText(ctx.bismillah);
				h1.className = "svelte-1tv5h2o";
				addLoc(h1, file, 1, 2, 11);
				h2.className = "svelte-1tv5h2o";
				addLoc(h2, file, 2, 2, 32);
				h3.className = "svelte-1tv5h2o";
				addLoc(h3, file, 3, 2, 77);
				header.className = "svelte-1tv5h2o";
				addLoc(header, file, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, header, anchor);
				append(header, h1);
				append(h1, text0);
				append(header, text1);
				append(header, h2);
				append(h2, text2);
				append(h2, text3);
				append(h2, text4);
				append(h2, text5);
				append(h2, text6);
				append(header, text7);
				append(header, h3);
				append(h3, text8);
				current = true;
			},

			p: function update(changed, ctx) {
				if ((changed.meta) && text0_value !== (text0_value = ctx.meta[4])) {
					setData(text0, text0_value);
				}

				if ((changed.meta) && text2_value !== (text2_value = ctx.meta[5])) {
					setData(text2, text2_value);
				}

				if ((changed.meta) && text4_value !== (text4_value = ctx.meta[6])) {
					setData(text4, text4_value);
				}

				if ((changed.meta) && text6_value !== (text6_value = ctx.meta[7])) {
					setData(text6, text6_value);
				}

				if (changed.bismillah) {
					setData(text8, ctx.bismillah);
				}
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(header);
				}
			}
		};
	}

	function SuraHeader(options) {
		this._debugName = '<SuraHeader>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data(), options.data);
		if (!('meta' in this._state)) { console.warn("<SuraHeader> was created without expected data property 'meta'"); }
		if (!('bismillah' in this._state)) { console.warn("<SuraHeader> was created without expected data property 'bismillah'"); }
		this._intro = !!options.intro;

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(SuraHeader.prototype, protoDev);

	SuraHeader.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src/components/Aya.html generated by Svelte v2.15.3 */

	var file$1 = "src/components/Aya.html";

	function create_main_fragment$1(component, ctx) {
		var text0_value = ctx.aya.text, text0, text1, text2, if_block1_anchor, current;

		var if_block0 = (ctx.aya.sajda !== ctx.undefined) && create_if_block_1(component, ctx);

		var if_block1 = (ctx.aya.ruku) && create_if_block(component, ctx);

		return {
			c: function create() {
				text0 = createText(text0_value);
				text1 = createText("\n");
				if (if_block0) { if_block0.c(); }
				text2 = createText("\n");
				if (if_block1) { if_block1.c(); }
				if_block1_anchor = createComment();
			},

			m: function mount(target, anchor) {
				insert(target, text0, anchor);
				insert(target, text1, anchor);
				if (if_block0) { if_block0.m(target, anchor); }
				insert(target, text2, anchor);
				if (if_block1) { if_block1.m(target, anchor); }
				insert(target, if_block1_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if ((changed.aya) && text0_value !== (text0_value = ctx.aya.text)) {
					setData(text0, text0_value);
				}

				if (ctx.aya.sajda !== ctx.undefined) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_1(component, ctx);
						if_block0.c();
						if_block0.m(text2.parentNode, text2);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (ctx.aya.ruku) {
					if (!if_block1) {
						if_block1 = create_if_block(component, ctx);
						if_block1.c();
						if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(text0);
					detachNode(text1);
				}

				if (if_block0) { if_block0.d(detach); }
				if (detach) {
					detachNode(text2);
				}

				if (if_block1) { if_block1.d(detach); }
				if (detach) {
					detachNode(if_block1_anchor);
				}
			}
		};
	}

	// (2:0) {#if aya.sajda !== undefined}
	function create_if_block_1(component, ctx) {
		var img, img_alt_value;

		return {
			c: function create() {
				img = createElement("img");
				img.src = "public/resources/sajda.svg";
				img.alt = img_alt_value = ctx.aya.sajda;
				img.title = "Sajda";
				img.height = "32";
				img.className = "svelte-1lgkrcq";
				addLoc(img, file$1, 2, 0, 41);
			},

			m: function mount(target, anchor) {
				insert(target, img, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.aya) && img_alt_value !== (img_alt_value = ctx.aya.sajda)) {
					img.alt = img_alt_value;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(img);
				}
			}
		};
	}

	// (5:0) {#if aya.ruku}
	function create_if_block(component, ctx) {
		var img;

		return {
			c: function create() {
				img = createElement("img");
				img.src = "public/resources/ruku.svg";
				img.alt = "Ruku";
				img.title = "Ruku";
				img.height = "32";
				img.className = "svelte-1lgkrcq";
				addLoc(img, file$1, 5, 0, 141);
			},

			m: function mount(target, anchor) {
				insert(target, img, anchor);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(img);
				}
			}
		};
	}

	function Aya(options) {
		this._debugName = '<Aya>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({ undefined : undefined }, options.data);
		if (!('aya' in this._state)) { console.warn("<Aya> was created without expected data property 'aya'"); }
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$1(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Aya.prototype, protoDev);

	Aya.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src/components/SuraContent.html generated by Svelte v2.15.3 */

	function start(props) {
	  return props.ayas[0].aya
	}
	function inlineStyle(props) {
	  return ("counter-reset: section " + (props.start - 1) + ";");
	}
	var file$2 = "src/components/SuraContent.html";

	function get_each_context(ctx, list, i) {
		var child_ctx = Object.create(ctx);
		child_ctx.aya = list[i];
		return child_ctx;
	}

	function create_main_fragment$2(component, ctx) {
		var ol, current;

		var each_value = ctx.ayas;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(function () {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) { fn(); }
				});
			}
		}

		return {
			c: function create() {
				ol = createElement("ol");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				ol.start = ctx.start;
				ol.style.cssText = ctx.inlineStyle;
				ol.dir = "rtl";
				ol.className = "svelte-arezio";
				addLoc(ol, file$2, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, ol, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(ol, null);
				}

				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.ayas) {
					each_value = ctx.ayas;

					for (var i = 0; i < each_value.length; i += 1) {
						var child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(ol, null);
					}
					for (; i < each_blocks.length; i += 1) { outroBlock(i, 1); }
				}

				if (!current || changed.start) {
					ol.start = ctx.start;
				}

				if (!current || changed.inlineStyle) {
					ol.style.cssText = ctx.inlineStyle;
				}
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				each_blocks = each_blocks.filter(Boolean);
				var countdown = callAfter(outrocallback, each_blocks.length);
				for (var i = 0; i < each_blocks.length; i += 1) { outroBlock(i, 0, countdown); }

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(ol);
				}

				destroyEach(each_blocks, detach);
			}
		};
	}

	// (2:2) {#each ayas as aya}
	function create_each_block(component, ctx) {
		var li, text, current;

		var aya_initial_data = { aya: ctx.aya };
		var aya = new Aya({
			root: component.root,
			store: component.store,
			data: aya_initial_data
		});

		return {
			c: function create() {
				li = createElement("li");
				aya._fragment.c();
				text = createText("\n  ");
				li.className = "svelte-arezio";
				addLoc(li, file$2, 2, 2, 73);
			},

			m: function mount(target, anchor) {
				insert(target, li, anchor);
				aya._mount(li, null);
				append(li, text);
				current = true;
			},

			p: function update(changed, ctx) {
				var aya_changes = {};
				if (changed.ayas) { aya_changes.aya = ctx.aya; }
				aya._set(aya_changes);
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				if (aya) { aya._fragment.o(outrocallback); }
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(li);
				}

				aya.destroy();
			}
		};
	}

	function SuraContent(options) {
		this._debugName = '<SuraContent>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);

		this._recompute({  }, this._state);


		if (!('ayas' in this._state)) { console.warn("<SuraContent> was created without expected data property 'ayas'"); }
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$2(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(SuraContent.prototype, protoDev);

	SuraContent.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('start' in newState && !this._updatingReadonlyProperty) { throw new Error("<SuraContent>: Cannot set read-only property 'start'"); }
		if ('inlineStyle' in newState && !this._updatingReadonlyProperty) { throw new Error("<SuraContent>: Cannot set read-only property 'inlineStyle'"); }
	};

	SuraContent.prototype._recompute = function _recompute(changed, state) {
		if (this._differs(state.start, (state.start = start(exclude(state, "start"))))) { changed.start = true; }
		if (this._differs(state.inlineStyle, (state.inlineStyle = inlineStyle(exclude(state, "inlineStyle"))))) { changed.inlineStyle = true; }
	};

	/* src/components/Sura.html generated by Svelte v2.15.3 */





	var file$3 = "src/components/Sura.html";

	function create_main_fragment$3(component, ctx) {
		var article, text, current;

		var if_block = (ctx.ayas[0].aya === 1) && create_if_block$1(component, ctx);

		var content_initial_data = { ayas: ctx.ayas };
		var content = new SuraContent({
			root: component.root,
			store: component.store,
			data: content_initial_data
		});

		return {
			c: function create() {
				article = createElement("article");
				if (if_block) { if_block.c(); }
				text = createText("\n  ");
				content._fragment.c();
				article.className = "svelte-hl4ji2";
				addLoc(article, file$3, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, article, anchor);
				if (if_block) { if_block.m(article, null); }
				append(article, text);
				content._mount(article, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.ayas[0].aya === 1) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block$1(component, ctx);
						if (if_block) { if_block.c(); }
					}

					if_block.i(article, text);
				} else if (if_block) {
					if_block.o(function() {
						if_block.d(1);
						if_block = null;
					});
				}

				var content_changes = {};
				if (changed.ayas) { content_changes.ayas = ctx.ayas; }
				content._set(content_changes);
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				outrocallback = callAfter(outrocallback, 2);

				if (if_block) { if_block.o(outrocallback); }
				else { outrocallback(); }

				if (content) { content._fragment.o(outrocallback); }
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(article);
				}

				if (if_block) { if_block.d(); }
				content.destroy();
			}
		};
	}

	// (2:2) {#if ayas[0].aya === 1}
	function create_if_block$1(component, ctx) {
		var current;

		var header_initial_data = { meta: ctx.meta };
		var header = new SuraHeader({
			root: component.root,
			store: component.store,
			data: header_initial_data
		});

		return {
			c: function create() {
				header._fragment.c();
			},

			m: function mount(target, anchor) {
				header._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var header_changes = {};
				if (changed.meta) { header_changes.meta = ctx.meta; }
				header._set(header_changes);
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				if (header) { header._fragment.o(outrocallback); }
				current = false;
			},

			d: function destroy$$1(detach) {
				header.destroy(detach);
			}
		};
	}

	function Sura(options) {
		this._debugName = '<Sura>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);
		if (!('ayas' in this._state)) { console.warn("<Sura> was created without expected data property 'ayas'"); }
		if (!('meta' in this._state)) { console.warn("<Sura> was created without expected data property 'meta'"); }
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$3(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Sura.prototype, protoDev);

	Sura.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src/components/Page.html generated by Svelte v2.15.3 */



	var file$4 = "src/components/Page.html";

	function get_each_context$1(ctx, list, i) {
		var child_ctx = Object.create(ctx);
		child_ctx.sura = list[i];
		return child_ctx;
	}

	function create_main_fragment$4(component, ctx) {
		var section, current;

		var each_value = ctx.$page;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$1(component, get_each_context$1(ctx, each_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(function () {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) { fn(); }
				});
			}
		}

		return {
			c: function create() {
				section = createElement("section");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				section.className = "svelte-jjcuoy";
				addLoc(section, file$4, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, section, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(section, null);
				}

				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.$page) {
					each_value = ctx.$page;

					for (var i = 0; i < each_value.length; i += 1) {
						var child_ctx = get_each_context$1(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$1(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(section, null);
					}
					for (; i < each_blocks.length; i += 1) { outroBlock(i, 1); }
				}
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				each_blocks = each_blocks.filter(Boolean);
				var countdown = callAfter(outrocallback, each_blocks.length);
				for (var i = 0; i < each_blocks.length; i += 1) { outroBlock(i, 0, countdown); }

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(section);
				}

				destroyEach(each_blocks, detach);
			}
		};
	}

	// (2:2) {#each $page as sura}
	function create_each_block$1(component, ctx) {
		var current;

		var sura_initial_data = { ayas: ctx.sura.data, meta: ctx.sura.meta };
		var sura = new Sura({
			root: component.root,
			store: component.store,
			data: sura_initial_data
		});

		return {
			c: function create() {
				sura._fragment.c();
			},

			m: function mount(target, anchor) {
				sura._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var sura_changes = {};
				if (changed.$page) { sura_changes.ayas = ctx.sura.data; }
				if (changed.$page) { sura_changes.meta = ctx.sura.meta; }
				sura._set(sura_changes);
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				if (sura) { sura._fragment.o(outrocallback); }
				current = false;
			},

			d: function destroy$$1(detach) {
				sura.destroy(detach);
			}
		};
	}

	function Page(options) {
		this._debugName = '<Page>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}
		if (!options.store) {
			throw new Error("<Page> references store properties, but no store was provided");
		}

		init(this, options);
		this._state = assign(this.store._init(["page"]), options.data);
		this.store._add(this, ["page"]);
		if (!('$page' in this._state)) { console.warn("<Page> was created without expected data property '$page'"); }
		this._intro = !!options.intro;

		this._handlers.destroy = [removeFromStore];

		this._fragment = create_main_fragment$4(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Page.prototype, protoDev);

	Page.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	function nextIndex(currentIndex, totalPages) {
	    return (currentIndex + 1) % totalPages || 1;
	}

	function prevIndex(currentIndex, totalPages) {
	    return (
	        (totalPages + currentIndex - 1) % totalPages ||
	        (totalPages - 1)
	    )
	}

	var PAGE = 'page';
	var SURA = 'sura';
	var PAGING_TYPE = 'pagingType';
	var PAGING_INDEX = 'pagingIndex';

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

	/* src/components/Navigation.html generated by Svelte v2.15.3 */



	function data$1() {
	  return {
	    PAGE: PAGE,
	    SURA: SURA
	  }
	}
	var methods = {
	  next: function () {
	    var state = this.store.get();
	    this.store.set({
	      pagingIndex: nextIndex(state.pagingIndex, state.pagingTotal)
	    });
	  },
	  previous: function () {
	    var state = this.store.get();
	    this.store.set({
	      pagingIndex: prevIndex(state.pagingIndex, state.pagingTotal)
	    });
	  },
	  onTypeChange: function (event) {
	    this.store.set({
	      pagingType: event.target.value,
	      pagingIndex: 1
	    });
	  },
	  onPageChange: function (event) {
	    this.store.set({
	      pagingIndex: parseInt(event.target.value, 10)
	    });
	  }
	};

	function onupdate() {
	  setTimeout(resizeSelect, 0, this.refs.select);
	}
	var file$5 = "src/components/Navigation.html";

	function get_each_context$2(ctx, list, i) {
		var child_ctx = Object.create(ctx);
		child_ctx.meta = list[i];
		child_ctx.x = i;
		return child_ctx;
	}

	function create_main_fragment$5(component, ctx) {
		var nav, button0, svg0, path0, text0, span0, text2, button1, span1, text4, svg1, path1, text5, form, select0, option0, text6, option0_selected_value, option1, text7, option1_selected_value, text8, select1, text9, span2, text10, current;

		function click_handler(event) {
			component.next();
		}

		function click_handler_1(event) {
			component.previous();
		}

		function change_handler(event) {
			component.onTypeChange(event);
		}

		var each_value = ctx.$pagingMeta;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$2(component, get_each_context$2(ctx, each_value, i));
		}

		function change_handler_1(event) {
			component.onPageChange(event);
		}

		var if_block = (ctx.$pagingType === ctx.PAGE) && create_if_block$2(component, ctx);

		return {
			c: function create() {
				nav = createElement("nav");
				button0 = createElement("button");
				svg0 = createSvgElement("svg");
				path0 = createSvgElement("path");
				text0 = createText("\n    ");
				span0 = createElement("span");
				span0.textContent = "Next";
				text2 = createText("\n\n  ");
				button1 = createElement("button");
				span1 = createElement("span");
				span1.textContent = "Previous";
				text4 = createText("\n    ");
				svg1 = createSvgElement("svg");
				path1 = createSvgElement("path");
				text5 = createText("\n\n  ");
				form = createElement("form");
				select0 = createElement("select");
				option0 = createElement("option");
				text6 = createText("Sura");
				option1 = createElement("option");
				text7 = createText("Page");
				text8 = createText("\n    ");
				select1 = createElement("select");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text9 = createText("\n    ");
				span2 = createElement("span");
				text10 = createText(" \n      ");
				if (if_block) { if_block.c(); }
				setAttribute(path0, "d", "M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z");
				setAttribute(path0, "fill", "#0151a9");
				addLoc(path0, file$5, 3, 6, 115);
				setAttribute(svg0, "width", "12");
				setAttribute(svg0, "height", "20");
				setAttribute(svg0, "viewBox", "0 0 12 20");
				setAttribute(svg0, "class", "svelte-1x79hk7");
				addLoc(svg0, file$5, 2, 4, 60);
				span0.className = "svelte-1x79hk7";
				addLoc(span0, file$5, 5, 4, 198);
				addListener(button0, "click", click_handler);
				button0.className = "next svelte-1x79hk7";
				addLoc(button0, file$5, 1, 2, 16);
				span1.className = "svelte-1x79hk7";
				addLoc(span1, file$5, 9, 4, 283);
				setAttribute(path1, "d", "M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z");
				setAttribute(path1, "fill", "#0151a9");
				addLoc(path1, file$5, 11, 6, 364);
				setAttribute(svg1, "width", "12");
				setAttribute(svg1, "height", "20");
				setAttribute(svg1, "viewBox", "0 0 12 20");
				setAttribute(svg1, "class", "svelte-1x79hk7");
				addLoc(svg1, file$5, 10, 4, 309);
				addListener(button1, "click", click_handler_1);
				button1.className = "previous svelte-1x79hk7";
				addLoc(button1, file$5, 8, 2, 231);
				option0.__value = ctx.SURA;
				option0.value = option0.__value;
				option0.selected = option0_selected_value = ctx.$pagingType===ctx.SURA;
				addLoc(option0, file$5, 17, 6, 572);
				option1.__value = ctx.PAGE;
				option1.value = option1.__value;
				option1.selected = option1_selected_value = ctx.$pagingType===ctx.PAGE;
				addLoc(option1, file$5, 18, 6, 643);
				addListener(select0, "change", change_handler);
				setAttribute(select0, "aria-label", "Select Page Type");
				select0.className = "svelte-1x79hk7";
				addLoc(select0, file$5, 16, 4, 495);
				addListener(select1, "change", change_handler_1);
				setAttribute(select1, "aria-label", "Select Page");
				select1.className = "svelte-1x79hk7";
				addLoc(select1, file$5, 20, 4, 726);
				addLoc(span2, file$5, 25, 4, 944);
				setAttribute(form, "onsubmit", "return false");
				form.className = "svelte-1x79hk7";
				addLoc(form, file$5, 15, 2, 460);
				nav.lang = "en";
				nav.className = "svelte-1x79hk7";
				addLoc(nav, file$5, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, nav, anchor);
				append(nav, button0);
				append(button0, svg0);
				append(svg0, path0);
				append(button0, text0);
				append(button0, span0);
				append(nav, text2);
				append(nav, button1);
				append(button1, span1);
				append(button1, text4);
				append(button1, svg1);
				append(svg1, path1);
				append(nav, text5);
				append(nav, form);
				append(form, select0);
				append(select0, option0);
				append(option0, text6);
				append(select0, option1);
				append(option1, text7);
				append(form, text8);
				append(form, select1);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select1, null);
				}

				component.refs.select = select1;
				append(form, text9);
				append(form, span2);
				append(span2, text10);
				if (if_block) { if_block.m(span2, null); }
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.SURA) {
					option0.__value = ctx.SURA;
				}

				option0.value = option0.__value;
				if ((changed.$pagingType || changed.SURA) && option0_selected_value !== (option0_selected_value = ctx.$pagingType===ctx.SURA)) {
					option0.selected = option0_selected_value;
				}

				if (changed.PAGE) {
					option1.__value = ctx.PAGE;
				}

				option1.value = option1.__value;
				if ((changed.$pagingType || changed.PAGE) && option1_selected_value !== (option1_selected_value = ctx.$pagingType===ctx.PAGE)) {
					option1.selected = option1_selected_value;
				}

				if (changed.$pagingIndex || changed.$pagingMeta) {
					each_value = ctx.$pagingMeta;

					for (var i = 0; i < each_value.length; i += 1) {
						var child_ctx = get_each_context$2(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$2(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(select1, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}

				if (ctx.$pagingType === ctx.PAGE) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block$2(component, ctx);
						if_block.c();
						if_block.m(span2, null);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(nav);
				}

				removeListener(button0, "click", click_handler);
				removeListener(button1, "click", click_handler_1);
				removeListener(select0, "change", change_handler);

				destroyEach(each_blocks, detach);

				removeListener(select1, "change", change_handler_1);
				if (component.refs.select === select1) { component.refs.select = null; }
				if (if_block) { if_block.d(); }
			}
		};
	}

	// (22:6) {#each $pagingMeta as meta, x}
	function create_each_block$2(component, ctx) {
		var option, text_value = ctx.meta, text, option_selected_value;

		return {
			c: function create() {
				option = createElement("option");
				text = createText(text_value);
				option.__value = ctx.x+1;
				option.value = option.__value;
				option.selected = option_selected_value = ctx.$pagingIndex===ctx.x+1;
				addLoc(option, file$5, 22, 6, 846);
			},

			m: function mount(target, anchor) {
				insert(target, option, anchor);
				append(option, text);
			},

			p: function update(changed, ctx) {
				if ((changed.$pagingMeta) && text_value !== (text_value = ctx.meta)) {
					setData(text, text_value);
				}

				if ((changed.$pagingIndex) && option_selected_value !== (option_selected_value = ctx.$pagingIndex===ctx.x+1)) {
					option.selected = option_selected_value;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(option);
				}
			}
		};
	}

	// (27:6) {#if $pagingType === PAGE}
	function create_if_block$2(component, ctx) {
		var text_value = ctx.$page.map(function(sura){ return sura.meta[4] }).join(' ,'), text;

		return {
			c: function create() {
				text = createText(text_value);
			},

			m: function mount(target, anchor) {
				insert(target, text, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.$page) && text_value !== (text_value = ctx.$page.map(function(sura){ return sura.meta[4] }).join(' ,'))) {
					setData(text, text_value);
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(text);
				}
			}
		};
	}

	function Navigation(options) {
		var this$1 = this;

		this._debugName = '<Navigation>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}
		if (!options.store) {
			throw new Error("<Navigation> references store properties, but no store was provided");
		}

		init(this, options);
		this.refs = {};
		this._state = assign(assign(this.store._init(["pagingType","pagingMeta","pagingIndex","page"]), data$1()), options.data);
		this.store._add(this, ["pagingType","pagingMeta","pagingIndex","page"]);
		if (!('SURA' in this._state)) { console.warn("<Navigation> was created without expected data property 'SURA'"); }
		if (!('$pagingType' in this._state)) { console.warn("<Navigation> was created without expected data property '$pagingType'"); }
		if (!('PAGE' in this._state)) { console.warn("<Navigation> was created without expected data property 'PAGE'"); }
		if (!('$pagingMeta' in this._state)) { console.warn("<Navigation> was created without expected data property '$pagingMeta'"); }
		if (!('$pagingIndex' in this._state)) { console.warn("<Navigation> was created without expected data property '$pagingIndex'"); }
		if (!('$page' in this._state)) { console.warn("<Navigation> was created without expected data property '$page'"); }
		this._intro = !!options.intro;
		this._handlers.update = [onupdate];

		this._handlers.destroy = [removeFromStore];

		this._fragment = create_main_fragment$5(this, this._state);

		this.root._oncreate.push(function () {
			this$1.fire("update", { changed: assignTrue({}, this$1._state), current: this$1._state });
		});

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Navigation.prototype, protoDev);
	assign(Navigation.prototype, methods);

	Navigation.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src/components/App.html generated by Svelte v2.15.3 */





	var file$6 = "src/components/App.html";

	function create_main_fragment$6(component, ctx) {
		var main, header, text0, text1, footer, current;

		var navigation0 = new Navigation({
			root: component.root,
			store: component.store
		});

		var page = new Page({
			root: component.root,
			store: component.store
		});

		var navigation1 = new Navigation({
			root: component.root,
			store: component.store
		});

		return {
			c: function create() {
				main = createElement("main");
				header = createElement("header");
				navigation0._fragment.c();
				text0 = createText("\n\t");
				page._fragment.c();
				text1 = createText("\n\t");
				footer = createElement("footer");
				navigation1._fragment.c();
				header.className = "svelte-6bnxsa";
				addLoc(header, file$6, 1, 1, 8);
				footer.className = "svelte-6bnxsa";
				addLoc(footer, file$6, 5, 1, 56);
				main.className = "svelte-6bnxsa";
				addLoc(main, file$6, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, main, anchor);
				append(main, header);
				navigation0._mount(header, null);
				append(main, text0);
				page._mount(main, null);
				append(main, text1);
				append(main, footer);
				navigation1._mount(footer, null);
				current = true;
			},

			p: noop,

			i: function intro(target, anchor) {
				if (current) { return; }

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) { return; }

				outrocallback = callAfter(outrocallback, 3);

				if (navigation0) { navigation0._fragment.o(outrocallback); }
				if (page) { page._fragment.o(outrocallback); }
				if (navigation1) { navigation1._fragment.o(outrocallback); }
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(main);
				}

				navigation0.destroy();
				page.destroy();
				navigation1.destroy();
			}
		};
	}

	function App(options) {
		this._debugName = '<App>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$6(this, this._state);

		if (options.target) {
			if (options.hydrate) { throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option"); }
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(App.prototype, protoDev);

	App.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	function Store(state, options) {
		this._handlers = {};
		this._dependents = [];

		this._computed = blankObject();
		this._sortedComputedProperties = [];

		this._state = assign({}, state);
		this._differs = options && options.immutable ? _differsImmutable : _differs;
	}

	assign(Store.prototype, {
		_add: function _add(component, props) {
			this._dependents.push({
				component: component,
				props: props
			});
		},

		_init: function _init(props) {
			var state = {};
			for (var i = 0; i < props.length; i += 1) {
				var prop = props[i];
				state['$' + prop] = this._state[prop];
			}
			return state;
		},

		_remove: function _remove(component) {
			var i = this._dependents.length;
			while (i--) {
				if (this._dependents[i].component === component) {
					this._dependents.splice(i, 1);
					return;
				}
			}
		},

		_set: function _set$$1(newState, changed) {
			var this$1 = this;

			var previous = this._state;
			this._state = assign(assign({}, previous), newState);

			for (var i = 0; i < this._sortedComputedProperties.length; i += 1) {
				this._sortedComputedProperties[i].update(this._state, changed);
			}

			this.fire('state', {
				changed: changed,
				previous: previous,
				current: this._state
			});

			this._dependents
				.filter(function (dependent) {
					var componentState = {};
					var dirty = false;

					for (var j = 0; j < dependent.props.length; j += 1) {
						var prop = dependent.props[j];
						if (prop in changed) {
							componentState['$' + prop] = this$1._state[prop];
							dirty = true;
						}
					}

					if (dirty) {
						dependent.component._stage(componentState);
						return true;
					}
				})
				.forEach(function (dependent) {
					dependent.component.set({});
				});

			this.fire('update', {
				changed: changed,
				previous: previous,
				current: this._state
			});
		},

		_sortComputedProperties: function _sortComputedProperties() {
			var computed = this._computed;
			var sorted = this._sortedComputedProperties = [];
			var visited = blankObject();
			var currentKey;

			function visit(key) {
				var c = computed[key];

				if (c) {
					c.deps.forEach(function (dep) {
						if (dep === currentKey) {
							throw new Error(("Cyclical dependency detected between " + dep + " <-> " + key));
						}

						visit(dep);
					});

					if (!visited[key]) {
						visited[key] = true;
						sorted.push(c);
					}
				}
			}

			for (var key in this._computed) {
				visit(currentKey = key);
			}
		},

		compute: function compute(key, deps, fn) {
			var this$1 = this;

			var value;

			var c = {
				deps: deps,
				update: function (state, changed, dirty) {
					var values = deps.map(function (dep) {
						if (dep in changed) { dirty = true; }
						return state[dep];
					});

					if (dirty) {
						var newValue = fn.apply(null, values);
						if (this$1._differs(newValue, value)) {
							value = newValue;
							changed[key] = true;
							state[key] = value;
						}
					}
				}
			};

			this._computed[key] = c;
			this._sortComputedProperties();

			var state = assign({}, this._state);
			var changed = {};
			c.update(state, changed, true);
			this._set(state, changed);
		},

		fire: fire,

		get: get,

		on: on,

		set: function set$$1(newState) {
			var oldState = this._state;
			var changed = this._changed = {};
			var dirty = false;

			for (var key in newState) {
				if (this._computed[key]) { throw new Error(("'" + key + "' is a read-only computed property")); }
				if (this._differs(newState[key], oldState[key])) { changed[key] = dirty = true; }
			}
			if (!dirty) { return; }

			this._set(newState, changed);
		}
	});

	// Quran Metadata (ver 1.0)
	// Copyright (C) 2008-2009 Tanzil.info
	// License: Creative Commons Attribution 3.0

	//------------------ Sura Data ---------------------

	var Sura$1 = [
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

	var Ruku = [
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

	var Page$1 = [
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

	var Sajda = [
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
		[96, 19, 'obligatory'] ];

	var pageMeta, suraMeta;

	function computePagingMeta(pagingType) {
	    switch (pagingType) {
	        case PAGE:
	            return pageMeta || (
	                pageMeta = Page$1.reduce(function (accum, item, i, items) {
	                    if (item.length && i + 1 !== items.length) {
	                        accum.push(i.toString());
	                    }
	                    return accum;
	                }, [])
	            );
	        case SURA:
	            return suraMeta || (
	                suraMeta = Sura$1.reduce(function (accum, item, i) {
	                    var val;
	                    if ((val = item[4])) {
	                        accum.push(val + ' ' + item[5]);
	                    }
	                    return accum;
	                }, [])
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
	            return getAyaIndex.apply(null, Page$1[index]);
	        case SURA:
	            return Sura$1[index][0];
	        default:
	            return -1;
	    }
	}

	function getPageEnd(pagingType, index) {
	    switch (pagingType) {
	        case PAGE:
	            return getAyaIndex.apply(null, Page$1[index + 1]);
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
	        var groupName = item['sura'].toString();
	        if (!Object.prototype.hasOwnProperty.call(accumulator, groupName)) {
	            accumulator[groupName] = [];
	        }
	        accumulator[groupName].push(item);
	        return accumulator;
	    }, {});
	}

	function applySuraMeta(obj) {
	    return Object.keys(obj).map(function (suraNumber) {
	        return {
	            meta: getSuraMeta(suraNumber),
	            data: obj[suraNumber]
	        }
	    })
	}

	function computePage(quran, pagingType, pagingIndex) {
	    return applySuraMeta(groupBySura(getPage(quran, pagingType, pagingIndex)));
	}

	var totals = {};
	totals[PAGE] = Page$1.length - 1;
	totals[SURA] = Sura$1.length - 1;

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

	var store = new Store({
	  quran: [],
	  pagingType: PAGE,
	  pagingIndex: 1,
	  //pagingTotal: 0,
	  page: [],
	});

	store.compute(PAGE, ['quran', PAGING_TYPE, PAGING_INDEX], computePage);
	store.compute('pagingTotal', [PAGING_TYPE], computePagesTotal);
	store.compute('pagingMeta', [PAGING_TYPE], computePagingMeta);

	function hasOwnProperty(object, property) {
	    return Object.prototype.hasOwnProperty.call(object, property);
	}

	function extend(obj, props) {
	    for (var i in props) { obj[i] = props[i]; }
	    return obj;
	}

	function _assign() {
	    var args = arguments;
	    var target = args[0];

	    for (var i = 1, l = args.length; i < l; i++) {
	        target = extend(target, args[i]);
	    }

	    return target;
	}

	var assign$1 = Object.assign || _assign;

	function megabytes(bytes){
	  return ((Math.round(bytes * 100/1048576)/100) + " MB");
	}

	function kilobytes(bytes){
	  return bytes < 1048576 ? ((Math.round(bytes * 100/1024)/100) + " KB") : megabytes(bytes);
	}

	function bytes(bytes){
	  return bytes < 1024 ? (bytes + " B") : kilobytes(bytes);
	}

	function ajax(config) {
	  return doAJAX(getXHR(), applyConfig(config));
	}

	function readyStateDone(progressEvent, config) {
	  return progressEvent.target.status < 400 ?
	    config.success(progressEvent) :
	    config.error(progressEvent);
	}

	function onReadyStateChange(progressEvent, config) {
	  return (
	    progressEvent.target.readyState === 4 &&
	    readyStateDone(progressEvent, config)
	  )
	}

	function applyConfig(config) {
	  return assign$1({}, config);
	}

	function getXHR() {
	  return new XMLHttpRequest();
	}

	function doAJAX(xhr, config) {
	  xhr.onprogress = config.progress;
	  xhr.onreadystatechange = function onreadystatechange(progressEvent){
	    onReadyStateChange(progressEvent, config);
	  };
	  xhr.open(config.method || 'GET', config.url, true);
	  xhr.send(config.data);
	  return xhr;
	}

	function getProgress(loaded, total) {
	  return total === 0 ?
	    bytes(loaded) :
	    ((Math.round(loaded * 100/ total)) + "%");
	}

	function getError(xhr) {
	  return xhr.statusText + ': ' + xhr.responseURL
	}

	var location = document.location;
	var hashbang = '#!/';
	var regexr = /#!\/((page)|(sura))\/(\d+)/;
	var defaultPath = 'page/1';

	function onLocationChange(store) {
	    return function (hashchange) {
	        var change = validate(location.hash);
	        var pagingType = change[1];
	        if (change) {
	            store.set({
	                pagingType: pagingType,
	                pagingIndex: getBoundIndex(pagingType, change[4])
	            });
	        }
	    }
	}

	function navigate(path) {
	    return (location.hash = hashbang + path);
	}

	function validate(hash) {
	    return regexr.exec(location.hash) || (navigate(defaultPath) && false);
	}

	function onStateChange(state) {
	    var changed = state.changed;
	    var current = state.current;
	    if (
	        hasOwnProperty(changed, PAGING_INDEX) ||
	        hasOwnProperty(changed, PAGING_TYPE)
	    ) {
	        navigate(current.pagingType + '/' + current.pagingIndex);
	    }
	}

	function init$1(store) {
	    var onHashChange = onLocationChange(store);
	    window.addEventListener('hashchange', onHashChange);
	    store.on('state', onStateChange);
	    onHashChange();
	}

	var Router = {
	    init: init$1,
	    navigate: navigate
	};

	function applySura(array) {
	    return Array.prototype.concat.apply([], Sura$1.map(function suraMap(item, suraIndex) {
	        return array.slice(item[0], item[0] + item[1])
	            .map(function (text, ayaIndex) {
	                return Object.create(null, {
	                    text: {
	                        value: ayaIndex === 0 ? removeBismillah(text) : text
	                    },
	                    aya: {
	                        value: ayaIndex + 1
	                    },
	                    sura: {
	                        value: suraIndex
	                    }
	                })
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

	var preloader = document.getElementById('preloader');

	function showMessage(message) {
	  preloader.childNodes[0].innerHTML = message;
	}
	showMessage('connecting server...');

	ajax({
	  url: 'data/quran-simple.txt',
	  progress: function onProgress(progressEvent) {
	    showMessage(
	      ("loading data " + (getProgress(progressEvent.loaded, progressEvent.total)))
	    );
	  },
	  success: function onSuccess(progressEvent) {

	    preloader.parentNode.removeChild(preloader);
	    preloader = null;

	    store.set({
	      quran: prepare(
	        progressEvent.target.responseText.replace(/\r?\n|\r/g, '|').split('|')
	      )
	    });

	    Router.init(store);

	    new App({
	      target: document.body,
	      store: store
	    });
	  },
	  error: function onError(progressEvent) {
	    showMessage(getError(progressEvent.target));
	  }
	});

}());
//# sourceMappingURL=bundle.js.map
