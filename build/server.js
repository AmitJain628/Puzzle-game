require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "34c598f48e4c4ddfa5ff";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"server": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"home":"home"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chunk-manifest.json":
/***/ (function(module, exports) {

module.exports = require("./chunk-manifest.json");

/***/ }),

/***/ "./react-loadable.json":
/***/ (function(module, exports) {

module.exports = require("./react-loadable.json");

/***/ }),

/***/ "./src/common/App.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_reset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/reset.ts");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/Loader.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/common.ts");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/common/routes.tsx");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/amitjain/Test-project/src/common/App.tsx";








const StyledAppInner = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "App__StyledAppInner",
  componentId: "td9ve8-0"
})(["display:flex;flex-direction:column;min-height:100vh;justify-content:space-between;"]);
/* harmony default export */ __webpack_exports__["default"] = (() => {
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledAppInner, {
    className: "styledAppInner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_0__["Helmet"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, "Puzzle game"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("meta", {
    name: "description",
    content: "react typescript ssr with code split",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  }), Object(react_router_config__WEBPACK_IMPORTED_MODULE_7__["renderRoutes"])(_common_routes__WEBPACK_IMPORTED_MODULE_6__["default"]), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_reset__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_common__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  })));
});

/***/ }),

/***/ "./src/common/Loader.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PreLoader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class PreLoader extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return null;
  }

}

/***/ }),

/***/ "./src/common/common.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/variables.ts");


/* harmony default export */ __webpack_exports__["default"] = (styled_components__WEBPACK_IMPORTED_MODULE_0__["createGlobalStyle"]`
  *{
    outline: none;
  }

  body{
    overflow: auto;
    color: ${_variables__WEBPACK_IMPORTED_MODULE_1__["colors"].darkGray};
  }

  #app{
    margin: auto;
    min-width: ${_variables__WEBPACK_IMPORTED_MODULE_1__["breakpoints"].tabletPortrait}px;
  }

  @media screen and (min-width: ${_variables__WEBPACK_IMPORTED_MODULE_1__["breakpoints"].tabletLandscape}px) {
    body.hasSummary{
      #app{
        padding-right: 18rem;
      }
    }
  }
`);

/***/ }),

/***/ "./src/common/reset.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ismobilejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ismobilejs");
/* harmony import */ var ismobilejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ismobilejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/variables.ts");


 // tslint:disable

/* harmony default export */ __webpack_exports__["default"] = (styled_components__WEBPACK_IMPORTED_MODULE_0__["createGlobalStyle"]`


*[tabindex]{
  outline: none;
}

::-moz-selection { /* Code for Firefox */
  background: transparent;
}

body{
  overflow-x:hidden;
}

body {
  margin: 0;
  padding: 0;
}

/* ::selection {
  background: transparent;
} */

.styles__SummaryContentCompactWrapper-jctqrb-5{
  transition: 0.2s linear 0s !important;
}
.hideDrawer{
  .isSticky{
  transform: translateY(0%) !important;
  position: relative !important;
  }
}
.checkoutMobileFooterDrawer {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 2.5rem;

    height: 56px;
    background-color: #000;

    font-size: 12px;
    line-height: 1.33;

    .copy {
      color: ${_variables__WEBPACK_IMPORTED_MODULE_2__["colors"].mediumGray};
      margin-right: 1rem;
    }
    .tnc {
      color: ${_variables__WEBPACK_IMPORTED_MODULE_2__["colors"].ironGray};
    }

    @media (min-width: ${_variables__WEBPACK_IMPORTED_MODULE_2__["breakpoints"].desktop}px) {
      display: none;
    }
  }


/* LandscapeModePlaceholder */



  ${ismobilejs__WEBPACK_IMPORTED_MODULE_1___default.a.phone ? `
   @media (min-width: 480px) and (orientation: landscape) {
    body{
      overflow: hidden;
    }
    div.landscapeModePlaceholder{
      display: flex;
    }
    div.styledAppInner{
      display: none;
    }
  }
  ` : null}


/*** RESET CSS ***/
html {
  font-family: 'TeleGrotesk Next' !important;
}

@media (min-width: 1366px) {
  html {
    font-size: 20px !important;
  }
}

@media (max-width: 1365px) {
  html {
    font-size: 16px !important;
  }
}

button:focus {
  outline: none;
}

/*********** Product Detailed Plan Modal Body Scroll False CSS 03-06-2019 ***********/
body{
  &.overflowHide{
    overflow:hidden!important;
    position:fixed;
  }
}
/*********** Product Detailed Plan Modal Body Scroll False CSS 03-06-2019 ***********/



*,
*::after,
*::before {
  box-sizing: border-box;
  font-family: 'TeleGrotesk Next';
  -webkit-tap-highlight-color: transparent;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  text-rendering: optimizeLegibility;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}

ol,
ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

blockquote,
q {
  quotes: none;
}

blockquote::before,
blockquote::after,
q::before,
q::after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*** slick slider ***/
/* Slider */
.slick-slider
{
    position: relative;

    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}

.slick-list
{
    position: relative;

    display: block;
    overflow: hidden;

    margin: 0;
    padding: 0;
}
.slick-list:focus
{
    outline: none;
}
.slick-list.dragging
{
    cursor: pointer;
    cursor: hand;
}

.slick-slider .slick-track,
.slick-slider .slick-list
{
    -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
         -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}

.slick-track
{
    position: relative;
    top: 0;
    left: 0;

    display: block;
}
.slick-track:before,
.slick-track:after
{
    display: table;

    content: '';
}
.slick-track:after
{
    clear: both;
}
.slick-loading .slick-track
{
    visibility: hidden;
}

.slick-slide
{
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
}
[dir='rtl'] .slick-slide
{
    float: right;
}
.slick-slide img
{
    display: block;
}
.slick-slide.slick-loading img
{
    display: none;
}
.slick-slide.dragging img
{
    pointer-events: none;
}
.slick-initialized .slick-slide
{
    display: block;
}
.slick-loading .slick-slide
{
    visibility: hidden;
}
.slick-vertical .slick-slide
{
    display: block;

    height: auto;

    border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
    display: none;
}
#binkies-on-page,
#binkies-in-modal
{
	transition: opacity 0.5s, visibility 0.5s;
}
body.binkies-show #binkies-on-page,
body.binkies-show #binkies-in-modal{
	opacity: 1;
	visibility: visible;
}
body.binkies-hide #binkies-on-page,
body.binkies-hide #binkies-in-modal
{
	opacity: 0;
	visibility: hidden;
}
.binkies-bar{
  visibility: hidden;
}



/* hide scroll bar */
body *::-webkit-scrollbar {
    display: none;
    width: 0 !important ;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  }
 body  *{
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  /* } */

  /** Binkies Page CSS */

  #binkies-on-page.outOfStock{
  opacity: 0.6;
  }
  @media only screen and (max-width: 767px){
    #binkies-on-page.outOfStock{
      opacity: 0.4;
    }
  }

  .green {
    background-color: #309260;
  }
  .blue {
    background-color: #3598dc;
  }
  .yellow {
    background-color: #e8d91e;
  }
  .orange {
    background-color: #e77e22;
  }
  .red {
    background-color: #e84c3d;
  }

}`);

/***/ }),

/***/ "./src/common/routes.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react-loadable");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_0__);


const loading = () => null;

const Home = react_loadable__WEBPACK_IMPORTED_MODULE_0___default()({
  loading,
  loader: () => __webpack_require__.e(/* import() | home */ "home").then(__webpack_require__.bind(null, "./src/common/routes/home/index.tsx")),
  modules: ['./routes/home'],
  webpack: () => [/*require.resolve*/("./src/common/routes/home/index.tsx")]
});
const routes = [{
  path: '/',
  basePath: '/',
  exact: true,
  component: Home
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/common/routes/home/store/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const namespace = 'HOME';
/* harmony default export */ __webpack_exports__["default"] = ({
  SET_LOADING: `${namespace}_SET_LOADING`,
  SET_ERROR: `${namespace}_SET_ERROR`,
  SET_USERDETAILS: `${namespace}_SET_USERDETAILS`,
  FETCH_USERDETAILS: `${namespace}_FETCH_USERDETAILS`,
  GET_USER_PHOTOS: `${namespace}_GET_USER_PHOTOS`,
  SET_USER_PHOTOS: `${namespace}_SET_USER_PHOTOS`,
  SEARCH_USERNAME: `${namespace}_SEARCH_USERNAME`,
  SET_INITAL_STATE: `${namespace}_SET_INITAL_STATE`
});

/***/ }),

/***/ "./src/common/routes/home/store/reducer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_store_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/common/routes/home/store/constants.ts");
/* harmony import */ var _home_store_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/store/state.ts");
/* harmony import */ var _utils_withProduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/utils/withProduce.ts");



const reducers = {
  [_home_store_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },
  [_home_store_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_USERDETAILS]: (state, payload) => {
    state.userDetails = payload;
  },
  [_home_store_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_USER_PHOTOS]: (state, payload) => {
    state.userPhotos = payload;
  },
  [_home_store_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_INITAL_STATE]: state => {
    state.userPhotos = [];
    state.userDetails = [];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_withProduce__WEBPACK_IMPORTED_MODULE_2__["default"])(_home_store_state__WEBPACK_IMPORTED_MODULE_1__["default"], reducers));

/***/ }),

/***/ "./src/common/routes/home/store/state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => ({
  userDetails: [],
  isLoading: true,
  userPhotos: []
}));

/***/ }),

/***/ "./src/common/store/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configureStore", function() { return configureStore; });
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/store/reducers/index.ts");



