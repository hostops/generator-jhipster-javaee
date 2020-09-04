/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
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
const mkdirp = require('mkdirp');
// const cleanup = require('../cleanup');
const constants = require('../generator-javaee-constants');

/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
    jib: [],
    packageJson: [],
    docker: [],
    serverBuild: [
        {
            templates: [
                { file: 'mvnw', method: 'copy', noEjs: true },
                { file: 'mvnw.cmd', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.jar', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.properties', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/MavenWrapperDownloader.java', method: 'copy', noEjs: true },
                { file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } },
            ],
        },
    ],
    serverResource: [
        {
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/initial_schema.xml',
                    renameTo: () => 'config/liquibase/changelog/00000000000000_initial_schema.xml',
                    options: { interpolate: INTERPOLATE_REGEX },
                },
                'config/liquibase/data/user.csv',
                'config/liquibase/data/user_authority.csv',
                'config/liquibase/data/authority.csv',
                'config/liquibase/master.xml',
            ],
        },
    ],
    serverJavaAuthConfig: [],
    serverJavaGateway: [],
    serverMicroservice: [],
    serverJavaApp: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/UserResource.java',
                    renameTo: generator => `${generator.javaDir}web/rest/${generator.asEntity('UserResource')}.java`,
                },
                {
                    file: 'package/domain/User.java',
                    renameTo: generator => `${generator.javaDir}domain/${generator.asEntity('User')}.java`,
                },
                {
                    file: 'package/domain/Authority.java',
                    renameTo: generator => `${generator.javaDir}domain/${generator.asEntity('Authority')}.java`,
                },
                {
                    file: 'package/service/UserService.java',
                    renameTo: generator => `${generator.javaDir}service/${generator.asEntity('UserService')}.java`,
                },
                {
                    file: 'package/Application.java',
                    renameTo: generator => `${generator.javaDir}${generator.mainClass}.java`,
                },
            ],
        },
        // ,
        // {
        //     path: SERVER_MAIN_SRC_DIR,
        //     templates: [
        //         /* User management java domain files */
        //         {
        //             file: 'package/domain/User.java',
        //             renameTo: generator => `${generator.javaDir}domain/${generator.asEntity('User')}.java`
        //         },
        //         {
        //             file: 'package/repository/UserRepository.java',
        //             renameTo: generator => `${generator.javaDir}repository/UserRepository.java`
        //         },
        //
        //         /* User management java service files */
        //         { file: 'package/service/UserService.java', renameTo: generator => `${generator.javaDir}service/UserService.java` },
        //         { file: 'package/service/MailService.java', renameTo: generator => `${generator.javaDir}service/MailService.java` },
        //
        //         /* User management java web files */
        //         {
        //             file: 'package/service/dto/package-info.java',
        //             renameTo: generator => `${generator.javaDir}service/dto/package-info.java`
        //         },
        //         {
        //             file: 'package/service/dto/UserDTO.java',
        //             renameTo: generator => `${generator.javaDir}service/dto/${generator.asDto('User')}.java`
        //         },
        //         {
        //             file: 'package/service/dto/PasswordChangeDTO.java',
        //             renameTo: generator => `${generator.javaDir}service/dto/PasswordChangeDTO.java`
        //         },
        //         {
        //             file: 'package/service/mapper/package-info.java',
        //             renameTo: generator => `${generator.javaDir}service/mapper/package-info.java`
        //         },
        //         {
        //             file: 'package/service/mapper/UserMapper.java',
        //             renameTo: generator => `${generator.javaDir}service/mapper/UserMapper.java`
        //         }
        //     ]
        // }
    ],
    serverJavaConfig: [
        {
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: ['config.yaml', 'META-INF/beans.xml', 'META-INF/persistence.xml'],
        },
    ],
    serverJavaServiceError: [],
    serverJavaService: [],
    serverJavaWebError: [],
    serverJavaWeb: [],
    serverJavaWebsocket: [],
    serverTestFw: [],
    serverJavaUserManagement: [],
};

function writeFiles() {
    return {
        setUp() {
            this.javaDir = `${this.packageFolder}/`;
            this.testDir = `${this.packageFolder}/`;

            // Create Java resource files
            mkdirp(SERVER_MAIN_RES_DIR);
            mkdirp(SERVER_MAIN_SRC_DIR);
            this.generateKeyStore();
        },
        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, '');
        },
    };
}

module.exports = {
    writeFiles,
    serverFiles,
};
