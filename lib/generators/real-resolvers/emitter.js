"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const console_message_1 = require("../../models/console-message");
class Emitter {
    emitMutation(stream, name) {
        stream.write(`/*\nThis file will be generated by ${console_message_1.ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);
        stream.write(`\n${this._emitMutationImports(name)}\n`);
        stream.write(`\n${this._emitMutationExports(name)}\n`);
    }
    _emitMutationExports(name) {
        const pascalCasedName = name.charAt(0).toUpperCase() + name.substr(1);
        const properties = [
            `...${name}MutationResolversCodeGen,`,
            `// You can add more functions and even override those in ${name}MutationResolversCodeGen`
        ];
        return `export const ${name}MutationResolvers: Pick<MutationResolvers, "create${pascalCasedName}" | "delete${pascalCasedName}" | "deleteMany${pascalCasedName}s" | "update${pascalCasedName}" | "updateMany${pascalCasedName}s" | "upsert${pascalCasedName}"> = {\n${this._indent(properties)}\n}`;
    }
    _emitMutationImports(name) {
        const imports = [
            `import { MutationResolvers } from '../../resolvers';`,
            `import { ${name}MutationResolversCodeGen } from './${name}MutationResolversCodeGen';`,
        ];
        return imports.join('\n');
    }
    emitQuery(stream, name) {
        stream.write(`/*\nThis file will be generated by ${console_message_1.ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);
        stream.write(`\n${this._emitQueryImports(name)}\n`);
        stream.write(`\n${this._emitQueryExports(name)}\n`);
    }
    _emitQueryExports(name) {
        const camelCasedName = name.charAt(0).toLowerCase() + name.substr(1);
        const properties = [
            `...${name}QueryResolversCodeGen,`,
            `// You can add more functions and even override those in ${name}QueryResolversCodeGen`
        ];
        return `export const ${name}QueryResolvers: Pick<QueryResolvers, "${camelCasedName}" | "${camelCasedName}s"> = {\n${this._indent(properties)}\n}`;
    }
    _emitQueryImports(name) {
        const imports = [
            `import { QueryResolvers } from '../../resolvers';`,
            `import { ${name}QueryResolversCodeGen } from './${name}QueryResolversCodeGen';`,
        ];
        return imports.join('\n');
    }
    emitMutationCodeGen(stream, name, codegen) {
        stream.write(`/*\nThis file was generated using ${console_message_1.ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);
        stream.write(`\n${this._emitMutationImportsCodeGen(name)}\n`);
        stream.write(`\n${this._emitMutationExportsCodeGen(name, codegen)}\n`);
    }
    _emitMutationExportsCodeGen(name, codegen) {
        const pascalCasedName = name.charAt(0).toUpperCase() + name.substr(1);
        const properties = [];
        properties.push(`async create${pascalCasedName}(root, args, ctx, info) {`);
        const createModelCodeToInsert = codegen.createModel;
        if (createModelCodeToInsert) {
            createModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async delete${pascalCasedName}(root, args, ctx, info) {`);
        const deleteModelCodeToInsert = codegen.deleteModel;
        if (deleteModelCodeToInsert) {
            deleteModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async deleteMany${pascalCasedName}s(root, args, ctx, info) {`);
        const deleteManyModelsCodeToInsert = codegen.deleteManyModels;
        if (deleteManyModelsCodeToInsert) {
            deleteManyModelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async update${pascalCasedName}(root, args, ctx, info) {`);
        const updateModelCodeToInsert = codegen.updateModel;
        if (updateModelCodeToInsert) {
            updateModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async updateMany${pascalCasedName}s(root, args, ctx, info) {`);
        const updateManyModelsCodeToInsert = codegen.updateManyModels;
        if (updateManyModelsCodeToInsert) {
            updateManyModelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async upsert${pascalCasedName}(root, args, ctx, info) {`);
        const upsertModelCodeToInsert = codegen.upsertModel;
        if (upsertModelCodeToInsert) {
            upsertModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`}`);
        return `export const ${name}MutationResolversCodeGen: Pick<MutationResolvers, "create${pascalCasedName}" | "delete${pascalCasedName}" | "deleteMany${pascalCasedName}s" | "update${pascalCasedName}" | "updateMany${pascalCasedName}s" | "upsert${pascalCasedName}"> = {\n${this._indent(properties)}\n}`;
    }
    _emitMutationImportsCodeGen(name) {
        const imports = [
            `import { MutationResolvers, ${name} } from '../../resolvers';`,
        ];
        return imports.join('\n');
    }
    emitQueryCodeGen(stream, name, codegen) {
        stream.write(`/*\nThis file was generated using ${console_message_1.ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);
        stream.write(`\n${this._emitQueryImportsCodeGen(name)}\n`);
        stream.write(`\n${this._emitQueryExportsCodeGen(name, codegen)}\n`);
    }
    _emitQueryExportsCodeGen(name, codegen) {
        const camelCasedName = name.charAt(0).toLowerCase() + name.substr(1);
        const properties = [];
        properties.push(`async ${camelCasedName}(root, args, ctx, info) {`);
        const modelCodeToInsert = codegen.model;
        if (modelCodeToInsert) {
            modelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);
        properties.push(`async ${camelCasedName}s(root, args, ctx, info) {`);
        const modelsCodeToInsert = codegen.models;
        if (modelsCodeToInsert) {
            modelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`}`);
        return `export const ${name}QueryResolversCodeGen: Pick<QueryResolvers, "${camelCasedName}" | "${camelCasedName}s"> = {\n${this._indent(properties)}\n}`;
    }
    _emitQueryImportsCodeGen(name) {
        const imports = [
            `import { QueryResolvers, ${name} } from '../../resolvers';`,
        ];
        return imports.join('\n');
    }
    emitRoot(stream) {
        stream.write(`/*\nThis file will be generated by ${console_message_1.ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);
        stream.write(`\n${this._emitRootImports()}\n`);
        stream.write(`\n${this._emitRootExports()}\n`);
    }
    _emitRootExports() {
        const properties = [
            `...resolversCodeGen,`,
            `// You can add more functions and even override those in resolversCodeGen`
        ];
        return `export const resolvers: Resolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootImports() {
        const imports = [
            `import { Resolvers } from './resolvers';`,
            `import { resolversCodeGen } from './codegen';`,
        ];
        return imports.join('\n');
    }
    emitRootCodeGen(stream) {
        stream.write(`/*\nThis file was generated using ${console_message_1.ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);
        stream.write(`\n${this._emitRootCodeGenImports()}\n`);
        stream.write(`\n${this._emitRootCodeGenExports()}\n`);
    }
    _emitRootCodeGenExports() {
        const properties = [
            `Mutation: mutationResolvers,`,
            `Query: queryResolvers,`,
        ];
        return `export const resolversCodeGen: Resolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootCodeGenImports() {
        const imports = [
            `import { Resolvers } from './resolvers';`,
            `import { mutationResolvers } from './mutations';`,
            `import { queryResolvers } from './queries';`,
        ];
        return imports.join('\n');
    }
    emitRootMutation(stream, names) {
        stream.write(`/*\nThis file will be generated by ${console_message_1.ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);
        stream.write(`\n${this._emitRootMutationImports(names)}\n`);
        stream.write(`\n${this._emitRootMutationExports(names)}\n`);
    }
    _emitRootMutationExports(types) {
        const properties = [
            `...mutationResolversCodeGen,`,
            `// You can add more functions and even override those in mutationResolversCodeGen`
        ];
        return `export const mutationResolvers: MutationResolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootMutationImports(names) {
        const imports = [
            `import { MutationResolvers } from '../resolvers';`,
            `import { mutationResolversCodeGen } from './mutations';`
        ];
        return imports.join('\n');
    }
    emitRootQuery(stream, names) {
        stream.write(`/*\nThis file will be generated by ${console_message_1.ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);
        stream.write(`\n${this._emitRootQueryImports(names)}\n`);
        stream.write(`\n${this._emitRootQueryExports(names)}\n`);
    }
    _emitRootQueryExports(types) {
        const properties = [
            `...queryResolversCodeGen,`,
            `// You can add more functions and even override those in queryResolversCodeGen`
        ];
        return `export const queryResolvers: QueryResolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootQueryImports(names) {
        const imports = [
            `import { QueryResolvers } from '../resolvers';`,
            `import { queryResolversCodeGen } from './queries';`
        ];
        return imports.join('\n');
    }
    emitRootMutationCodeGen(stream, names) {
        stream.write(`/*\nThis file was generated using ${console_message_1.ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);
        stream.write(`\n${this._emitRootMutationCodeGenImports(names)}\n`);
        stream.write(`\n${this._emitRootMutationCodeGenExports(names)}\n`);
    }
    _emitRootMutationCodeGenExports(types) {
        const properties = lodash_1.default.map(types, type => `...${type}MutationResolvers,`);
        return `export const mutationResolversCodeGen: MutationResolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootMutationCodeGenImports(names) {
        const imports = [
            `import { MutationResolvers } from '../resolvers';`
        ];
        lodash_1.default.each(names, name => {
            imports.push(`import { ${name}MutationResolvers } from './${name.toLowerCase()}/${name}MutationResolvers';`);
        });
        return imports.join('\n');
    }
    emitRootQueryCodeGen(stream, names) {
        stream.write(`/*\nThis file was generated using ${console_message_1.ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);
        stream.write(`\n${this._emitRootQueryCodeGenImports(names)}\n`);
        stream.write(`\n${this._emitRootQueryCodeGenExports(names)}\n`);
    }
    _emitRootQueryCodeGenExports(types) {
        const properties = lodash_1.default.map(types, type => `...${type}QueryResolvers,`);
        return `export const queryResolversCodeGen: QueryResolvers = {\n${this._indent(properties)}\n}`;
        ;
    }
    _emitRootQueryCodeGenImports(names) {
        const imports = [
            `import { QueryResolvers } from '../resolvers';`
        ];
        lodash_1.default.each(names, name => {
            imports.push(`import { ${name}QueryResolvers } from './${name.toLowerCase()}/${name}QueryResolvers';`);
        });
        return imports.join('\n');
    }
    _indent(content) {
        if (!lodash_1.default.isArray(content))
            content = content.split('\n');
        return content.map(s => `  ${s}`).join('\n');
    }
}
exports.default = Emitter;
