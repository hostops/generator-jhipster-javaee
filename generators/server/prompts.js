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
            store: true
        },
        {
            type: 'list',
            name: 'microProfileRuntime',
            message: `Which ${chalk.yellow('MicroProfile Runtime')} do you want to use?`,
            default: 'kumuluzee',
            choices: [
                {
                    value: 'kumuluzee',
                    name: 'KumuluzEE'
                }
            ]
        },
        {
            type: 'list',
            name: 'prodDatabaseType',
            message: `Which ${chalk.yellow('database type')} do you want to use?`,
            default: 'postgresql',
            choices: [
                {
                    value: 'postgresql',
                    name: 'PostgreSQL'
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'Which JavaEE technologies would you like to use?',
            message: `Do you want to use ${chalk.yellow('*config*')}?`,
            default: [],
            choices: [
                {
                    value: 'config',
                    name: 'Config'
                },
                {
                    value: 'jwtAuth',
                    name: 'JWT Authentication'
                },
                {
                    value: 'healthChecks',
                    name: 'Health Checks'
                },
                {
                    value: 'openTracing',
                    name: 'Open Tracing'
                },
                {
                    value: 'faultTolerance',
                    name: 'Fault Tolerance'
                },
                {
                    value: 'metrics',
                    name: 'Metrics'
                },
                {
                    value: 'openApi',
                    name: 'Open API'
                },
                {
                    value: 'typeSafe',
                    name: 'Type Safe'
                }
            ]
        }
    ];

    const done = this.async();

    this.prompt(prompts).then(prompt => {
        this.microProfileRuntime = prompt.microProfileRuntime;
        this.packageName = prompt.packageName;
        this.mainClass = this.mainClass;
        this.databaseType = 'sql';
        this.devDatabaseType = prompt.prodDatabaseType;
        this.prodDatabaseType = prompt.prodDatabaseType;
        done();
    });
}

module.exports = {
    askForModuleName,
    askForServerSideOpts
};
