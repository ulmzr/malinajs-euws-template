const sassPlugin = require("malinajs/plugins/sass.js");
const fs = require("fs");
const { join, resolve } = require("path");

module.exports = function (option, filename) {
   option.css = false;
   option.passClass = false;
   option.immutable = true;
   option.plugins = [sassPlugin()];
   option.autoimport = (name) => {
      let match, filename, filenameImport, dirnameImport;
      let fn = ".";
      for (let n = 0; n < 2; n++) {
         fn += "/..".repeat(n);
         ["", "cmp/", "modules/"].forEach((p) => {
            filename = fn + "/" + p + `${name}.xht`;
            filenameImport = resolve("src", p, filename);
            //
            // console.log(filename, fs.existsSync(filenameImport));
            //
            if (fs.existsSync(filenameImport)) {
               filenameImport = filenameImport.replace(/\\/g, "/");
               match = `import ${name} from '${filenameImport}';`;
            }
            filenameImport = filenameImport.replace(/\\/g, "/");
            dirnameImport = filenameImport.replace(".xht", "/+page.xht");
            if (fs.existsSync(dirnameImport)) {
               match = `import ${name} from '${dirnameImport}';`;
            }
         });
      }
      return match;
   };
   return option;
};
