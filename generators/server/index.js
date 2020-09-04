/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const ServerGenerator = require('generator-jhipster/generators/server');
const writeFiles = require('./files').writeFiles;
const prompts = require('./prompts');

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint javaee')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return {
            askForModuleName: prompts.askForModuleName,
            askForServerSideOpts: prompts.askForServerSideOpts,

            setSharedConfigOptions() {
                this.configOptions.namespace = this.namespace;
                this.configOptions.databaseType = this.databaseType;
                this.configOptions.devDatabaseType = this.devDatabaseType;
                this.configOptions.prodDatabaseType = this.prodDatabaseType;
            },
        };
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._configuring();
        return {
            configureGlobal() {
                // Application name modified, using each technology's conventions
                this.angularAppName = this.getAngularAppName();
                this.camelizedBaseName = _.camelCase(this.baseName);
                this.dasherizedBaseName = _.kebabCase(this.baseName);
                this.lowercaseBaseName = this.baseName.toLowerCase();
                this.humanizedBaseName = _.startCase(this.baseName);
                this.mainClass = this.getMainClassName();
                this.cacheManagerIsAvailable = ['ehcache', 'caffeine', 'hazelcast', 'infinispan', 'memcached', 'redis'].includes(
                    this.cacheProvider
                );
                this.pkType = this.getPkType(this.databaseType);

                this.packageFolder = this.packageName.replace(/\./g, '/');
                if (!this.nativeLanguage) {
                    // set to english when translation is set to false
                    this.nativeLanguage = 'en';
                }
            },
        };
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return [];
        return writeFiles();
        // return super._writing();
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return [];
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        // return [];
        return super._end();
    }
};
