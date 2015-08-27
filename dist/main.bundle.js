/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	__webpack_require__(1);

	var _componentsCarousel = __webpack_require__(5);

	var _componentsCarousel2 = _interopRequireDefault(_componentsCarousel);

	var $app = document.getElementById('app');

	// get data from api
	fetch('http://lg-devtest.herokuapp.com/data.json', { headers: { Authorization: 'Bearer u12A8f3Zg' } })
	// convert response to json
	.then(function (response) {
	    if (response.status === 403) throw new Error(response.statusText);
	    return response.json();
	})
	// filter and sort movies from collections
	.then(function (responseObj) {
	    return responseObj.data
	    // get movies from all collections
	    .reduce(function (assets, collection) {
	        return assets.concat(collection.assets);
	    }, [])
	    // filter action movies only
	    .filter(function (movie) {
	        return movie.genre === 'Action';
	    })
	    // sort by imdb note
	    .sort(function (movie1, movie2) {
	        return movie2.imdb - movie1.imdb;
	    });
	})
	// add carousel to the page
	.then(function (movies) {
	    var carousel = new _componentsCarousel2['default']({
	        items: movies,
	        perRow: 3
	    });

	    $app.appendChild(carousel.render().el);
	})

	// if api is not available, show a simple error message
	['catch'](function (err) {
	    $app.innerHTML = err.message;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n    font-family: Tahoma, Verdana, sans-serif;\n    background: #eee;\n    margin: 0;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	__webpack_require__(6);

	var Carousel = (function () {
	    function Carousel(config) {
	        _classCallCheck(this, Carousel);

	        this.el = document.createElement('div');
	        this.wrapper = document.createElement('div');
	        this.navigation = document.createElement('div');

	        this.config = config;
	        this.state = { index: 0 };

	        return this;
	    }

	    _createClass(Carousel, [{
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var renderedListsHTML = '';
	            var items = this.config.items;
	            var perRow = this.config.perRow;
	            var numRows = Math.ceil(items.length / perRow);

	            // create navigation buttons
	            this.navigation.innerHTML = '<button class="carousel__navigationLeft" data-js="prev">‹</button>\n                                    <button class="carousel__navigationRight" data-js="next">›</button>';

	            // create as many lists as necessary to hold {perRow} items. this allow fit of the items by using percentage
	            for (var i = 0; i < numRows; i++) {
	                var first = i * perRow;
	                var last = i * perRow + perRow;

	                renderedListsHTML += '<div class="carousel__list">\n                                    ' + items.slice(first, last).map(function (item) {
	                    return _this.renderItem(item);
	                }).join('') + '\n                                </div>';
	            }

	            // set the html to the main wrapper that handles positioning
	            this.wrapper.innerHTML = renderedListsHTML;

	            this.el.classList.add('carousel');
	            this.wrapper.classList.add('carousel__wrapper');
	            this.navigation.classList.add('carousel__navigation');

	            this.el.appendChild(this.wrapper);
	            this.el.appendChild(this.navigation);

	            this.delegateEvents();
	            this.transform();

	            return this;
	        }
	    }, {
	        key: 'renderItem',
	        value: function renderItem(item) {
	            return '<div class="carousel__item" style="width: ' + 100 / this.config.perRow + '%">\n                    <img src="' + item.img + '" alt="' + item.title + '" />\n                    <h3>' + item.imdb + ' - ' + item.title + '</h3>\n                </div>';
	        }
	    }, {
	        key: 'delegateEvents',
	        value: function delegateEvents() {
	            var _this2 = this;

	            document.addEventListener('keydown', function (e) {
	                if (e.which === 39) return _this2.moveNext(e);
	                if (e.which === 37) return _this2.movePrev(e);
	            });

	            this.el.addEventListener('mousemove', function (e) {
	                _this2.highlight(e);
	            });

	            this.el.addEventListener('click', function (e) {
	                if (e.target.dataset.js === 'next') return _this2.moveNext(e);
	                if (e.target.dataset.js === 'prev') return _this2.movePrev(e);
	            });
	        }
	    }, {
	        key: 'moveNext',
	        value: function moveNext(e) {
	            // do not pass the index limit, which is {total amount of items} - {items per row}
	            this.state.index = Math.min(this.config.items.length - this.config.perRow, this.state.index + 1);;
	            this.transform();
	            this.highlight(e);
	        }
	    }, {
	        key: 'movePrev',
	        value: function movePrev(e) {
	            this.state.index = Math.max(0, this.state.index - 1);
	            this.transform();
	            this.highlight(e);
	        }
	    }, {
	        key: 'transform',
	        value: function transform() {
	            // note: because each list has the same width of the carousel visible overflow,
	            // we can easily extract a percentage by multiplying the current index with the size (in percentage) of each item
	            this.wrapper.style.transform = 'translate3d(-' + 100 / this.config.perRow * this.state.index + '%, 0, 0)';
	        }
	    }, {
	        key: 'highlight',
	        value: function highlight(e) {
	            if (this.state.index > 0 && e.x - this.el.offsetLeft < this.el.offsetWidth / 3) {
	                this.navigation.classList.add('has-prev-highlighted');
	            } else {
	                this.navigation.classList.remove('has-prev-highlighted');
	            }

	            if (this.state.index < this.config.items.length - this.config.perRow && this.el.offsetWidth - e.x - this.el.offsetLeft < this.el.offsetWidth / 3) {
	                this.navigation.classList.add('has-next-highlighted');
	            } else {
	                this.navigation.classList.remove('has-next-highlighted');
	            }
	        }
	    }]);

	    return Carousel;
	})();

	exports['default'] = Carousel;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./carousel.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./carousel.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/**\n * |-- carousel\n *     |-- carousel__navigation\n *     |-- carousel__wrapper\n *         |-- carousel__list\n *             |-- carousel__item\n */\n\n.carousel {\n    position: relative;\n    white-space: nowrap;\n    overflow: hidden;\n}\n\n.carousel__wrapper {\n    transform: translate3d(0, 0, 0);\n    transition: transform 300ms ease;\n}\n\n.carousel__list {\n    display: inline-block;\n    width: 100%;\n}\n\n.carousel__item {\n    background: #000;\n    position: relative;\n    display: inline-block;\n}\n\n.carousel__item img {\n    width: 100%;\n}\n\n.carousel__item h3 {\n    display: block;\n    position: absolute;\n    bottom: 0;\n    margin: 0;\n    padding: 15px;\n    color: #fff;\n    font-weight: lighter;\n}\n\n.carousel__item:before {\n    content: ' ';\n    background: linear-gradient(transparent, rgba(0, 0, 0, .9));\n    position: absolute;\n    height: 20%;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n\n\n.carousel__navigation button {\n    position: absolute;\n    width: 50px;\n    top: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, .8);\n    color: #fff;\n    font-size: 30px;\n    border: 0;\n    outline: none;\n    opacity: 0;\n    cursor: default;\n    transition: opacity 500ms ease;\n}\n\n.carousel__navigation .carousel__navigationLeft {left: 0;}\n.carousel__navigation .carousel__navigationRight {right: 0;}\n\n.carousel__navigation.has-prev-highlighted .carousel__navigationLeft {opacity: 1; cursor: pointer;}\n.carousel__navigation.has-next-highlighted .carousel__navigationRight {opacity: 1; cursor: pointer;}", ""]);

	// exports


/***/ }
/******/ ]);