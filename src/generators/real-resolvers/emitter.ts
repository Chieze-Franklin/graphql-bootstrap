import _ from 'lodash';
import { ConsoleMessage } from '../../models/console-message';

export default class Emitter {
    emitMutation(stream: NodeJS.WritableStream, name: string) {
        stream.write(`/*\nThis file will be generated by ${ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);

        stream.write(`\n${this._emitMutationImports(name)}\n`);

        stream.write(`\n${this._emitMutationExports(name)}\n`);
    }
    private _emitMutationExports(name: string): string {
        const pascalCasedName = name.charAt(0).toUpperCase() + name.substr(1);
        const properties = [
            `...${name}MutationResolversCodeGen,`,
            `// You can add more functions and even override those in ${name}MutationResolversCodeGen`
        ];

        return `export const ${name}MutationResolvers: Pick<MutationResolvers, "create${pascalCasedName}" | "delete${pascalCasedName}" | "deleteMany${pascalCasedName}s" | "update${pascalCasedName}" | "updateMany${pascalCasedName}s" | "upsert${pascalCasedName}"> = {\n${this._indent(properties)}\n}`;
    }
    private _emitMutationImports(name: string): string {
        const imports = [
            `import { MutationResolvers } from '../../resolvers';`,
            `import { ${name}MutationResolversCodeGen } from './${name}MutationResolversCodeGen';`,
        ];

        return imports.join('\n');
    }

    emitQuery(stream: NodeJS.WritableStream, name: string) {
        stream.write(`/*\nThis file will be generated by ${ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);

        stream.write(`\n${this._emitQueryImports(name)}\n`);

        stream.write(`\n${this._emitQueryExports(name)}\n`);
    }
    private _emitQueryExports(name: string): string {
        const camelCasedName = name.charAt(0).toLowerCase() + name.substr(1);
        const properties = [
            `...${name}QueryResolversCodeGen,`,
            `// You can add more functions and even override those in ${name}QueryResolversCodeGen`
        ];

        return `export const ${name}QueryResolvers: Pick<QueryResolvers, "${camelCasedName}" | "${camelCasedName}s"> = {\n${this._indent(properties)}\n}`;
    }
    private _emitQueryImports(name: string): string {
        const imports = [
            `import { QueryResolvers } from '../../resolvers';`,
            `import { ${name}QueryResolversCodeGen } from './${name}QueryResolversCodeGen';`,
        ];

        return imports.join('\n');
    }

