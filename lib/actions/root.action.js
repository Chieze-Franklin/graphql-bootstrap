"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootActions = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const logger_util_1 = require("../utils/logger.util");
const store_1 = require("../store");
const emitter_1 = tslib_1.__importDefault(require("../generators/real-resolvers/emitter"));
async function rootActions() {
    if (store_1.store.resolversRootDir && store_1.store.concreteInterfaceNames) {
        logger_util_1.showInfo('Generating root resolvers...');
        const rootPath = path_1.default.resolve(path_1.default.join(store_1.store.resolversRootDir, `index.ts`));
        const rootPathCodeGen = path_1.default.resolve(path_1.default.join(store_1.store.resolversRootDir, `codegen.ts`));
        const emitter = new emitter_1.default();
        if (!fs_extra_1.default.existsSync(rootPath)) {
            await fs_extra_1.default.createFile(rootPath);
            const writeStream = fs_extra_1.default.createWriteStream(rootPath);
            emitter.emitRoot(writeStream);
            logger_util_1.showGenerated(rootPath);
        }
        await fs_extra_1.default.createFile(rootPathCodeGen);
        const codeGenWriteStream = fs_extra_1.default.createWriteStream(rootPathCodeGen);
        emitter.emitRootCodeGen(codeGenWriteStream);
        logger_util_1.showGenerated(rootPathCodeGen);
        return;
    }
}
exports.rootActions = rootActions;
