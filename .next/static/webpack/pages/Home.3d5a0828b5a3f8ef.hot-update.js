"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/Home",{

/***/ "./pages/components/Content.jsx":
/*!**************************************!*\
  !*** ./pages/components/Content.jsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/base */ \"./node_modules/@mui/base/index.js\");\n/* harmony import */ var _mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/Send */ \"./node_modules/@mui/icons-material/Send.js\");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppContext */ \"./pages/AppContext.jsx\");\n/* harmony import */ var _ChatLog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatLog */ \"./pages/components/ChatLog.jsx\");\n/* harmony import */ var _IconsWithTooltips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IconsWithTooltips */ \"./pages/components/IconsWithTooltips.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst Content = ()=>{\n    _s();\n    const { form , handleChange , setChatLog , chatLog , handleSubmit , allowEnterToSubmit , toggleCheck  } = (0,_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatLog__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                chatLog: chatLog,\n                setChatLog: setChatLog,\n                toggleCheck: toggleCheck\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Content.jsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_system__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                sx: {\n                    m: 1,\n                    display: \"flex\",\n                    flexDirection: \"row\",\n                    alignItems: \"center\",\n                    justifyContent: \"space-between\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_base__WEBPACK_IMPORTED_MODULE_6__.TextareaAutosize, {\n                        placeholder: \"Write a message...\",\n                        onKeyDown: (e)=>e.key === \"Enter\" && allowEnterToSubmit && handleSubmit(e),\n                        value: form.text,\n                        name: \"text\",\n                        onChange: handleChange,\n                        style: {\n                            padding: \"12px\",\n                            minHeight: \"22px\",\n                            maxHeight: \"350px\",\n                            resize: \"none\",\n                            flex: 1,\n                            overflow: \"auto\",\n                            fontFamily: \"Noto Sans, sans-serif\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Content.jsx\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_IconsWithTooltips__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        sx: {\n                            m: 1,\n                            p: 1\n                        },\n                        title: \"Submit\",\n                        Icon: _mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                        onClick: handleSubmit\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Content.jsx\",\n                        lineNumber: 58,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Content.jsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(Content, \"+g/y3WCSBT10YlH0v3t85PSVUbQ=\", false, function() {\n    return [\n        _AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext\n    ];\n});\n_c = Content;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Content);\nvar _c;\n$RefreshReg$(_c, \"Content\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jb21wb25lbnRzL0NvbnRlbnQuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQTZDO0FBQ0c7QUFDZDtBQUNSO0FBQ29CO0FBQ2Q7QUFDb0I7QUFFcEQsTUFBTU8sVUFBVSxJQUFNOztJQUNwQixNQUFNLEVBQ0pDLEtBQUksRUFDSkMsYUFBWSxFQUNaQyxXQUFVLEVBQ1ZDLFFBQU8sRUFDUEMsYUFBWSxFQUNaQyxtQkFBa0IsRUFDbEJDLFlBQVcsRUFDWixHQUFHViwwREFBYUE7SUFFakIscUJBQ0U7OzBCQUVFLDhEQUFDQyxnREFBT0E7Z0JBQ05NLFNBQVNBO2dCQUNURCxZQUFZQTtnQkFDWkksYUFBYUE7Ozs7OzswQkFJZiw4REFBQ1osNENBQUdBO2dCQUNGYSxJQUFJO29CQUNGQyxHQUFHO29CQUNIQyxTQUFTO29CQUNUQyxlQUFlO29CQUNmQyxZQUFZO29CQUNaQyxnQkFBZ0I7Z0JBQ2xCOztrQ0FFQSw4REFBQ3BCLHVEQUFnQkE7d0JBQ2ZxQixhQUFZO3dCQUNaQyxXQUFXLENBQUNDLElBQ1ZBLEVBQUVDLEdBQUcsS0FBSyxXQUFXWCxzQkFBc0JELGFBQWFXO3dCQUUxREUsT0FBT2pCLEtBQUtrQixJQUFJO3dCQUNoQkMsTUFBTTt3QkFDTkMsVUFBVW5CO3dCQUNWb0IsT0FBTzs0QkFDTEMsU0FBUzs0QkFDVEMsV0FBVzs0QkFDWEMsV0FBVzs0QkFDWEMsUUFBUTs0QkFDUkMsTUFBTTs0QkFDTkMsVUFBVTs0QkFDVkMsWUFBWTt3QkFDZDs7Ozs7O2tDQUdGLDhEQUFDOUIsMERBQWlCQTt3QkFDaEJTLElBQUk7NEJBQUVDLEdBQUc7NEJBQUdxQixHQUFHO3dCQUFFO3dCQUNqQkMsT0FBTTt3QkFDTkMsTUFBTXRDLGdFQUFRQTt3QkFDZHVDLFNBQVM1Qjs7Ozs7Ozs7Ozs7Ozs7QUFNbkI7R0EzRE1MOztRQVNBSCxzREFBYUE7OztLQVRiRztBQTZETiwrREFBZUEsT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9jb21wb25lbnRzL0NvbnRlbnQuanN4P2E2NjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dGFyZWFBdXRvc2l6ZSB9IGZyb20gXCJAbXVpL2Jhc2VcIjtcbmltcG9ydCBTZW5kSWNvbiBmcm9tIFwiQG11aS9pY29ucy1tYXRlcmlhbC9TZW5kXCI7XG5pbXBvcnQgeyBCb3ggfSBmcm9tIFwiQG11aS9zeXN0ZW1cIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUFwcENvbnRleHQgfSBmcm9tIFwiLi4vQXBwQ29udGV4dFwiO1xuaW1wb3J0IENoYXRMb2cgZnJvbSBcIi4vQ2hhdExvZ1wiO1xuaW1wb3J0IEljb25zV2l0aFRvb2x0aXBzIGZyb20gXCIuL0ljb25zV2l0aFRvb2x0aXBzXCI7XG5cbmNvbnN0IENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBmb3JtLFxuICAgIGhhbmRsZUNoYW5nZSxcbiAgICBzZXRDaGF0TG9nLFxuICAgIGNoYXRMb2csXG4gICAgaGFuZGxlU3VibWl0LFxuICAgIGFsbG93RW50ZXJUb1N1Ym1pdCxcbiAgICB0b2dnbGVDaGVjayxcbiAgfSA9IHVzZUFwcENvbnRleHQoKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7LyogY2hhdExvZyAqL31cbiAgICAgIDxDaGF0TG9nXG4gICAgICAgIGNoYXRMb2c9e2NoYXRMb2d9XG4gICAgICAgIHNldENoYXRMb2c9e3NldENoYXRMb2d9XG4gICAgICAgIHRvZ2dsZUNoZWNrPXt0b2dnbGVDaGVja31cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBpbnB1dCBmaWVsZCAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBtOiAxLFxuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxUZXh0YXJlYUF1dG9zaXplXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJXcml0ZSBhIG1lc3NhZ2UuLi5cIlxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+XG4gICAgICAgICAgICBlLmtleSA9PT0gXCJFbnRlclwiICYmIGFsbG93RW50ZXJUb1N1Ym1pdCAmJiBoYW5kbGVTdWJtaXQoZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWU9e2Zvcm0udGV4dH1cbiAgICAgICAgICBuYW1lPXtcInRleHRcIn1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwYWRkaW5nOiBcIjEycHhcIixcbiAgICAgICAgICAgIG1pbkhlaWdodDogXCIyMnB4XCIsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IFwiMzUwcHhcIixcbiAgICAgICAgICAgIHJlc2l6ZTogXCJub25lXCIsXG4gICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCJOb3RvIFNhbnMsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuXG4gICAgICAgIDxJY29uc1dpdGhUb29sdGlwc1xuICAgICAgICAgIHN4PXt7IG06IDEsIHA6IDEgfX1cbiAgICAgICAgICB0aXRsZT1cIlN1Ym1pdFwiXG4gICAgICAgICAgSWNvbj17U2VuZEljb259XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlU3VibWl0fVxuICAgICAgICAvPlxuICAgICAgICB7LyogYWRkIGNoYXJhY3RlciBjb3VudCBoZXJlICovfVxuICAgICAgPC9Cb3g+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250ZW50O1xuIl0sIm5hbWVzIjpbIlRleHRhcmVhQXV0b3NpemUiLCJTZW5kSWNvbiIsIkJveCIsIlJlYWN0IiwidXNlQXBwQ29udGV4dCIsIkNoYXRMb2ciLCJJY29uc1dpdGhUb29sdGlwcyIsIkNvbnRlbnQiLCJmb3JtIiwiaGFuZGxlQ2hhbmdlIiwic2V0Q2hhdExvZyIsImNoYXRMb2ciLCJoYW5kbGVTdWJtaXQiLCJhbGxvd0VudGVyVG9TdWJtaXQiLCJ0b2dnbGVDaGVjayIsInN4IiwibSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwicGxhY2Vob2xkZXIiLCJvbktleURvd24iLCJlIiwia2V5IiwidmFsdWUiLCJ0ZXh0IiwibmFtZSIsIm9uQ2hhbmdlIiwic3R5bGUiLCJwYWRkaW5nIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwicmVzaXplIiwiZmxleCIsIm92ZXJmbG93IiwiZm9udEZhbWlseSIsInAiLCJ0aXRsZSIsIkljb24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/components/Content.jsx\n"));

/***/ })

});