const configureStore = (initialState = {}) => {
  const sagaMiddleware = redux_saga__WEBPACK_IMPORTED_MODULE_0___default()();
  const composeEnhancers =  true && typeof window !== 'undefined' && true && // tslint:disable-next-line:no-string-literal
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? // tslint:disable-next-line:no-string-literal
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : redux__WEBPACK_IMPORTED_MODULE_1__["compose"];
  const enhancer = composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_1__["applyMiddleware"])(sagaMiddleware));
  const store = Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_2__["default"], initialState, enhancer);
  store.runSaga = sagaMiddleware.run;

  store.close = () => {
    store.dispatch(redux_saga__WEBPACK_IMPORTED_MODULE_0__["END"]);
  };

  if ( true && typeof window === 'object' && "development" !== 'production' && module.hot) {
    module.hot.accept("./src/common/store/reducers/index.ts", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _reducers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/store/reducers/index.ts");
(() => {
      Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "./src/common/store/reducers/index.ts")).then(module => {
        store.replaceReducer(module.default);
      });
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
  }

  return store;
};
let store;

try {
  const initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
  store = configureStore(initialState);
} catch (_e) {
  store = configureStore();
}

/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./src/common/store/reducers/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_store_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/store/reducer.ts");


const rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  home: _home_store_reducer__WEBPACK_IMPORTED_MODULE_1__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ "./src/common/utils/withProduce.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ((initialState, reducers) => {
  return immer__WEBPACK_IMPORTED_MODULE_0___default()((state = initialState(), {
    type,
    payload
  }) => {
    if (reducers[type]) {
      reducers[type](state, payload);
    }

    return state;
  });
});

/***/ }),

/***/ "./src/common/variables.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "breakpoints", function() { return breakpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
const breakpoints = {
  mobile: 360,
  tabletPortrait: 768,
  tabletLandscape: 1024,
  desktop: 1366,
  desktopLarge: 1680
};
const colors = {
  magenta: '#e20074',
  lowMagenta: '#f2dce7',
  white: '#ffffff',
  black: '#000000',
  darkGray: '#383838',
  gray: '#757575',
  mediumGray: '#a3a3a3',
  lightGray: '#c2c2c2',
  charcoalGray: '#262626',
  shadowGray: '#4b4b4b',
  ironGray: '#6c6c6c',
  stoneGray: '#7c7c7c',
  steelGray: '#a4a4a4',
  warmGray: '#d0d0d0',
  silverGray: '#e6e6e6',
  cloudGray: '#ededed',
  fogGray: '#f2f2f2',
  red: '#d90000',
  yellow: '#fecb00',
  green: '#6bb324',
  darkMagenta: '#c00063',
  lightMagenta: '#f3007d',
  coldGray: '#f6f6f6',
  lightishGray: '#e8e8e8',
  transparent: 'transparent',
  highLightGray: '#dddddd',
  semiLightGray: '#dddddd',
  orange: '#ff9a1e',
  ultraLightGray: '#dcdcdc',
  zBlack: '#323232',
  pictonBlue: '#53baf2',
  toryBlue: '#0F63AD',
  blumine: '#225482',
  extraDarkGray: '#d8d8d8'
};

/***/ }),

/***/ "./src/server/html.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (({
  secrets,
  data,
  children,
  head,
  style,
  scripts,
  bodyAttrs
}) => {
  if (false) {} else {
    return `<html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="theme-color" content="#536878">
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel='favicon' type='image/png' href='/favicon.png' />
      <link
          href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'
          rel='stylesheet'
        />
      <style>
      @font-face {
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-bold.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-bold.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
        font-display: block;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-bolditalic.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-bolditalic.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-bolditalic.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
      }
      @font-face {
       font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-medium.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-medium.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-mediumitalic.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-mediumitalic.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-mediumitalic.ttf') format('truetype');
        font-weight: 500;
        font-style: italic;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-regular.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-regular.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-regularitalic.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-regularitalic.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-regularitalic.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-thin.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-thin.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-thin.ttf') format('truetype');
        font-weight: 100;
        font-style: normal;
      }
      @font-face {
        font-display: block;
        font-family: 'TeleGrotesk Next';
        src: url('/assets/fonts/telegrotesknext-ultra.woff2') format('woff2'),
          url('/assets/fonts/telegrotesknext-ultra.woff') format('woff'),
          url('/assets/fonts/telegrotesknext-ultra.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
      </style>
      <script  type="text/javascript" src="/dataLayer.js"></script>
      ${head}
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
      ${scripts.map(script => `<link rel="preload" as="script" href="${script}" />`).join('')}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" href='/favicon.png' />
      ${style}
    </head>
    <body ${bodyAttrs}>
    <div id="app">${children}</div>
    <script>
      window.__SECRETS__ =  ${serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default()(secrets, {
      isJSON: true
    })}
      </script>
      <script>
      window.__INITIAL_STATE__ = ${serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default()(data, {
      isJSON: true
    })}</script>
      ${scripts.map(script => `<script src="${script}" ></script>`).join('')}
      </body>
  </html>`;
  }
});

/***/ }),

/***/ "./src/server/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/common/store/index.ts");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("react-loadable");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/common/routes.tsx");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _common_App__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/common/App.tsx");
/* harmony import */ var react_loadable_webpack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("react-loadable/webpack");
/* harmony import */ var react_loadable_webpack__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_loadable_webpack__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var mime_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("mime-types");
/* harmony import */ var mime_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(mime_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var elastic_apm_node__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("elastic-apm-node");
/* harmony import */ var elastic_apm_node__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(elastic_apm_node__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _middleware_logger__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./src/server/middleware/logger.ts");
/* harmony import */ var _middleware_basicSettings__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./src/server/middleware/basicSettings.ts");
/* harmony import */ var _middleware_exitHandler__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./src/server/middleware/exitHandler.ts");
/* harmony import */ var _routes_health__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./src/server/routes/health.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./src/server/html.ts");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _react_loadable_json__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./react-loadable.json");
/* harmony import */ var _react_loadable_json__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_react_loadable_json__WEBPACK_IMPORTED_MODULE_24__);
var _jsxFileName = "/Users/amitjain/Test-project/src/server/index.tsx";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


























dotenv__WEBPACK_IMPORTED_MODULE_8___default.a.config();
react_loadable__WEBPACK_IMPORTED_MODULE_9___default.a.preloadAll();
Object(_middleware_exitHandler__WEBPACK_IMPORTED_MODULE_20__["default"])();
const app = express__WEBPACK_IMPORTED_MODULE_5___default()();
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_6___default()());
Object(_middleware_basicSettings__WEBPACK_IMPORTED_MODULE_19__["default"])(app);
app.use('/health', _routes_health__WEBPACK_IMPORTED_MODULE_21__["default"]); // ---------------------------------------------------------------------
// Register Node.js middleware
// ---------------------------------------------------------------------

app.use(express__WEBPACK_IMPORTED_MODULE_5___default.a.static(path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(__dirname, 'public'), {
  maxAge: '30d',

  setHeaders(res, filePath) {
    if (mime_types__WEBPACK_IMPORTED_MODULE_16___default.a.lookup(filePath) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    } else if (mime_types__WEBPACK_IMPORTED_MODULE_16___default.a.lookup(filePath) === 'font/opentype') {
      res.setHeader('Cache-Control', 'public, max-age=1yr');
    }
  }

}));

if (false) {}

app.get('/sw.js', (_, res) => {
  res.sendFile(path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(__dirname, 'public/assets/sw.js'));
}); // tslint:disable-next-line:no-big-function

app.get('*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const sagas = [];
      _common_routes__WEBPACK_IMPORTED_MODULE_12__["default"].forEach(route => {
        const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["matchPath"])(req.url, route);

        if (match && route && route.loadData) {
          sagas.push(route.loadData());
        }
      });
      yield _common_store__WEBPACK_IMPORTED_MODULE_0__["default"].runSaga(function* () {
        yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__["all"])([sagas]);
      }).done;
      const scripts = new Set();
      const htmlData = {
        head: '',
        style: '',
        scripts: [],
        children: '',
        secrets: {},
        data: null,
        bodyAttrs: ''
      };
      const context = {};
      const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_1__["ServerStyleSheet"]();
      const modules = [];

      const addChunk = chunkName => {
        if (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_23___default.a[chunkName]) {
          _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_23___default.a[chunkName].forEach(asset => scripts.add(asset));
        } else if (true) {
          throw new Error(`Chunk with name '${chunkName}' cannot be found`);
        }
      };

      const getModules = moduleName => {
        return modules.push(moduleName);
      };

      htmlData.children = react_dom_server__WEBPACK_IMPORTED_MODULE_11___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
        store: _common_store__WEBPACK_IMPORTED_MODULE_0__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_loadable__WEBPACK_IMPORTED_MODULE_9___default.a.Capture, {
        report: getModules,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_1__["StyleSheetManager"], {
        sheet: sheet.instance,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["StaticRouter"], {
        location: req.url,
        context: context,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_App__WEBPACK_IMPORTED_MODULE_14__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }))))));

      if (context.status === 301 || context.status === 302) {
        return res.redirect(context.status, context.url);
      }

      htmlData.head = `
    ${react_helmet__WEBPACK_IMPORTED_MODULE_10___default.a.renderStatic().title.toString()}
    ${react_helmet__WEBPACK_IMPORTED_MODULE_10___default.a.renderStatic().meta.toString()}
    `;
      htmlData.bodyAttrs = react_helmet__WEBPACK_IMPORTED_MODULE_10___default.a.renderStatic().bodyAttributes.toString();
      htmlData.style = sheet.getStyleTags();
      htmlData.secrets = {
        ENV: "development"
      };
      addChunk('client'); // tslint:disable-next-line:no-any

      const bundles = Object(react_loadable_webpack__WEBPACK_IMPORTED_MODULE_15__["getBundles"])(_react_loadable_json__WEBPACK_IMPORTED_MODULE_24___default.a, modules);
      _middleware_logger__WEBPACK_IMPORTED_MODULE_18__["default"].info(`Bundles created`);
      bundles.forEach(bundle => {
        scripts.add(bundle.publicPath);
      });
      htmlData.data = _common_store__WEBPACK_IMPORTED_MODULE_0__["default"].getState();
      htmlData.scripts = [...Array.from(scripts)];
      const html = Object(_html__WEBPACK_IMPORTED_MODULE_22__["default"])(htmlData);
      res.status(context.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // ---------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------

app.use((err, _req, res, _next) => {
  _middleware_logger__WEBPACK_IMPORTED_MODULE_18__["default"].error(err);
  const htmlData = {
    head: `
    <title>${err.message}</title>
    <meta name="description">Error</meta>
  `,
    style: '',
    scripts: [],
    secrets: {},
    data: null,
    noScriptForGTA: '',
    scriptForGTA: '',
    bodyAttributes: '',
    bodyAttrs: '',
    children: react_dom_server__WEBPACK_IMPORTED_MODULE_11___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null))
  };
  const html = Object(_html__WEBPACK_IMPORTED_MODULE_22__["default"])(htmlData);
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
}); // ---------------------------------------------------------------------
// Launch the server
// ---------------------------------------------------------------------

