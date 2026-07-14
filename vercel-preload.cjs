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
    console.error("WRAPPED verifyAndRunTypeScript");
  }
  return mod;
};
