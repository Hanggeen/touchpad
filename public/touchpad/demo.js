(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/demo/style/style.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/demo/style/style.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../images/games.png */ "./src/demo/images/games.png"));

// Module
exports.push([module.i, "* {\n  margin: 0;\n}\nbody {\n  padding-bottom: 200px;\n}\n.title {\n  background-color: #000;\n  padding: 0 10px;\n}\n.title h1 {\n  display: block;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding: 20px 0px;\n  color: #fff;\n}\n.main {\n  padding: 0 10px;\n  margin: 0 auto;\n  max-width: 1000px;\n}\n.intro {\n  margin-top: 20px;\n  font-size: 15px;\n  color: #333;\n  line-height: 3;\n}\n.intro h4 {\n  margin-top: 10px;\n  padding-left: 15px;\n  font-size: 15px;\n  border-left: 3px solid #333;\n  background-color: #fcfcfc;\n}\n.list {\n  max-width: 500px;\n  margin-top: 20px;\n  padding-bottom: 20px;\n  display: flex;\n  flex-wrap: wrap;\n}\nh2 {\n  margin-top: 15px;\n  font-size: 15px;\n}\n@media screen and (max-width: 500px) {\n  .list div {\n    font-size: 12px;\n    flex: 0 0 20vw;\n    height: 20vw;\n  }\n}\n.time {\n  font-size: 30px;\n  font-weight: 100;\n  width: 660px;\n  text-align: center;\n}\n.game {\n  width: 620px;\n  height: 470px;\n  padding: 20px;\n  display: flex;\n  position: relative;\n}\n.game > .pointer {\n  z-index: 9;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(12px, 12px);\n  width: 150px;\n  height: 150px;\n  border: 8px solid red;\n  transition: transform 0.3s;\n}\n.game > .control {\n  flex: 0 0 150px;\n  height: 470px;\n  margin-right: 8px;\n}\n.game > .control > div {\n  margin-bottom: 8px;\n  width: 150px;\n  height: 150px;\n  flex: 0 0 150px;\n  text-align: center;\n  line-height: 150px;\n  font-size: 20px;\n  font-weight: 100;\n  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);\n}\n.game > .area {\n  position: relative;\n  height: 470px;\n  transition: opacity 0.5s;\n}\n.game > .area > div {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 150px;\n  height: 150px;\n  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n  background-size: 300% 300%;\n  transition: transform 1s;\n}\n.game > .area > div.hide {\n  opacity: 0;\n}\n.game > .area > div:nth-child(1) {\n  background-position: 0px 0px;\n  transform: translate3d(0px, 0px, 0px);\n}\n.game > .area > div:nth-child(2) {\n  background-position: -150px 0px;\n  transform: translate3d(158px, 0px, 0px);\n}\n.game > .area > div:nth-child(3) {\n  background-position: -300px 0px;\n  transform: translate3d(316px, 0px, 0px);\n}\n.game > .area > div:nth-child(4) {\n  background-position: 0px -150px;\n  transform: translate3d(0px, 158px, 0px);\n}\n.game > .area > div:nth-child(5) {\n  background-position: -150px -150px;\n  transform: translate3d(158px, 158px, 0px);\n}\n.game > .area > div:nth-child(6) {\n  background-position: -300px -150px;\n  transform: translate3d(316px, 158px, 0px);\n}\n.game > .area > div:nth-child(7) {\n  background-position: 0px -300px;\n  transform: translate3d(0px, 316px, 0px);\n}\n.game > .area > div:nth-child(8) {\n  background-position: -150px -300px;\n  transform: translate3d(158px, 316px, 0px);\n}\n.game > .area > div:nth-child(9) {\n  opacity: 0.5;\n  background-position: -300px -300px;\n  transform: translate3d(316px, 316px, 0px);\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),

/***/ "./src/demo/images/games.png":
/*!***********************************!*\
  !*** ./src/demo/images/games.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/88323b2b8d43a616e0855a8d75edd730.png";

/***/ }),

