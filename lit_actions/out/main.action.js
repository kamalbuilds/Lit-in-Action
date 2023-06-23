/**
 *
 * NAME: hello
 *
 */

"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // lit_actions/src/main.action.ts
  var require_main_action = __commonJS({
    "lit_actions/src/main.action.ts"(exports) {
      var helloWorld = [
        72,
        101,
        108,
        108,
        111,
        32,
        87,
        111,
        114,
        108,
        100
      ];
      (() => __async(exports, null, function* () {
        const sigShare = yield LitActions.signEcdsa({
          toSign: new Uint8Array(helloWorld),
          publicKey,
          // <-- You should pass this in jsParam
          sigName
        });
        console.log("sigShare", sigShare);
      }))();
    }
  });
  require_main_action();
})();
