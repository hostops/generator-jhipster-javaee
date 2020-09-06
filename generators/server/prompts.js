/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');

function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

function askForServerSideOpts() {
    const prompts = [
        {
            type: 'input',
            name: 'packageName',
            validate: input =>
                /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The package name you have provided is not a valid Java package name.',
            message: 'What is your default Java package name?',
            default: 'com.mycompany.myapp',
            store: true,
        },
        {
            type: 'list',
            name: 'microProfileRuntime',
            message: `Which ${chalk.yellow('MicroProfile Runtime')} do you want to use?`,
            default: 'kumuluzee',
            choices: [
                {
                    value: 'kumuluzee',
                    name: 'KumuluzEE',
                },
            ],
            store: true,
        },
        {
            type: 'list',
            name: 'packagingType',
            message: `Which ${chalk.yellow('type of packaging')} do you want to use?`,
            default: 'uberjar',
            choices: [
                {
                    value: 'uberjar',
                    name: 'Uber JAR',
                },
                {
                    value: 'exploded',
                    name: 'Exploded',
                },
            ],
            store: true,
        },
        {
            type: 'list',
            name: 'prodDatabaseType',
            message: `Which ${chalk.yellow('database type')} do you want to use?`,
            default: 'postgresql',
            choices: [
                {
                    value: 'postgresql',
                    name: 'PostgreSQL',
                },
            ],
            store: true,
        },
        {
            type: 'list',
            name: 'authType',
            message: `Which ${chalk.yellow('authentication type')} do you want to use?`,
            default: 'jwtAuth',
            store: true,
            choices: [
                {
                    value: 'jwtAuth',
                    name: 'JavaEE JWT Authentication',
                },
            ],
        },
        {
            type: 'list',
            name: 'metricsType',
            message: `Which ${chalk.yellow('metrics type')} do you want to use?`,
            default: 'javaeeMetrics',
            store: true,
            choices: [
                {
                    value: 'javaeeMetrics',
                    name: 'JavaEE metrics',
                },
            ],
        },
        {
            type: 'confirm',
            name: 'useOpenApi',
            message: `Do you want to use ${chalk.yellow('OpenAPI')} for documentation?`,
            default: true,
            store: true,
        },
    ];

    const done = this.async();

    this.prompt(prompts).then(prompt => {
        this.microProfileRuntime = prompt.microProfileRuntime;
        this.packageName = prompt.packageName;
        this.mainClass = prompt.mainClass;
        this.databaseType = 'sql';
        this.devDatabaseType = prompt.prodDatabaseType;
        this.prodDatabaseType = prompt.prodDatabaseType;
        this.packagingType = prompt.packagingType;
        this.useOpenApi = prompt.useOpenApi;
        this.prodDatabaseType = prompt.prodDatabaseType;
        done();
    });
}

module.exports = {
    askForModuleName,
    askForServerSideOpts,
};
