'use strict';

angular.module('nuvi.version', [
  'nuvi.version.interpolate-filter',
  'nuvi.version.version-directive'
])

.value('version', '0.1');
