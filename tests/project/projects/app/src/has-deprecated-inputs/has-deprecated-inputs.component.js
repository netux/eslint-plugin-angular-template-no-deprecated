"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasDeprecatedInputsComponent = void 0;
const core_1 = require("@angular/core");
const defaultSymbol = Symbol('default');
let HasDeprecatedInputsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-has-deprecated-inputs',
            templateUrl: './has-deprecated-inputs.component.html',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _deprecatedInput_decorators;
    let _deprecatedInput_initializers = [];
    let _deprecatedInput_extraInitializers = [];
    let _deprecatedInput2_decorators;
    let _deprecatedInput2_initializers = [];
    let _deprecatedInput2_extraInitializers = [];
    let _deprecatedEventEmitter_decorators;
    let _deprecatedEventEmitter_initializers = [];
    let _deprecatedEventEmitter_extraInitializers = [];
    let _deprecatedInputForTwoWayBinding_decorators;
    let _deprecatedInputForTwoWayBinding_initializers = [];
    let _deprecatedInputForTwoWayBinding_extraInitializers = [];
    let _deprecatedInputForTwoWayBindingChange_decorators;
    let _deprecatedInputForTwoWayBindingChange_initializers = [];
    let _deprecatedInputForTwoWayBindingChange_extraInitializers = [];
    var HasDeprecatedInputsComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _deprecatedInput_decorators = [(0, core_1.Input)()];
            _deprecatedInput2_decorators = [(0, core_1.Input)()];
            _deprecatedEventEmitter_decorators = [(0, core_1.Output)()];
            _deprecatedInputForTwoWayBinding_decorators = [(0, core_1.Input)()];
            _deprecatedInputForTwoWayBindingChange_decorators = [(0, core_1.Output)()];
            __esDecorate(null, null, _deprecatedInput_decorators, { kind: "field", name: "deprecatedInput", static: false, private: false, access: { has: obj => "deprecatedInput" in obj, get: obj => obj.deprecatedInput, set: (obj, value) => { obj.deprecatedInput = value; } }, metadata: _metadata }, _deprecatedInput_initializers, _deprecatedInput_extraInitializers);
            __esDecorate(null, null, _deprecatedInput2_decorators, { kind: "field", name: "deprecatedInput2", static: false, private: false, access: { has: obj => "deprecatedInput2" in obj, get: obj => obj.deprecatedInput2, set: (obj, value) => { obj.deprecatedInput2 = value; } }, metadata: _metadata }, _deprecatedInput2_initializers, _deprecatedInput2_extraInitializers);
            __esDecorate(null, null, _deprecatedEventEmitter_decorators, { kind: "field", name: "deprecatedEventEmitter", static: false, private: false, access: { has: obj => "deprecatedEventEmitter" in obj, get: obj => obj.deprecatedEventEmitter, set: (obj, value) => { obj.deprecatedEventEmitter = value; } }, metadata: _metadata }, _deprecatedEventEmitter_initializers, _deprecatedEventEmitter_extraInitializers);
            __esDecorate(null, null, _deprecatedInputForTwoWayBinding_decorators, { kind: "field", name: "deprecatedInputForTwoWayBinding", static: false, private: false, access: { has: obj => "deprecatedInputForTwoWayBinding" in obj, get: obj => obj.deprecatedInputForTwoWayBinding, set: (obj, value) => { obj.deprecatedInputForTwoWayBinding = value; } }, metadata: _metadata }, _deprecatedInputForTwoWayBinding_initializers, _deprecatedInputForTwoWayBinding_extraInitializers);
            __esDecorate(null, null, _deprecatedInputForTwoWayBindingChange_decorators, { kind: "field", name: "deprecatedInputForTwoWayBindingChange", static: false, private: false, access: { has: obj => "deprecatedInputForTwoWayBindingChange" in obj, get: obj => obj.deprecatedInputForTwoWayBindingChange, set: (obj, value) => { obj.deprecatedInputForTwoWayBindingChange = value; } }, metadata: _metadata }, _deprecatedInputForTwoWayBindingChange_initializers, _deprecatedInputForTwoWayBindingChange_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HasDeprecatedInputsComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        defaultSymbol = defaultSymbol;
        /** @deprecated */
        deprecatedInput = __runInitializers(this, _deprecatedInput_initializers, defaultSymbol);
        /** @deprecated */
        deprecatedInput2 = (__runInitializers(this, _deprecatedInput_extraInitializers), __runInitializers(this, _deprecatedInput2_initializers, defaultSymbol));
        /** @deprecated */
        deprecatedEventEmitter = (__runInitializers(this, _deprecatedInput2_extraInitializers), __runInitializers(this, _deprecatedEventEmitter_initializers, new core_1.EventEmitter()));
        /** @deprecated */
        deprecatedInputSignal = (__runInitializers(this, _deprecatedEventEmitter_extraInitializers), (0, core_1.input)(defaultSymbol));
        /** @deprecated */
        deprecatedInputSignal2 = (0, core_1.input)(defaultSymbol);
        /** @deprecated */
        deprecatedOutput = (0, core_1.output)();
        /** @deprecated */
        deprecatedInputForTwoWayBinding = __runInitializers(this, _deprecatedInputForTwoWayBinding_initializers, defaultSymbol);
        /** @deprecated */
        deprecatedInputForTwoWayBindingChange = (__runInitializers(this, _deprecatedInputForTwoWayBinding_extraInitializers), __runInitializers(this, _deprecatedInputForTwoWayBindingChange_initializers, new core_1.EventEmitter()));
        constructor() {
            __runInitializers(this, _deprecatedInputForTwoWayBindingChange_extraInitializers);
        }
    };
    return HasDeprecatedInputsComponent = _classThis;
})();
exports.HasDeprecatedInputsComponent = HasDeprecatedInputsComponent;
//# sourceMappingURL=has-deprecated-inputs.component.js.map