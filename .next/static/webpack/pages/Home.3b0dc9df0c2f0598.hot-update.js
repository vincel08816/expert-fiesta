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

/***/ "./pages/components/Sidebar.jsx":
/*!**************************************!*\
  !*** ./pages/components/Sidebar.jsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/base */ \"./node_modules/@mui/base/index.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppContext */ \"./pages/AppContext.jsx\");\n/* harmony import */ var _SidebarNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SidebarNav */ \"./pages/components/SidebarNav.jsx\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\n\nconst width = \"240px\";\nconst FormComponent = (param)=>/*#__PURE__*/ {\n    let { title , state , helperText , step =0.1 , min =0 , max =1 , defaultValue =1 , handleChange , name  } = param;\n    return (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.FormControl, {\n        sx: {\n            width,\n            mt: 2\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {\n                title: helperText,\n                placement: \"bottom\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_system__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                    sx: {\n                        display: \"flex\",\n                        justifyContent: \"space-between\"\n                    },\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {\n                            variant: \"body2\",\n                            children: title\n                        }, void 0, false, {\n                            fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                            lineNumber: 35,\n                            columnNumber: 9\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {\n                            variant: \"body2\",\n                            children: state\n                        }, void 0, false, {\n                            fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                            lineNumber: 36,\n                            columnNumber: 9\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                    lineNumber: 34,\n                    columnNumber: 7\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 33,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Slider, {\n                sx: {\n                    mt: 1,\n                    mb: 1\n                },\n                size: \"small\",\n                defaultValue: defaultValue,\n                valueLabelDisplay: \"auto\",\n                onChange: handleChange,\n                step: step,\n                min: min,\n                max: max,\n                name: name\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 40,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n        lineNumber: 32,\n        columnNumber: 3\n    }, undefined);\n};\n_c = FormComponent;\nconst Settings = ()=>{\n    _s();\n    const { form , handleChange , setAllowEnterToSubmit  } = (0,_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)();\n    const { model , topP , temperature , frequencyPenalty , presencePenalty , bestOf , size  } = form;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_system__WEBPACK_IMPORTED_MODULE_5__.Box, {\n        sx: {\n            flex: 1,\n            display: \"flex\",\n            flexDirection: \"column\",\n            p: 5,\n            pt: 10,\n            overflow: \"scroll\",\n            \"&::-webkit-scrollbar\": {\n                display: \"none\"\n            },\n            msOverflowStyle: \"none\",\n            scrollbarWidth: \"none\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.FormControl, {\n                sx: {\n                    width,\n                    mb: 2\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.InputLabel, {\n                        id: \"demo-simple-select-helper-label\",\n                        children: \"Model\"\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 84,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Select, {\n                        sx: {\n                            mb: 1\n                        },\n                        labelId: \"demo-simple-select-helper-label\",\n                        id: \"demo-simple-select-helper\",\n                        value: model,\n                        name: \"model\",\n                        onChange: handleChange,\n                        children: [\n                            \"text-davinci-003\",\n                            \"text-davinci-002\",\n                            \"text-davinci-001\",\n                            \"text-curie-001\",\n                            \"code-cushman-001\",\n                            \"code-davinci-002\",\n                            \"image-dalle-002\"\n                        ].map((value, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                                value: value,\n                                children: value\n                            }, index, false, {\n                                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                                lineNumber: 102,\n                                columnNumber: 13\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 85,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 83,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {\n                variant: \"body2\",\n                sx: {\n                    mb: 1\n                },\n                children: \"Prompt Header\"\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 109,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_base__WEBPACK_IMPORTED_MODULE_6__.TextareaAutosize, {\n                placeholder: \"This header allows you to write a short description on top of the prompt\",\n                value: form.topText,\n                name: \"topText\",\n                onChange: handleChange,\n                style: {\n                    padding: \"12px\",\n                    minHeight: \"100px\",\n                    maxHeight: \"1200px\",\n                    // resize: \"none\",\n                    fontFamily: \"Noto Sans, sans-serif\",\n                    overflow: \"auto\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 113,\n                columnNumber: 7\n            }, undefined),\n            [\n                {\n                    helperText: \"The temperature parameter controls the randomness of the model. 0 is the most logical and 1 is the most creative\",\n                    state: temperature,\n                    title: \"Temperature\",\n                    name: \"temperature\"\n                },\n                {\n                    helperText: \"Top-p sampling is a way to select the most likely words or phrases from a language model. It allows for control over the coherence and relevance of the generated text.\",\n                    state: topP,\n                    title: \"Top P\",\n                    name: \"topP\"\n                },\n                {\n                    helperText: \"Frequency Penalty: Encourages diverse, non-repeating text by reducing likelihood of frequent words/phrases.\",\n                    state: frequencyPenalty,\n                    title: \"Frequency Penalty\",\n                    name: \"frequencyPenalty\",\n                    max: 2,\n                    defaultValue: 0\n                },\n                {\n                    helperText: \"Presence Penalty: Encourages diverse text by reducing likelihood of input-matching words/phrases.\",\n                    state: presencePenalty,\n                    title: \"Presence Penalty\",\n                    name: \"presencePenalty\",\n                    max: 2,\n                    defaultValue: 0\n                },\n                {\n                    helperText: \"Best of: Generates multiple outputs, selects the best based on specified criteria\",\n                    state: bestOf,\n                    name: \"bestOf\",\n                    title: \"Best Of\",\n                    min: 1,\n                    max: 20,\n                    step: 1\n                }\n            ].map((value, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FormComponent, {\n                    ...value,\n                    handleChange: handleChange\n                }, index, false, {\n                    fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                    lineNumber: 172,\n                    columnNumber: 9\n                }, undefined)),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.FormControl, {\n                sx: {\n                    width,\n                    mt: 2,\n                    mb: 2\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.InputLabel, {\n                        id: \"demo-simple-select-helper-label\",\n                        children: \"Image Model Size (Dalle only)\"\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 175,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Select, {\n                        sx: {\n                            mb: 1\n                        },\n                        labelId: \"demo-simple-select-helper-label\",\n                        id: \"demo-simple-select-helper\",\n                        value: size,\n                        name: \"size\",\n                        onChange: handleChange,\n                        children: [\n                            \"256x256\",\n                            \"512x512\",\n                            \"1024x1024\"\n                        ].map((value, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                                value: value,\n                                children: value\n                            }, index, false, {\n                                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                                lineNumber: 187,\n                                columnNumber: 13\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 178,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 174,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_system__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                sx: {\n                    display: \"flex\",\n                    justifyContent: \"space-between\",\n                    alignItems: \"center\",\n                    mt: 1,\n                    mb: 1\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {\n                        variant: \"body2\",\n                        children: \"Allow Enter To Send\"\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 202,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Switch, {\n                        defaultChecked: true,\n                        onClick: ()=>setAllowEnterToSubmit((prev)=>!prev)\n                    }, void 0, false, {\n                        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                        lineNumber: 203,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 193,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n        lineNumber: 68,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Settings, \"J3I9pbpNGDtT9YYViFIe6RrxnZQ=\", false, function() {\n    return [\n        _AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext\n    ];\n});\n_c1 = Settings;\nconst Sidebar = (props)=>{\n    _s1();\n    const { openSidebar , setOpenSidebar  } = (0,_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)();\n    if (!openSidebar) return \"\";\n    const toggleDrawer = ()=>setOpenSidebar((prev)=>!prev);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Drawer, {\n        anchor: \"left\",\n        open: openSidebar,\n        onClose: toggleDrawer,\n        sx: {\n            display: \"flex\",\n            width: 300,\n            borderRadius: \"10px 0 0 10px\",\n            flexDirection: \"column\",\n            alignItems: \"center\",\n            height: \"100%\",\n            zIndex: 1000\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Settings, {\n                ...props\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 233,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_SidebarNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                ...props\n            }, void 0, false, {\n                fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n                lineNumber: 234,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/vincent/Development/Grind/chatgpt2.0/pages/components/Sidebar.jsx\",\n        lineNumber: 219,\n        columnNumber: 5\n    }, undefined);\n};\n_s1(Sidebar, \"agSvJVI12uhwG49Hlkb3ChJq0AI=\", false, function() {\n    return [\n        _AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext\n    ];\n});\n_c2 = Sidebar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sidebar);\nvar _c, _c1, _c2;\n$RefreshReg$(_c, \"FormComponent\");\n$RefreshReg$(_c1, \"Settings\");\n$RefreshReg$(_c2, \"Sidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jb21wb25lbnRzL1NpZGViYXIuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFBNkM7QUFXdEI7QUFFVztBQUNSO0FBQ29CO0FBQ1I7QUFFdEMsTUFBTWMsUUFBUTtBQUVkLE1BQU1DLGdCQUFnQix1QkFXcEI7UUFYcUIsRUFDckJDLE1BQUssRUFDTEMsTUFBSyxFQUNMQyxXQUFVLEVBQ1ZDLE1BQU8sSUFBRyxFQUNWQyxLQUFNLEVBQUMsRUFDUEMsS0FBTSxFQUFDLEVBQ1BDLGNBQWUsRUFBQyxFQUNoQkMsYUFBWSxFQUNaQyxLQUFJLEVBQ0w7V0FDQyw4REFBQ3RCLHNEQUFXQTtRQUFDdUIsSUFBSTtZQUFFWDtZQUFPWSxJQUFJO1FBQUU7OzBCQUM5Qiw4REFBQ2xCLGtEQUFPQTtnQkFBQ1EsT0FBT0U7Z0JBQVlTLFdBQVU7MEJBQ3BDLDRFQUFDakIsNENBQUdBO29CQUFDZSxJQUFJO3dCQUFFRyxTQUFTO3dCQUFRQyxnQkFBZ0I7b0JBQWdCOztzQ0FDMUQsOERBQUNwQixxREFBVUE7NEJBQUNxQixTQUFRO3NDQUFTZDs7Ozs7O3NDQUM3Qiw4REFBQ1AscURBQVVBOzRCQUFDcUIsU0FBUTtzQ0FBU2I7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUlqQyw4REFBQ1gsaURBQU1BO2dCQUNMbUIsSUFBSTtvQkFBRUMsSUFBSTtvQkFBR0ssSUFBSTtnQkFBRTtnQkFDbkJDLE1BQUs7Z0JBQ0xWLGNBQWNBO2dCQUNkVyxtQkFBa0I7Z0JBQ2xCQyxVQUFVWDtnQkFDVkosTUFBTUE7Z0JBQ05DLEtBQUtBO2dCQUNMQyxLQUFLQTtnQkFDTEcsTUFBTUE7Ozs7Ozs7Ozs7OztBQUVHO0tBOUJUVDtBQWlDTixNQUFNb0IsV0FBVyxJQUFNOztJQUNyQixNQUFNLEVBQUVDLEtBQUksRUFBRWIsYUFBWSxFQUFFYyxzQkFBcUIsRUFBRSxHQUFHekIsMERBQWFBO0lBRW5FLE1BQU0sRUFDSjBCLE1BQUssRUFDTEMsS0FBSSxFQUNKQyxZQUFXLEVBQ1hDLGlCQUFnQixFQUNoQkMsZ0JBQWUsRUFDZkMsT0FBTSxFQUNOWCxLQUFJLEVBQ0wsR0FBR0k7SUFFSixxQkFDRSw4REFBQzFCLDRDQUFHQTtRQUNGZSxJQUFJO1lBQ0ZtQixNQUFNO1lBQ05oQixTQUFTO1lBQ1RpQixlQUFlO1lBQ2ZDLEdBQUc7WUFDSEMsSUFBSTtZQUNKQyxVQUFVO1lBQ1Ysd0JBQXdCO2dCQUN0QnBCLFNBQVM7WUFDWDtZQUNBcUIsaUJBQWlCO1lBQ2pCQyxnQkFBZ0I7UUFDbEI7OzBCQUVBLDhEQUFDaEQsc0RBQVdBO2dCQUFDdUIsSUFBSTtvQkFBRVg7b0JBQU9pQixJQUFJO2dCQUFFOztrQ0FDOUIsOERBQUM1QixxREFBVUE7d0JBQUNnRCxJQUFHO2tDQUFrQzs7Ozs7O2tDQUNqRCw4REFBQzlDLGlEQUFNQTt3QkFDTG9CLElBQUk7NEJBQUVNLElBQUk7d0JBQUU7d0JBQ1pxQixTQUFRO3dCQUNSRCxJQUFHO3dCQUNIRSxPQUFPZjt3QkFDUGQsTUFBSzt3QkFDTFUsVUFBVVg7a0NBRVQ7NEJBQ0M7NEJBQ0E7NEJBQ0E7NEJBQ0E7NEJBQ0E7NEJBQ0E7NEJBQ0E7eUJBQ0QsQ0FBQytCLEdBQUcsQ0FBQyxDQUFDRCxPQUFPRSxzQkFDWiw4REFBQ25ELG1EQUFRQTtnQ0FBYWlELE9BQU9BOzBDQUMxQkE7K0JBRFlFOzs7Ozs7Ozs7Ozs7Ozs7OzBCQU9yQiw4REFBQzlDLHFEQUFVQTtnQkFBQ3FCLFNBQVE7Z0JBQVFMLElBQUk7b0JBQUVNLElBQUk7Z0JBQUU7MEJBQUc7Ozs7OzswQkFJM0MsOERBQUMvQix1REFBZ0JBO2dCQUNmd0QsYUFBWTtnQkFDWkgsT0FBT2pCLEtBQUtxQixPQUFPO2dCQUNuQmpDLE1BQUs7Z0JBQ0xVLFVBQVVYO2dCQUNWbUMsT0FBTztvQkFDTEMsU0FBUztvQkFDVEMsV0FBVztvQkFDWEMsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCQyxZQUFZO29CQUNaZCxVQUFVO2dCQUNaOzs7Ozs7WUFHRDtnQkFDQztvQkFDRTlCLFlBQ0U7b0JBQ0ZELE9BQU91QjtvQkFDUHhCLE9BQU87b0JBQ1BRLE1BQU07Z0JBQ1I7Z0JBQ0E7b0JBQ0VOLFlBQ0U7b0JBQ0ZELE9BQU9zQjtvQkFDUHZCLE9BQU87b0JBQ1BRLE1BQU07Z0JBQ1I7Z0JBQ0E7b0JBQ0VOLFlBQ0U7b0JBQ0ZELE9BQU93QjtvQkFDUHpCLE9BQU87b0JBQ1BRLE1BQU07b0JBQ05ILEtBQUs7b0JBQ0xDLGNBQWM7Z0JBQ2hCO2dCQUNBO29CQUNFSixZQUNFO29CQUNGRCxPQUFPeUI7b0JBQ1AxQixPQUFPO29CQUNQUSxNQUFNO29CQUNOSCxLQUFLO29CQUNMQyxjQUFjO2dCQUNoQjtnQkFDQTtvQkFDRUosWUFDRTtvQkFDRkQsT0FBTzBCO29CQUNQbkIsTUFBTTtvQkFDTlIsT0FBTztvQkFDUEksS0FBSztvQkFDTEMsS0FBSztvQkFDTEYsTUFBTTtnQkFDUjthQUNELENBQUNtQyxHQUFHLENBQUMsQ0FBQ0QsT0FBT0Usc0JBQ1osOERBQUN4QztvQkFBMkIsR0FBR3NDLEtBQUs7b0JBQUU5QixjQUFjQTttQkFBaENnQzs7Ozs7MEJBRXRCLDhEQUFDckQsc0RBQVdBO2dCQUFDdUIsSUFBSTtvQkFBRVg7b0JBQU9ZLElBQUk7b0JBQUdLLElBQUk7Z0JBQUU7O2tDQUNyQyw4REFBQzVCLHFEQUFVQTt3QkFBQ2dELElBQUc7a0NBQWtDOzs7Ozs7a0NBR2pELDhEQUFDOUMsaURBQU1BO3dCQUNMb0IsSUFBSTs0QkFBRU0sSUFBSTt3QkFBRTt3QkFDWnFCLFNBQVE7d0JBQ1JELElBQUc7d0JBQ0hFLE9BQU9yQjt3QkFDUFIsTUFBSzt3QkFDTFUsVUFBVVg7a0NBRVQ7NEJBQUM7NEJBQVc7NEJBQVc7eUJBQVksQ0FBQytCLEdBQUcsQ0FBQyxDQUFDRCxPQUFPRSxzQkFDL0MsOERBQUNuRCxtREFBUUE7Z0NBQWFpRCxPQUFPQTswQ0FDMUJBOytCQURZRTs7Ozs7Ozs7Ozs7Ozs7OzswQkFNckIsOERBQUM3Qyw0Q0FBR0E7Z0JBQ0ZlLElBQUk7b0JBQ0ZHLFNBQVM7b0JBQ1RDLGdCQUFnQjtvQkFDaEJrQyxZQUFZO29CQUNackMsSUFBSTtvQkFDSkssSUFBSTtnQkFDTjs7a0NBRUEsOERBQUN0QixxREFBVUE7d0JBQUNxQixTQUFRO2tDQUFROzs7Ozs7a0NBQzVCLDhEQUFDdkIsaURBQU1BO3dCQUNMeUQsY0FBYzt3QkFDZEMsU0FBUyxJQUFNNUIsc0JBQXNCLENBQUM2QixPQUFTLENBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLMUQ7R0E1Sk0vQjs7UUFDa0R2QixzREFBYUE7OztNQUQvRHVCO0FBOEpOLE1BQU1nQyxVQUFVLENBQUNDLFFBQVU7O0lBQ3pCLE1BQU0sRUFBRUMsWUFBVyxFQUFFQyxlQUFjLEVBQUUsR0FBRzFELDBEQUFhQTtJQUVyRCxJQUFJLENBQUN5RCxhQUFhLE9BQU87SUFDekIsTUFBTUUsZUFBZSxJQUFNRCxlQUFlLENBQUNKLE9BQVMsQ0FBQ0E7SUFFckQscUJBQ0UsOERBQUNqRSxpREFBTUE7UUFDTHVFLFFBQVE7UUFDUkMsTUFBTUo7UUFDTkssU0FBU0g7UUFDVDlDLElBQUk7WUFDRkcsU0FBUztZQUNUZCxPQUFPO1lBQ1A2RCxjQUFjO1lBQ2Q5QixlQUFlO1lBQ2ZrQixZQUFZO1lBQ1phLFFBQVE7WUFDUkMsUUFBUTtRQUNWOzswQkFFQSw4REFBQzFDO2dCQUFVLEdBQUdpQyxLQUFLOzs7Ozs7MEJBQ25CLDhEQUFDdkQsbURBQVVBO2dCQUFFLEdBQUd1RCxLQUFLOzs7Ozs7Ozs7Ozs7QUFHM0I7SUF6Qk1EOztRQUNvQ3ZELHNEQUFhQTs7O01BRGpEdUQ7QUEyQk4sK0RBQWVBLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvY29tcG9uZW50cy9TaWRlYmFyLmpzeD83Y2U0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRhcmVhQXV0b3NpemUgfSBmcm9tIFwiQG11aS9iYXNlXCI7XG5pbXBvcnQge1xuICBEcmF3ZXIsXG4gIEZvcm1Db250cm9sLFxuICBJbnB1dExhYmVsLFxuICBNZW51SXRlbSxcbiAgU2VsZWN0LFxuICBTbGlkZXIsXG4gIFN3aXRjaCxcbiAgVG9vbHRpcCxcbiAgVHlwb2dyYXBoeSxcbn0gZnJvbSBcIkBtdWkvbWF0ZXJpYWxcIjtcblxuaW1wb3J0IHsgQm94IH0gZnJvbSBcIkBtdWkvc3lzdGVtXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VBcHBDb250ZXh0IH0gZnJvbSBcIi4uL0FwcENvbnRleHRcIjtcbmltcG9ydCBTaWRlYmFyTmF2IGZyb20gXCIuL1NpZGViYXJOYXZcIjtcblxuY29uc3Qgd2lkdGggPSBcIjI0MHB4XCI7XG5cbmNvbnN0IEZvcm1Db21wb25lbnQgPSAoe1xuICB0aXRsZSxcbiAgc3RhdGUsXG4gIGhlbHBlclRleHQsXG4gIHN0ZXAgPSAwLjEsXG4gIG1pbiA9IDAsXG4gIG1heCA9IDEsXG4gIGRlZmF1bHRWYWx1ZSA9IDEsXG4gIGhhbmRsZUNoYW5nZSxcbiAgbmFtZSxcbn0pID0+IChcbiAgPEZvcm1Db250cm9sIHN4PXt7IHdpZHRoLCBtdDogMiB9fT5cbiAgICA8VG9vbHRpcCB0aXRsZT17aGVscGVyVGV4dH0gcGxhY2VtZW50PVwiYm90dG9tXCI+XG4gICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIgfX0+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MlwiPnt0aXRsZX08L1R5cG9ncmFwaHk+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MlwiPntzdGF0ZX08L1R5cG9ncmFwaHk+XG4gICAgICA8L0JveD5cbiAgICA8L1Rvb2x0aXA+XG5cbiAgICA8U2xpZGVyXG4gICAgICBzeD17eyBtdDogMSwgbWI6IDEgfX1cbiAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgIHZhbHVlTGFiZWxEaXNwbGF5PVwiYXV0b1wiXG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgc3RlcD17c3RlcH1cbiAgICAgIG1pbj17bWlufVxuICAgICAgbWF4PXttYXh9XG4gICAgICBuYW1lPXtuYW1lfVxuICAgIC8+XG4gIDwvRm9ybUNvbnRyb2w+XG4pO1xuXG5jb25zdCBTZXR0aW5ncyA9ICgpID0+IHtcbiAgY29uc3QgeyBmb3JtLCBoYW5kbGVDaGFuZ2UsIHNldEFsbG93RW50ZXJUb1N1Ym1pdCB9ID0gdXNlQXBwQ29udGV4dCgpO1xuXG4gIGNvbnN0IHtcbiAgICBtb2RlbCxcbiAgICB0b3BQLFxuICAgIHRlbXBlcmF0dXJlLFxuICAgIGZyZXF1ZW5jeVBlbmFsdHksXG4gICAgcHJlc2VuY2VQZW5hbHR5LFxuICAgIGJlc3RPZixcbiAgICBzaXplLFxuICB9ID0gZm9ybTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIHN4PXt7XG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBwOiA1LFxuICAgICAgICBwdDogMTAsXG4gICAgICAgIG92ZXJmbG93OiBcInNjcm9sbFwiLFxuICAgICAgICBcIiY6Oi13ZWJraXQtc2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICAgICAgfSxcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiBcIm5vbmVcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IFwibm9uZVwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8Rm9ybUNvbnRyb2wgc3g9e3sgd2lkdGgsIG1iOiAyIH19PlxuICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5Nb2RlbDwvSW5wdXRMYWJlbD5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIHN4PXt7IG1iOiAxIH19XG4gICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxuICAgICAgICAgIGlkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlclwiXG4gICAgICAgICAgdmFsdWU9e21vZGVsfVxuICAgICAgICAgIG5hbWU9XCJtb2RlbFwiXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtbXG4gICAgICAgICAgICBcInRleHQtZGF2aW5jaS0wMDNcIixcbiAgICAgICAgICAgIFwidGV4dC1kYXZpbmNpLTAwMlwiLFxuICAgICAgICAgICAgXCJ0ZXh0LWRhdmluY2ktMDAxXCIsXG4gICAgICAgICAgICBcInRleHQtY3VyaWUtMDAxXCIsXG4gICAgICAgICAgICBcImNvZGUtY3VzaG1hbi0wMDFcIixcbiAgICAgICAgICAgIFwiY29kZS1kYXZpbmNpLTAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZS1kYWxsZS0wMDJcIixcbiAgICAgICAgICBdLm1hcCgodmFsdWUsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8TWVudUl0ZW0ga2V5PXtpbmRleH0gdmFsdWU9e3ZhbHVlfT5cbiAgICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9TZWxlY3Q+XG4gICAgICA8L0Zvcm1Db250cm9sPlxuXG4gICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTJcIiBzeD17eyBtYjogMSB9fT5cbiAgICAgICAgUHJvbXB0IEhlYWRlclxuICAgICAgPC9UeXBvZ3JhcGh5PlxuXG4gICAgICA8VGV4dGFyZWFBdXRvc2l6ZVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRoaXMgaGVhZGVyIGFsbG93cyB5b3UgdG8gd3JpdGUgYSBzaG9ydCBkZXNjcmlwdGlvbiBvbiB0b3Agb2YgdGhlIHByb21wdFwiXG4gICAgICAgIHZhbHVlPXtmb3JtLnRvcFRleHR9XG4gICAgICAgIG5hbWU9XCJ0b3BUZXh0XCJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwYWRkaW5nOiBcIjEycHhcIixcbiAgICAgICAgICBtaW5IZWlnaHQ6IFwiMTAwcHhcIixcbiAgICAgICAgICBtYXhIZWlnaHQ6IFwiMTIwMHB4XCIsXG4gICAgICAgICAgLy8gcmVzaXplOiBcIm5vbmVcIixcbiAgICAgICAgICBmb250RmFtaWx5OiBcIk5vdG8gU2Fucywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgIG92ZXJmbG93OiBcImF1dG9cIixcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtbXG4gICAgICAgIHtcbiAgICAgICAgICBoZWxwZXJUZXh0OlxuICAgICAgICAgICAgXCJUaGUgdGVtcGVyYXR1cmUgcGFyYW1ldGVyIGNvbnRyb2xzIHRoZSByYW5kb21uZXNzIG9mIHRoZSBtb2RlbC4gMCBpcyB0aGUgbW9zdCBsb2dpY2FsIGFuZCAxIGlzIHRoZSBtb3N0IGNyZWF0aXZlXCIsXG4gICAgICAgICAgc3RhdGU6IHRlbXBlcmF0dXJlLFxuICAgICAgICAgIHRpdGxlOiBcIlRlbXBlcmF0dXJlXCIsXG4gICAgICAgICAgbmFtZTogXCJ0ZW1wZXJhdHVyZVwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVscGVyVGV4dDpcbiAgICAgICAgICAgIFwiVG9wLXAgc2FtcGxpbmcgaXMgYSB3YXkgdG8gc2VsZWN0IHRoZSBtb3N0IGxpa2VseSB3b3JkcyBvciBwaHJhc2VzIGZyb20gYSBsYW5ndWFnZSBtb2RlbC4gSXQgYWxsb3dzIGZvciBjb250cm9sIG92ZXIgdGhlIGNvaGVyZW5jZSBhbmQgcmVsZXZhbmNlIG9mIHRoZSBnZW5lcmF0ZWQgdGV4dC5cIixcbiAgICAgICAgICBzdGF0ZTogdG9wUCxcbiAgICAgICAgICB0aXRsZTogXCJUb3AgUFwiLFxuICAgICAgICAgIG5hbWU6IFwidG9wUFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVscGVyVGV4dDpcbiAgICAgICAgICAgIFwiRnJlcXVlbmN5IFBlbmFsdHk6IEVuY291cmFnZXMgZGl2ZXJzZSwgbm9uLXJlcGVhdGluZyB0ZXh0IGJ5IHJlZHVjaW5nIGxpa2VsaWhvb2Qgb2YgZnJlcXVlbnQgd29yZHMvcGhyYXNlcy5cIixcbiAgICAgICAgICBzdGF0ZTogZnJlcXVlbmN5UGVuYWx0eSxcbiAgICAgICAgICB0aXRsZTogXCJGcmVxdWVuY3kgUGVuYWx0eVwiLFxuICAgICAgICAgIG5hbWU6IFwiZnJlcXVlbmN5UGVuYWx0eVwiLFxuICAgICAgICAgIG1heDogMixcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBoZWxwZXJUZXh0OlxuICAgICAgICAgICAgXCJQcmVzZW5jZSBQZW5hbHR5OiBFbmNvdXJhZ2VzIGRpdmVyc2UgdGV4dCBieSByZWR1Y2luZyBsaWtlbGlob29kIG9mIGlucHV0LW1hdGNoaW5nIHdvcmRzL3BocmFzZXMuXCIsXG4gICAgICAgICAgc3RhdGU6IHByZXNlbmNlUGVuYWx0eSxcbiAgICAgICAgICB0aXRsZTogXCJQcmVzZW5jZSBQZW5hbHR5XCIsXG4gICAgICAgICAgbmFtZTogXCJwcmVzZW5jZVBlbmFsdHlcIixcbiAgICAgICAgICBtYXg6IDIsXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVscGVyVGV4dDpcbiAgICAgICAgICAgIFwiQmVzdCBvZjogR2VuZXJhdGVzIG11bHRpcGxlIG91dHB1dHMsIHNlbGVjdHMgdGhlIGJlc3QgYmFzZWQgb24gc3BlY2lmaWVkIGNyaXRlcmlhXCIsXG4gICAgICAgICAgc3RhdGU6IGJlc3RPZixcbiAgICAgICAgICBuYW1lOiBcImJlc3RPZlwiLFxuICAgICAgICAgIHRpdGxlOiBcIkJlc3QgT2ZcIixcbiAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgbWF4OiAyMCxcbiAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICB9LFxuICAgICAgXS5tYXAoKHZhbHVlLCBpbmRleCkgPT4gKFxuICAgICAgICA8Rm9ybUNvbXBvbmVudCBrZXk9e2luZGV4fSB7Li4udmFsdWV9IGhhbmRsZUNoYW5nZT17aGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgKSl9XG4gICAgICA8Rm9ybUNvbnRyb2wgc3g9e3sgd2lkdGgsIG10OiAyLCBtYjogMiB9fT5cbiAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+XG4gICAgICAgICAgSW1hZ2UgTW9kZWwgU2l6ZSAoRGFsbGUgb25seSlcbiAgICAgICAgPC9JbnB1dExhYmVsPlxuICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgc3g9e3sgbWI6IDEgfX1cbiAgICAgICAgICBsYWJlbElkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlci1sYWJlbFwiXG4gICAgICAgICAgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyXCJcbiAgICAgICAgICB2YWx1ZT17c2l6ZX1cbiAgICAgICAgICBuYW1lPVwic2l6ZVwiXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtbXCIyNTZ4MjU2XCIsIFwiNTEyeDUxMlwiLCBcIjEwMjR4MTAyNFwiXS5tYXAoKHZhbHVlLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtIGtleT17aW5kZXh9IHZhbHVlPXt2YWx1ZX0+XG4gICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvU2VsZWN0PlxuICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgIDxCb3hcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICBtdDogMSxcbiAgICAgICAgICBtYjogMSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkyXCI+QWxsb3cgRW50ZXIgVG8gU2VuZDwvVHlwb2dyYXBoeT5cbiAgICAgICAgPFN3aXRjaFxuICAgICAgICAgIGRlZmF1bHRDaGVja2VkXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWxsb3dFbnRlclRvU3VibWl0KChwcmV2KSA9PiAhcHJldil9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmNvbnN0IFNpZGViYXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBvcGVuU2lkZWJhciwgc2V0T3BlblNpZGViYXIgfSA9IHVzZUFwcENvbnRleHQoKTtcblxuICBpZiAoIW9wZW5TaWRlYmFyKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgdG9nZ2xlRHJhd2VyID0gKCkgPT4gc2V0T3BlblNpZGViYXIoKHByZXYpID0+ICFwcmV2KTtcblxuICByZXR1cm4gKFxuICAgIDxEcmF3ZXJcbiAgICAgIGFuY2hvcj17XCJsZWZ0XCJ9XG4gICAgICBvcGVuPXtvcGVuU2lkZWJhcn1cbiAgICAgIG9uQ2xvc2U9e3RvZ2dsZURyYXdlcn1cbiAgICAgIHN4PXt7XG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweCAwIDAgMTBweFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICB6SW5kZXg6IDEwMDAsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxTZXR0aW5ncyB7Li4ucHJvcHN9IC8+XG4gICAgICA8U2lkZWJhck5hdiB7Li4ucHJvcHN9IC8+XG4gICAgPC9EcmF3ZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyO1xuIl0sIm5hbWVzIjpbIlRleHRhcmVhQXV0b3NpemUiLCJEcmF3ZXIiLCJGb3JtQ29udHJvbCIsIklucHV0TGFiZWwiLCJNZW51SXRlbSIsIlNlbGVjdCIsIlNsaWRlciIsIlN3aXRjaCIsIlRvb2x0aXAiLCJUeXBvZ3JhcGh5IiwiQm94IiwiUmVhY3QiLCJ1c2VBcHBDb250ZXh0IiwiU2lkZWJhck5hdiIsIndpZHRoIiwiRm9ybUNvbXBvbmVudCIsInRpdGxlIiwic3RhdGUiLCJoZWxwZXJUZXh0Iiwic3RlcCIsIm1pbiIsIm1heCIsImRlZmF1bHRWYWx1ZSIsImhhbmRsZUNoYW5nZSIsIm5hbWUiLCJzeCIsIm10IiwicGxhY2VtZW50IiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwidmFyaWFudCIsIm1iIiwic2l6ZSIsInZhbHVlTGFiZWxEaXNwbGF5Iiwib25DaGFuZ2UiLCJTZXR0aW5ncyIsImZvcm0iLCJzZXRBbGxvd0VudGVyVG9TdWJtaXQiLCJtb2RlbCIsInRvcFAiLCJ0ZW1wZXJhdHVyZSIsImZyZXF1ZW5jeVBlbmFsdHkiLCJwcmVzZW5jZVBlbmFsdHkiLCJiZXN0T2YiLCJmbGV4IiwiZmxleERpcmVjdGlvbiIsInAiLCJwdCIsIm92ZXJmbG93IiwibXNPdmVyZmxvd1N0eWxlIiwic2Nyb2xsYmFyV2lkdGgiLCJpZCIsImxhYmVsSWQiLCJ2YWx1ZSIsIm1hcCIsImluZGV4IiwicGxhY2Vob2xkZXIiLCJ0b3BUZXh0Iiwic3R5bGUiLCJwYWRkaW5nIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwiZm9udEZhbWlseSIsImFsaWduSXRlbXMiLCJkZWZhdWx0Q2hlY2tlZCIsIm9uQ2xpY2siLCJwcmV2IiwiU2lkZWJhciIsInByb3BzIiwib3BlblNpZGViYXIiLCJzZXRPcGVuU2lkZWJhciIsInRvZ2dsZURyYXdlciIsImFuY2hvciIsIm9wZW4iLCJvbkNsb3NlIiwiYm9yZGVyUmFkaXVzIiwiaGVpZ2h0IiwiekluZGV4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/components/Sidebar.jsx\n"));

/***/ })

});