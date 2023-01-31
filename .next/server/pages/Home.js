"use strict";
(() => {
var exports = {};
exports.id = 336;
exports.ids = [336,551,383,565,117,769];
exports.modules = {

/***/ 9878:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_chatComponents_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9033);
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5729);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6178);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_chatComponents_Content__WEBPACK_IMPORTED_MODULE_3__, _components_Sidebar__WEBPACK_IMPORTED_MODULE_4__, _context_AppContext__WEBPACK_IMPORTED_MODULE_5__]);
([_components_chatComponents_Content__WEBPACK_IMPORTED_MODULE_3__, _components_Sidebar__WEBPACK_IMPORTED_MODULE_4__, _context_AppContext__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const App = ()=>{
    const { user , loading  } = (0,_context_AppContext__WEBPACK_IMPORTED_MODULE_5__.useAppContext)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!loading && !user) router.push("/login");
    }, [
        loading,
        user
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_chatComponents_Content__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3013:
/***/ ((module) => {

module.exports = require("@mui/base");

/***/ }),

/***/ 1883:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AccountCircle");

/***/ }),

/***/ 6146:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Add");

/***/ }),

/***/ 2682:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Bookmark");

/***/ }),

/***/ 9238:
/***/ ((module) => {

module.exports = require("@mui/icons-material/BookmarkBorder");

/***/ }),

/***/ 7521:
/***/ ((module) => {

module.exports = require("@mui/icons-material/ChatBubbleOutline");

/***/ }),

/***/ 6959:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Check");

/***/ }),

/***/ 6843:
/***/ ((module) => {

module.exports = require("@mui/icons-material/ContentCopy");

/***/ }),

/***/ 1646:
/***/ ((module) => {

module.exports = require("@mui/icons-material/ContentPaste");

/***/ }),

/***/ 3188:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Delete");

/***/ }),

/***/ 2494:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Done");

/***/ }),

/***/ 1664:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Edit");

/***/ }),

/***/ 2231:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Forum");

/***/ }),

/***/ 6527:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Refresh");

/***/ }),

/***/ 4731:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Send");

/***/ }),

/***/ 32:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Settings");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 2120:
/***/ ((module) => {

module.exports = require("@mui/material/Avatar");

/***/ }),

/***/ 5678:
/***/ ((module) => {

module.exports = require("@mui/material/BottomNavigation");

/***/ }),

/***/ 7307:
/***/ ((module) => {

module.exports = require("@mui/material/BottomNavigationAction");

/***/ }),

/***/ 8742:
/***/ ((module) => {

module.exports = require("@mui/material/Stack");

/***/ }),

/***/ 7986:
/***/ ((module) => {

module.exports = require("@mui/system");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 727:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter");

/***/ }),

/***/ 2381:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter/dist/cjs/styles/prism/tomorrow");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7518:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ 271:
/***/ ((module) => {

module.exports = require("sweetalert2");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [685,852,520,938,610,560,488,149,33,729], () => (__webpack_exec__(9878)));
module.exports = __webpack_exports__;

})();