/***/ "./src/demo/index.js":
/*!***************************!*\
  !*** ./src/demo/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.css */ "./src/demo/style/style.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_pointer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/pointer */ "./src/demo/modules/pointer.js");
/* harmony import */ var _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/puzzle */ "./src/demo/modules/puzzle.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./src/demo/modules/timer.js");



 // 实例化touch pad 默认为mouse方式

const touchpad = new Touchpad({
  host: `${window.location.hostname}:3000`,
  trackType: 'mouse'
}); // 接应手势信号并处理

let gestureOpen = false;
touchpad.listen(['tap', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'switch'], function (msg) {
  if (msg.track && msg.track.action === 'switch') {
    if (msg.track.data === 'gesture') {
      _modules_pointer__WEBPACK_IMPORTED_MODULE_1__["default"].show();
      gestureOpen = true;
    } else {
      _modules_pointer__WEBPACK_IMPORTED_MODULE_1__["default"].hide();
      gestureOpen = false;
    }

    return;
  }

  if (!gestureOpen) {
    return;
  }

  if (['swipeleft', 'swiperight', 'swipeup', 'swipedown'].indexOf(msg.track.action) !== -1) {
    _modules_pointer__WEBPACK_IMPORTED_MODULE_1__["default"].set(msg.track.action.slice(5));
    return;
  }

  if (msg.track.action === 'tap') {
    let posxy = _modules_pointer__WEBPACK_IMPORTED_MODULE_1__["default"].get();

    if (String(posxy) === String([0, 0])) {
      // 开始按钮
      startGame();
    } else if (String(posxy) === String([1, 0])) {
      // 暂停按钮
      stopGame();
    } else if (String(posxy) === String([2, 0])) {
      // 恢复按钮
      restartGame();
    } else {
      let x = posxy[1] - 1;
      let y = posxy[0];
      let posindex = y * 3 + x;
      _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].pick(posindex);
    }
  }
}); // 游戏控制中心

let gameStatus = 'ready'; // ready,playing,stop

function startGame() {
  if (gameStatus === 'ready') {
    gameStatus = 'playing';
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].reset();
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].start();
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].start();
  } else if (gameStatus === 'stop') {
    gameStatus = 'playing';
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].start();
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].recover();
  }
}

document.getElementById('start').addEventListener('click', startGame, false);

function stopGame() {
  if (gameStatus === 'playing') {
    gameStatus = 'stop';
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].stop();
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].stop();
  }
}

document.getElementById('stop').addEventListener('click', stopGame, false);

function restartGame() {
  if (gameStatus === 'playing') {
    gameStatus = 'ready';
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].reset();
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].reset();
  }

  if (gameStatus === 'stop') {
    gameStatus = 'ready';
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].recover();
    _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].reset();
    _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].reset();
  }
}

document.getElementById('restart').addEventListener('click', restartGame, false);
_modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].success(() => {
  gameStatus = 'ready';
  _modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"].finish();
  _modules_puzzle__WEBPACK_IMPORTED_MODULE_2__["default"].end();
});

/***/ }),

/***/ "./src/demo/modules/pointer.js":
/*!*************************************!*\
  !*** ./src/demo/modules/pointer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Pointer {
  constructor() {
    this.pointer = document.getElementById("pointer");
    this.pointerLocation = [[[12, 12], [170, 12], [328, 12], [486, 12]], [[12, 170], [170, 170], [328, 170], [486, 170]], [[12, 328], [170, 328], [328, 328], [486, 328]]];
    this.pointerXY = [0, 0];
  }

  show() {
    this.pointer.style.display = 'block';
  }

  hide() {
    this.pointer.style.display = 'none';
  }

  set(pos) {
    console.log(this.pointerXY);

    if (pos === 'left' && this.pointerXY[1] > 0) {
      this.pointerXY[1] -= 1;
    }

    if (pos === 'right' && this.pointerXY[1] < 3) {
      this.pointerXY[1] += 1;
    }

    if (pos === 'up' && this.pointerXY[0] > 0) {
      this.pointerXY[0] -= 1;
    }

    if (pos === 'down' && this.pointerXY[0] < 2) {
      this.pointerXY[0] += 1;
    }

    let xy = this.pointerLocation[this.pointerXY[0]][this.pointerXY[1]];
    this.pointer.style.transform = `translate(${xy[0]}px,${xy[1]}px)`;
    console.log(this.pointerXY);
  }

  get() {
    return this.pointerXY;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Pointer());

/***/ }),

