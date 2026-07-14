const Module = require("module");
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  const mod = origLoad.apply(this, arguments);
  if (request && request.indexOf("verify-typescript-setup") !== -1 && mod && typeof mod.verifyAndRunTypeScript === "function") {
    const orig = mod.verifyAndRunTypeScript;
    mod.verifyAndRunTypeScript = async function (...args) {
      try {
        return await orig.apply(this, args);
      } catch (e) {
        console.error("VERIFY_TS_ERROR_STACK:\n" + (e && e.stack ? e.stack : String(e)));
        throw e;
      }
    };
  }
  if (request && request.indexOf("next/dist/build/utils.js") !== -1 && mod) {
    for (const fnName of ["isPageStatic", "hasCustomGetInitialProps", "getDefinedNamedExports"]) {
      if (typeof mod[fnName] === "function") {
        const orig = mod[fnName];
        mod[fnName] = async function (...args) {
          const page = args[0] && args[0].page;
          console.error("STATIC_WORKER_CALL " + fnName + " page=" + page);
          try {
            return await orig.apply(this, args);
          } catch (e) {
            console.error("STATIC_WORKER_ERROR " + fnName + " page=" + page + ":\n" + (e && e.stack ? e.stack : String(e)));
            throw e;
          }
        };
      }
    }
  }
  return mod;
};