if (false) {} // ---------------------------------------------------------------------
// Hot Module Replacement
// ---------------------------------------------------------------------


if (true) {
  // tslint:disable-next-line:no-string-literal
  app['hot'] = module.hot;
  module.hot.accept("./src/server/index.tsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (() => {
    _middleware_logger__WEBPACK_IMPORTED_MODULE_18__["default"].info('hot reloading...');
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
} // tslint:disable-next-line:max-file-line-count


/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/server/middleware/basicSettings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/server/middleware/logger.ts");






/* harmony default export */ __webpack_exports__["default"] = (app => {
  // tslint:disable-next-line:no-string-literal
  global['navigator'] = global['navigator'] || {}; // tslint:disable-next-line:no-string-literal

  global['navigator'].userAgent = global['navigator'].userAgent || 'all';
  const isProd = "development" !== 'development';

  if (isProd) {
    app.use(morgan__WEBPACK_IMPORTED_MODULE_2___default()('dev'));
    app.use(_logger__WEBPACK_IMPORTED_MODULE_5__["default"].getRequestLogger);
  }

  app.use(compression__WEBPACK_IMPORTED_MODULE_0___default()());
  app.use(helmet__WEBPACK_IMPORTED_MODULE_3___default()());
  app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());
  app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());
});

/***/ }),

/***/ "./src/server/middleware/exitHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => {
  process.stdin.resume(); // tslint:disable-next-line:no-any

  function exitHandler(options, err) {
    if (options.cleanup) {
      process.stdout.write('clean');
    }

    if (err) {
      process.stdout.write(err.stack);
    }

    if (options.exit) {
      process.exit();
    }
  }

  process.on('exit', exitHandler.bind(null, {
    cleanup: true
  }));
  process.on('SIGINT', exitHandler.bind(null, {
    exit: true
  }));
  process.on('SIGUSR1', exitHandler.bind(null, {
    exit: true
  }));
  process.on('SIGUSR2', exitHandler.bind(null, {
    exit: true
  }));
  process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
  }));
});

/***/ }),

/***/ "./src/server/middleware/logger.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bunyan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bunyan");
/* harmony import */ var bunyan__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bunyan__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_bunyan_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("express-bunyan-logger");
/* harmony import */ var express_bunyan_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_bunyan_logger__WEBPACK_IMPORTED_MODULE_1__);


const config = {
  name: 'eshop-oneshop-ui',
  streams: [{
    level: 'info',
    path: 'logs/eshop-oneshop-ui-dev-out-app.log'
  }, {
    level: 'error',
    path: 'logs/eshop-oneshop-ui-dev-error-app.log'
  }]
};
const logger = bunyan__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger(config);

logger.getBasicLogger = (name = 'init') => {
  return bunyan__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger({
    name
  });
};

logger.getRequestLogger = express_bunyan_logger__WEBPACK_IMPORTED_MODULE_1___default()({
  excludes: ['user-agent', 'res-headers', 'res', 'req', 'body'],
  obfuscate: ['body.password', 'body.confirmPassword']
});
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "./src/server/routes/health.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.route('/').get((_, res) => {
  return res.sendStatus(200);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("@babel/polyfill");
module.exports = __webpack_require__("./src/server/index.tsx");


/***/ }),

/***/ "@babel/polyfill":
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "bunyan":
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),

