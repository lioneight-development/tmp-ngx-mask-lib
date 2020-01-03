/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config, timeMasks, withoutValidation } from './config';
import { MaskService } from './mask.service';
// tslint:disable deprecation
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService, _config) {
        this.document = document;
        this._maskService = _maskService;
        this._config = _config;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.thousandSeparator = ' ';
        this.decimalMarker = '.';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.placeHolderCharacter = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this.separatorLimit = null;
        this._maskValue = '';
        this._position = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaskDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var maskExpression = changes.maskExpression, specialCharacters = changes.specialCharacters, patterns = changes.patterns, prefix = changes.prefix, suffix = changes.suffix, thousandSeparator = changes.thousandSeparator, decimalMarker = changes.decimalMarker, dropSpecialCharacters = changes.dropSpecialCharacters, hiddenInput = changes.hiddenInput, showMaskTyped = changes.showMaskTyped, placeHolderCharacter = changes.placeHolderCharacter, shownMaskExpression = changes.shownMaskExpression, showTemplate = changes.showTemplate, clearIfNotMatch = changes.clearIfNotMatch, validation = changes.validation, separatorLimit = changes.separatorLimit;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
                return;
            }
            else {
                this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
            }
        }
        // Only overwrite the mask available patterns if a pattern has actually been passed in
        if (patterns && patterns.currentValue) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator.currentValue;
        }
        if (decimalMarker) {
            this._maskService.decimalMarker = decimalMarker.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (placeHolderCharacter) {
            this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        if (separatorLimit) {
            this._maskService.separatorLimit = separatorLimit.currentValue;
        }
        this._applyMask();
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    MaskDirective.prototype.validate = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a.value;
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return { 'Mask error': true };
        }
        if (this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (timeMasks.includes(this._maskValue)) {
            return this._validateTime(value);
        }
        if (value && value.toString().length >= 1) {
            /** @type {?} */
            var counterOfOpt = 0;
            var _loop_1 = function (key) {
                if (this_1._maskService.maskAvailablePatterns[key].optional &&
                    this_1._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this_1._maskValue.indexOf(key) !== this_1._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        var opt = this_1._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i === key; }))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this_1._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this_1._maskValue.indexOf(key) !== -1 && value.toString().length >= this_1._maskValue.indexOf(key)) {
                        return { value: null };
                    }
                    if (counterOfOpt === this_1._maskValue.length) {
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var key in this._maskService.maskAvailablePatterns) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (this._maskValue.indexOf('{') === 1 &&
                value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
                return null;
            }
            if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
                this._maskValue.indexOf('{') === 1) {
                return { 'Mask error': true };
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                /** @type {?} */
                var length_1 = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length_1) {
                    return { 'Mask error': true };
                }
            }
        }
        return null;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        var caretShift = 0;
        /** @type {?} */
        var backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        function (shift, _backspaceShift) {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        var positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        if (positionToApply > this._getActualInputLength()) {
            positionToApply = this._getActualInputLength();
        }
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        /** @type {?} */
        var posStart = 0;
        /** @type {?} */
        var posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // We are showing the mask in the input
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    // the input ONLY contains the mask, so position the cursor at the start
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else {
                    // the input contains some characters already
                    if (el.selectionStart > this._maskService.actualValue.length) {
                        // if the user clicked beyond our value's length, position the cursor at the end of our value
                        el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
                    }
                }
            }
        /** @type {?} */
        var nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
        /** select only inserted text */
        if (((/** @type {?} */ (el.selectionEnd))) > this._getActualInputLength()) {
            el.selectionEnd = this._getActualInputLength();
        }
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onKeyDown = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && ((/** @type {?} */ (el.selectionStart))) !== 0) {
                // If specialChars is false, (shouldn't ever happen) then set to the defaults
                this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
                if (this.prefix.length > 1 && ((/** @type {?} */ (el.selectionStart))) <= this.prefix.length) {
                    el.setSelectionRange(this.prefix.length, this.prefix.length);
                }
                else {
                    if (this._inputValue.length !== ((/** @type {?} */ (el.selectionStart))) &&
                        ((/** @type {?} */ (el.selectionStart))) !== 1) {
                        while (this.specialCharacters.includes(this._inputValue[((/** @type {?} */ (el.selectionStart))) - 1].toString()) &&
                            ((this.prefix.length >= 1 && ((/** @type {?} */ (el.selectionStart))) > this.prefix.length) ||
                                this.prefix.length === 0)) {
                            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
                        }
                    }
                    this.suffixCheckOnPressDelete(e.keyCode, el);
                }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
            if (this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            /** @type {?} */
            var cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
        if (!!this.suffix &&
            this.suffix.length > 1 &&
            this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
            el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        else if ((e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+ A
            (e.keyCode === 65 && e.metaKey === true) // Cmd + A (Mac)
        ) {
            el.setSelectionRange(0, this._getActualInputLength());
            e.preventDefault();
        }
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                if (typeof inputValue === 'number') {
                    inputValue = String(inputValue);
                    inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                    this._maskService.isNumberValue = true;
                }
                (inputValue && this._maskService.maskExpression) ||
                    (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                    ? (this._maskService.formElementProperty = [
                        'value',
                        this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                    ])
                    : (this._maskService.formElementProperty = ['value', inputValue]);
                this._inputValue = inputValue;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    MaskDirective.prototype.suffixCheckOnPressDelete = /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    function (keyCode, el) {
        if (keyCode === 46 && this.suffix.length > 0) {
            if (this._inputValue.length - this.suffix.length <= ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
        }
        if (keyCode === 8) {
            if (this.suffix.length > 1 &&
                this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
            if (this.suffix.length === 1 && this._inputValue.length === ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
            }
        }
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onModelChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            function (accum, currval, index) {
                _this._start = currval === '{' ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp.slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1).join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._applyMask = 
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    function () {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskDirective.prototype._validateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== ':'; })).length;
        if (+value[value.length - 1] === 0 && value.length < rowMaskLen) {
            return { 'Mask error': true };
        }
        if (value.length <= rowMaskLen - 2) {
            return { 'Mask error': true };
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._getActualInputLength = /**
     * @private
     * @return {?}
     */
    function () {
        return this._maskService.actualValue.length ||
            this._maskService.actualValue.length + this._maskService.prefix.length;
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        MaskService,
                    ],
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: MaskService },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
    MaskDirective.propDecorators = {
        maskExpression: [{ type: Input, args: ['mask',] }],
        specialCharacters: [{ type: Input }],
        patterns: [{ type: Input }],
        prefix: [{ type: Input }],
        suffix: [{ type: Input }],
        thousandSeparator: [{ type: Input }],
        decimalMarker: [{ type: Input }],
        dropSpecialCharacters: [{ type: Input }],
        hiddenInput: [{ type: Input }],
        showMaskTyped: [{ type: Input }],
        placeHolderCharacter: [{ type: Input }],
        shownMaskExpression: [{ type: Input }],
        showTemplate: [{ type: Input }],
        clearIfNotMatch: [{ type: Input }],
        validation: [{ type: Input }],
        separatorLimit: [{ type: Input }],
        onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onModelChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
    };
    return MaskDirective;
}());
export { MaskDirective };
if (false) {
    /** @type {?} */
    MaskDirective.prototype.maskExpression;
    /** @type {?} */
    MaskDirective.prototype.specialCharacters;
    /** @type {?} */
    MaskDirective.prototype.patterns;
    /** @type {?} */
    MaskDirective.prototype.prefix;
    /** @type {?} */
    MaskDirective.prototype.suffix;
    /** @type {?} */
    MaskDirective.prototype.thousandSeparator;
    /** @type {?} */
    MaskDirective.prototype.decimalMarker;
    /** @type {?} */
    MaskDirective.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskDirective.prototype.hiddenInput;
    /** @type {?} */
    MaskDirective.prototype.showMaskTyped;
    /** @type {?} */
    MaskDirective.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskDirective.prototype.shownMaskExpression;
    /** @type {?} */
    MaskDirective.prototype.showTemplate;
    /** @type {?} */
    MaskDirective.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskDirective.prototype.validation;
    /** @type {?} */
    MaskDirective.prototype.separatorLimit;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._code;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
    /**
     * @type {?}
     * @protected
     */
    MaskDirective.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc3QztJQXdDRSx1QkFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBMUJ0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJLENBQUM7UUFDbEUsaUJBQVksR0FBbUMsSUFBSSxDQUFDO1FBQ3BELG9CQUFlLEdBQXNDLElBQUksQ0FBQztRQUMxRCxlQUFVLEdBQWlDLElBQUksQ0FBQztRQUNoRCxtQkFBYyxHQUFxQyxJQUFJLENBQUM7UUFDaEUsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQWtCLElBQUksQ0FBQztRQVdqQyxhQUFROzs7O1FBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxFQUFDO1FBQzNCLFlBQU87OztRQUFHLGNBQVEsQ0FBQyxFQUFDO0lBSHZCLENBQUM7Ozs7O0lBS0UsbUNBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBc0I7UUFFckMsSUFBQSx1Q0FBYyxFQUNkLDZDQUFpQixFQUNqQiwyQkFBUSxFQUNSLHVCQUFNLEVBQ04sdUJBQU0sRUFDTiw2Q0FBaUIsRUFDakIscUNBQWEsRUFDYixxREFBcUIsRUFDckIsaUNBQVcsRUFDWCxxQ0FBYSxFQUNiLG1EQUFvQixFQUNwQixpREFBbUIsRUFDbkIsbUNBQVksRUFDWix5Q0FBZSxFQUNmLCtCQUFVLEVBQ1YsdUNBQWM7UUFFaEIsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7U0FDN0Q7UUFDRCxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNyRixPQUFPO2FBQ1I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQzthQUN4RjtTQUNGO1FBQ0Qsc0ZBQXNGO1FBQ3RGLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQztTQUN0RTtRQUNELElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7U0FDOUQ7UUFDRCxJQUFJLHFCQUFxQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUMsWUFBWSxDQUFDO1NBQzlFO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztTQUM5RDtRQUNELElBQUksb0JBQW9CLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQyxZQUFZLENBQUM7U0FDNUU7UUFDRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztTQUM1RDtRQUNELElBQUksZUFBZSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUM7U0FDbEU7UUFDRCxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7U0FDeEQ7UUFDRCxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxrREFBa0Q7Ozs7OztJQUMzQyxnQ0FBUTs7Ozs7O0lBQWYsVUFBZ0IsRUFBc0I7WUFBcEIsZ0JBQUs7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7O2dCQUNyQyxZQUFZLEdBQUcsQ0FBQztvQ0FDVCxHQUFHO2dCQUNaLElBQ0UsT0FBSyxZQUFZLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTtvQkFDckQsT0FBSyxZQUFZLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksRUFDOUQ7b0JBQ0EsSUFBSSxPQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs0QkFDL0QsR0FBRyxHQUFXLE9BQUssVUFBVTs2QkFDaEMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs2QkFDVCxNQUFNOzs7O3dCQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxLQUFLLEdBQUcsRUFBVCxDQUFTLEVBQUM7NkJBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ1gsWUFBWSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7cUJBQzVCO3lCQUFNLElBQUksT0FBSyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUM5QyxZQUFZLEVBQUUsQ0FBQztxQkFDaEI7b0JBQ0QsSUFBSSxPQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sSUFBSSxPQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7d0NBQzNGLElBQUk7cUJBQ1o7b0JBQ0QsSUFBSSxZQUFZLEtBQUssT0FBSyxVQUFVLENBQUMsTUFBTSxFQUFFO3dDQUNwQyxJQUFJO3FCQUNaO2lCQUNGOzs7WUFwQkgsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQjtzQ0FBOUMsR0FBRzs7O2FBcUJiO1lBQ0QsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzVHO2dCQUNBLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU0sSUFDTCxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2xDO2dCQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDL0I7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOztvQkFDeEUsUUFBTSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCO29CQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWTtvQkFDbkcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFlBQVk7Z0JBQ3pDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFNLEVBQUU7b0JBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQy9CO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHTSwrQkFBTzs7OztJQURkLFVBQ2UsQ0FBc0I7O1lBQzdCLEVBQUUsR0FBcUIsbUJBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBb0I7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjs7WUFDSyxRQUFRLEdBQ1osRUFBRSxDQUFDLGNBQWMsS0FBSyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDakUsQ0FBQyxDQUFDLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDOztZQUMvQixVQUFVLEdBQUcsQ0FBQzs7WUFDZCxjQUFjLEdBQUcsS0FBSztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVE7Ozs7O1FBQUUsVUFBQyxLQUFhLEVBQUUsZUFBd0I7WUFDcEYsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUNuQixjQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ25DLENBQUMsRUFBQyxDQUFDO1FBQ0gsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssRUFBRSxFQUFFO1lBQ3RDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7O1lBQzNGLGVBQWUsR0FBVyxJQUFJLENBQUMsU0FBUztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLFVBQVU7WUFDakQsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUMvRSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUNsRCxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDaEQ7UUFDRCxFQUFFLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDaEcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUY7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDOzs7O0lBR00sOEJBQU07OztJQURiO1FBRUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7OztJQUdNLCtCQUFPOzs7O0lBRGQsVUFDZSxDQUFtQzs7WUFDMUMsRUFBRSxHQUFxQixtQkFBQSxDQUFDLENBQUMsTUFBTSxFQUFvQjs7WUFDbkQsUUFBUSxHQUFHLENBQUM7O1lBQ1osTUFBTSxHQUFHLENBQUM7UUFDaEIsSUFDRSxFQUFFLEtBQUssSUFBSTtZQUNYLEVBQUUsQ0FBQyxjQUFjLEtBQUssSUFBSTtZQUMxQixFQUFFLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxZQUFZO1lBQ3JDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNuRCwyQkFBMkI7WUFDM0IsQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFO1lBRXpCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQ25DLHVDQUF1QztnQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRTtvQkFDakcsd0VBQXdFO29CQUN4RSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ1gsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0wsNkNBQTZDO29CQUM3QyxJQUFJLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO3dCQUM1RCw2RkFBNkY7d0JBQzdGLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2xHO2lCQUNGO2FBQ0Y7O1lBQ0csU0FBUyxHQUNiLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTTtZQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO1lBQzFELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSztRQUVkLHdHQUF3RztRQUN4RyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ3RCO1FBRUQsZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQUEsRUFBRSxDQUFDLFlBQVksRUFBVSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckcsRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEQsT0FBTztTQUNSO1FBRUQsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxtQkFBQSxFQUFFLENBQUMsWUFBWSxFQUFVLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUM5RCxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELGtEQUFrRDs7Ozs7O0lBRTNDLGlDQUFTOzs7Ozs7SUFEaEIsVUFDaUIsQ0FBc0I7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOztZQUMvQixFQUFFLEdBQXFCLG1CQUFBLENBQUMsQ0FBQyxNQUFNLEVBQW9CO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzVDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUNyQztZQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFELDZFQUE2RTtnQkFDN0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dCQUNsRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUNqRixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0wsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQzt3QkFDekQsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsS0FBSyxDQUFDLEVBQ25DO3dCQUNBLE9BQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUMvRDs0QkFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0NBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUMzQjs0QkFDQSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDNUY7cUJBQ0Y7b0JBQ0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7WUFDRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ2pDLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDaEUsQ0FBQyxtQkFBQSxFQUFFLENBQUMsWUFBWSxFQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQzlEO2dCQUNBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNwQjs7Z0JBQ0ssV0FBVyxHQUFrQixFQUFFLENBQUMsY0FBYztZQUNwRCxtQkFBbUI7WUFDbkIsSUFDRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxFQUFFLENBQUMsUUFBUTtnQkFDWixXQUFXLEtBQUssQ0FBQztnQkFDakIsRUFBRSxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ25DLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDckI7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6RztTQUNGO1FBQ0QsSUFDRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLEVBQzVFO1lBQ0EsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0Y7YUFBTSxJQUNMLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxVQUFVO1lBQ3RELENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBSSxnQkFBZ0I7VUFDNUQ7WUFDQSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQzdDLENBQUM7SUFFRCx1Q0FBdUM7Ozs7OztJQUMxQixrQ0FBVTs7Ozs7SUFBdkIsVUFBd0IsVUFBMkI7OztnQkFDakQsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO29CQUM1QixVQUFVLEdBQUcsRUFBRSxDQUFDO2lCQUNqQjtnQkFDRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtvQkFDbEMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUN4QztnQkFDRCxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztvQkFDOUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ25HLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUc7d0JBQ3pDLE9BQU87d0JBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO3FCQUMxRSxDQUFDO29CQUNGLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Ozs7S0FDL0I7Ozs7O0lBRU0sd0NBQWdCOzs7O0lBQXZCLFVBQXdCLEVBQU87UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVNLHlDQUFpQjs7OztJQUF4QixVQUF5QixFQUFPO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVNLGdEQUF3Qjs7Ozs7SUFBL0IsVUFBZ0MsT0FBZSxFQUFFLEVBQW9CO1FBQ25FLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxFQUFFO2dCQUNqRixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3RjtTQUNGO1FBQ0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsRUFDNUU7Z0JBQ0EsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0Y7WUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxFQUFFO2dCQUN6RixFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM1RjtTQUNGO0lBQ0gsQ0FBQztJQUVELG9DQUFvQzs7Ozs7O0lBQzdCLHdDQUFnQjs7Ozs7SUFBdkIsVUFBd0IsVUFBbUI7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUlNLHFDQUFhOzs7O0lBRnBCLFVBRXFCLENBQU07UUFDekIsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7OztJQUVPLDZDQUFxQjs7Ozs7SUFBN0IsVUFBOEIsT0FBZTtRQUE3QyxpQkFnQkM7UUFmQyxPQUFPLENBQ0wsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07Ozs7OztZQUFDLFVBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxLQUFhO2dCQUNyRSxLQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQztnQkFFcEQsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO29CQUNuQixPQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDOUU7Z0JBQ0QsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7O29CQUNaLFlBQVksR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O29CQUN4RSxVQUFVLEdBQVcsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckYsT0FBTyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQzVCLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztZQUNULE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNELGtDQUFrQzs7Ozs7O0lBQzFCLGtDQUFVOzs7Ozs7SUFBbEI7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHO1lBQ3RDLE9BQU87WUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1NBQ2hGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyxxQ0FBYTs7Ozs7SUFBckIsVUFBc0IsS0FBYTs7WUFDM0IsVUFBVSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsS0FBSyxHQUFHLEVBQVQsQ0FBUyxFQUFDLENBQUMsTUFBTTtRQUM1RixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxFQUFFO1lBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNsQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVPLDZDQUFxQjs7OztJQUE3QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTTtZQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzNFLENBQUM7O2dCQTdjRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFDOzRCQUM1QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsRUFBQzs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0QsV0FBVztxQkFDWjtpQkFDRjs7OztnREEwQkksTUFBTSxTQUFDLFFBQVE7Z0JBNUNYLFdBQVc7Z0RBOENmLE1BQU0sU0FBQyxNQUFNOzs7aUNBMUJmLEtBQUssU0FBQyxNQUFNO29DQUNaLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7b0NBQ0wsS0FBSztnQ0FDTCxLQUFLO3dDQUNMLEtBQUs7OEJBQ0wsS0FBSztnQ0FDTCxLQUFLO3VDQUNMLEtBQUs7c0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLEtBQUs7NkJBQ0wsS0FBSztpQ0FDTCxLQUFLOzBCQW1LTCxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQW9DaEMsWUFBWSxTQUFDLE1BQU07MEJBTW5CLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBbURoQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQTZIbEMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFpRDNDLG9CQUFDO0NBQUEsQUE5Y0QsSUE4Y0M7U0E5YlksYUFBYTs7O0lBQ3hCLHVDQUFrRDs7SUFDbEQsMENBQXFFOztJQUNyRSxpQ0FBbUQ7O0lBQ25ELCtCQUErQzs7SUFDL0MsK0JBQStDOztJQUMvQywwQ0FBc0U7O0lBQ3RFLHNDQUE4RDs7SUFDOUQsOENBQXNGOztJQUN0RixvQ0FBa0U7O0lBQ2xFLHNDQUFzRTs7SUFDdEUsNkNBQW9GOztJQUNwRiw0Q0FBa0Y7O0lBQ2xGLHFDQUFvRTs7SUFDcEUsd0NBQTBFOztJQUMxRSxtQ0FBZ0U7O0lBQ2hFLHVDQUF3RTs7Ozs7SUFDeEUsbUNBQWdDOzs7OztJQUNoQyxvQ0FBNkI7Ozs7O0lBQzdCLGtDQUF3Qzs7Ozs7SUFDeEMsK0JBQXdCOzs7OztJQUN4Qiw2QkFBc0I7Ozs7O0lBQ3RCLDhCQUF1Qjs7SUFRdkIsaUNBQWtDOztJQUNsQyxnQ0FBMkI7Ozs7O0lBTnpCLGlDQUF1Qzs7Ozs7SUFDdkMscUNBQWlDOzs7OztJQUNqQyxnQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDdXN0b21LZXlib2FyZEV2ZW50IH0gZnJvbSAnLi9jdXN0b20ta2V5Ym9hcmQtZXZlbnQnO1xuaW1wb3J0IHsgY29uZmlnLCBJQ29uZmlnLCB0aW1lTWFza3MsIHdpdGhvdXRWYWxpZGF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFza1NlcnZpY2UgfSBmcm9tICcuL21hc2suc2VydmljZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlIGRlcHJlY2F0aW9uXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWFza10nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIE1hc2tTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXNrRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgnbWFzaycpIHB1YmxpYyBtYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snc3BlY2lhbENoYXJhY3RlcnMnXSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgcGF0dGVybnM6IElDb25maWdbJ3BhdHRlcm5zJ10gPSB7fTtcbiAgQElucHV0KCkgcHVibGljIHByZWZpeDogSUNvbmZpZ1sncHJlZml4J10gPSAnJztcbiAgQElucHV0KCkgcHVibGljIHN1ZmZpeDogSUNvbmZpZ1snc3VmZml4J10gPSAnJztcbiAgQElucHV0KCkgcHVibGljIHRob3VzYW5kU2VwYXJhdG9yOiBJQ29uZmlnWyd0aG91c2FuZFNlcGFyYXRvciddID0gJyAnO1xuICBASW5wdXQoKSBwdWJsaWMgZGVjaW1hbE1hcmtlcjogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddID0gJy4nO1xuICBASW5wdXQoKSBwdWJsaWMgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZGVuSW5wdXQ6IElDb25maWdbJ2hpZGRlbklucHV0J10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNob3dNYXNrVHlwZWQ6IElDb25maWdbJ3Nob3dNYXNrVHlwZWQnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2VIb2xkZXJDaGFyYWN0ZXI6IElDb25maWdbJ3BsYWNlSG9sZGVyQ2hhcmFjdGVyJ10gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHNob3duTWFza0V4cHJlc3Npb246IElDb25maWdbJ3Nob3duTWFza0V4cHJlc3Npb24nXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd1RlbXBsYXRlOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdGlvbjogSUNvbmZpZ1sndmFsaWRhdGlvbiddIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3JMaW1pdDogSUNvbmZpZ1snc2VwYXJhdG9yTGltaXQnXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9tYXNrVmFsdWU6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9pbnB1dFZhbHVlITogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3N0YXJ0ITogbnVtYmVyO1xuICBwcml2YXRlIF9lbmQhOiBudW1iZXI7XG4gIHByaXZhdGUgX2NvZGUhOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIF9tYXNrU2VydmljZTogTWFza1NlcnZpY2UsXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnXG4gICkgeyB9XG5cbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHsgfTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgIG1hc2tFeHByZXNzaW9uLFxuICAgICAgc3BlY2lhbENoYXJhY3RlcnMsXG4gICAgICBwYXR0ZXJucyxcbiAgICAgIHByZWZpeCxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbE1hcmtlcixcbiAgICAgIGRyb3BTcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIGhpZGRlbklucHV0LFxuICAgICAgc2hvd01hc2tUeXBlZCxcbiAgICAgIHBsYWNlSG9sZGVyQ2hhcmFjdGVyLFxuICAgICAgc2hvd25NYXNrRXhwcmVzc2lvbixcbiAgICAgIHNob3dUZW1wbGF0ZSxcbiAgICAgIGNsZWFySWZOb3RNYXRjaCxcbiAgICAgIHZhbGlkYXRpb24sXG4gICAgICBzZXBhcmF0b3JMaW1pdCxcbiAgICB9ID0gY2hhbmdlcztcbiAgICBpZiAobWFza0V4cHJlc3Npb24pIHtcbiAgICAgIHRoaXMuX21hc2tWYWx1ZSA9IGNoYW5nZXMubWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoc3BlY2lhbENoYXJhY3RlcnMpIHtcbiAgICAgIGlmICghc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlIHx8ICFBcnJheS5pc0FycmF5KHNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gY2hhbmdlcy5zcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgW107XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE9ubHkgb3ZlcndyaXRlIHRoZSBtYXNrIGF2YWlsYWJsZSBwYXR0ZXJucyBpZiBhIHBhdHRlcm4gaGFzIGFjdHVhbGx5IGJlZW4gcGFzc2VkIGluXG4gICAgaWYgKHBhdHRlcm5zICYmIHBhdHRlcm5zLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gcGF0dGVybnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAocHJlZml4KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPSBwcmVmaXguY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc3VmZml4KSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zdWZmaXggPSBzdWZmaXguY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhvdXNhbmRTZXBhcmF0b3IpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnRob3VzYW5kU2VwYXJhdG9yID0gdGhvdXNhbmRTZXBhcmF0b3IuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoZGVjaW1hbE1hcmtlcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuZGVjaW1hbE1hcmtlciA9IGRlY2ltYWxNYXJrZXIuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSBkcm9wU3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoaGlkZGVuSW5wdXQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmhpZGRlbklucHV0ID0gaGlkZGVuSW5wdXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd01hc2tUeXBlZCkge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCA9IHNob3dNYXNrVHlwZWQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAocGxhY2VIb2xkZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnBsYWNlSG9sZGVyQ2hhcmFjdGVyID0gcGxhY2VIb2xkZXJDaGFyYWN0ZXIuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd25NYXNrRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd25NYXNrRXhwcmVzc2lvbiA9IHNob3duTWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2hvd1RlbXBsYXRlKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93VGVtcGxhdGUgPSBzaG93VGVtcGxhdGUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2xlYXJJZk5vdE1hdGNoKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2ggPSBjbGVhcklmTm90TWF0Y2guY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsaWRhdGlvbikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbiA9IHZhbGlkYXRpb24uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VwYXJhdG9yTGltaXQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlcGFyYXRvckxpbWl0ID0gc2VwYXJhdG9yTGltaXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl9hcHBseU1hc2soKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XG4gIHB1YmxpYyB2YWxpZGF0ZSh7IHZhbHVlIH06IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGlmICghdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5pcEVycm9yKSB7XG4gICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh3aXRob3V0VmFsaWRhdGlvbi5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aW1lTWFza3MuaW5jbHVkZXModGhpcy5fbWFza1ZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlVGltZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgY291bnRlck9mT3B0ID0gMDtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zW2tleV0ub3B0aW9uYWwgJiZcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gdGhpcy5fbWFza1ZhbHVlLmxhc3RJbmRleE9mKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdDogc3RyaW5nID0gdGhpcy5fbWFza1ZhbHVlXG4gICAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgICAgLmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSBrZXkpXG4gICAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCArPSBvcHQubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gdGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb3VudGVyT2ZPcHQgPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZigneycpID09PSAxICYmXG4gICAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID09PSB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoICsgTnVtYmVyKHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgneycpWzFdLnNwbGl0KCd9JylbMF0pIC0gNFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IDEgfHwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykpIHx8XG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykpIHx8XG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID09PSAtMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAtMSkge1xuICAgICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVyc1xuICAgICAgICAgID8gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIHRoaXMuX21hc2tTZXJ2aWNlLmNoZWNrU3BlY2lhbENoYXJBbW91bnQodGhpcy5fbWFza1ZhbHVlKSAtIGNvdW50ZXJPZk9wdFxuICAgICAgICAgIDogdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIGNvdW50ZXJPZk9wdDtcbiAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHsgJ01hc2sgZXJyb3InOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbklucHV0KGU6IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmICghdGhpcy5fbWFza1ZhbHVlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGVsLnZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9XG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gMVxuICAgICAgICA/IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgICA6IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgIGxldCBjYXJldFNoaWZ0ID0gMDtcbiAgICBsZXQgYmFja3NwYWNlU2hpZnQgPSBmYWxzZTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseVZhbHVlQ2hhbmdlcyhwb3NpdGlvbiwgKHNoaWZ0OiBudW1iZXIsIF9iYWNrc3BhY2VTaGlmdDogYm9vbGVhbikgPT4ge1xuICAgICAgY2FyZXRTaGlmdCA9IHNoaWZ0O1xuICAgICAgYmFja3NwYWNlU2hpZnQgPSBfYmFja3NwYWNlU2hpZnQ7XG4gICAgfSk7XG4gICAgLy8gb25seSBzZXQgdGhlIHNlbGVjdGlvbiBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmVcbiAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAxID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xuICAgIGxldCBwb3NpdGlvblRvQXBwbHk6IG51bWJlciA9IHRoaXMuX3Bvc2l0aW9uXG4gICAgICA/IHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICsgcG9zaXRpb24gKyBjYXJldFNoaWZ0XG4gICAgICA6IHBvc2l0aW9uICsgKHRoaXMuX2NvZGUgPT09ICdCYWNrc3BhY2UnICYmICFiYWNrc3BhY2VTaGlmdCA/IDAgOiBjYXJldFNoaWZ0KTtcbiAgICBpZiAocG9zaXRpb25Ub0FwcGx5ID4gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSkge1xuICAgICAgcG9zaXRpb25Ub0FwcGx5ID0gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKTtcbiAgICB9XG4gICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zaXRpb25Ub0FwcGx5LCBwb3NpdGlvblRvQXBwbHkpO1xuICAgIGlmICgodGhpcy5tYXNrRXhwcmVzc2lvbi5pbmNsdWRlcygnSCcpIHx8IHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ00nKSkgJiYgY2FyZXRTaGlmdCA9PT0gMCkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEpO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2hGbigpO1xuICAgIHRoaXMub25Ub3VjaCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Gb2N1cyhlOiBNb3VzZUV2ZW50IHwgQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBwb3NTdGFydCA9IDA7XG4gICAgY29uc3QgcG9zRW5kID0gMDtcbiAgICBpZiAoXG4gICAgICBlbCAhPT0gbnVsbCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSBlbC5zZWxlY3Rpb25FbmQgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoZSBhcyBhbnkpLmtleUNvZGUgIT09IDM4XG4gICAgKVxuICAgICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgICAgLy8gV2UgYXJlIHNob3dpbmcgdGhlIG1hc2sgaW4gdGhlIGlucHV0XG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID0gdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tJbklucHV0KCk7XG4gICAgICAgIGlmIChlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9PT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAvLyB0aGUgaW5wdXQgT05MWSBjb250YWlucyB0aGUgbWFzaywgc28gcG9zaXRpb24gdGhlIGN1cnNvciBhdCB0aGUgc3RhcnRcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc1N0YXJ0LCBwb3NFbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBpbnB1dCBjb250YWlucyBzb21lIGNoYXJhY3RlcnMgYWxyZWFkeVxuICAgICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHVzZXIgY2xpY2tlZCBiZXlvbmQgb3VyIHZhbHVlJ3MgbGVuZ3RoLCBwb3NpdGlvbiB0aGUgY3Vyc29yIGF0IHRoZSBlbmQgb2Ygb3VyIHZhbHVlXG4gICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgsIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgY29uc3QgbmV4dFZhbHVlOiBzdHJpbmcgfCBudWxsID1cbiAgICAgICFlbC52YWx1ZSB8fCBlbC52YWx1ZSA9PT0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4XG4gICAgICAgID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd25cbiAgICAgICAgOiBlbC52YWx1ZTtcblxuICAgIC8qKiBGaXggb2YgY3Vyc29yIHBvc2l0aW9uIGp1bXBpbmcgdG8gZW5kIGluIG1vc3QgYnJvd3NlcnMgbm8gbWF0dGVyIHdoZXJlIGN1cnNvciBpcyBpbnNlcnRlZCBvbkZvY3VzICovXG4gICAgaWYgKGVsLnZhbHVlICE9PSBuZXh0VmFsdWUpIHtcbiAgICAgIGVsLnZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBmaXggb2YgY3Vyc29yIHBvc2l0aW9uIHdpdGggcHJlZml4IHdoZW4gbW91c2UgY2xpY2sgb2NjdXIgKi9cbiAgICBpZiAoKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIHx8IChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSkgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCkge1xuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKiBzZWxlY3Qgb25seSBpbnNlcnRlZCB0ZXh0ICovXG4gICAgaWYgKChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA+IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCkpIHtcbiAgICAgIGVsLnNlbGVjdGlvbkVuZCA9IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHlcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleURvd24oZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NvZGUgPSBlLmNvZGUgPyBlLmNvZGUgOiBlLmtleTtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gOCB8fCBlLmtleUNvZGUgPT09IDQ2KSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4ICYmIGVsLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZDtcbiAgICAgIH1cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgIT09IDApIHtcbiAgICAgICAgLy8gSWYgc3BlY2lhbENoYXJzIGlzIGZhbHNlLCAoc2hvdWxkbid0IGV2ZXIgaGFwcGVuKSB0aGVuIHNldCB0byB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5zcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuc3BlY2lhbENoYXJhY3RlcnMgfHwgdGhpcy5fY29uZmlnLnNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXgubGVuZ3RoID4gMSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLnByZWZpeC5sZW5ndGgpIHtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLnByZWZpeC5sZW5ndGgsIHRoaXMucHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggIT09IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICYmXG4gICAgICAgICAgICAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAhPT0gMVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0VmFsdWVbKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxXS50b1N0cmluZygpXG4gICAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgICAgKCh0aGlzLnByZWZpeC5sZW5ndGggPj0gMSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA+IHRoaXMucHJlZml4Lmxlbmd0aCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZpeC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShlLmtleUNvZGUsIGVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zdWZmaXhDaGVja09uUHJlc3NEZWxldGUoZS5rZXlDb2RlLCBlbCk7XG4gICAgICBpZiAodGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgICAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAgIChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY3Vyc29yU3RhcnQ6IG51bWJlciB8IG51bGwgPSBlbC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIC8vIHRoaXMub25Gb2N1cyhlKTtcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4ICYmXG4gICAgICAgICFlbC5yZWFkT25seSAmJlxuICAgICAgICBjdXJzb3JTdGFydCA9PT0gMCAmJlxuICAgICAgICBlbC5zZWxlY3Rpb25FbmQgPT09IGVsLnZhbHVlLmxlbmd0aCAmJlxuICAgICAgICBlbC52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggOiAwO1xuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2sodGhpcy5fbWFza1NlcnZpY2UucHJlZml4LCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiwgdGhpcy5fcG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICAhIXRoaXMuc3VmZml4ICYmXG4gICAgICB0aGlzLnN1ZmZpeC5sZW5ndGggPiAxICYmXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpXG4gICAgKSB7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiBlLmN0cmxLZXkgPT09IHRydWUpIHx8IC8vIEN0cmwrIEFcbiAgICAgIChlLmtleUNvZGUgPT09IDY1ICYmIGUubWV0YUtleSA9PT0gdHJ1ZSkgICAgLy8gQ21kICsgQSAoTWFjKVxuICAgICkge1xuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlbFN0YXJ0ID0gZWwuc2VsZWN0aW9uU3RhcnQ7XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VsRW5kID0gZWwuc2VsZWN0aW9uRW5kO1xuICB9XG5cbiAgLyoqIEl0IHdyaXRlcyB0aGUgdmFsdWUgaW4gdGhlIGlucHV0ICovXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlucHV0VmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaW5wdXRWYWx1ZSA9IFN0cmluZyhpbnB1dFZhbHVlKTtcbiAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmRlY2ltYWxNYXJrZXIgIT09ICcuJyA/IGlucHV0VmFsdWUucmVwbGFjZSgnLicsIHRoaXMuZGVjaW1hbE1hcmtlcikgOiBpbnB1dFZhbHVlO1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaXNOdW1iZXJWYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIChpbnB1dFZhbHVlICYmIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSB8fFxuICAgICAgKHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uICYmICh0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggfHwgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCkpXG4gICAgICA/ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgICAndmFsdWUnLFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2soaW5wdXRWYWx1ZSwgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24pLFxuICAgICAgXSlcbiAgICAgIDogKHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ3ZhbHVlJywgaW5wdXRWYWx1ZV0pO1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBpbnB1dFZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgcHVibGljIHN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShrZXlDb2RlOiBudW1iZXIsIGVsOiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKGtleUNvZGUgPT09IDQ2ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoa2V5Q29kZSA9PT0gOCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnN1ZmZpeC5sZW5ndGggPiAxICYmXG4gICAgICAgIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoIDwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcilcbiAgICAgICkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3VmZml4Lmxlbmd0aCA9PT0gMSAmJiB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCA9PT0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBJdCBkaXNhYmxlcyB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsnZGlzYWJsZWQnLCBpc0Rpc2FibGVkXTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueVxuICBwdWJsaWMgb25Nb2RlbENoYW5nZShlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIWUpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVwZWF0UGF0dGVyblN5bWJvbHMobWFza0V4cDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgKG1hc2tFeHAubWF0Y2goL3tbMC05XSt9LykgJiZcbiAgICAgICAgbWFza0V4cC5zcGxpdCgnJykucmVkdWNlKChhY2N1bTogc3RyaW5nLCBjdXJydmFsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gY3VycnZhbCA9PT0gJ3snID8gaW5kZXggOiB0aGlzLl9zdGFydDtcblxuICAgICAgICAgIGlmIChjdXJydmFsICE9PSAnfScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXNrU2VydmljZS5fZmluZFNwZWNpYWxDaGFyKGN1cnJ2YWwpID8gYWNjdW0gKyBjdXJydmFsIDogYWNjdW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2VuZCA9IGluZGV4O1xuICAgICAgICAgIGNvbnN0IHJlcGVhdE51bWJlcjogbnVtYmVyID0gTnVtYmVyKG1hc2tFeHAuc2xpY2UodGhpcy5fc3RhcnQgKyAxLCB0aGlzLl9lbmQpKTtcbiAgICAgICAgICBjb25zdCByZXBhY2VXaXRoOiBzdHJpbmcgPSBuZXcgQXJyYXkocmVwZWF0TnVtYmVyICsgMSkuam9pbihtYXNrRXhwW3RoaXMuX3N0YXJ0IC0gMV0pO1xuICAgICAgICAgIHJldHVybiBhY2N1bSArIHJlcGFjZVdpdGg7XG4gICAgICAgIH0sICcnKSkgfHxcbiAgICAgIG1hc2tFeHBcbiAgICApO1xuICB9XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJpdmF0ZSBfYXBwbHlNYXNrKCk6IGFueSB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gPSB0aGlzLl9yZXBlYXRQYXR0ZXJuU3ltYm9scyh0aGlzLl9tYXNrVmFsdWUgfHwgJycpO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXG4gICAgICAndmFsdWUnLFxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKHRoaXMuX2lucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGVUaW1lKHZhbHVlOiBzdHJpbmcpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93TWFza0xlbjogbnVtYmVyID0gdGhpcy5fbWFza1ZhbHVlLnNwbGl0KCcnKS5maWx0ZXIoKHM6IHN0cmluZykgPT4gcyAhPT0gJzonKS5sZW5ndGg7XG4gICAgaWYgKCt2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXSA9PT0gMCAmJiB2YWx1ZS5sZW5ndGggPCByb3dNYXNrTGVuKSB7XG4gICAgICByZXR1cm4geyAnTWFzayBlcnJvcic6IHRydWUgfTtcbiAgICB9XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8PSByb3dNYXNrTGVuIC0gMikge1xuICAgICAgcmV0dXJuIHsgJ01hc2sgZXJyb3InOiB0cnVlIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCB8fFxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aDtcbiAgfVxufVxuIl19