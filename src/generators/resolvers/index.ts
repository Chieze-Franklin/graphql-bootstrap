import _ from 'lodash';
import typescript from 'typescript';
import * as path from 'path';

import * as types from '../types';
import * as util from '../util';
import Collector from './collector';
import Emitter from './emitter';

export * from '../types';
export { Emitter };

export function load(schemaRootPath: string, rootNodeNames: string[]): types.TypeMap {
  schemaRootPath = path.resolve(schemaRootPath);
  const program = typescript.createProgram([schemaRootPath], {});
  const schemaRoot = program.getSourceFile(schemaRootPath);

  const interfaces: { [key: string]: typescript.InterfaceDeclaration } = {};
  typescript.forEachChild((schemaRoot as typescript.Node), (node) => {
    if (!util.isNodeExported(node)) return;
    if (node.kind === typescript.SyntaxKind.InterfaceDeclaration) {
      const interfaceNode = <typescript.InterfaceDeclaration>node;
      interfaces[interfaceNode.name.text] = interfaceNode;

      const documentation = util.documentationForNode(interfaceNode, (schemaRoot as typescript.SourceFile).text);
      if (documentation && _.find(documentation.tags, {title: 'graphql', description: 'manifest'})) {
        rootNodeNames.push(interfaceNode.name.text);
      }
    }
  });

  rootNodeNames = _.uniq(rootNodeNames);

  const collector = new Collector(program);
  for (const name of rootNodeNames) {
    const rootInterface = interfaces[name];
    if (!rootInterface) {
      throw new Error(`No interface named ${name} was exported by ${schemaRootPath}`);
    }
    collector.addRootNode(rootInterface);
  }

  _.each(interfaces, (node, name) => {
    const documentation = util.documentationForNode(node);
    if (!documentation) return;
    const override = _.find(documentation.tags, t => t.title === 'graphql' && t.description.startsWith('override'));
    if (!override) return;
    const overrideName = override.description.split(' ')[1] || name!;
    collector.mergeOverrides(node, overrideName);
  });

  return collector.types;
}

export function emit(
  schemaRootPath: string,
  rootNodeNames: string[],
  stream: NodeJS.WritableStream = process.stdout,
): void {
  const loadedTypes = load(schemaRootPath, rootNodeNames);
  const emitter = new Emitter(loadedTypes);
  emitter.emitAll(stream);
}
