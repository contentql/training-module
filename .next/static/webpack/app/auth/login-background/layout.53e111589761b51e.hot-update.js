"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/auth/login-background/layout",{

/***/ "(app-pages-browser)/./src/layouts/common/header-simple.js":
/*!*********************************************!*\
  !*** ./src/layouts/common/header-simple.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HeaderSimple; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Stack */ \"(app-pages-browser)/./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/AppBar */ \"(app-pages-browser)/./node_modules/@mui/material/AppBar/AppBar.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Button */ \"(app-pages-browser)/./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Toolbar */ \"(app-pages-browser)/./node_modules/@mui/material/Toolbar/Toolbar.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/styles */ \"(app-pages-browser)/./node_modules/@mui/material/styles/useTheme.js\");\n/* harmony import */ var src_theme_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/theme/css */ \"(app-pages-browser)/./src/theme/css.js\");\n/* harmony import */ var src_components_logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/logo */ \"(app-pages-browser)/./src/components/logo/index.js\");\n/* harmony import */ var src_routes_paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/routes/paths */ \"(app-pages-browser)/./src/routes/paths.js\");\n/* harmony import */ var src_components_iconify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/iconify */ \"(app-pages-browser)/./src/components/iconify/index.js\");\n/* harmony import */ var src_routes_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/routes/components */ \"(app-pages-browser)/./src/routes/components/index.js\");\n/* harmony import */ var src_hooks_use_off_set_top__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/hooks/use-off-set-top */ \"(app-pages-browser)/./src/hooks/use-off-set-top.js\");\n/* harmony import */ var _config_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config-layout */ \"(app-pages-browser)/./src/layouts/config-layout.js\");\n/* harmony import */ var _header_shadow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./header-shadow */ \"(app-pages-browser)/./src/layouts/common/header-shadow.js\");\n/* harmony import */ var _settings_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings-button */ \"(app-pages-browser)/./src/layouts/common/settings-button.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// ----------------------------------------------------------------------\nfunction HeaderSimple() {\n    _s();\n    const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_10__[\"default\"])();\n    const offsetTop = (0,src_hooks_use_off_set_top__WEBPACK_IMPORTED_MODULE_6__.useOffSetTop)(_config_layout__WEBPACK_IMPORTED_MODULE_7__.HEADER.H_DESKTOP);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                sx: {\n                    justifyContent: \"space-between\",\n                    height: {\n                        xs: _config_layout__WEBPACK_IMPORTED_MODULE_7__.HEADER.H_MOBILE,\n                        md: _config_layout__WEBPACK_IMPORTED_MODULE_7__.HEADER.H_DESKTOP\n                    },\n                    transition: theme.transitions.create([\n                        \"height\"\n                    ], {\n                        easing: theme.transitions.easing.easeInOut,\n                        duration: theme.transitions.duration.shorter\n                    }),\n                    ...offsetTop && {\n                        ...(0,src_theme_css__WEBPACK_IMPORTED_MODULE_1__.bgBlur)({\n                            color: theme.palette.background.default\n                        }),\n                        height: {\n                            md: _config_layout__WEBPACK_IMPORTED_MODULE_7__.HEADER.H_DESKTOP_OFFSET\n                        }\n                    }\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(src_components_logo__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n                        direction: \"row\",\n                        alignItems: \"center\",\n                        spacing: 1,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n                            variant: \"outlined\",\n                            startIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(src_components_iconify__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                icon: \"carbon:chevron-left\"\n                            }, void 0, false, void 0, void 0),\n                            onClick: ()=>router.back(),\n                            children: \"Previous Page\"\n                        }, void 0, false, {\n                            fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n                            lineNumber: 53,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            offsetTop && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_header_shadow__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n                lineNumber: 63,\n                columnNumber: 21\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/manojkumar/Documents/git/training-module/src/layouts/common/header-simple.js\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(HeaderSimple, \"IbWsYaKjU+Yf+4NRPL1Fbz/pqRE=\", false, function() {\n    return [\n        _mui_material_styles__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n        src_hooks_use_off_set_top__WEBPACK_IMPORTED_MODULE_6__.useOffSetTop\n    ];\n});\n_c = HeaderSimple;\nvar _c;\n$RefreshReg$(_c, \"HeaderSimple\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9sYXlvdXRzL2NvbW1vbi9oZWFkZXItc2ltcGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQztBQUNFO0FBQ0U7QUFDQTtBQUNFO0FBQ0k7QUFFVDtBQUNBO0FBQ0U7QUFDSTtBQUNNO0FBQ007QUFFZjtBQUVDO0FBQ0k7QUFFL0MseUVBQXlFO0FBRTFELFNBQVNlOztJQUN0QixNQUFNQyxRQUFRWCxpRUFBUUE7SUFFdEIsTUFBTVksWUFBWU4sdUVBQVlBLENBQUNDLGtEQUFNQSxDQUFDTSxTQUFTO0lBRS9DLHFCQUNFLDhEQUFDaEIsNkRBQU1BOzswQkFDTCw4REFBQ0UsOERBQU9BO2dCQUNOZSxJQUFJO29CQUNGQyxnQkFBZ0I7b0JBQ2hCQyxRQUFRO3dCQUNOQyxJQUFJVixrREFBTUEsQ0FBQ1csUUFBUTt3QkFDbkJDLElBQUlaLGtEQUFNQSxDQUFDTSxTQUFTO29CQUN0QjtvQkFDQU8sWUFBWVQsTUFBTVUsV0FBVyxDQUFDQyxNQUFNLENBQUM7d0JBQUM7cUJBQVMsRUFBRTt3QkFDL0NDLFFBQVFaLE1BQU1VLFdBQVcsQ0FBQ0UsTUFBTSxDQUFDQyxTQUFTO3dCQUMxQ0MsVUFBVWQsTUFBTVUsV0FBVyxDQUFDSSxRQUFRLENBQUNDLE9BQU87b0JBQzlDO29CQUNBLEdBQUlkLGFBQWE7d0JBQ2YsR0FBR1gscURBQU1BLENBQUM7NEJBQ1IwQixPQUFPaEIsTUFBTWlCLE9BQU8sQ0FBQ0MsVUFBVSxDQUFDQyxPQUFPO3dCQUN6QyxFQUFFO3dCQUNGZCxRQUFROzRCQUNORyxJQUFJWixrREFBTUEsQ0FBQ3dCLGdCQUFnQjt3QkFDN0I7b0JBQ0YsQ0FBQztnQkFDSDs7a0NBRUEsOERBQUM3QiwyREFBSUE7Ozs7O2tDQUVMLDhEQUFDTiw0REFBS0E7d0JBQUNvQyxXQUFVO3dCQUFNQyxZQUFXO3dCQUFTQyxTQUFTO2tDQUNsRCw0RUFBQ3BDLDZEQUFNQTs0QkFDTHFDLFNBQVE7NEJBQ1JDLHlCQUFXLDhEQUFDaEMsOERBQU9BO2dDQUFDaUMsTUFBSzs7NEJBQ3pCQyxTQUFTLElBQU1DLE9BQU9DLElBQUk7c0NBQzNCOzs7Ozs7Ozs7Ozs7Ozs7OztZQU1KNUIsMkJBQWEsOERBQUNKLHNEQUFZQTs7Ozs7Ozs7Ozs7QUFHakM7R0E1Q3dCRTs7UUFDUlYsNkRBQVFBO1FBRUpNLG1FQUFZQTs7O0tBSFJJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9sYXlvdXRzL2NvbW1vbi9oZWFkZXItc2ltcGxlLmpzPzA4YmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnQG11aS9tYXRlcmlhbC9MaW5rJztcbmltcG9ydCBTdGFjayBmcm9tICdAbXVpL21hdGVyaWFsL1N0YWNrJztcbmltcG9ydCBBcHBCYXIgZnJvbSAnQG11aS9tYXRlcmlhbC9BcHBCYXInO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbXVpL21hdGVyaWFsL0J1dHRvbic7XG5pbXBvcnQgVG9vbGJhciBmcm9tICdAbXVpL21hdGVyaWFsL1Rvb2xiYXInO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAbXVpL21hdGVyaWFsL3N0eWxlcyc7XG5cbmltcG9ydCB7IGJnQmx1ciB9IGZyb20gJ3NyYy90aGVtZS9jc3MnO1xuaW1wb3J0IExvZ28gZnJvbSAnc3JjL2NvbXBvbmVudHMvbG9nbyc7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJ3NyYy9yb3V0ZXMvcGF0aHMnO1xuaW1wb3J0IEljb25pZnkgZnJvbSAnc3JjL2NvbXBvbmVudHMvaWNvbmlmeSc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rIH0gZnJvbSAnc3JjL3JvdXRlcy9jb21wb25lbnRzJztcbmltcG9ydCB7IHVzZU9mZlNldFRvcCB9IGZyb20gJ3NyYy9ob29rcy91c2Utb2ZmLXNldC10b3AnO1xuXG5pbXBvcnQgeyBIRUFERVIgfSBmcm9tICcuLi9jb25maWctbGF5b3V0JztcblxuaW1wb3J0IEhlYWRlclNoYWRvdyBmcm9tICcuL2hlYWRlci1zaGFkb3cnO1xuaW1wb3J0IFNldHRpbmdzQnV0dG9uIGZyb20gJy4vc2V0dGluZ3MtYnV0dG9uJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXJTaW1wbGUoKSB7XG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcblxuICBjb25zdCBvZmZzZXRUb3AgPSB1c2VPZmZTZXRUb3AoSEVBREVSLkhfREVTS1RPUCk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXBwQmFyPlxuICAgICAgPFRvb2xiYXJcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgeHM6IEhFQURFUi5IX01PQklMRSxcbiAgICAgICAgICAgIG1kOiBIRUFERVIuSF9ERVNLVE9QLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhbnNpdGlvbjogdGhlbWUudHJhbnNpdGlvbnMuY3JlYXRlKFsnaGVpZ2h0J10sIHtcbiAgICAgICAgICAgIGVhc2luZzogdGhlbWUudHJhbnNpdGlvbnMuZWFzaW5nLmVhc2VJbk91dCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGVtZS50cmFuc2l0aW9ucy5kdXJhdGlvbi5zaG9ydGVyLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIC4uLihvZmZzZXRUb3AgJiYge1xuICAgICAgICAgICAgLi4uYmdCbHVyKHtcbiAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUuYmFja2dyb3VuZC5kZWZhdWx0LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgICAgbWQ6IEhFQURFUi5IX0RFU0tUT1BfT0ZGU0VULFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPExvZ28gLz5cblxuICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHNwYWNpbmc9ezF9PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICBzdGFydEljb249ezxJY29uaWZ5IGljb249XCJjYXJib246Y2hldnJvbi1sZWZ0XCIgLz59XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIuYmFjaygpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFByZXZpb3VzIFBhZ2VcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9TdGFjaz5cbiAgICAgIDwvVG9vbGJhcj5cblxuICAgICAge29mZnNldFRvcCAmJiA8SGVhZGVyU2hhZG93IC8+fVxuICAgIDwvQXBwQmFyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkxpbmsiLCJTdGFjayIsIkFwcEJhciIsIkJ1dHRvbiIsIlRvb2xiYXIiLCJ1c2VUaGVtZSIsImJnQmx1ciIsIkxvZ28iLCJwYXRocyIsIkljb25pZnkiLCJSb3V0ZXJMaW5rIiwidXNlT2ZmU2V0VG9wIiwiSEVBREVSIiwiSGVhZGVyU2hhZG93IiwiU2V0dGluZ3NCdXR0b24iLCJIZWFkZXJTaW1wbGUiLCJ0aGVtZSIsIm9mZnNldFRvcCIsIkhfREVTS1RPUCIsInN4IiwianVzdGlmeUNvbnRlbnQiLCJoZWlnaHQiLCJ4cyIsIkhfTU9CSUxFIiwibWQiLCJ0cmFuc2l0aW9uIiwidHJhbnNpdGlvbnMiLCJjcmVhdGUiLCJlYXNpbmciLCJlYXNlSW5PdXQiLCJkdXJhdGlvbiIsInNob3J0ZXIiLCJjb2xvciIsInBhbGV0dGUiLCJiYWNrZ3JvdW5kIiwiZGVmYXVsdCIsIkhfREVTS1RPUF9PRkZTRVQiLCJkaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwic3BhY2luZyIsInZhcmlhbnQiLCJzdGFydEljb24iLCJpY29uIiwib25DbGljayIsInJvdXRlciIsImJhY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/layouts/common/header-simple.js\n"));

/***/ })

});