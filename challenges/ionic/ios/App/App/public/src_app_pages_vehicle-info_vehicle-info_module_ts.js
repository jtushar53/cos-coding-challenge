"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_vehicle-info_vehicle-info_module_ts"],{

/***/ 2004:
/*!*******************************************************************!*\
  !*** ./src/app/pages/vehicle-info/vehicle-info-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VehicleInfoPageRoutingModule": () => (/* binding */ VehicleInfoPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _vehicle_info_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vehicle-info.page */ 8579);




const routes = [
    {
        path: '',
        component: _vehicle_info_page__WEBPACK_IMPORTED_MODULE_0__.VehicleInfoPage
    }
];
let VehicleInfoPageRoutingModule = class VehicleInfoPageRoutingModule {
};
VehicleInfoPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], VehicleInfoPageRoutingModule);



/***/ }),

/***/ 5762:
/*!***********************************************************!*\
  !*** ./src/app/pages/vehicle-info/vehicle-info.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VehicleInfoPageModule": () => (/* binding */ VehicleInfoPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _vehicle_info_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vehicle-info-routing.module */ 2004);
/* harmony import */ var _vehicle_info_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vehicle-info.page */ 8579);







let VehicleInfoPageModule = class VehicleInfoPageModule {
};
VehicleInfoPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _vehicle_info_routing_module__WEBPACK_IMPORTED_MODULE_0__.VehicleInfoPageRoutingModule
        ],
        declarations: [_vehicle_info_page__WEBPACK_IMPORTED_MODULE_1__.VehicleInfoPage]
    })
], VehicleInfoPageModule);



/***/ }),

/***/ 8579:
/*!*********************************************************!*\
  !*** ./src/app/pages/vehicle-info/vehicle-info.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VehicleInfoPage": () => (/* binding */ VehicleInfoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _Users_tushar_Projects_cos_coding_challenge_challenges_ionic_node_modules_ngtools_webpack_src_loaders_direct_resource_js_vehicle_info_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./vehicle-info.page.html */ 1141);
/* harmony import */ var _vehicle_info_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vehicle-info.page.scss */ 713);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);





let VehicleInfoPage = class VehicleInfoPage {
    constructor(route) {
        this.route = route;
        this.slideOpts = {
            initialSlide: 1,
            speed: 400
        };
    }
    ngOnInit() {
        this.vehicle = history.state.vehicle;
        console.log(this.vehicle);
    }
};
VehicleInfoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute }
];
VehicleInfoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-vehicle-info',
        template: _Users_tushar_Projects_cos_coding_challenge_challenges_ionic_node_modules_ngtools_webpack_src_loaders_direct_resource_js_vehicle_info_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_vehicle_info_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], VehicleInfoPage);



/***/ }),

/***/ 1141:
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/pages/vehicle-info/vehicle-info.page.html ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"ion-no-border\">\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>\n     Car Info\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-slides pager=\"true\" [options]=\"slideOpts\">\n    <ion-slide *ngFor=\"let image of vehicle?.associatedVehicle?.vehicleImages\">\n      <img [src]=\"image.url\"/>\n    </ion-slide>\n  </ion-slides>\n  <ion-row>\n    <ion-col>\n     \n      <h3>{{vehicle?.associatedVehicle?.ez.split('/')[1]}} {{vehicle?.label}} <span *ngIf=\"vehicle?.model\">({{vehicle?.model}})</span> </h3>\n      <p><span *ngIf=\"vehicle?.associatedVehicle?.mileageInKm\">{{vehicle?.associatedVehicle?.mileageInKm}}KM</span> &#183; <span *ngIf=\"vehicle?.associatedVehicle?.fuelType\"><b> </b>{{(vehicle?.associatedVehicle?.fuelType === 2) ? 'Petrol': 'Deisel'}}</span>\n        &#183; <span *ngIf=\"vehicle?.associatedVehicle?.numSeats\">{{vehicle?.associatedVehicle?.numSeats}} Seater</span> </p>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n");

/***/ }),

/***/ 713:
/*!***********************************************************!*\
  !*** ./src/app/pages/vehicle-info/vehicle-info.page.scss ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2ZWhpY2xlLWluZm8ucGFnZS5zY3NzIn0= */";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_vehicle-info_vehicle-info_module_ts.js.map