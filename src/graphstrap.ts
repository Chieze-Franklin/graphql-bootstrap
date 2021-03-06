import fs from 'fs';
import path from 'path';
import { mutationsActions, queriesActions, resolversActions, rootActions, schemaActions } from './actions';
import { showTitleAndBanner, showError } from './utils/logger.util';
import { store } from './store';
import { Config } from './types';

export async function graphstrap(): Promise<any> {
    showTitleAndBanner();

    // check if graphstrap.json exists
    const configFileName = 'graphstrap.json';
    const configFilePath = path.join(process.cwd(), configFileName);

    let configFile: Config;

    if (!fs.existsSync(configFilePath)) {
        showError(`The file ${configFileName} cannot be found in this directory`);
        return;
    }

    try {
        configFile = JSON.parse(fs.readFileSync(configFilePath, {encoding:'utf8', flag:'r'}));
    } catch (e) {
        showError(e.message);
        return;
    }

    if (configFile?.config?.in) {
        store.in = configFile.config.in;
    } else {
        showError(`Cannot find config.in in ${configFileName}`);
        return;
    }

    if (configFile?.config?.schema?.outDir) {
        store.schemaOutDir = configFile.config.schema.outDir;
        await schemaActions();
    } else {
        showError(`Cannot find config.schema.outDir in ${configFileName}`);
        return;
    }

    if (configFile?.config?.resolvers?.rootDir) {
        if (!configFile?.config?.resolvers?.context?.from) {
            showError(`Cannot find config.resolvers.context.from in ${configFileName}`);
            return;
        }

        store.context = configFile.config.resolvers.context;
        store.resolversRootDir = configFile.config.resolvers.rootDir;

        await resolversActions();
    } else {
        showError(`Cannot find config.resolvers.rootDir in ${configFileName}`);
        return;
    }

    let createRootResolvers = false;
    store.templates = {};

    if (configFile?.config?.resolvers?.queries) {
        if (configFile?.config?.resolvers?.queries?.templates?.model &&
            configFile?.config?.resolvers?.queries?.templates?.models) {

            createRootResolvers = true;
            store.templates = { ...configFile.config.resolvers.queries.templates };
            await queriesActions();
        } else {
            showError(`Cannot find config.resolvers.queries.templates.model (or .models) in ${configFileName}`);
        }
    } else {
        showError(`Cannot find config.resolvers.queries in ${configFileName}`);
    }

    if (configFile?.config?.resolvers?.mutations) {
        if (configFile?.config?.resolvers?.mutations?.templates?.createModel &&
            configFile?.config?.resolvers?.mutations?.templates?.deleteModel) {

            createRootResolvers = true;
            store.templates = { ...store.templates, ...configFile.config.resolvers.mutations.templates };
            await mutationsActions();
        } else {
            showError(`Cannot find config.resolvers.mutations.templates.createModel (or .deleteModel) in ${configFileName}`);
        }
    } else {
        showError(`Cannot find config.resolvers.mutations in ${configFileName}`);
    }

    if (createRootResolvers) {
        await rootActions();
    }
}
