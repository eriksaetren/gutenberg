/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/dekode-ski-resort-block.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dekode-ski-resort-block.js":
/*!****************************************!*\
  !*** ./src/dekode-ski-resort-block.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simple_autocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple-autocomplete */ "./src/simple-autocomplete.js");

var registerBlockType = wp.blocks.registerBlockType;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow;
registerBlockType('dekode/ski-resort', {
  title: 'Ski Resort',
  category: 'common',
  attributes: {
    headingText: {
      type: 'string',
      "default": ''
    },
    bodyText: {
      type: 'string',
      "default": ''
    },
    autocompleteValue: {
      type: 'string',
      "default": ''
    },
    autocompleteOptions: {
      type: 'array',
      "default": [{
        'value': 1,
        'label': 'Type to search'
      }]
    },
    resortMeta: {
      type: 'object',
      "default": {}
    },
    hasResortMeta: {
      type: 'boolean',
      "default": false
    },
    autocompleteProcessingText: {
      type: 'string',
      "default": ''
    },
    resortDataProcessingText: {
      type: 'string',
      "default": ''
    }
  },
  icon: 'excerpt-view',
  description: 'A block for displaying meta information about a given ski resort',
  keywords: ['ski', 'resort'],
  edit: function edit(props) {
    var attributes = props.attributes,
        setAttributes = props.setAttributes;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: "Ski Resort Search Options",
      initialOpen: true
    }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_simple_autocomplete__WEBPACK_IMPORTED_MODULE_0__["default"], {
      label: "Search for ski resort:",
      value: attributes.autocompleteValue,
      onChange: function onChange(queryText) {
        // Update state
        setAttributes({
          autocompleteValue: queryText
        });
        setAttributes({
          autocompleteProcessingText: 'Autocomplete Searching...'
        });
        var data = {
          _ajax_nonce: ski_resort_ajax_obj.nonce,
          action: 'fnugg_autocomplete_query',
          // Corresponds to the wp_ajax_<action> WP hook
          autocomplete_query: queryText
        }; // Send AJAX request to our FnuggConnector PHP class

        jQuery.post(ajaxurl, data, function (response) {
          var suggestions = JSON.parse(response);
          var options = [];
          suggestions.map(function (suggestion, i) {
            options.push({
              'label': suggestion.name,
              'value': suggestion.name
            });
          }); // Update state upon return

          setAttributes({
            autocompleteOptions: options
          });
          setAttributes({
            autocompleteProcessingText: 'Search complete. Delete one character to see results.'
          });
        });
      },
      options: attributes.autocompleteOptions
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setAttributes({
          resortDataProcessingText: 'Retrieving resort data...'
        });
        var data = {
          _ajax_nonce: ski_resort_ajax_obj.nonce,
          action: 'fnugg_resort_query',
          // Corresponds to the wp_ajax_<action> WP hook
          resort_query: attributes.autocompleteValue
        }; // Send AJAX request to our FnuggConnector PHP class

        jQuery.post(ajaxurl, data, function (response) {
          var newResortMeta = JSON.parse(response);
          console.log(newResortMeta);
          setAttributes({
            resortMeta: newResortMeta
          });
          setAttributes({
            hasResortMeta: true
          });
          setAttributes({
            resortDataProcessingText: ''
          });
        });
      }
    }, "Get Resort Data")), /*#__PURE__*/React.createElement(PanelRow, null, attributes.autocompleteProcessingText), /*#__PURE__*/React.createElement(PanelRow, null, attributes.resortDataProcessingText))), attributes.hasResortMeta && /*#__PURE__*/React.createElement("div", {
      className: "resort-display"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-display-top",
      style: {
        background: 'url(' + attributes.resortMeta.image + ') center center/cover'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-display-name"
    }, /*#__PURE__*/React.createElement("h2", null, attributes.resortMeta.name)), /*#__PURE__*/React.createElement("div", {
      className: "resort-display-weather"
    }, /*#__PURE__*/React.createElement("p", {
      className: "todays-weather"
    }, "Dagens Forhold"), /*#__PURE__*/React.createElement("p", {
      className: "updated-on"
    }, "Oppdatert: ", attributes.resortMeta.last_updated))), /*#__PURE__*/React.createElement("div", {
      className: "resort-display-bot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-weather-wrapper"
    }, attributes.resortMeta.temperature.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-temperature"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.temperature.value, " \xB0")), attributes.resortMeta.wind.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-wind"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.wind.mps, " m/s")), attributes.resortMeta.conditions.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-condition"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.conditions.description)))))));
  },
  save: function save(props) {
    var attributes = props.attributes;
    /* 
    Somehow we need to trigger a function that pulls fresh data from the back end - not sure how to do that yet. 
    Thus, information displayed here will only be refreshed when someone updates the block in the editor 
    */

    return /*#__PURE__*/React.createElement("div", null, attributes.hasResortMeta && /*#__PURE__*/React.createElement("div", {
      className: "resort-display"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-display-top",
      style: {
        background: 'url(' + attributes.resortMeta.image + ') center center/cover'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-display-name"
    }, /*#__PURE__*/React.createElement("h2", null, attributes.resortMeta.name)), /*#__PURE__*/React.createElement("div", {
      className: "resort-display-weather"
    }, /*#__PURE__*/React.createElement("p", {
      className: "todays-weather"
    }, "Dagens Forhold"), /*#__PURE__*/React.createElement("p", {
      className: "updated-on"
    }, "Oppdatert: ", attributes.resortMeta.last_updated))), /*#__PURE__*/React.createElement("div", {
      className: "resort-display-bot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "resort-weather-wrapper"
    }, attributes.resortMeta.temperature.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-temperature"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.temperature.value, " \xB0")), attributes.resortMeta.wind.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-wind"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.wind.mps, " m/s")), attributes.resortMeta.conditions.isset && /*#__PURE__*/React.createElement("div", {
      className: "weather-el weather-condition"
    }, /*#__PURE__*/React.createElement("p", null, attributes.resortMeta.conditions.description)))))));
  }
});

/***/ }),

/***/ "./src/simple-autocomplete.js":
/*!************************************!*\
  !*** ./src/simple-autocomplete.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * A very simple autocomplete component
 *
 * This is to replace the OOTB Gutenberg Autocomplete component because it is
 * currently broken as of v4.5.1.
 *
 * See Github issue: https://github.com/WordPress/gutenberg/issues/10542
 *
 * Note: The options array should be an array of objects containing labels and values; i.e.:
 *   [
 *     { value: 'first', label: 'First' },
 *     { value: 'second', label: 'Second' }
 *   ]
 */
// Load external dependency.


function MyAutocomplete(_ref) {
  var label = _ref.label,
      id = _ref.id,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options;
  // Construct a unique ID for this block.
  var blockId = "my-autocomplete-".concat(id); // Function to handle the onChange event.

  var onChangeValue = function onChangeValue(event) {
    onChange(event.target.value);
  }; // Return the block, but only if options were passed in.


  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    "for": blockId
  }, label), /*#__PURE__*/React.createElement("input", {
    list: blockId,
    value: value,
    onChange: onChangeValue
  }), /*#__PURE__*/React.createElement("datalist", {
    id: blockId
  }, options.map(function (option, index) {
    return /*#__PURE__*/React.createElement("option", {
      value: option.value,
      label: option.label
    });
  })));
}

;
/* harmony default export */ __webpack_exports__["default"] = (MyAutocomplete);

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["lodash"]; }());

/***/ })

/******/ });
//# sourceMappingURL=dekode-ski-resort-block.js.map