    emitMutationCodeGen(stream: NodeJS.WritableStream, name: string, codegen: any) {
        stream.write(`/*\nThis file was generated using ${ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);

        stream.write(`\n${this._emitMutationImportsCodeGen(name)}\n`);

        stream.write(`\n${this._emitMutationExportsCodeGen(name, codegen)}\n`);
    }
    private _emitMutationExportsCodeGen(name: string, codegen: any): string {
        const pascalCasedName = name.charAt(0).toUpperCase() + name.substr(1);
        const properties: string[] = [];

        properties.push(`async create${pascalCasedName}(root, args, ctx, info) {`);
        const createModelCodeToInsert: string = codegen.createModel;
        if (createModelCodeToInsert) {
            createModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async delete${pascalCasedName}(root, args, ctx, info) {`);
        const deleteModelCodeToInsert: string = codegen.deleteModel;
        if (deleteModelCodeToInsert) {
            deleteModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async deleteMany${pascalCasedName}s(root, args, ctx, info) {`);
        const deleteManyModelsCodeToInsert: string = codegen.deleteManyModels;
        if (deleteManyModelsCodeToInsert) {
            deleteManyModelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async update${pascalCasedName}(root, args, ctx, info) {`);
        const updateModelCodeToInsert: string = codegen.updateModel;
        if (updateModelCodeToInsert) {
            updateModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async updateMany${pascalCasedName}s(root, args, ctx, info) {`);
        const updateManyModelsCodeToInsert: string = codegen.updateManyModels;
        if (updateManyModelsCodeToInsert) {
            updateManyModelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async upsert${pascalCasedName}(root, args, ctx, info) {`);
        const upsertModelCodeToInsert: string = codegen.upsertModel;
        if (upsertModelCodeToInsert) {
            upsertModelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`}`);

        return `export const ${name}MutationResolversCodeGen: Pick<MutationResolvers, "create${pascalCasedName}" | "delete${pascalCasedName}" | "deleteMany${pascalCasedName}s" | "update${pascalCasedName}" | "updateMany${pascalCasedName}s" | "upsert${pascalCasedName}"> = {\n${this._indent(properties)}\n}`;
    }
    private _emitMutationImportsCodeGen(name: string): string {
        const imports = [
            `import { MutationResolvers, ${name} } from '../../resolvers';`,
        ];

        return imports.join('\n');
    }

    emitQueryCodeGen(stream: NodeJS.WritableStream, name: string, codegen: any) {
        stream.write(`/*\nThis file was generated using ${ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);

        stream.write(`\n${this._emitQueryImportsCodeGen(name)}\n`);

        stream.write(`\n${this._emitQueryExportsCodeGen(name, codegen)}\n`);
    }
    private _emitQueryExportsCodeGen(name: string, codegen: any): string {
        const camelCasedName = name.charAt(0).toLowerCase() + name.substr(1);
        const properties: string[] = [];

        properties.push(`async ${camelCasedName}(root, args, ctx, info) {`);
        const modelCodeToInsert: string = codegen.model;
        if (modelCodeToInsert) {
            modelCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`},`);

        properties.push(`async ${camelCasedName}s(root, args, ctx, info) {`);
        const modelsCodeToInsert: string = codegen.models;
        if (modelsCodeToInsert) {
            modelsCodeToInsert.split('\n').forEach(line => properties.push(`  ${line}`));
        }
        properties.push(`}`);

        return `export const ${name}QueryResolversCodeGen: Pick<QueryResolvers, "${camelCasedName}" | "${camelCasedName}s"> = {\n${this._indent(properties)}\n}`;
    }
    private _emitQueryImportsCodeGen(name: string): string {
        const imports = [
            `import { QueryResolvers, ${name} } from '../../resolvers';`,
        ];

        return imports.join('\n');
    }

    emitRoot(stream: NodeJS.WritableStream) {
        stream.write(`/*\nThis file will be generated by ${ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);

        stream.write(`\n${this._emitRootImports()}\n`);

        stream.write(`\n${this._emitRootExports()}\n`);
    }
    private _emitRootExports(): string {
        const properties: string[] = [
            `...resolversCodeGen,`,
            `// You can add more functions and even override those in resolversCodeGen`
        ];

        return `export const resolvers: Resolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootImports(): string {
        const imports = [
            `import { Resolvers } from './resolvers';`,
            `import { resolversCodeGen } from './codegen';`,
        ];

        return imports.join('\n');
    }

    emitRootCodeGen(stream: NodeJS.WritableStream) {
        stream.write(`/*\nThis file was generated using ${ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);

        stream.write(`\n${this._emitRootCodeGenImports()}\n`);

        stream.write(`\n${this._emitRootCodeGenExports()}\n`);
    }
    private _emitRootCodeGenExports(): string {
        const properties: string[] = [
            `Mutation: mutationResolvers,`,
            `Query: queryResolvers,`,
        ];

        return `export const resolversCodeGen: Resolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootCodeGenImports(): string {
        const imports = [
            `import { Resolvers } from './resolvers';`,
            `import { mutationResolvers } from './mutations';`,
            `import { queryResolvers } from './queries';`,
        ];

        return imports.join('\n');
    }

    emitRootMutation(stream: NodeJS.WritableStream, names: string[]) {
        stream.write(`/*\nThis file will be generated by ${ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);

        stream.write(`\n${this._emitRootMutationImports(names)}\n`);

        stream.write(`\n${this._emitRootMutationExports(names)}\n`);
    }
    private _emitRootMutationExports(types: string[]): string {
        const properties = [
            `...mutationResolversCodeGen,`,
            `// You can add more functions and even override those in mutationResolversCodeGen`
        ];

        return `export const mutationResolvers: MutationResolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootMutationImports(names: string[]): string {
        const imports = [
            `import { MutationResolvers } from '../resolvers';`,
            `import { mutationResolversCodeGen } from './mutations';`
        ];

        return imports.join('\n');
    }

    emitRootQuery(stream: NodeJS.WritableStream, names: string[]) {
        stream.write(`/*\nThis file will be generated by ${ConsoleMessage.TITLE} only if it does NOT exist\n*/\n`);

        stream.write(`\n${this._emitRootQueryImports(names)}\n`);

        stream.write(`\n${this._emitRootQueryExports(names)}\n`);
    }
    private _emitRootQueryExports(types: string[]): string {
        const properties = [
            `...queryResolversCodeGen,`,
            `// You can add more functions and even override those in queryResolversCodeGen`
        ];

        return `export const queryResolvers: QueryResolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootQueryImports(names: string[]): string {
        const imports = [
            `import { QueryResolvers } from '../resolvers';`,
            `import { queryResolversCodeGen } from './queries';`
        ];

        return imports.join('\n');
    }

    emitRootMutationCodeGen(stream: NodeJS.WritableStream, names: string[]) {
        stream.write(`/*\nThis file was generated using ${ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);

        stream.write(`\n${this._emitRootMutationCodeGenImports(names)}\n`);

        stream.write(`\n${this._emitRootMutationCodeGenExports(names)}\n`);
    }
    private _emitRootMutationCodeGenExports(types: string[]): string {
        const properties = _.map(types, type => `...${type}MutationResolvers,`);

        return `export const mutationResolversCodeGen: MutationResolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootMutationCodeGenImports(names: string[]): string {
        const imports = [
            `import { MutationResolvers } from '../resolvers';`
        ];

        _.each(names, name => {
            imports.push(`import { ${name}MutationResolvers } from './${name.toLowerCase()}/${name}MutationResolvers';`);
        });

        return imports.join('\n');
    }

    emitRootQueryCodeGen(stream: NodeJS.WritableStream, names: string[]) {
        stream.write(`/*\nThis file was generated using ${ConsoleMessage.TITLE}\nDo not edit this file manually\n*/\n`);

        stream.write(`\n${this._emitRootQueryCodeGenImports(names)}\n`);

        stream.write(`\n${this._emitRootQueryCodeGenExports(names)}\n`);
    }
    private _emitRootQueryCodeGenExports(types: string[]): string {
        const properties = _.map(types, type => `...${type}QueryResolvers,`);

        return `export const queryResolversCodeGen: QueryResolvers = {\n${this._indent(properties)}\n}`;;
    }
    private _emitRootQueryCodeGenImports(names: string[]): string {
        const imports = [
            `import { QueryResolvers } from '../resolvers';`
        ];

        _.each(names, name => {
            imports.push(`import { ${name}QueryResolvers } from './${name.toLowerCase()}/${name}QueryResolvers';`);
        });

        return imports.join('\n');
    }

    private _indent(content: string|string[]): string {
        if (!_.isArray(content)) content = content.split('\n');
        return content.map(s => `  ${s}`).join('\n');
    }
}