/***/ "compression":
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "elastic-apm-node":
/***/ (function(module, exports) {

module.exports = require("elastic-apm-node");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-bunyan-logger":
/***/ (function(module, exports) {

module.exports = require("express-bunyan-logger");

/***/ }),

/***/ "helmet":
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "immer":
/***/ (function(module, exports) {

module.exports = require("immer");

/***/ }),

/***/ "ismobilejs":
/***/ (function(module, exports) {

module.exports = require("ismobilejs");

/***/ }),

/***/ "mime-types":
/***/ (function(module, exports) {

module.exports = require("mime-types");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-loadable":
/***/ (function(module, exports) {

module.exports = require("react-loadable");

/***/ }),

/***/ "react-loadable/webpack":
/***/ (function(module, exports) {

module.exports = require("react-loadable/webpack");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-config":
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-saga":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "styled-components":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcIi4vY2h1bmstbWFuaWZlc3QuanNvblwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcIi4vcmVhY3QtbG9hZGFibGUuanNvblwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvY29tbW9uL0FwcC50c3giLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vTG9hZGVyLnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9jb21tb24udHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcmVzZXQudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcm91dGVzLnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9jb25zdGFudHMudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcm91dGVzL2hvbWUvc3RvcmUvcmVkdWNlci50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9zdGF0ZS50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9zdG9yZS9pbmRleC50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9zdG9yZS9yZWR1Y2Vycy9pbmRleC50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi91dGlscy93aXRoUHJvZHVjZS50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi92YXJpYWJsZXMudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9zZXJ2ZXIvaHRtbC50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL3NlcnZlci9pbmRleC50c3giLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9iYXNpY1NldHRpbmdzLnRzIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvc2VydmVyL21pZGRsZXdhcmUvZXhpdEhhbmRsZXIudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9sb2dnZXIudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9zZXJ2ZXIvcm91dGVzL2hlYWx0aC50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcImJ1bnlhblwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcImNvbXByZXNzaW9uXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcImRvdGVudlwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcImVsYXN0aWMtYXBtLW5vZGVcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwiZXhwcmVzcy1idW55YW4tbG9nZ2VyXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwiaGVsbWV0XCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwiaW1tZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJpc21vYmlsZWpzXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwibWltZS10eXBlc1wiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcIm1vcmdhblwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcInBhdGhcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdFwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdC1sb2FkYWJsZVwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcInJlYWN0LWxvYWRhYmxlL3dlYnBhY2tcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1jb25maWdcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwicmVkdXhcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L2V4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIiIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3QvZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJ1cGRhdGVzL1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcbiBcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZSk7XG4gXHR9XG5cbiBcdC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMzRjNTk4ZjQ4ZTRjNGRkZmE1ZmZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzZXJ2ZXJcIjogMFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyByZXF1aXJlKCkgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IDApIHtcbiBcdFx0XHR2YXIgY2h1bmsgPSByZXF1aXJlKFwiLi9jaHVua3MvXCIgKyAoe1wiaG9tZVwiOlwiaG9tZVwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiKTtcbiBcdFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBjaHVuay5tb2R1bGVzLCBjaHVua0lkcyA9IGNodW5rLmlkcztcbiBcdFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyB1bmNhdWdodCBlcnJvciBoYW5kbGVyIGZvciB3ZWJwYWNrIHJ1bnRpbWVcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHtcbiBcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiBcdFx0XHR0aHJvdyBlcnI7IC8vIGNhdGNoIHRoaXMgZXJyb3IgYnkgdXNpbmcgaW1wb3J0KCkuY2F0Y2goKVxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vY2h1bmstbWFuaWZlc3QuanNvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlYWN0LWxvYWRhYmxlLmpzb25cIik7IiwiaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBHbG9iYWxTdHlsZSBmcm9tICdAY29tbW9uL3Jlc2V0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByZUxvYWRlciBmcm9tICdAY29tbW9uL0xvYWRlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbW1vbkdsb2JhbFN0eWxlIGZyb20gJ0Bjb21tb24vY29tbW9uJztcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHJvdXRlcyBmcm9tICdAY29tbW9uL3JvdXRlcyc7XG5pbXBvcnQgeyByZW5kZXJSb3V0ZXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMge1xuICBleGFjdD86IGJvb2xlYW47XG4gIHBhdGg/OiBzdHJpbmc7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgY29tcG9uZW50PzogUmVhY3QuQ29tcG9uZW50VHlwZTxSb3V0ZUNvbXBvbmVudFByb3BzPGFueT4+O1xufVxuXG5jb25zdCBTdHlsZWRBcHBJbm5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxTdHlsZWRBcHBJbm5lciBjbGFzc05hbWU9J3N0eWxlZEFwcElubmVyJz5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+UHV6emxlIGdhbWU8L3RpdGxlPlxuICAgICAgICAgIDxtZXRhXG4gICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbidcbiAgICAgICAgICAgIGNvbnRlbnQ9J3JlYWN0IHR5cGVzY3JpcHQgc3NyIHdpdGggY29kZSBzcGxpdCdcbiAgICAgICAgICAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPFByZUxvYWRlciAvPlxuICAgICAgICB7cmVuZGVyUm91dGVzKHJvdXRlcyl9XG4gICAgICAgIDxHbG9iYWxTdHlsZSAvPlxuICAgICAgICA8Q29tbW9uR2xvYmFsU3R5bGUgLz5cbiAgICAgIDwvU3R5bGVkQXBwSW5uZXI+XG4gICAgPC8+XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZUxvYWRlciBleHRlbmRzIENvbXBvbmVudDx7fT4ge1xuICByZW5kZXIoKTogUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2xvYmFsU3R5bGUgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IGJyZWFrcG9pbnRzLCBjb2xvcnMgfSBmcm9tICcuL3ZhcmlhYmxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdsb2JhbFN0eWxlYFxuICAqe1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICBib2R5e1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGNvbG9yOiAke2NvbG9ycy5kYXJrR3JheX07XG4gIH1cblxuICAjYXBwe1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtaW4td2lkdGg6ICR7YnJlYWtwb2ludHMudGFibGV0UG9ydHJhaXR9cHg7XG4gIH1cblxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JyZWFrcG9pbnRzLnRhYmxldExhbmRzY2FwZX1weCkge1xuICAgIGJvZHkuaGFzU3VtbWFyeXtcbiAgICAgICNhcHB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE4cmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcbiIsImltcG9ydCB7IGNyZWF0ZUdsb2JhbFN0eWxlIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGlzTW9iaWxlanMgZnJvbSAnaXNtb2JpbGVqcyc7XG5cbmltcG9ydCB7IGJyZWFrcG9pbnRzLCBjb2xvcnMgfSBmcm9tICcuL3ZhcmlhYmxlcyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2xvYmFsU3R5bGVgXG5cblxuKlt0YWJpbmRleF17XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24geyAvKiBDb2RlIGZvciBGaXJlZm94ICovXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5ib2R5e1xuICBvdmVyZmxvdy14OmhpZGRlbjtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyogOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn0gKi9cblxuLnN0eWxlc19fU3VtbWFyeUNvbnRlbnRDb21wYWN0V3JhcHBlci1qY3RxcmItNXtcbiAgdHJhbnNpdGlvbjogMC4ycyBsaW5lYXIgMHMgIWltcG9ydGFudDtcbn1cbi5oaWRlRHJhd2Vye1xuICAuaXNTdGlja3l7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5jaGVja291dE1vYmlsZUZvb3RlckRyYXdlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4OiAxO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMi41cmVtO1xuXG4gICAgaGVpZ2h0OiA1NnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuMzM7XG5cbiAgICAuY29weSB7XG4gICAgICBjb2xvcjogJHtjb2xvcnMubWVkaXVtR3JheX07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgfVxuICAgIC50bmMge1xuICAgICAgY29sb3I6ICR7Y29sb3JzLmlyb25HcmF5fTtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJHticmVha3BvaW50cy5kZXNrdG9wfXB4KSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG5cbi8qIExhbmRzY2FwZU1vZGVQbGFjZWhvbGRlciAqL1xuXG5cblxuICAke1xuICAgIGlzTW9iaWxlanMucGhvbmVcbiAgICAgID8gYFxuICAgQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgICBib2R5e1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gICAgZGl2LmxhbmRzY2FwZU1vZGVQbGFjZWhvbGRlcntcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIGRpdi5zdHlsZWRBcHBJbm5lcntcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG4gIGBcbiAgICAgIDogbnVsbFxuICB9XG5cblxuLyoqKiBSRVNFVCBDU1MgKioqL1xuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiAnVGVsZUdyb3Rlc2sgTmV4dCcgIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDEzNjZweCkge1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTM2NXB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xuICB9XG59XG5cbmJ1dHRvbjpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi8qKioqKioqKioqKiBQcm9kdWN0IERldGFpbGVkIFBsYW4gTW9kYWwgQm9keSBTY3JvbGwgRmFsc2UgQ1NTIDAzLTA2LTIwMTkgKioqKioqKioqKiovXG5ib2R5e1xuICAmLm92ZXJmbG93SGlkZXtcbiAgICBvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O1xuICAgIHBvc2l0aW9uOmZpeGVkO1xuICB9XG59XG4vKioqKioqKioqKiogUHJvZHVjdCBEZXRhaWxlZCBQbGFuIE1vZGFsIEJvZHkgU2Nyb2xsIEZhbHNlIENTUyAwMy0wNi0yMDE5ICoqKioqKioqKioqL1xuXG5cblxuKixcbio6OmFmdGVyLFxuKjo6YmVmb3JlIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuaHRtbCxcbmJvZHksXG5kaXYsXG5zcGFuLFxuYXBwbGV0LFxub2JqZWN0LFxuaWZyYW1lLFxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2LFxucCxcbmJsb2NrcXVvdGUsXG5wcmUsXG5hLFxuYWJicixcbmFjcm9ueW0sXG5hZGRyZXNzLFxuYmlnLFxuY2l0ZSxcbmNvZGUsXG5kZWwsXG5kZm4sXG5lbSxcbmltZyxcbmlucyxcbmtiZCxcbnEsXG5zLFxuc2FtcCxcbnNtYWxsLFxuc3RyaWtlLFxuc3Ryb25nLFxuc3ViLFxuc3VwLFxudHQsXG52YXIsXG5iLFxudSxcbmksXG5jZW50ZXIsXG5kbCxcbmR0LFxuZGQsXG5vbCxcbnVsLFxubGksXG5maWVsZHNldCxcbmZvcm0sXG5sYWJlbCxcbmxlZ2VuZCxcbnRhYmxlLFxuY2FwdGlvbixcbnRib2R5LFxudGZvb3QsXG50aGVhZCxcbnRyLFxudGgsXG50ZCxcbmFydGljbGUsXG5hc2lkZSxcbmNhbnZhcyxcbmRldGFpbHMsXG5lbWJlZCxcbmZpZ3VyZSxcbmZpZ2NhcHRpb24sXG5mb290ZXIsXG5oZWFkZXIsXG5oZ3JvdXAsXG5tZW51LFxubmF2LFxub3V0cHV0LFxucnVieSxcbnNlY3Rpb24sXG5zdW1tYXJ5LFxudGltZSxcbm1hcmssXG5hdWRpbyxcbnZpZGVvIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXI6IDA7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xuYXJ0aWNsZSxcbmFzaWRlLFxuZGV0YWlscyxcbmZpZ2NhcHRpb24sXG5maWd1cmUsXG5mb290ZXIsXG5oZWFkZXIsXG5oZ3JvdXAsXG5tZW51LFxubmF2LFxuc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5ib2R5IHtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbm9sLFxudWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG5hIHtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuYmxvY2txdW90ZSxcbnEge1xuICBxdW90ZXM6IG5vbmU7XG59XG5cbmJsb2NrcXVvdGU6OmJlZm9yZSxcbmJsb2NrcXVvdGU6OmFmdGVyLFxucTo6YmVmb3JlLFxucTo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgY29udGVudDogbm9uZTtcbn1cblxudGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDtcbn1cblxuLyoqKiBzbGljayBzbGlkZXIgKioqL1xuLyogU2xpZGVyICovXG4uc2xpY2stc2xpZGVyXG57XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy10b3VjaC1hY3Rpb246IHBhbi15O1xuICAgICAgICB0b3VjaC1hY3Rpb246IHBhbi15O1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5zbGljay1saXN0XG57XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuLnNsaWNrLWxpc3Q6Zm9jdXNcbntcbiAgICBvdXRsaW5lOiBub25lO1xufVxuLnNsaWNrLWxpc3QuZHJhZ2dpbmdcbntcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY3Vyc29yOiBoYW5kO1xufVxuXG4uc2xpY2stc2xpZGVyIC5zbGljay10cmFjayxcbi5zbGljay1zbGlkZXIgLnNsaWNrLWxpc3RcbntcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xufVxuXG4uc2xpY2stdHJhY2tcbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG5cbiAgICBkaXNwbGF5OiBibG9jaztcbn1cbi5zbGljay10cmFjazpiZWZvcmUsXG4uc2xpY2stdHJhY2s6YWZ0ZXJcbntcbiAgICBkaXNwbGF5OiB0YWJsZTtcblxuICAgIGNvbnRlbnQ6ICcnO1xufVxuLnNsaWNrLXRyYWNrOmFmdGVyXG57XG4gICAgY2xlYXI6IGJvdGg7XG59XG4uc2xpY2stbG9hZGluZyAuc2xpY2stdHJhY2tcbntcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5zbGljay1zbGlkZVxue1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgZmxvYXQ6IGxlZnQ7XG5cbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbWluLWhlaWdodDogMXB4O1xufVxuW2Rpcj0ncnRsJ10gLnNsaWNrLXNsaWRlXG57XG4gICAgZmxvYXQ6IHJpZ2h0O1xufVxuLnNsaWNrLXNsaWRlIGltZ1xue1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuLnNsaWNrLXNsaWRlLnNsaWNrLWxvYWRpbmcgaW1nXG57XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbi5zbGljay1zbGlkZS5kcmFnZ2luZyBpbWdcbntcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zbGljay1pbml0aWFsaXplZCAuc2xpY2stc2xpZGVcbntcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cbi5zbGljay1sb2FkaW5nIC5zbGljay1zbGlkZVxue1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi5zbGljay12ZXJ0aWNhbCAuc2xpY2stc2xpZGVcbntcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICAgIGhlaWdodDogYXV0bztcblxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xufVxuLnNsaWNrLWFycm93LnNsaWNrLWhpZGRlbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbiNiaW5raWVzLW9uLXBhZ2UsXG4jYmlua2llcy1pbi1tb2RhbFxue1xuXHR0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMsIHZpc2liaWxpdHkgMC41cztcbn1cbmJvZHkuYmlua2llcy1zaG93ICNiaW5raWVzLW9uLXBhZ2UsXG5ib2R5LmJpbmtpZXMtc2hvdyAjYmlua2llcy1pbi1tb2RhbHtcblx0b3BhY2l0eTogMTtcblx0dmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbmJvZHkuYmlua2llcy1oaWRlICNiaW5raWVzLW9uLXBhZ2UsXG5ib2R5LmJpbmtpZXMtaGlkZSAjYmlua2llcy1pbi1tb2RhbFxue1xuXHRvcGFjaXR5OiAwO1xuXHR2aXNpYmlsaXR5OiBoaWRkZW47XG59XG4uYmlua2llcy1iYXJ7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuXG5cbi8qIGhpZGUgc2Nyb2xsIGJhciAqL1xuYm9keSAqOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB3aWR0aDogMCAhaW1wb3J0YW50IDtcbiAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IC1tb3otc2Nyb2xsYmFycy1ub25lO1xuICB9XG4gYm9keSAgKntcbiAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IC1tb3otc2Nyb2xsYmFycy1ub25lO1xuICAvKiB9ICovXG5cbiAgLyoqIEJpbmtpZXMgUGFnZSBDU1MgKi9cblxuICAjYmlua2llcy1vbi1wYWdlLm91dE9mU3RvY2t7XG4gIG9wYWNpdHk6IDAuNjtcbiAgfVxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KXtcbiAgICAjYmlua2llcy1vbi1wYWdlLm91dE9mU3RvY2t7XG4gICAgICBvcGFjaXR5OiAwLjQ7XG4gICAgfVxuICB9XG5cbiAgLmdyZWVuIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzA5MjYwO1xuICB9XG4gIC5ibHVlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzU5OGRjO1xuICB9XG4gIC55ZWxsb3cge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlOGQ5MWU7XG4gIH1cbiAgLm9yYW5nZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U3N2UyMjtcbiAgfVxuICAucmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTg0YzNkO1xuICB9XG5cbn1gO1xuIiwiaW1wb3J0IFJlYWN0LCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvYWRhYmxlLCB7IExvYWRpbmdDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcblxuY29uc3QgbG9hZGluZzogRnVuY3Rpb25Db21wb25lbnQ8TG9hZGluZ0NvbXBvbmVudFByb3BzPiA9ICgpID0+IG51bGw7XG5cbmNvbnN0IEhvbWUgPSBMb2FkYWJsZSh7XG4gIGxvYWRpbmcsXG4gIGxvYWRlcjogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdob21lJyAqLyAnLi9yb3V0ZXMvaG9tZScpXG59KTtcbmNvbnN0IHJvdXRlczogSVJvdXRlc1tdID0gW1xuICB7XG4gICAgcGF0aDogJy8nLFxuICAgIGJhc2VQYXRoOiAnLycsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBIb21lLFxuICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvdXRlcyB7XG4gIGNoaWxkUm91dGVzPzogSVJvdXRlc1tdO1xuICBiYXNlUGF0aD86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZXhhY3Q/OiBib29sZWFuO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGNvbXBvbmVudD86IFJlYWN0LkNvbXBvbmVudFR5cGU8YW55PjtcbiAgbG9hZERhdGE/KCk6IEdlbmVyYXRvcjtcbn1cbiIsImNvbnN0IG5hbWVzcGFjZSA9ICdIT01FJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBTRVRfTE9BRElORzogYCR7bmFtZXNwYWNlfV9TRVRfTE9BRElOR2AsXG4gIFNFVF9FUlJPUjogYCR7bmFtZXNwYWNlfV9TRVRfRVJST1JgLFxuICBTRVRfVVNFUkRFVEFJTFM6IGAke25hbWVzcGFjZX1fU0VUX1VTRVJERVRBSUxTYCxcbiAgRkVUQ0hfVVNFUkRFVEFJTFM6IGAke25hbWVzcGFjZX1fRkVUQ0hfVVNFUkRFVEFJTFNgLFxuICBHRVRfVVNFUl9QSE9UT1M6IGAke25hbWVzcGFjZX1fR0VUX1VTRVJfUEhPVE9TYCxcbiAgU0VUX1VTRVJfUEhPVE9TOiBgJHtuYW1lc3BhY2V9X1NFVF9VU0VSX1BIT1RPU2AsXG4gIFNFQVJDSF9VU0VSTkFNRTogYCR7bmFtZXNwYWNlfV9TRUFSQ0hfVVNFUk5BTUVgLFxuICBTRVRfSU5JVEFMX1NUQVRFOiBgJHtuYW1lc3BhY2V9X1NFVF9JTklUQUxfU1RBVEVgLFxufTtcbiIsImltcG9ydCBDT05TVEFOVFMgZnJvbSAnQGhvbWUvc3RvcmUvY29uc3RhbnRzJztcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnQGhvbWUvc3RvcmUvc3RhdGUnO1xuaW1wb3J0IHdpdGhQcm9kdWNlIGZyb20gJ0B1dGlscy93aXRoUHJvZHVjZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJSG9tZVN0YXRlLCBJVXNlckRldGFpbHMsIElVc2VyUGhvdG9zIH0gZnJvbSAnQGhvbWUvc3RvcmUvdHlwZXMnO1xuXG5jb25zdCByZWR1Y2VycyA9IHtcbiAgW0NPTlNUQU5UUy5TRVRfTE9BRElOR106IChzdGF0ZTogSUhvbWVTdGF0ZSwgcGF5bG9hZDogYm9vbGVhbikgPT4ge1xuICAgIHN0YXRlLmlzTG9hZGluZyA9IHBheWxvYWQ7XG4gIH0sXG4gIFtDT05TVEFOVFMuU0VUX1VTRVJERVRBSUxTXTogKHN0YXRlOiBJSG9tZVN0YXRlLCBwYXlsb2FkOiBJVXNlckRldGFpbHNbXSkgPT4ge1xuICAgIHN0YXRlLnVzZXJEZXRhaWxzID0gcGF5bG9hZDtcbiAgfSxcbiAgW0NPTlNUQU5UUy5TRVRfVVNFUl9QSE9UT1NdOiAoc3RhdGU6IElIb21lU3RhdGUsIHBheWxvYWQ6IElVc2VyUGhvdG9zW10pID0+IHtcbiAgICBzdGF0ZS51c2VyUGhvdG9zID0gcGF5bG9hZDtcbiAgfSxcbiAgW0NPTlNUQU5UUy5TRVRfSU5JVEFMX1NUQVRFXTogKHN0YXRlOiBJSG9tZVN0YXRlKSA9PiB7XG4gICAgc3RhdGUudXNlclBob3RvcyA9IFtdO1xuICAgIHN0YXRlLnVzZXJEZXRhaWxzID0gW107XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUHJvZHVjZShpbml0aWFsU3RhdGUsIHJlZHVjZXJzKSBhcyBSZWR1Y2VyPFxuICBJSG9tZVN0YXRlLFxuICBBbnlBY3Rpb25cbj47XG4iLCJpbXBvcnQgeyBJSG9tZVN0YXRlIH0gZnJvbSAnQGhvbWUvc3RvcmUvdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoKTogSUhvbWVTdGF0ZSA9PiAoe1xuICB1c2VyRGV0YWlsczogW10sXG4gIGlzTG9hZGluZzogdHJ1ZSxcbiAgdXNlclBob3RvczogW10sXG59KTtcbiIsImltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSwgeyBFTkQsIFNhZ2FNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIGNyZWF0ZVN0b3JlLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHJvb3RSZWR1Y2VyLCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuZGVjbGFyZSBjb25zdCBfX0RFVl9fOiBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIElXaW5kb3cgZXh0ZW5kcyBXaW5kb3cge1xuICBfX0lOSVRJQUxfU1RBVEVfXzogb2JqZWN0O1xuICBfX1NFQ1JFVFNfXzoge1xuICAgIEVOVjogc3RyaW5nO1xuICB9O1xufVxuaW50ZXJmYWNlIElTdG9yZSBleHRlbmRzIFN0b3JlPFJvb3RTdGF0ZT4ge1xuICBydW5TYWdhOiBTYWdhTWlkZGxld2FyZTx7fT5bJ3J1biddO1xuICBjbG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlndXJlU3RvcmUgPSAoaW5pdGlhbFN0YXRlOiBvYmplY3QgPSB7fSkgPT4ge1xuICBjb25zdCBzYWdhTWlkZGxld2FyZTogU2FnYU1pZGRsZXdhcmU8b2JqZWN0PiA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPVxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIF9fREVWX18gJiZcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAod2luZG93WydfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18nXSBhcyB0eXBlb2YgY29tcG9zZSlcbiAgICAgID8gLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgICh3aW5kb3dbJ19fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyddIGFzIHR5cGVvZiBjb21wb3NlKVxuICAgICAgOiBjb21wb3NlO1xuXG4gIGNvbnN0IGVuaGFuY2VyID0gY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpKTtcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgaW5pdGlhbFN0YXRlLCBlbmhhbmNlcikgYXMgSVN0b3JlO1xuXG4gIHN0b3JlLnJ1blNhZ2EgPSBzYWdhTWlkZGxld2FyZS5ydW47XG5cbiAgc3RvcmUuY2xvc2UgPSAoKSA9PiB7XG4gICAgc3RvcmUuZGlzcGF0Y2goRU5EKTtcbiAgfTtcblxuICBpZiAoXG4gICAgX19ERVZfXyAmJlxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIG1vZHVsZS5ob3RcbiAgKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4uL3N0b3JlL3JlZHVjZXJzJywgKCkgPT4ge1xuICAgICAgaW1wb3J0KCcuL3JlZHVjZXJzJykudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihtb2R1bGUuZGVmYXVsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzdG9yZTtcbn07XG5cbmxldCBzdG9yZTogSVN0b3JlO1xudHJ5IHtcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gKHdpbmRvdyBhcyBJV2luZG93KS5fX0lOSVRJQUxfU1RBVEVfXztcbiAgZGVsZXRlICh3aW5kb3cgYXMgSVdpbmRvdykuX19JTklUSUFMX1NUQVRFX187XG4gIHN0b3JlID0gY29uZmlndXJlU3RvcmUoaW5pdGlhbFN0YXRlKTtcbn0gY2F0Y2ggKF9lKSB7XG4gIHN0b3JlID0gY29uZmlndXJlU3RvcmUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBTdGF0ZVR5cGUgfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcbmltcG9ydCBob21lIGZyb20gJ0Bob21lL3N0b3JlL3JlZHVjZXInO1xuXG5pbXBvcnQgeyBJTWFpblN0YXRlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzPElNYWluU3RhdGU+KHtcbiAgaG9tZSxcbn0pO1xuXG5leHBvcnQgdHlwZSBSb290U3RhdGUgPSBTdGF0ZVR5cGU8dHlwZW9mIHJvb3RSZWR1Y2VyPjtcbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyO1xuIiwiaW1wb3J0IHByb2R1Y2UgZnJvbSAnaW1tZXInO1xuaW1wb3J0IHsgQW55QWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuXG5leHBvcnQgZGVmYXVsdCAoaW5pdGlhbFN0YXRlOiAoKSA9PiBvYmplY3QsIHJlZHVjZXJzOiBvYmplY3QpID0+IHtcbiAgcmV0dXJuIHByb2R1Y2UoKHN0YXRlID0gaW5pdGlhbFN0YXRlKCksIHsgdHlwZSwgcGF5bG9hZCB9OiBBbnlBY3Rpb24pID0+IHtcbiAgICBpZiAocmVkdWNlcnNbdHlwZV0pIHtcbiAgICAgIHJlZHVjZXJzW3R5cGVdKHN0YXRlLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCBicmVha3BvaW50cyA9IHtcbiAgbW9iaWxlOiAzNjAsXG4gIHRhYmxldFBvcnRyYWl0OiA3NjgsXG4gIHRhYmxldExhbmRzY2FwZTogMTAyNCxcbiAgZGVza3RvcDogMTM2NixcbiAgZGVza3RvcExhcmdlOiAxNjgwXG59O1xuXG5leHBvcnQgY29uc3QgY29sb3JzID0ge1xuICBtYWdlbnRhOiAnI2UyMDA3NCcsXG4gIGxvd01hZ2VudGE6ICcjZjJkY2U3JyxcbiAgd2hpdGU6ICcjZmZmZmZmJyxcbiAgYmxhY2s6ICcjMDAwMDAwJyxcbiAgZGFya0dyYXk6ICcjMzgzODM4JyxcbiAgZ3JheTogJyM3NTc1NzUnLFxuICBtZWRpdW1HcmF5OiAnI2EzYTNhMycsXG4gIGxpZ2h0R3JheTogJyNjMmMyYzInLFxuICBjaGFyY29hbEdyYXk6ICcjMjYyNjI2JyxcbiAgc2hhZG93R3JheTogJyM0YjRiNGInLFxuICBpcm9uR3JheTogJyM2YzZjNmMnLFxuICBzdG9uZUdyYXk6ICcjN2M3YzdjJyxcbiAgc3RlZWxHcmF5OiAnI2E0YTRhNCcsXG4gIHdhcm1HcmF5OiAnI2QwZDBkMCcsXG4gIHNpbHZlckdyYXk6ICcjZTZlNmU2JyxcbiAgY2xvdWRHcmF5OiAnI2VkZWRlZCcsXG4gIGZvZ0dyYXk6ICcjZjJmMmYyJyxcbiAgcmVkOiAnI2Q5MDAwMCcsXG4gIHllbGxvdzogJyNmZWNiMDAnLFxuICBncmVlbjogJyM2YmIzMjQnLFxuICBkYXJrTWFnZW50YTogJyNjMDAwNjMnLFxuICBsaWdodE1hZ2VudGE6ICcjZjMwMDdkJyxcbiAgY29sZEdyYXk6ICcjZjZmNmY2JyxcbiAgbGlnaHRpc2hHcmF5OiAnI2U4ZThlOCcsXG4gIHRyYW5zcGFyZW50OiAndHJhbnNwYXJlbnQnLFxuICBoaWdoTGlnaHRHcmF5OiAnI2RkZGRkZCcsXG4gIHNlbWlMaWdodEdyYXk6ICcjZGRkZGRkJyxcbiAgb3JhbmdlOiAnI2ZmOWExZScsXG4gIHVsdHJhTGlnaHRHcmF5OiAnI2RjZGNkYycsXG4gIHpCbGFjazogJyMzMjMyMzInLFxuICBwaWN0b25CbHVlOiAnIzUzYmFmMicsXG4gIHRvcnlCbHVlOiAnIzBGNjNBRCcsXG4gIGJsdW1pbmU6ICcjMjI1NDgyJyxcbiAgZXh0cmFEYXJrR3JheTogJyNkOGQ4ZDgnXG59O1xuIiwiaW1wb3J0IHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCc7XG5pbXBvcnQgeyBJTWFpblN0YXRlIH0gZnJvbSAnQGNvbW1vbi9zdG9yZS9yZWR1Y2Vycy90eXBlcyc7XG5cbmRlY2xhcmUgY29uc3QgX19ERVZfXzogYm9vbGVhbjtcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIHtcbiAgaGVhZDogc3RyaW5nO1xuICBzdHlsZTogc3RyaW5nO1xuICBzY3JpcHRzOiBzdHJpbmdbXTtcbiAgc2VjcmV0czogb2JqZWN0O1xuICBkYXRhOiBJTWFpblN0YXRlIHwgbnVsbDtcbiAgY2hpbGRyZW46IHN0cmluZztcbiAgYm9keUF0dHJzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7XG4gIHNlY3JldHMsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBoZWFkLFxuICBzdHlsZSxcbiAgc2NyaXB0cyxcbiAgYm9keUF0dHJzLFxufTogLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpZy1mdW5jdGlvblxuSVByb3BzKSA9PiB7XG4gIGlmICghX19ERVZfXykge1xuICAgIHJldHVybiBgPGh0bWwgY2xhc3NOYW1lPVwibm8tanNcIiBsYW5nPVwiZW5cIj5cbiAgICA8aGVhZD5cbiAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICA8bWV0YSBuYW1lPVwibW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIj5cbiAgICAgIDxtZXRhIG5hbWU9XCJhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiPlxuICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiM1MzY4NzhcIj5cbiAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIngtdWEtY29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCIgLz5cbiAgICAgIDxsaW5rIHJlbD0nZmF2aWNvbicgdHlwZT0naW1hZ2UvcG5nJyBocmVmPScvZmF2aWNvbi5wbmc/dj0zJyAvPlxuICAgICAgPHNjcmlwdCBzcmM9XCIvZGF0YUxheWVyLmpzXCI+PC9zY3JpcHQ+XG4gICAgICA8bGluayByZWw9J2Zhdmljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgICBocmVmPScvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjEuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnXG4gICAgICAgICAgcmVsPSdzdHlsZXNoZWV0J1xuICAgICAgICAvPlxuICAgICAgJHtoZWFkfVxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCxtaW5pbXVtLXNjYWxlPTEsdXNlci1zY2FsYWJsZT1ub1wiPlxuXG4gICAgICAke3NjcmlwdHNcbiAgICAgICAgLm1hcChzY3JpcHQgPT4gYDxsaW5rIHJlbD1cInByZWxvYWRcIiBhcz1cInNjcmlwdFwiIGhyZWY9XCIke3NjcmlwdH1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1cbiAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9zaXRlLndlYm1hbmlmZXN0XCIgLz5cblxuICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9Jy9mYXZpY29uLnBuZycgLz5cbiAgICAgIDxzdHlsZT5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ1RlbGVHcm90ZXNrIE5leHQnO1xuICAgICAgICBzcmM6IHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtYm9sZC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGQud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtYm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGRpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1ib2xkaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGRpdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgfVxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bS53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bS53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1tZWRpdW0udHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bWl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bWl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1tZWRpdW1pdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXJpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1yZWd1bGFyaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXJpdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXRoaW4ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC10aGluLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXRoaW4udHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogMTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXVsdHJhLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtdWx0cmEud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtdWx0cmEudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgICAgJHtzdHlsZX1cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHkgJHtib2R5QXR0cnN9PlxuICAgICAgPGRpdiBpZD1cImFwcFwiPiR7Y2hpbGRyZW59PC9kaXY+XG4gICAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fU0VDUkVUU19fID0gICR7c2VyaWFsaXplKHNlY3JldHMsIHtcbiAgICAgICAgaXNKU09OOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICA8L3NjcmlwdD5cbiAgICAgIDxzY3JpcHQ+XG4gICAgICB3aW5kb3cuX19JTklUSUFMX1NUQVRFX18gPSAke3NlcmlhbGl6ZShkYXRhLCB7XG4gICAgICAgIGlzSlNPTjogdHJ1ZSxcbiAgICAgIH0pfTwvc2NyaXB0PlxuICAgICAgJHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gYDxzY3JpcHQgc3JjPVwiJHtzY3JpcHR9XCIgPjwvc2NyaXB0PmApLmpvaW4oJycpfVxuICAgICAgPHNjcmlwdD5cbiAgICAgICAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6ICcsIHJlZ2lzdHJhdGlvbi5zY29wZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2aWNlIHdvcmtlciBub3QgaW5zdGFsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIDwvc2NyaXB0PlxuICAgIDwvYm9keT5cbiAgPC9odG1sPmA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgIDxoZWFkPlxuICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJtb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiPlxuICAgICAgPG1ldGEgbmFtZT1cImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCI+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzUzNjg3OFwiPlxuICAgICAgPG1ldGEgaHR0cEVxdWl2PVwieC11YS1jb21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIiAvPlxuICAgICAgPGxpbmsgcmVsPSdmYXZpY29uJyB0eXBlPSdpbWFnZS9wbmcnIGhyZWY9Jy9mYXZpY29uLnBuZycgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgICAgaHJlZj0nLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4xLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJ1xuICAgICAgICAgIHJlbD0nc3R5bGVzaGVldCdcbiAgICAgICAgLz5cbiAgICAgIDxzdHlsZT5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ1RlbGVHcm90ZXNrIE5leHQnO1xuICAgICAgICBzcmM6IHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtYm9sZC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGQud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtYm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGRpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1ib2xkaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LWJvbGRpdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgfVxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bS53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bS53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1tZWRpdW0udHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bWl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LW1lZGl1bWl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1tZWRpdW1pdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXJpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC1yZWd1bGFyaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXJlZ3VsYXJpdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXRoaW4ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgdXJsKCcvYXNzZXRzL2ZvbnRzL3RlbGVncm90ZXNrbmV4dC10aGluLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcbiAgICAgICAgICB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXRoaW4udHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogMTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUZWxlR3JvdGVzayBOZXh0JztcbiAgICAgICAgc3JjOiB1cmwoJy9hc3NldHMvZm9udHMvdGVsZWdyb3Rlc2tuZXh0LXVsdHJhLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtdWx0cmEud29mZicpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgIHVybCgnL2Fzc2V0cy9mb250cy90ZWxlZ3JvdGVza25leHQtdWx0cmEudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgICAgPHNjcmlwdCAgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIi9kYXRhTGF5ZXIuanNcIj48L3NjcmlwdD5cbiAgICAgICR7aGVhZH1cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLG1heGltdW0tc2NhbGU9MSx1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAke3NjcmlwdHNcbiAgICAgICAgLm1hcChzY3JpcHQgPT4gYDxsaW5rIHJlbD1cInByZWxvYWRcIiBhcz1cInNjcmlwdFwiIGhyZWY9XCIke3NjcmlwdH1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1cbiAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9zaXRlLndlYm1hbmlmZXN0XCIgLz5cbiAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPScvZmF2aWNvbi5wbmcnIC8+XG4gICAgICAke3N0eWxlfVxuICAgIDwvaGVhZD5cbiAgICA8Ym9keSAke2JvZHlBdHRyc30+XG4gICAgPGRpdiBpZD1cImFwcFwiPiR7Y2hpbGRyZW59PC9kaXY+XG4gICAgPHNjcmlwdD5cbiAgICAgIHdpbmRvdy5fX1NFQ1JFVFNfXyA9ICAke3NlcmlhbGl6ZShzZWNyZXRzLCB7XG4gICAgICAgIGlzSlNPTjogdHJ1ZSxcbiAgICAgIH0pfVxuICAgICAgPC9zY3JpcHQ+XG4gICAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fSU5JVElBTF9TVEFURV9fID0gJHtzZXJpYWxpemUoZGF0YSwge1xuICAgICAgICBpc0pTT046IHRydWUsXG4gICAgICB9KX08L3NjcmlwdD5cbiAgICAgICR7c2NyaXB0cy5tYXAoc2NyaXB0ID0+IGA8c2NyaXB0IHNyYz1cIiR7c2NyaXB0fVwiID48L3NjcmlwdD5gKS5qb2luKCcnKX1cbiAgICAgIDwvYm9keT5cbiAgPC9odG1sPmA7XG4gIH1cbn07XG4iLCJpbXBvcnQgc3RvcmUgZnJvbSAnQGNvbW1vbi9zdG9yZSc7XG5pbXBvcnQgeyBTZXJ2ZXJTdHlsZVNoZWV0LCBTdHlsZVNoZWV0TWFuYWdlciB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IHsgbWF0Y2hQYXRoLCBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCBMb2FkYWJsZSBmcm9tICdyZWFjdC1sb2FkYWJsZSc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bjb21tb24vcm91dGVzJztcbmltcG9ydCB7IGFsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgQXBwIGZyb20gJ0Bjb21tb24vQXBwJztcbmltcG9ydCB7IGdldEJ1bmRsZXMgfSBmcm9tICdyZWFjdC1sb2FkYWJsZS93ZWJwYWNrJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUtdHlwZXMnO1xuaW1wb3J0IHsgSUNodW5rLCBJRXJyb3IsIElSb3V0ZXJDb250ZXh0IH0gZnJvbSAnQHNlcnZlci90eXBlcyc7XG5pbXBvcnQgaW5pdEFwbSBmcm9tICdlbGFzdGljLWFwbS1ub2RlJztcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL21pZGRsZXdhcmUvbG9nZ2VyJztcbmltcG9ydCBnZXRCYXNpY1NldHRpbmdzIGZyb20gJy4vbWlkZGxld2FyZS9iYXNpY1NldHRpbmdzJztcbmltcG9ydCBnZXRFeGl0SGFuZGxlciBmcm9tICcuL21pZGRsZXdhcmUvZXhpdEhhbmRsZXInO1xuaW1wb3J0IEhlYWx0aFJvdXRlcyBmcm9tICcuL3JvdXRlcy9oZWFsdGgnO1xuaW1wb3J0IGdldEh0bWwsIHsgSVByb3BzIGFzIElIVE1MUHJvcHMgfSBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGNodW5rcyBmcm9tICcuL2NodW5rLW1hbmlmZXN0Lmpzb24nO1xuaW1wb3J0IGxvYWRhYmxlTW9kdWxlc0pzb24gZnJvbSAnLi9yZWFjdC1sb2FkYWJsZS5qc29uJztcblxuZGVjbGFyZSBjb25zdCBfX0RFVl9fOiBib29sZWFuO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbkxvYWRhYmxlLnByZWxvYWRBbGwoKTtcblxuZ2V0RXhpdEhhbmRsZXIoKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuZ2V0QmFzaWNTZXR0aW5ncyhhcHApO1xuYXBwLnVzZSgnL2hlYWx0aCcsIEhlYWx0aFJvdXRlcyk7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlZ2lzdGVyIE5vZGUuanMgbWlkZGxld2FyZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5hcHAudXNlKFxuICBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJyksIHtcbiAgICBtYXhBZ2U6ICczMGQnLFxuICAgIHNldEhlYWRlcnMocmVzLCBmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICBpZiAobWltZS5sb29rdXAoZmlsZVBhdGgpID09PSAndGV4dC9odG1sJykge1xuICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3B1YmxpYywgbWF4LWFnZT0wJyk7XG4gICAgICB9IGVsc2UgaWYgKG1pbWUubG9va3VwKGZpbGVQYXRoKSA9PT0gJ2ZvbnQvb3BlbnR5cGUnKSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAncHVibGljLCBtYXgtYWdlPTF5cicpO1xuICAgICAgfVxuICAgIH0sXG4gIH0pLFxuKTtcblxuaWYgKCFfX0RFVl9fKSB7XG4gIGNvbnN0IGFwbSA9IGluaXRBcG0uc3RhcnQoe1xuICAgIHNlcnZpY2VOYW1lOiBwcm9jZXNzLmVudi5BUE1fU0VSVkVSX05BTUUsXG4gICAgc2VydmVyVXJsOiBwcm9jZXNzLmVudi5BUE1fU0VSVkVSX1VSTCxcbiAgfSk7XG5cbiAgbG9nZ2VyLmluZm8oYEFQTSBpbnRpYWxpemVkICR7YXBtfWApO1xufVxuXG5hcHAuZ2V0KCcvc3cuanMnLCAoXywgcmVzKSA9PiB7XG4gIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL2Fzc2V0cy9zdy5qcycpKTtcbn0pO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYmlnLWZ1bmN0aW9uXG5hcHAuZ2V0KCcqJywgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2FnYXM6IEdlbmVyYXRvcltdID0gW107XG5cbiAgICByb3V0ZXMuZm9yRWFjaChyb3V0ZSA9PiB7XG4gICAgICBjb25zdCBtYXRjaCA9IG1hdGNoUGF0aChyZXEudXJsLCByb3V0ZSk7XG4gICAgICBpZiAobWF0Y2ggJiYgcm91dGUgJiYgcm91dGUubG9hZERhdGEpIHtcbiAgICAgICAgc2FnYXMucHVzaChyb3V0ZS5sb2FkRGF0YSgpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGF3YWl0IHN0b3JlLnJ1blNhZ2EoZnVuY3Rpb24qKCk6IEdlbmVyYXRvciB7XG4gICAgICB5aWVsZCBhbGwoW3NhZ2FzXSk7XG4gICAgfSkuZG9uZTtcbiAgICBjb25zdCBzY3JpcHRzID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGh0bWxEYXRhOiBJSFRNTFByb3BzID0ge1xuICAgICAgaGVhZDogJycsXG4gICAgICBzdHlsZTogJycsXG4gICAgICBzY3JpcHRzOiBbXSxcbiAgICAgIGNoaWxkcmVuOiAnJyxcbiAgICAgIHNlY3JldHM6IHt9LFxuICAgICAgZGF0YTogbnVsbCxcbiAgICAgIGJvZHlBdHRyczogJydcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dDogSVJvdXRlckNvbnRleHQgPSB7fTtcbiAgICBjb25zdCBzaGVldCA9IG5ldyBTZXJ2ZXJTdHlsZVNoZWV0KCk7XG4gICAgY29uc3QgbW9kdWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBhZGRDaHVuayA9IChjaHVua05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKChjaHVua3MgYXMgSUNodW5rKVtjaHVua05hbWVdKSB7XG4gICAgICAgIGNodW5rc1tjaHVua05hbWVdLmZvckVhY2goKGFzc2V0OiBzdHJpbmcpID0+IHNjcmlwdHMuYWRkKGFzc2V0KSk7XG4gICAgICB9IGVsc2UgaWYgKF9fREVWX18pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaHVuayB3aXRoIG5hbWUgJyR7Y2h1bmtOYW1lfScgY2Fubm90IGJlIGZvdW5kYCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRNb2R1bGVzID0gKG1vZHVsZU5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIG1vZHVsZXMucHVzaChtb2R1bGVOYW1lKTtcbiAgICB9O1xuICAgIGh0bWxEYXRhLmNoaWxkcmVuID0gUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoXG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgPExvYWRhYmxlLkNhcHR1cmUgcmVwb3J0PXtnZXRNb2R1bGVzfT5cbiAgICAgICAgICA8U3R5bGVTaGVldE1hbmFnZXIgc2hlZXQ9e3NoZWV0Lmluc3RhbmNlfT5cbiAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgICA8L1N0eWxlU2hlZXRNYW5hZ2VyPlxuICAgICAgICA8L0xvYWRhYmxlLkNhcHR1cmU+XG4gICAgICA8L1Byb3ZpZGVyPixcbiAgICApO1xuXG4gICAgaWYgKGNvbnRleHQuc3RhdHVzID09PSAzMDEgfHwgY29udGV4dC5zdGF0dXMgPT09IDMwMikge1xuICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdChjb250ZXh0LnN0YXR1cywgY29udGV4dC51cmwgYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBodG1sRGF0YS5oZWFkID0gYFxuICAgICR7SGVsbWV0LnJlbmRlclN0YXRpYygpLnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgJHtIZWxtZXQucmVuZGVyU3RhdGljKCkubWV0YS50b1N0cmluZygpfVxuICAgIGA7XG5cbiAgICBodG1sRGF0YS5ib2R5QXR0cnMgPSBIZWxtZXQucmVuZGVyU3RhdGljKCkuYm9keUF0dHJpYnV0ZXMudG9TdHJpbmcoKTtcblxuICAgIGh0bWxEYXRhLnN0eWxlID0gc2hlZXQuZ2V0U3R5bGVUYWdzKCk7XG5cbiAgICBodG1sRGF0YS5zZWNyZXRzID0ge1xuICAgICAgRU5WOiBwcm9jZXNzLmVudi5OT0RFX0VOVixcbiAgICB9O1xuXG4gICAgYWRkQ2h1bmsoJ2NsaWVudCcpO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGNvbnN0IGJ1bmRsZXMgPSBnZXRCdW5kbGVzKGxvYWRhYmxlTW9kdWxlc0pzb24gYXMgYW55LCBtb2R1bGVzKTtcblxuICAgIGxvZ2dlci5pbmZvKGBCdW5kbGVzIGNyZWF0ZWRgKTtcblxuICAgIGJ1bmRsZXMuZm9yRWFjaChidW5kbGUgPT4ge1xuICAgICAgc2NyaXB0cy5hZGQoYnVuZGxlLnB1YmxpY1BhdGgpO1xuICAgIH0pO1xuXG4gICAgaHRtbERhdGEuZGF0YSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gICAgaHRtbERhdGEuc2NyaXB0cyA9IFsuLi4oQXJyYXkuZnJvbShzY3JpcHRzKSBhcyBzdHJpbmdbXSldO1xuXG4gICAgY29uc3QgaHRtbCA9IGdldEh0bWwoaHRtbERhdGEpO1xuXG4gICAgcmVzLnN0YXR1cyhjb250ZXh0LnN0YXR1cyB8fCAyMDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVycm9yIGhhbmRsaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXBwLnVzZShcbiAgKFxuICAgIGVycjogSUVycm9yLFxuICAgIF9yZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gICAgX25leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuICApID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoZXJyKTtcblxuICAgIGNvbnN0IGh0bWxEYXRhID0ge1xuICAgICAgaGVhZDogYFxuICAgIDx0aXRsZT4ke2Vyci5tZXNzYWdlfTwvdGl0bGU+XG4gICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCI+RXJyb3I8L21ldGE+XG4gIGAsXG4gICAgICBzdHlsZTogJycsXG4gICAgICBzY3JpcHRzOiBbXSxcbiAgICAgIHNlY3JldHM6IHt9LFxuICAgICAgZGF0YTogbnVsbCxcbiAgICAgIG5vU2NyaXB0Rm9yR1RBOiAnJyxcbiAgICAgIHNjcmlwdEZvckdUQTogJycsXG4gICAgICBib2R5QXR0cmlidXRlczogJycsXG4gICAgICBib2R5QXR0cnM6ICcnLFxuICAgICAgY2hpbGRyZW46IFJlYWN0RE9NLnJlbmRlclRvU3RyaW5nKDw+PC8+KSxcbiAgICB9O1xuICAgIGNvbnN0IGh0bWwgPSBnZXRIdG1sKGh0bWxEYXRhKTtcbiAgICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgICByZXMuc2VuZChgPCFkb2N0eXBlIGh0bWw+JHtodG1sfWApO1xuICB9LFxuKTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTGF1bmNoIHRoZSBzZXJ2ZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaWYgKCFtb2R1bGUuaG90KSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgY29uc3QgcG9ydCA9IChwcm9jZXNzLmVudiBhcyBhbnkpLlBPUlQ7XG4gIExvYWRhYmxlLnByZWxvYWRBbGwoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhgVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgfSk7XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gIGFwcFsnaG90J10gPSBtb2R1bGUuaG90O1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9pbmRleCcsICgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnaG90IHJlbG9hZGluZy4uLicpO1xuICB9KTtcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1maWxlLWxpbmUtY291bnRcbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IGNvcmUgZnJvbSAnZXhwcmVzcy1zZXJ2ZS1zdGF0aWMtY29yZSc7XG5cbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwOiBjb3JlLkV4cHJlc3MpID0+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gIGdsb2JhbFsnbmF2aWdhdG9yJ10gPSBnbG9iYWxbJ25hdmlnYXRvciddIHx8IHt9O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgZ2xvYmFsWyduYXZpZ2F0b3InXS51c2VyQWdlbnQgPSBnbG9iYWxbJ25hdmlnYXRvciddLnVzZXJBZ2VudCB8fCAnYWxsJztcbiAgY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCc7XG4gIGlmIChpc1Byb2QpIHtcbiAgICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICAgIGFwcC51c2UobG9nZ2VyLmdldFJlcXVlc3RMb2dnZXIpO1xuICB9XG5cbiAgYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbiAgYXBwLnVzZShoZWxtZXQoKSk7XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBmdW5jdGlvbiBleGl0SGFuZGxlcihvcHRpb25zOiBhbnksIGVycjogYW55KTogdm9pZCB7XG4gICAgaWYgKG9wdGlvbnMuY2xlYW51cCkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ2NsZWFuJyk7XG4gICAgfVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGVyci5zdGFjayk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmV4aXQpIHtcbiAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3Mub24oJ2V4aXQnLCBleGl0SGFuZGxlci5iaW5kKG51bGwsIHsgY2xlYW51cDogdHJ1ZSB9KSk7XG5cbiAgcHJvY2Vzcy5vbignU0lHSU5UJywgZXhpdEhhbmRsZXIuYmluZChudWxsLCB7IGV4aXQ6IHRydWUgfSkpO1xuICBwcm9jZXNzLm9uKCdTSUdVU1IxJywgZXhpdEhhbmRsZXIuYmluZChudWxsLCB7IGV4aXQ6IHRydWUgfSkpO1xuICBwcm9jZXNzLm9uKCdTSUdVU1IyJywgZXhpdEhhbmRsZXIuYmluZChudWxsLCB7IGV4aXQ6IHRydWUgfSkpO1xuXG4gIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgZXhpdEhhbmRsZXIuYmluZChudWxsLCB7IGV4aXQ6IHRydWUgfSkpO1xufTtcbiIsImltcG9ydCBidW55YW4sIHsgTG9nZ2VyT3B0aW9ucyB9IGZyb20gJ2J1bnlhbic7XG5pbXBvcnQgbG9nIGZyb20gJ2V4cHJlc3MtYnVueWFuLWxvZ2dlcic7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ3VzdG9tQnVueWFuIGV4dGVuZHMgYnVueWFuIHtcbiAgZ2V0UmVxdWVzdExvZ2dlcjogZXhwcmVzcy5SZXF1ZXN0SGFuZGxlcjtcbiAgZ2V0QmFzaWNMb2dnZXIobmFtZTogc3RyaW5nKTogdm9pZDtcbn1cblxuY29uc3QgY29uZmlnID0ge1xuICBuYW1lOiAnZXNob3Atb25lc2hvcC11aScsXG4gIHN0cmVhbXM6IFtcbiAgICB7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgcGF0aDogJ2xvZ3MvZXNob3Atb25lc2hvcC11aS1kZXYtb3V0LWFwcC5sb2cnXG4gICAgfSxcbiAgICB7XG4gICAgICBsZXZlbDogJ2Vycm9yJyxcbiAgICAgIHBhdGg6ICdsb2dzL2VzaG9wLW9uZXNob3AtdWktZGV2LWVycm9yLWFwcC5sb2cnXG4gICAgfVxuICBdXG59O1xuY29uc3QgbG9nZ2VyID0gYnVueWFuLmNyZWF0ZUxvZ2dlcihjb25maWcgYXMgTG9nZ2VyT3B0aW9ucykgYXMgSUN1c3RvbUJ1bnlhbjtcblxubG9nZ2VyLmdldEJhc2ljTG9nZ2VyID0gKG5hbWUgPSAnaW5pdCcpID0+IHtcbiAgcmV0dXJuIGJ1bnlhbi5jcmVhdGVMb2dnZXIoeyBuYW1lIH0pO1xufTtcblxubG9nZ2VyLmdldFJlcXVlc3RMb2dnZXIgPSBsb2coe1xuICBleGNsdWRlczogWyd1c2VyLWFnZW50JywgJ3Jlcy1oZWFkZXJzJywgJ3JlcycsICdyZXEnLCAnYm9keSddLFxuICBvYmZ1c2NhdGU6IFsnYm9keS5wYXNzd29yZCcsICdib2R5LmNvbmZpcm1QYXNzd29yZCddXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29yZSBmcm9tICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJztcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVyLnJvdXRlKCcvJykuZ2V0KChfOiBjb3JlLlJlcXVlc3QsIHJlczogY29yZS5SZXNwb25zZSkgPT4ge1xuICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoMjAwKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYnVueWFuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsYXN0aWMtYXBtLW5vZGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWJ1bnlhbi1sb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzbW9iaWxlanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1sb2FkYWJsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1sb2FkYWJsZS93ZWJwYWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN3dCQTs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOzs7Ozs7OztBQzFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBOzs7Ozs7O0FBT0E7Ozs7O0FBS0E7OztBQUdBOzs7Ozs7O0FBZkE7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDQTs7OztBQUlBOzs7QUFHQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFuRUE7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOElBQUE7QUFGQTtBQUFBO0FBQUE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZ0JBOzs7Ozs7OztBQ3BCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFjQTtBQUNBO0FBQ0E7QUFLQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFJQTtBQUNBO0FBREE7QUFLQTs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsQ0E7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQSxlQStIQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1RkE7O0FBRUE7OztBQUtBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQURBOzs7QUFLQTtBQUNBO0FBREE7QUFHQTs7QUEzR0E7QUE4R0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdlFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBLGFBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6RkE7QUFBQTtBQUFBO0FBQUE7QUEwRkE7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUVBO0FBQ0E7QUFDQTs7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQSxhQVlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBUEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==