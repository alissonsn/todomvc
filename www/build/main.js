webpackJsonp([0],{

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_task_model__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(db, navCtrl) {
        this.db = db;
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.task = new __WEBPACK_IMPORTED_MODULE_3__model_task_model__["a" /* TaskModel */]();
        this.task.completa = false;
        this.valueall = false;
        this.db.handleTasks().then(function (res) { return _this.lista = _this.db.handleRepository().list(); });
        this.estado = undefined;
        this.nomeTarefa = undefined;
    };
    HomePage.prototype.add = function (event) {
        var _this = this;
        if (event.key == "Enter") {
            if (this.nomeTarefa != undefined && this.nomeTarefa.length > 0) {
                this.task.nome = this.nomeTarefa;
                this.db.saveTask(this.task).then(function (res) { return _this.lista = _this.db.handleRepository().list(); });
                this.processa();
                this.task = new __WEBPACK_IMPORTED_MODULE_3__model_task_model__["a" /* TaskModel */]();
                this.task.completa = false;
                this.task.nome = undefined;
                this.nomeTarefa = undefined;
            }
        }
    };
    HomePage.prototype.remove = function (index) {
        var _this = this;
        this.db.removeTask(this.db.handleRepository().list()[index]).
            then(function (res) { return _this.lista = _this.db.handleRepository().list(); });
        this.processa();
    };
    HomePage.prototype.change = function (index) {
        var _this = this;
        var task = this.db.handleRepository().list()[index];
        task.completa = !task.completa;
        this.db.changeTask(task).then(function (res) { return _this.processa(); });
    };
    HomePage.prototype.changeAll = function () {
        var _this = this;
        this.valueall = !this.valueall;
        this.db.changeManyTask(this.valueall, this.db.handleRepository().list()).then(function (res) { return _this.db.handleRepository().list().forEach(function (item) {
            item.completa = _this.valueall;
        }); });
        this.processa();
    };
    HomePage.prototype.processa = function () {
        if (this.estado == "ativos") {
            this.ativos();
        }
        if (this.estado == "todos") {
            this.todos();
        }
        if (this.estado == "completos") {
            this.completos();
        }
    };
    HomePage.prototype.ativos = function () {
        this.estado = "ativos";
        this.lista = this.db.handleRepository().list().filter(function (t) { return !t.completa; });
    };
    HomePage.prototype.todos = function () {
        this.estado = "todos";
        this.lista = this.db.handleRepository().list();
    };
    HomePage.prototype.completos = function () {
        this.estado = "completos";
        this.lista = this.db.handleRepository().list().filter(function (t) { return t.completa; });
    };
    HomePage.prototype.limparCompletos = function () {
        var _this = this;
        var completas = this.db.handleRepository().list().filter(function (task) { return task.completa; });
        var naoCompletas = this.db.handleRepository().list().filter(function (task) { return !task.completa; });
        this.db.removeManyTask(completas).then(function (res) {
            _this.db.handleRepository().set(naoCompletas);
            _this.lista = _this.db.handleRepository().list();
            _this.processa();
        });
    };
    HomePage.prototype.hasCompletos = function () {
        return this.db.handleRepository().list().some(function (t) { return t.completa; });
    };
    HomePage.prototype.itemsLeft = function () {
        return this.db.handleRepository().list().filter(function (t) { return !t.completa; }).length;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Users\f897604\todomvc\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <h1 style="text-align: center;">todos</h1>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-toggle (tap)="changeAll()" item-start></ion-toggle>\n      <ion-input\n        [placeholder]="\'What needs to be done?\'"\n        [(ngModel)]="nomeTarefa"\n        (keypress)="add($event)" item-end></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-item *ngFor="let item of lista; index as i" [hidden]="item.completa && estado==\'ativos\'">\n      <ion-toggle [(ngModel)]="item.completa" item-start></ion-toggle>\n      <ion-label [ngClass]="item.completa?\'item-md-disabled\':\'item-md\'">{{item.nome}}</ion-label>\n      <button ion-button clear (click)="remove(i)" item-end>\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n\n  <ion-grid>\n    <ion-row>\n        <ion-col>\n          <button ion-button clear>{{itemsLeft()}} items left</button>\n        </ion-col>\n\n        <ion-col>\n            <ion-buttons>\n              <button ion-button color="dark" [ngClass]="estado==\'todos\'?\'button-outline-md\':\'button-outline-md-dark\'" (click)="todos()" outline>All</button>\n              <button ion-button color="dark" [ngClass]="estado==\'ativos\'?\'button-outline-md\':\'button-outline-md-dark\'"(click)="ativos()" outline>Active</button>\n              <button ion-button color="dark" [ngClass]="estado==\'completos\'?\'button-outline-md\':\'button-outline-md-dark\'"(click)="completos()" outline>Completed</button>\n            </ion-buttons>\n        </ion-col>\n        \n        <ion-col>\n            <ion-buttons right>\n              <button *ngIf="hasCompletos()" ion-button color="dark" (click)="limparCompletos()" outline>Clear Completed</button>\n            </ion-buttons>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  \n</ion-content>\n'/*ion-inline-end:"D:\Users\f897604\todomvc\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AbstractyRepository__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Fornecedor de dados.
 * @author Alisson Nascimento
 */
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http) {
        this.http = http;
        this.apiUrl = "http://localhost:8080/task";
        this.repository = new __WEBPACK_IMPORTED_MODULE_2__AbstractyRepository__["a" /* AbstractRepository */](new Array());
    }
    DatabaseProvider.prototype.handleTasks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl)
                .toPromise()
                .then(function (res) {
                _this.repository = new __WEBPACK_IMPORTED_MODULE_2__AbstractyRepository__["a" /* AbstractRepository */](res);
                resolve();
            });
        });
    };
    DatabaseProvider.prototype.handleRepository = function () {
        return this.repository;
    };
    DatabaseProvider.prototype.saveTask = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl, task)
                .toPromise()
                .then(function (res) {
                _this.repository.add(task);
                resolve();
            });
        });
    };
    DatabaseProvider.prototype.changeTask = function (task) {
        var _this = this;
        console.log(task);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl, task)
                .toPromise()
                .then(function (res) {
                resolve();
            });
        });
    };
    DatabaseProvider.prototype.changeManyTask = function (valueall, tasks) {
        var _this = this;
        var ids = tasks.map(function (t) { return t.id; }).join(',');
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/alterar-muitos/' + valueall + "/" + ids)
                .toPromise()
                .then(function (res) {
                resolve();
            });
        });
    };
    DatabaseProvider.prototype.removeTask = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/remover/' + task.id)
                .toPromise()
                .then(function (res) {
                _this.repository.remove(task);
                resolve();
            });
        });
    };
    DatabaseProvider.prototype.removeManyTask = function (tasks) {
        var _this = this;
        var ids = tasks.map(function (t) { return t.id; }).join(',');
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/remover-muitos/' + ids)
                .toPromise()
                .then(function (res) {
                resolve();
            });
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], DatabaseProvider);
    return DatabaseProvider;
    var _a;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_database__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_rest_rest__ = __webpack_require__(278);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_rest_rest__["a" /* RestProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Users\f897604\todomvc\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\Users\f897604\todomvc\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractRepository; });
/**
 * Repositório abstrato de onde os dados são recuperados
 * @author Alisson Nascimento
 */
var AbstractRepository = /** @class */ (function () {
    function AbstractRepository(rep) {
        this.rep = rep;
    }
    AbstractRepository.prototype.add = function (obj) {
        this.rep.push(obj);
    };
    AbstractRepository.prototype.remove = function (obj) {
        var _this = this;
        this.rep.forEach(function (item, index) {
            if (item == obj) {
                _this.removeByIndex(index);
            }
        });
    };
    AbstractRepository.prototype.removeByIndex = function (index) {
        this.rep.splice(index, 1);
    };
    AbstractRepository.prototype.list = function () {
        return this.rep;
    };
    AbstractRepository.prototype.set = function (lista) {
        this.rep = lista;
    };
    return AbstractRepository;
}());

//# sourceMappingURL=AbstractyRepository.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__persistent_model__ = __webpack_require__(277);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Modelo de dados para a entidade de tarefa.
 * @author Alisson Nascimento
 */
var TaskModel = /** @class */ (function (_super) {
    __extends(TaskModel, _super);
    function TaskModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.completa = true;
        return _this;
    }
    return TaskModel;
}(__WEBPACK_IMPORTED_MODULE_0__persistent_model__["a" /* Persistent */]));

//# sourceMappingURL=task.model.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Persistent; });
var Persistent = /** @class */ (function () {
    function Persistent() {
    }
    return Persistent;
}());

//# sourceMappingURL=persistent.model.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        this.apiUrl = "http://localhost:8080";
        console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.getTasks = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('path/to/data.json')
                .subscribe(function (data) {
                _this.data = data;
                console.log(data);
                resolve(_this.data);
            });
        });
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map