/*
   Copyright 2016 Yuki KAN

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
'use strict';

import { Operation } from 'express-openapi';
import api = require('../api');
import Service = require('../Service');

export const get: Operation = (req, res) => {

    api.responseJSON(res, Service.all().map(service => service.export()));
};

get.apiDoc = {
    tags: ['services'],
    operationId: 'getServices',
    responses: {
        200: {
            description: 'OK',
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Service'
                }
            }
        },
        default: {
            description: 'Unexpected Error',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};