/***/ "./src/demo/modules/puzzle.js":
/*!************************************!*\
  !*** ./src/demo/modules/puzzle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Puzzle {
  constructor() {
    this.area = document.getElementById("area");
    this.area.onclick = this.click.bind(this);
    this.cubeLocation = [[0, 0], [158, 0], [316, 0], [0, 158], [158, 158], [316, 158], [0, 316], [158, 316], [316, 316]];
    this.status = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.available = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]];
    this.running = false;
  }

  render() {
    for (let i = 0; i < 9; i++) {
      let j = this.status[i];
      this.area.children[j].style.transform = `translate(${this.cubeLocation[i][0]}px, ${this.cubeLocation[i][1]}px)`;
    }
  }

  start() {
    for (let i = 0; i < 100; i++) {
      let index = this.status.indexOf(8);
      let ava = this.available[index];
      let trans = ava[Math.floor(Math.random() * ava.length)];
      let val = this.status[trans];
      this.status[trans] = this.status[index];
      this.status[index] = val;
    }

    this.render();
    this.running = true;
  }

  pick(n) {
    let p9 = this.status.indexOf(8);

    if (this.available[p9].indexOf(n) !== -1) {
      let a = this.status[p9];
      this.status[p9] = this.status[n];
      this.status[n] = a;
      this.render();
      this.test();
    }
  }

  click(e) {
    let ele = e.target;
    let i = 0;

    while (ele = ele.previousElementSibling) {
      i++;
    }

    console.log(this.status.indexOf(i));

    if (this.running) {
      this.pick(this.status.indexOf(i));
    }
  }

  reset() {
    this.status = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.render();
    this.running = true;
  }

  stop() {
    this.area.style.opacity = 0;
    this.running = false;
  }

  end() {
    this.running = false;
  }

  recover() {
    this.area.style.opacity = 1;
    this.running = true;
  }

  test() {
    let res = true;

    for (let i = 0; i < this.status.length; i++) {
      if (i != this.status[i]) {
        res = false;
      }
    }

    if (res) {
      setTimeout(() => {
        this.successcb();
      }, 1500);
    }
  }

  success(cb) {
    this.successcb = cb;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Puzzle());

/***/ }),

/***/ "./src/demo/modules/timer.js":
/*!***********************************!*\
  !*** ./src/demo/modules/timer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Timer {
  constructor() {
    this.timetips = document.getElementById('time');
    this.second = 1;
  }

  start() {
    this.timer = setInterval(() => {
      var s = this.second;
      var t;

      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;

        if (hour < 10) {
          t = '0' + hour + ":";
        } else {
          t = hour + ":";
        }

        if (min < 10) {
          t += "0";
        }

        t += min + ":";

        if (sec < 10) {
          t += "0";
        }

        ;
        t += sec;
      }

      this.timetips.innerHTML = t;
      this.second++;
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  reset() {
    this.second = 1;
    clearInterval(this.timer);
    this.timetips.innerHTML = '00:00:00';
  }

  finish() {
    this.stop();
    this.timetips.innerHTML = '完成啦！耗时' + this.timetips.innerHTML;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Timer());

/***/ }),

/***/ "./src/demo/style/style.css":
/*!**********************************!*\
  !*** ./src/demo/style/style.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/demo/style/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ })));