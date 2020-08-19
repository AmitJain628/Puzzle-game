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
/******/ 	var hotCurrentHash = "d85646daa9865c76ce80";
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
var _jsxFileName = "/Users/amitjain/Puzzle-game/src/common/App.tsx";








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
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/variables.ts");

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
      color: ${_variables__WEBPACK_IMPORTED_MODULE_1__["colors"].mediumGray};
      margin-right: 1rem;
    }
    .tnc {
      color: ${_variables__WEBPACK_IMPORTED_MODULE_1__["colors"].ironGray};
    }

    @media (min-width: ${_variables__WEBPACK_IMPORTED_MODULE_1__["breakpoints"].desktop}px) {
      display: none;
    }
  }



/*** RESET CSS ***/
html {
  font-family: 'TeleGrotesk Next' !important;
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
/* harmony import */ var _middleware_logger__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./src/server/middleware/logger.ts");
/* harmony import */ var _middleware_basicSettings__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./src/server/middleware/basicSettings.ts");
/* harmony import */ var _middleware_exitHandler__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./src/server/middleware/exitHandler.ts");
/* harmony import */ var _routes_health__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./src/server/routes/health.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./src/server/html.ts");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _react_loadable_json__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./react-loadable.json");
/* harmony import */ var _react_loadable_json__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_react_loadable_json__WEBPACK_IMPORTED_MODULE_23__);
var _jsxFileName = "/Users/amitjain/Puzzle-game/src/server/index.tsx";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

























dotenv__WEBPACK_IMPORTED_MODULE_8___default.a.config();
react_loadable__WEBPACK_IMPORTED_MODULE_9___default.a.preloadAll();
Object(_middleware_exitHandler__WEBPACK_IMPORTED_MODULE_19__["default"])();
const app = express__WEBPACK_IMPORTED_MODULE_5___default()();
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_6___default()());
Object(_middleware_basicSettings__WEBPACK_IMPORTED_MODULE_18__["default"])(app);
app.use('/health', _routes_health__WEBPACK_IMPORTED_MODULE_20__["default"]); // ---------------------------------------------------------------------
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
        if (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_22___default.a[chunkName]) {
          _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_22___default.a[chunkName].forEach(asset => scripts.add(asset));
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
          lineNumber: 99
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_loadable__WEBPACK_IMPORTED_MODULE_9___default.a.Capture, {
        report: getModules,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_1__["StyleSheetManager"], {
        sheet: sheet.instance,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["StaticRouter"], {
        location: req.url,
        context: context,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_App__WEBPACK_IMPORTED_MODULE_14__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
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

      const bundles = Object(react_loadable_webpack__WEBPACK_IMPORTED_MODULE_15__["getBundles"])(_react_loadable_json__WEBPACK_IMPORTED_MODULE_23___default.a, modules);
      _middleware_logger__WEBPACK_IMPORTED_MODULE_17__["default"].info(`Bundles created`);
      bundles.forEach(bundle => {
        scripts.add(bundle.publicPath);
      });
      htmlData.data = _common_store__WEBPACK_IMPORTED_MODULE_0__["default"].getState();
      htmlData.scripts = [...Array.from(scripts)];
      const html = Object(_html__WEBPACK_IMPORTED_MODULE_21__["default"])(htmlData);
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
  _middleware_logger__WEBPACK_IMPORTED_MODULE_17__["default"].error(err);
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
  const html = Object(_html__WEBPACK_IMPORTED_MODULE_21__["default"])(htmlData);
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
    _middleware_logger__WEBPACK_IMPORTED_MODULE_17__["default"].info('hot reloading...');
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
  name: 'puzzle',
  streams: [{
    level: 'info',
    path: 'logs/puzzle-game-ui-dev-out-app.log'
  }, {
    level: 'error',
    path: 'logs/puzzle-game-ui-dev-error-app.log'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCIuL2NodW5rLW1hbmlmZXN0Lmpzb25cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcIi4vcmVhY3QtbG9hZGFibGUuanNvblwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vQXBwLnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL0xvYWRlci50c3giLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9jb21tb24udHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yZXNldC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL3JvdXRlcy50c3giLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9jb25zdGFudHMudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9yZWR1Y2VyLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vcm91dGVzL2hvbWUvc3RvcmUvc3RhdGUudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9zdG9yZS9pbmRleC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL3N0b3JlL3JlZHVjZXJzL2luZGV4LnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vdXRpbHMvd2l0aFByb2R1Y2UudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi92YXJpYWJsZXMudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL3NlcnZlci9odG1sLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvaW5kZXgudHN4IiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9iYXNpY1NldHRpbmdzLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9leGl0SGFuZGxlci50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvc2VydmVyL21pZGRsZXdhcmUvbG9nZ2VyLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvcm91dGVzL2hlYWx0aC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImJ1bnlhblwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImRvdGVudlwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiZXhwcmVzcy1idW55YW4tbG9nZ2VyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImltbWVyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJtaW1lLXR5cGVzXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInBhdGhcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlYWN0XCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlYWN0LWxvYWRhYmxlXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1sb2FkYWJsZS93ZWJwYWNrXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWNvbmZpZ1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVkdXhcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInN0eWxlZC1jb21wb25lbnRzXCIiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIik7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkge1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciB1cGRhdGUgPSByZXF1aXJlKFwiLi9cIiArIFwidXBkYXRlcy9cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkODU2NDZkYWE5ODY1Yzc2Y2U4MFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlcnZlclwiOiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIHJlcXVpcmUoKSBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gMCkge1xuIFx0XHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL2NodW5rcy9cIiArICh7XCJob21lXCI6XCJob21lXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIHVuY2F1Z2h0IGVycm9yIGhhbmRsZXIgZm9yIHdlYnBhY2sgcnVudGltZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikge1xuIFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuIFx0XHRcdHRocm93IGVycjsgLy8gY2F0Y2ggdGhpcyBlcnJvciBieSB1c2luZyBpbXBvcnQoKS5jYXRjaCgpXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9jaHVuay1tYW5pZmVzdC5qc29uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVhY3QtbG9hZGFibGUuanNvblwiKTsiLCJpbXBvcnQgeyBIZWxtZXQgfSBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IEdsb2JhbFN0eWxlIGZyb20gJ0Bjb21tb24vcmVzZXQnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJlTG9hZGVyIGZyb20gJ0Bjb21tb24vTG9hZGVyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29tbW9uR2xvYmFsU3R5bGUgZnJvbSAnQGNvbW1vbi9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bjb21tb24vcm91dGVzJztcbmltcG9ydCB7IHJlbmRlclJvdXRlcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XG4gIGV4YWN0PzogYm9vbGVhbjtcbiAgcGF0aD86IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBjb21wb25lbnQ/OiBSZWFjdC5Db21wb25lbnRUeXBlPFJvdXRlQ29tcG9uZW50UHJvcHM8YW55Pj47XG59XG5cbmNvbnN0IFN0eWxlZEFwcElubmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0eWxlZEFwcElubmVyIGNsYXNzTmFtZT0nc3R5bGVkQXBwSW5uZXInPlxuICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgIDx0aXRsZT5QdXp6bGUgZ2FtZTwvdGl0bGU+XG4gICAgICAgICAgPG1ldGFcbiAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgY29udGVudD0ncmVhY3QgdHlwZXNjcmlwdCBzc3Igd2l0aCBjb2RlIHNwbGl0J1xuICAgICAgICAgIC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8UHJlTG9hZGVyIC8+XG4gICAgICAgIHtyZW5kZXJSb3V0ZXMocm91dGVzKX1cbiAgICAgICAgPEdsb2JhbFN0eWxlIC8+XG4gICAgICAgIDxDb21tb25HbG9iYWxTdHlsZSAvPlxuICAgICAgPC9TdHlsZWRBcHBJbm5lcj5cbiAgICA8Lz5cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlTG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50PHt9PiB7XG4gIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHbG9iYWxTdHlsZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgYnJlYWtwb2ludHMsIGNvbG9ycyB9IGZyb20gJy4vdmFyaWFibGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2xvYmFsU3R5bGVgXG4gICp7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIGJvZHl7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgY29sb3I6ICR7Y29sb3JzLmRhcmtHcmF5fTtcbiAgfVxuXG4gICNhcHB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1pbi13aWR0aDogJHticmVha3BvaW50cy50YWJsZXRQb3J0cmFpdH1weDtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnJlYWtwb2ludHMudGFibGV0TGFuZHNjYXBlfXB4KSB7XG4gICAgYm9keS5oYXNTdW1tYXJ5e1xuICAgICAgI2FwcHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMThyZW07XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuIiwiaW1wb3J0IHsgY3JlYXRlR2xvYmFsU3R5bGUgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IGJyZWFrcG9pbnRzLCBjb2xvcnMgfSBmcm9tICcuL3ZhcmlhYmxlcyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2xvYmFsU3R5bGVgXG5cblxuKlt0YWJpbmRleF17XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24geyAvKiBDb2RlIGZvciBGaXJlZm94ICovXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5ib2R5e1xuICBvdmVyZmxvdy14OmhpZGRlbjtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyogOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn0gKi9cblxuLnN0eWxlc19fU3VtbWFyeUNvbnRlbnRDb21wYWN0V3JhcHBlci1qY3RxcmItNXtcbiAgdHJhbnNpdGlvbjogMC4ycyBsaW5lYXIgMHMgIWltcG9ydGFudDtcbn1cbi5oaWRlRHJhd2Vye1xuICAuaXNTdGlja3l7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5jaGVja291dE1vYmlsZUZvb3RlckRyYXdlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4OiAxO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMi41cmVtO1xuXG4gICAgaGVpZ2h0OiA1NnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuMzM7XG5cbiAgICAuY29weSB7XG4gICAgICBjb2xvcjogJHtjb2xvcnMubWVkaXVtR3JheX07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgfVxuICAgIC50bmMge1xuICAgICAgY29sb3I6ICR7Y29sb3JzLmlyb25HcmF5fTtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJHticmVha3BvaW50cy5kZXNrdG9wfXB4KSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG5cblxuLyoqKiBSRVNFVCBDU1MgKioqL1xuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiAnVGVsZUdyb3Rlc2sgTmV4dCcgIWltcG9ydGFudDtcbn1cblxuYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLyoqKioqKioqKioqIFByb2R1Y3QgRGV0YWlsZWQgUGxhbiBNb2RhbCBCb2R5IFNjcm9sbCBGYWxzZSBDU1MgMDMtMDYtMjAxOSAqKioqKioqKioqKi9cbmJvZHl7XG4gICYub3ZlcmZsb3dIaWRle1xuICAgIG92ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gIH1cbn1cbi8qKioqKioqKioqKiBQcm9kdWN0IERldGFpbGVkIFBsYW4gTW9kYWwgQm9keSBTY3JvbGwgRmFsc2UgQ1NTIDAzLTA2LTIwMTkgKioqKioqKioqKiovXG5cblxuXG4qLFxuKjo6YWZ0ZXIsXG4qOjpiZWZvcmUge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJ1RlbGVHcm90ZXNrIE5leHQnO1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5odG1sLFxuYm9keSxcbmRpdixcbnNwYW4sXG5hcHBsZXQsXG5vYmplY3QsXG5pZnJhbWUsXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYsXG5wLFxuYmxvY2txdW90ZSxcbnByZSxcbmEsXG5hYmJyLFxuYWNyb255bSxcbmFkZHJlc3MsXG5iaWcsXG5jaXRlLFxuY29kZSxcbmRlbCxcbmRmbixcbmVtLFxuaW1nLFxuaW5zLFxua2JkLFxucSxcbnMsXG5zYW1wLFxuc21hbGwsXG5zdHJpa2UsXG5zdHJvbmcsXG5zdWIsXG5zdXAsXG50dCxcbnZhcixcbmIsXG51LFxuaSxcbmNlbnRlcixcbmRsLFxuZHQsXG5kZCxcbm9sLFxudWwsXG5saSxcbmZpZWxkc2V0LFxuZm9ybSxcbmxhYmVsLFxubGVnZW5kLFxudGFibGUsXG5jYXB0aW9uLFxudGJvZHksXG50Zm9vdCxcbnRoZWFkLFxudHIsXG50aCxcbnRkLFxuYXJ0aWNsZSxcbmFzaWRlLFxuY2FudmFzLFxuZGV0YWlscyxcbmVtYmVkLFxuZmlndXJlLFxuZmlnY2FwdGlvbixcbmZvb3RlcixcbmhlYWRlcixcbmhncm91cCxcbm1lbnUsXG5uYXYsXG5vdXRwdXQsXG5ydWJ5LFxuc2VjdGlvbixcbnN1bW1hcnksXG50aW1lLFxubWFyayxcbmF1ZGlvLFxudmlkZW8ge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogMDtcbiAgZm9udDogaW5oZXJpdDtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXG5hcnRpY2xlLFxuYXNpZGUsXG5kZXRhaWxzLFxuZmlnY2FwdGlvbixcbmZpZ3VyZSxcbmZvb3RlcixcbmhlYWRlcixcbmhncm91cCxcbm1lbnUsXG5uYXYsXG5zZWN0aW9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJvZHkge1xuICBsaW5lLWhlaWdodDogMTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxub2wsXG51bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbmEge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5ibG9ja3F1b3RlLFxucSB7XG4gIHF1b3Rlczogbm9uZTtcbn1cblxuYmxvY2txdW90ZTo6YmVmb3JlLFxuYmxvY2txdW90ZTo6YWZ0ZXIsXG5xOjpiZWZvcmUsXG5xOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBjb250ZW50OiBub25lO1xufVxuXG50YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xufVxuXG4vKioqIHNsaWNrIHNsaWRlciAqKiovXG4vKiBTbGlkZXIgKi9cbi5zbGljay1zbGlkZXJcbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXRvdWNoLWFjdGlvbjogcGFuLXk7XG4gICAgICAgIHRvdWNoLWFjdGlvbjogcGFuLXk7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLnNsaWNrLWxpc3RcbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG59XG4uc2xpY2stbGlzdDpmb2N1c1xue1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG4uc2xpY2stbGlzdC5kcmFnZ2luZ1xue1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjdXJzb3I6IGhhbmQ7XG59XG5cbi5zbGljay1zbGlkZXIgLnNsaWNrLXRyYWNrLFxuLnNsaWNrLXNsaWRlciAuc2xpY2stbGlzdFxue1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG59XG5cbi5zbGljay10cmFja1xue1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcblxuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuLnNsaWNrLXRyYWNrOmJlZm9yZSxcbi5zbGljay10cmFjazphZnRlclxue1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuXG4gICAgY29udGVudDogJyc7XG59XG4uc2xpY2stdHJhY2s6YWZ0ZXJcbntcbiAgICBjbGVhcjogYm90aDtcbn1cbi5zbGljay1sb2FkaW5nIC5zbGljay10cmFja1xue1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLnNsaWNrLXNsaWRlXG57XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIGhlaWdodDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxcHg7XG59XG5bZGlyPSdydGwnXSAuc2xpY2stc2xpZGVcbntcbiAgICBmbG9hdDogcmlnaHQ7XG59XG4uc2xpY2stc2xpZGUgaW1nXG57XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG4uc2xpY2stc2xpZGUuc2xpY2stbG9hZGluZyBpbWdcbntcbiAgICBkaXNwbGF5OiBub25lO1xufVxuLnNsaWNrLXNsaWRlLmRyYWdnaW5nIGltZ1xue1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnNsaWNrLWluaXRpYWxpemVkIC5zbGljay1zbGlkZVxue1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuLnNsaWNrLWxvYWRpbmcgLnNsaWNrLXNsaWRlXG57XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLnNsaWNrLXZlcnRpY2FsIC5zbGljay1zbGlkZVxue1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgaGVpZ2h0OiBhdXRvO1xuXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG59XG4uc2xpY2stYXJyb3cuc2xpY2staGlkZGVuIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuI2JpbmtpZXMtb24tcGFnZSxcbiNiaW5raWVzLWluLW1vZGFsXG57XG5cdHRyYW5zaXRpb246IG9wYWNpdHkgMC41cywgdmlzaWJpbGl0eSAwLjVzO1xufVxuYm9keS5iaW5raWVzLXNob3cgI2JpbmtpZXMtb24tcGFnZSxcbmJvZHkuYmlua2llcy1zaG93ICNiaW5raWVzLWluLW1vZGFse1xuXHRvcGFjaXR5OiAxO1xuXHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuYm9keS5iaW5raWVzLWhpZGUgI2JpbmtpZXMtb24tcGFnZSxcbmJvZHkuYmlua2llcy1oaWRlICNiaW5raWVzLWluLW1vZGFsXG57XG5cdG9wYWNpdHk6IDA7XG5cdHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi5iaW5raWVzLWJhcntcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG5cblxuLyogaGlkZSBzY3JvbGwgYmFyICovXG5ib2R5ICo6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHdpZHRoOiAwICFpbXBvcnRhbnQgO1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICBvdmVyZmxvdzogLW1vei1zY3JvbGxiYXJzLW5vbmU7XG4gIH1cbiBib2R5ICAqe1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICBvdmVyZmxvdzogLW1vei1zY3JvbGxiYXJzLW5vbmU7XG4gIC8qIH0gKi9cblxuICAvKiogQmlua2llcyBQYWdlIENTUyAqL1xuXG4gICNiaW5raWVzLW9uLXBhZ2Uub3V0T2ZTdG9ja3tcbiAgb3BhY2l0eTogMC42O1xuICB9XG4gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpe1xuICAgICNiaW5raWVzLW9uLXBhZ2Uub3V0T2ZTdG9ja3tcbiAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICB9XG4gIH1cblxuICAuZ3JlZW4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMDkyNjA7XG4gIH1cbiAgLmJsdWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNTk4ZGM7XG4gIH1cbiAgLnllbGxvdyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZDkxZTtcbiAgfVxuICAub3JhbmdlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTc3ZTIyO1xuICB9XG4gIC5yZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlODRjM2Q7XG4gIH1cblxufWA7XG4iLCJpbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTG9hZGFibGUsIHsgTG9hZGluZ0NvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3QtbG9hZGFibGUnO1xuXG5jb25zdCBsb2FkaW5nOiBGdW5jdGlvbkNvbXBvbmVudDxMb2FkaW5nQ29tcG9uZW50UHJvcHM+ID0gKCkgPT4gbnVsbDtcblxuY29uc3QgSG9tZSA9IExvYWRhYmxlKHtcbiAgbG9hZGluZyxcbiAgbG9hZGVyOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2hvbWUnICovICcuL3JvdXRlcy9ob21lJylcbn0pO1xuY29uc3Qgcm91dGVzOiBJUm91dGVzW10gPSBbXG4gIHtcbiAgICBwYXRoOiAnLycsXG4gICAgYmFzZVBhdGg6ICcvJyxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IEhvbWUsXG4gIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVzIHtcbiAgY2hpbGRSb3V0ZXM/OiBJUm91dGVzW107XG4gIGJhc2VQYXRoPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBleGFjdD86IGJvb2xlYW47XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgY29tcG9uZW50PzogUmVhY3QuQ29tcG9uZW50VHlwZTxhbnk+O1xuICBsb2FkRGF0YT8oKTogR2VuZXJhdG9yO1xufVxuIiwiY29uc3QgbmFtZXNwYWNlID0gJ0hPTUUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNFVF9MT0FESU5HOiBgJHtuYW1lc3BhY2V9X1NFVF9MT0FESU5HYCxcbiAgU0VUX0VSUk9SOiBgJHtuYW1lc3BhY2V9X1NFVF9FUlJPUmAsXG4gIFNFVF9VU0VSREVUQUlMUzogYCR7bmFtZXNwYWNlfV9TRVRfVVNFUkRFVEFJTFNgLFxuICBGRVRDSF9VU0VSREVUQUlMUzogYCR7bmFtZXNwYWNlfV9GRVRDSF9VU0VSREVUQUlMU2AsXG4gIEdFVF9VU0VSX1BIT1RPUzogYCR7bmFtZXNwYWNlfV9HRVRfVVNFUl9QSE9UT1NgLFxuICBTRVRfVVNFUl9QSE9UT1M6IGAke25hbWVzcGFjZX1fU0VUX1VTRVJfUEhPVE9TYCxcbiAgU0VBUkNIX1VTRVJOQU1FOiBgJHtuYW1lc3BhY2V9X1NFQVJDSF9VU0VSTkFNRWAsXG4gIFNFVF9JTklUQUxfU1RBVEU6IGAke25hbWVzcGFjZX1fU0VUX0lOSVRBTF9TVEFURWAsXG59O1xuIiwiaW1wb3J0IENPTlNUQU5UUyBmcm9tICdAaG9tZS9zdG9yZS9jb25zdGFudHMnO1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICdAaG9tZS9zdG9yZS9zdGF0ZSc7XG5pbXBvcnQgd2l0aFByb2R1Y2UgZnJvbSAnQHV0aWxzL3dpdGhQcm9kdWNlJztcbmltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IElIb21lU3RhdGUsIElVc2VyRGV0YWlscywgSVVzZXJQaG90b3MgfSBmcm9tICdAaG9tZS9zdG9yZS90eXBlcyc7XG5cbmNvbnN0IHJlZHVjZXJzID0ge1xuICBbQ09OU1RBTlRTLlNFVF9MT0FESU5HXTogKHN0YXRlOiBJSG9tZVN0YXRlLCBwYXlsb2FkOiBib29sZWFuKSA9PiB7XG4gICAgc3RhdGUuaXNMb2FkaW5nID0gcGF5bG9hZDtcbiAgfSxcbiAgW0NPTlNUQU5UUy5TRVRfVVNFUkRFVEFJTFNdOiAoc3RhdGU6IElIb21lU3RhdGUsIHBheWxvYWQ6IElVc2VyRGV0YWlsc1tdKSA9PiB7XG4gICAgc3RhdGUudXNlckRldGFpbHMgPSBwYXlsb2FkO1xuICB9LFxuICBbQ09OU1RBTlRTLlNFVF9VU0VSX1BIT1RPU106IChzdGF0ZTogSUhvbWVTdGF0ZSwgcGF5bG9hZDogSVVzZXJQaG90b3NbXSkgPT4ge1xuICAgIHN0YXRlLnVzZXJQaG90b3MgPSBwYXlsb2FkO1xuICB9LFxuICBbQ09OU1RBTlRTLlNFVF9JTklUQUxfU1RBVEVdOiAoc3RhdGU6IElIb21lU3RhdGUpID0+IHtcbiAgICBzdGF0ZS51c2VyUGhvdG9zID0gW107XG4gICAgc3RhdGUudXNlckRldGFpbHMgPSBbXTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhQcm9kdWNlKGluaXRpYWxTdGF0ZSwgcmVkdWNlcnMpIGFzIFJlZHVjZXI8XG4gIElIb21lU3RhdGUsXG4gIEFueUFjdGlvblxuPjtcbiIsImltcG9ydCB7IElIb21lU3RhdGUgfSBmcm9tICdAaG9tZS9zdG9yZS90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpOiBJSG9tZVN0YXRlID0+ICh7XG4gIHVzZXJEZXRhaWxzOiBbXSxcbiAgaXNMb2FkaW5nOiB0cnVlLFxuICB1c2VyUGhvdG9zOiBbXSxcbn0pO1xuIiwiaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlLCB7IEVORCwgU2FnYU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY3JlYXRlU3RvcmUsIFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgcm9vdFJlZHVjZXIsIHsgUm9vdFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycy9pbmRleCc7XG5kZWNsYXJlIGNvbnN0IF9fREVWX186IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvdyBleHRlbmRzIFdpbmRvdyB7XG4gIF9fSU5JVElBTF9TVEFURV9fOiBvYmplY3Q7XG4gIF9fU0VDUkVUU19fOiB7XG4gICAgRU5WOiBzdHJpbmc7XG4gIH07XG59XG5pbnRlcmZhY2UgSVN0b3JlIGV4dGVuZHMgU3RvcmU8Um9vdFN0YXRlPiB7XG4gIHJ1blNhZ2E6IFNhZ2FNaWRkbGV3YXJlPHt9PlsncnVuJ107XG4gIGNsb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVTdG9yZSA9IChpbml0aWFsU3RhdGU6IG9iamVjdCA9IHt9KSA9PiB7XG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlOiBTYWdhTWlkZGxld2FyZTxvYmplY3Q+ID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgY29tcG9zZUVuaGFuY2VycyA9XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgX19ERVZfXyAmJlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICh3aW5kb3dbJ19fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyddIGFzIHR5cGVvZiBjb21wb3NlKVxuICAgICAgPyAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgKHdpbmRvd1snX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fJ10gYXMgdHlwZW9mIGNvbXBvc2UpXG4gICAgICA6IGNvbXBvc2U7XG5cbiAgY29uc3QgZW5oYW5jZXIgPSBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSkpO1xuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGVuaGFuY2VyKSBhcyBJU3RvcmU7XG5cbiAgc3RvcmUucnVuU2FnYSA9IHNhZ2FNaWRkbGV3YXJlLnJ1bjtcblxuICBzdG9yZS5jbG9zZSA9ICgpID0+IHtcbiAgICBzdG9yZS5kaXNwYXRjaChFTkQpO1xuICB9O1xuXG4gIGlmIChcbiAgICBfX0RFVl9fICYmXG4gICAgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiZcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgbW9kdWxlLmhvdFxuICApIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi4vc3RvcmUvcmVkdWNlcnMnLCAoKSA9PiB7XG4gICAgICBpbXBvcnQoJy4vcmVkdWNlcnMnKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKG1vZHVsZS5kZWZhdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlO1xufTtcblxubGV0IHN0b3JlOiBJU3RvcmU7XG50cnkge1xuICBjb25zdCBpbml0aWFsU3RhdGUgPSAod2luZG93IGFzIElXaW5kb3cpLl9fSU5JVElBTF9TVEFURV9fO1xuICBkZWxldGUgKHdpbmRvdyBhcyBJV2luZG93KS5fX0lOSVRJQUxfU1RBVEVfXztcbiAgc3RvcmUgPSBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUpO1xufSBjYXRjaCAoX2UpIHtcbiAgc3RvcmUgPSBjb25maWd1cmVTdG9yZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdG9yZTtcbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFN0YXRlVHlwZSB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xuaW1wb3J0IGhvbWUgZnJvbSAnQGhvbWUvc3RvcmUvcmVkdWNlcic7XG5cbmltcG9ydCB7IElNYWluU3RhdGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnM8SU1haW5TdGF0ZT4oe1xuICBob21lLFxufSk7XG5cbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFN0YXRlVHlwZTx0eXBlb2Ygcm9vdFJlZHVjZXI+O1xuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXI7XG4iLCJpbXBvcnQgcHJvZHVjZSBmcm9tICdpbW1lcic7XG5pbXBvcnQgeyBBbnlBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5cbmV4cG9ydCBkZWZhdWx0IChpbml0aWFsU3RhdGU6ICgpID0+IG9iamVjdCwgcmVkdWNlcnM6IG9iamVjdCkgPT4ge1xuICByZXR1cm4gcHJvZHVjZSgoc3RhdGUgPSBpbml0aWFsU3RhdGUoKSwgeyB0eXBlLCBwYXlsb2FkIH06IEFueUFjdGlvbikgPT4ge1xuICAgIGlmIChyZWR1Y2Vyc1t0eXBlXSkge1xuICAgICAgcmVkdWNlcnNbdHlwZV0oc3RhdGUsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGJyZWFrcG9pbnRzID0ge1xuICBtb2JpbGU6IDM2MCxcbiAgdGFibGV0UG9ydHJhaXQ6IDc2OCxcbiAgdGFibGV0TGFuZHNjYXBlOiAxMDI0LFxuICBkZXNrdG9wOiAxMzY2LFxuICBkZXNrdG9wTGFyZ2U6IDE2ODBcbn07XG5cbmV4cG9ydCBjb25zdCBjb2xvcnMgPSB7XG4gIG1hZ2VudGE6ICcjZTIwMDc0JyxcbiAgbG93TWFnZW50YTogJyNmMmRjZTcnLFxuICB3aGl0ZTogJyNmZmZmZmYnLFxuICBibGFjazogJyMwMDAwMDAnLFxuICBkYXJrR3JheTogJyMzODM4MzgnLFxuICBncmF5OiAnIzc1NzU3NScsXG4gIG1lZGl1bUdyYXk6ICcjYTNhM2EzJyxcbiAgbGlnaHRHcmF5OiAnI2MyYzJjMicsXG4gIGNoYXJjb2FsR3JheTogJyMyNjI2MjYnLFxuICBzaGFkb3dHcmF5OiAnIzRiNGI0YicsXG4gIGlyb25HcmF5OiAnIzZjNmM2YycsXG4gIHN0b25lR3JheTogJyM3YzdjN2MnLFxuICBzdGVlbEdyYXk6ICcjYTRhNGE0JyxcbiAgd2FybUdyYXk6ICcjZDBkMGQwJyxcbiAgc2lsdmVyR3JheTogJyNlNmU2ZTYnLFxuICBjbG91ZEdyYXk6ICcjZWRlZGVkJyxcbiAgZm9nR3JheTogJyNmMmYyZjInLFxuICByZWQ6ICcjZDkwMDAwJyxcbiAgeWVsbG93OiAnI2ZlY2IwMCcsXG4gIGdyZWVuOiAnIzZiYjMyNCcsXG4gIGRhcmtNYWdlbnRhOiAnI2MwMDA2MycsXG4gIGxpZ2h0TWFnZW50YTogJyNmMzAwN2QnLFxuICBjb2xkR3JheTogJyNmNmY2ZjYnLFxuICBsaWdodGlzaEdyYXk6ICcjZThlOGU4JyxcbiAgdHJhbnNwYXJlbnQ6ICd0cmFuc3BhcmVudCcsXG4gIGhpZ2hMaWdodEdyYXk6ICcjZGRkZGRkJyxcbiAgc2VtaUxpZ2h0R3JheTogJyNkZGRkZGQnLFxuICBvcmFuZ2U6ICcjZmY5YTFlJyxcbiAgdWx0cmFMaWdodEdyYXk6ICcjZGNkY2RjJyxcbiAgekJsYWNrOiAnIzMyMzIzMicsXG4gIHBpY3RvbkJsdWU6ICcjNTNiYWYyJyxcbiAgdG9yeUJsdWU6ICcjMEY2M0FEJyxcbiAgYmx1bWluZTogJyMyMjU0ODInLFxuICBleHRyYURhcmtHcmF5OiAnI2Q4ZDhkOCdcbn07XG4iLCJpbXBvcnQgc2VyaWFsaXplIGZyb20gJ3NlcmlhbGl6ZS1qYXZhc2NyaXB0JztcbmltcG9ydCB7IElNYWluU3RhdGUgfSBmcm9tICdAY29tbW9uL3N0b3JlL3JlZHVjZXJzL3R5cGVzJztcblxuZGVjbGFyZSBjb25zdCBfX0RFVl9fOiBib29sZWFuO1xuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMge1xuICBoZWFkOiBzdHJpbmc7XG4gIHN0eWxlOiBzdHJpbmc7XG4gIHNjcmlwdHM6IHN0cmluZ1tdO1xuICBzZWNyZXRzOiBvYmplY3Q7XG4gIGRhdGE6IElNYWluU3RhdGUgfCBudWxsO1xuICBjaGlsZHJlbjogc3RyaW5nO1xuICBib2R5QXR0cnM6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHtcbiAgc2VjcmV0cyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIGhlYWQsXG4gIHN0eWxlLFxuICBzY3JpcHRzLFxuICBib2R5QXR0cnMsXG59OiAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYmlnLWZ1bmN0aW9uXG5JUHJvcHMpID0+IHtcbiAgaWYgKCFfX0RFVl9fKSB7XG4gICAgcmV0dXJuIGA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgIDxoZWFkPlxuICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJtb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiPlxuICAgICAgPG1ldGEgbmFtZT1cImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCI+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzUzNjg3OFwiPlxuICAgICAgPG1ldGEgaHR0cEVxdWl2PVwieC11YS1jb21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIiAvPlxuICAgICAgPGxpbmsgcmVsPSdmYXZpY29uJyB0eXBlPSdpbWFnZS9wbmcnIGhyZWY9Jy9mYXZpY29uLnBuZz92PTMnIC8+XG4gICAgICA8c2NyaXB0IHNyYz1cIi9kYXRhTGF5ZXIuanNcIj48L3NjcmlwdD5cbiAgICAgIDxsaW5rIHJlbD0nZmF2aWNvbicgdHlwZT0naW1hZ2UvcG5nJyBocmVmPScvZmF2aWNvbi5wbmcnIC8+XG4gICAgICA8bGlua1xuICAgICAgICAgIGhyZWY9Jy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMS4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcydcbiAgICAgICAgICByZWw9J3N0eWxlc2hlZXQnXG4gICAgICAgIC8+XG4gICAgICAke2hlYWR9XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSx1c2VyLXNjYWxhYmxlPW5vXCI+XG5cbiAgICAgICR7c2NyaXB0c1xuICAgICAgICAubWFwKHNjcmlwdCA9PiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGFzPVwic2NyaXB0XCIgaHJlZj1cIiR7c2NyaXB0fVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfVxuICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL3NpdGUud2VibWFuaWZlc3RcIiAvPlxuXG4gICAgICA8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgICAgJHtzdHlsZX1cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHkgJHtib2R5QXR0cnN9PlxuICAgICAgPGRpdiBpZD1cImFwcFwiPiR7Y2hpbGRyZW59PC9kaXY+XG4gICAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fU0VDUkVUU19fID0gICR7c2VyaWFsaXplKHNlY3JldHMsIHtcbiAgICAgICAgaXNKU09OOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICA8L3NjcmlwdD5cbiAgICAgIDxzY3JpcHQ+XG4gICAgICB3aW5kb3cuX19JTklUSUFMX1NUQVRFX18gPSAke3NlcmlhbGl6ZShkYXRhLCB7XG4gICAgICAgIGlzSlNPTjogdHJ1ZSxcbiAgICAgIH0pfTwvc2NyaXB0PlxuICAgICAgJHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gYDxzY3JpcHQgc3JjPVwiJHtzY3JpcHR9XCIgPjwvc2NyaXB0PmApLmpvaW4oJycpfVxuICAgICAgPHNjcmlwdD5cbiAgICAgICAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6ICcsIHJlZ2lzdHJhdGlvbi5zY29wZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2aWNlIHdvcmtlciBub3QgaW5zdGFsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIDwvc2NyaXB0PlxuICAgIDwvYm9keT5cbiAgPC9odG1sPmA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgIDxoZWFkPlxuICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJtb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiPlxuICAgICAgPG1ldGEgbmFtZT1cImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCI+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzUzNjg3OFwiPlxuICAgICAgPG1ldGEgaHR0cEVxdWl2PVwieC11YS1jb21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIiAvPlxuICAgICAgPGxpbmsgcmVsPSdmYXZpY29uJyB0eXBlPSdpbWFnZS9wbmcnIGhyZWY9Jy9mYXZpY29uLnBuZycgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgICAgaHJlZj0nLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4xLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJ1xuICAgICAgICAgIHJlbD0nc3R5bGVzaGVldCdcbiAgICAgICAgLz5cbiAgICAgICR7aGVhZH1cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLG1heGltdW0tc2NhbGU9MSx1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAke3NjcmlwdHNcbiAgICAgICAgLm1hcChzY3JpcHQgPT4gYDxsaW5rIHJlbD1cInByZWxvYWRcIiBhcz1cInNjcmlwdFwiIGhyZWY9XCIke3NjcmlwdH1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1cbiAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9zaXRlLndlYm1hbmlmZXN0XCIgLz5cbiAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPScvZmF2aWNvbi5wbmcnIC8+XG4gICAgICAke3N0eWxlfVxuICAgIDwvaGVhZD5cbiAgICA8Ym9keSAke2JvZHlBdHRyc30+XG4gICAgPGRpdiBpZD1cImFwcFwiPiR7Y2hpbGRyZW59PC9kaXY+XG4gICAgPHNjcmlwdD5cbiAgICAgIHdpbmRvdy5fX1NFQ1JFVFNfXyA9ICAke3NlcmlhbGl6ZShzZWNyZXRzLCB7XG4gICAgICAgIGlzSlNPTjogdHJ1ZSxcbiAgICAgIH0pfVxuICAgICAgPC9zY3JpcHQ+XG4gICAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fSU5JVElBTF9TVEFURV9fID0gJHtzZXJpYWxpemUoZGF0YSwge1xuICAgICAgICBpc0pTT046IHRydWUsXG4gICAgICB9KX08L3NjcmlwdD5cbiAgICAgICR7c2NyaXB0cy5tYXAoc2NyaXB0ID0+IGA8c2NyaXB0IHNyYz1cIiR7c2NyaXB0fVwiID48L3NjcmlwdD5gKS5qb2luKCcnKX1cbiAgICAgIDwvYm9keT5cbiAgPC9odG1sPmA7XG4gIH1cbn07XG4iLCJpbXBvcnQgc3RvcmUgZnJvbSAnQGNvbW1vbi9zdG9yZSc7XG5pbXBvcnQgeyBTZXJ2ZXJTdHlsZVNoZWV0LCBTdHlsZVNoZWV0TWFuYWdlciB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IHsgbWF0Y2hQYXRoLCBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCBMb2FkYWJsZSBmcm9tICdyZWFjdC1sb2FkYWJsZSc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bjb21tb24vcm91dGVzJztcbmltcG9ydCB7IGFsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgQXBwIGZyb20gJ0Bjb21tb24vQXBwJztcbmltcG9ydCB7IGdldEJ1bmRsZXMgfSBmcm9tICdyZWFjdC1sb2FkYWJsZS93ZWJwYWNrJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUtdHlwZXMnO1xuaW1wb3J0IHsgSUNodW5rLCBJRXJyb3IsIElSb3V0ZXJDb250ZXh0IH0gZnJvbSAnQHNlcnZlci90eXBlcyc7XG5cbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9taWRkbGV3YXJlL2xvZ2dlcic7XG5pbXBvcnQgZ2V0QmFzaWNTZXR0aW5ncyBmcm9tICcuL21pZGRsZXdhcmUvYmFzaWNTZXR0aW5ncyc7XG5pbXBvcnQgZ2V0RXhpdEhhbmRsZXIgZnJvbSAnLi9taWRkbGV3YXJlL2V4aXRIYW5kbGVyJztcbmltcG9ydCBIZWFsdGhSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvaGVhbHRoJztcbmltcG9ydCBnZXRIdG1sLCB7IElQcm9wcyBhcyBJSFRNTFByb3BzIH0gZnJvbSAnLi9odG1sJztcbmltcG9ydCBjaHVua3MgZnJvbSAnLi9jaHVuay1tYW5pZmVzdC5qc29uJztcbmltcG9ydCBsb2FkYWJsZU1vZHVsZXNKc29uIGZyb20gJy4vcmVhY3QtbG9hZGFibGUuanNvbic7XG5cbmRlY2xhcmUgY29uc3QgX19ERVZfXzogYm9vbGVhbjtcblxuZG90ZW52LmNvbmZpZygpO1xuXG5Mb2FkYWJsZS5wcmVsb2FkQWxsKCk7XG5cbmdldEV4aXRIYW5kbGVyKCk7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbmdldEJhc2ljU2V0dGluZ3MoYXBwKTtcbmFwcC51c2UoJy9oZWFsdGgnLCBIZWFsdGhSb3V0ZXMpO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZWdpc3RlciBOb2RlLmpzIG1pZGRsZXdhcmVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShcbiAgZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpLCB7XG4gICAgbWF4QWdlOiAnMzBkJyxcbiAgICBzZXRIZWFkZXJzKHJlcywgZmlsZVBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgICAgaWYgKG1pbWUubG9va3VwKGZpbGVQYXRoKSA9PT0gJ3RleHQvaHRtbCcpIHtcbiAgICAgICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdwdWJsaWMsIG1heC1hZ2U9MCcpO1xuICAgICAgfSBlbHNlIGlmIChtaW1lLmxvb2t1cChmaWxlUGF0aCkgPT09ICdmb250L29wZW50eXBlJykge1xuICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3B1YmxpYywgbWF4LWFnZT0xeXInKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KSxcbik7XG5cbmFwcC5nZXQoJy9zdy5qcycsIChfLCByZXMpID0+IHtcbiAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvYXNzZXRzL3N3LmpzJykpO1xufSk7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaWctZnVuY3Rpb25cbmFwcC5nZXQoJyonLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzYWdhczogR2VuZXJhdG9yW10gPSBbXTtcblxuICAgIHJvdXRlcy5mb3JFYWNoKHJvdXRlID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS51cmwsIHJvdXRlKTtcbiAgICAgIGlmIChtYXRjaCAmJiByb3V0ZSAmJiByb3V0ZS5sb2FkRGF0YSkge1xuICAgICAgICBzYWdhcy5wdXNoKHJvdXRlLmxvYWREYXRhKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXdhaXQgc3RvcmUucnVuU2FnYShmdW5jdGlvbiooKTogR2VuZXJhdG9yIHtcbiAgICAgIHlpZWxkIGFsbChbc2FnYXNdKTtcbiAgICB9KS5kb25lO1xuICAgIGNvbnN0IHNjcmlwdHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgaHRtbERhdGE6IElIVE1MUHJvcHMgPSB7XG4gICAgICBoZWFkOiAnJyxcbiAgICAgIHN0eWxlOiAnJyxcbiAgICAgIHNjcmlwdHM6IFtdLFxuICAgICAgY2hpbGRyZW46ICcnLFxuICAgICAgc2VjcmV0czoge30sXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgYm9keUF0dHJzOiAnJ1xuICAgIH07XG5cbiAgICBjb25zdCBjb250ZXh0OiBJUm91dGVyQ29udGV4dCA9IHt9O1xuICAgIGNvbnN0IHNoZWV0ID0gbmV3IFNlcnZlclN0eWxlU2hlZXQoKTtcbiAgICBjb25zdCBtb2R1bGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGFkZENodW5rID0gKGNodW5rTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoKGNodW5rcyBhcyBJQ2h1bmspW2NodW5rTmFtZV0pIHtcbiAgICAgICAgY2h1bmtzW2NodW5rTmFtZV0uZm9yRWFjaCgoYXNzZXQ6IHN0cmluZykgPT4gc2NyaXB0cy5hZGQoYXNzZXQpKTtcbiAgICAgIH0gZWxzZSBpZiAoX19ERVZfXykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENodW5rIHdpdGggbmFtZSAnJHtjaHVua05hbWV9JyBjYW5ub3QgYmUgZm91bmRgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldE1vZHVsZXMgPSAobW9kdWxlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gbW9kdWxlcy5wdXNoKG1vZHVsZU5hbWUpO1xuICAgIH07XG4gICAgaHRtbERhdGEuY2hpbGRyZW4gPSBSZWFjdERPTS5yZW5kZXJUb1N0cmluZyhcbiAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICA8TG9hZGFibGUuQ2FwdHVyZSByZXBvcnQ9e2dldE1vZHVsZXN9PlxuICAgICAgICAgIDxTdHlsZVNoZWV0TWFuYWdlciBzaGVldD17c2hlZXQuaW5zdGFuY2V9PlxuICAgICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICAgIDwvU3R5bGVTaGVldE1hbmFnZXI+XG4gICAgICAgIDwvTG9hZGFibGUuQ2FwdHVyZT5cbiAgICAgIDwvUHJvdmlkZXI+LFxuICAgICk7XG5cbiAgICBpZiAoY29udGV4dC5zdGF0dXMgPT09IDMwMSB8fCBjb250ZXh0LnN0YXR1cyA9PT0gMzAyKSB7XG4gICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KGNvbnRleHQuc3RhdHVzLCBjb250ZXh0LnVybCBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIGh0bWxEYXRhLmhlYWQgPSBgXG4gICAgJHtIZWxtZXQucmVuZGVyU3RhdGljKCkudGl0bGUudG9TdHJpbmcoKX1cbiAgICAke0hlbG1ldC5yZW5kZXJTdGF0aWMoKS5tZXRhLnRvU3RyaW5nKCl9XG4gICAgYDtcblxuICAgIGh0bWxEYXRhLmJvZHlBdHRycyA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKS5ib2R5QXR0cmlidXRlcy50b1N0cmluZygpO1xuXG4gICAgaHRtbERhdGEuc3R5bGUgPSBzaGVldC5nZXRTdHlsZVRhZ3MoKTtcblxuICAgIGh0bWxEYXRhLnNlY3JldHMgPSB7XG4gICAgICBFTlY6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxuICAgIH07XG5cbiAgICBhZGRDaHVuaygnY2xpZW50Jyk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgY29uc3QgYnVuZGxlcyA9IGdldEJ1bmRsZXMobG9hZGFibGVNb2R1bGVzSnNvbiBhcyBhbnksIG1vZHVsZXMpO1xuXG4gICAgbG9nZ2VyLmluZm8oYEJ1bmRsZXMgY3JlYXRlZGApO1xuXG4gICAgYnVuZGxlcy5mb3JFYWNoKGJ1bmRsZSA9PiB7XG4gICAgICBzY3JpcHRzLmFkZChidW5kbGUucHVibGljUGF0aCk7XG4gICAgfSk7XG5cbiAgICBodG1sRGF0YS5kYXRhID0gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBodG1sRGF0YS5zY3JpcHRzID0gWy4uLihBcnJheS5mcm9tKHNjcmlwdHMpIGFzIHN0cmluZ1tdKV07XG5cbiAgICBjb25zdCBodG1sID0gZ2V0SHRtbChodG1sRGF0YSk7XG5cbiAgICByZXMuc3RhdHVzKGNvbnRleHQuc3RhdHVzIHx8IDIwMCk7XG4gICAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbmV4dChlcnIpO1xuICB9XG59KTtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXJyb3IgaGFuZGxpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hcHAudXNlKFxuICAoXG4gICAgZXJyOiBJRXJyb3IsXG4gICAgX3JlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICAgIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgICBfbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4gICkgPT4ge1xuICAgIGxvZ2dlci5lcnJvcihlcnIpO1xuXG4gICAgY29uc3QgaHRtbERhdGEgPSB7XG4gICAgICBoZWFkOiBgXG4gICAgPHRpdGxlPiR7ZXJyLm1lc3NhZ2V9PC90aXRsZT5cbiAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIj5FcnJvcjwvbWV0YT5cbiAgYCxcbiAgICAgIHN0eWxlOiAnJyxcbiAgICAgIHNjcmlwdHM6IFtdLFxuICAgICAgc2VjcmV0czoge30sXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgbm9TY3JpcHRGb3JHVEE6ICcnLFxuICAgICAgc2NyaXB0Rm9yR1RBOiAnJyxcbiAgICAgIGJvZHlBdHRyaWJ1dGVzOiAnJyxcbiAgICAgIGJvZHlBdHRyczogJycsXG4gICAgICBjaGlsZHJlbjogUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoPD48Lz4pLFxuICAgIH07XG4gICAgY29uc3QgaHRtbCA9IGdldEh0bWwoaHRtbERhdGEpO1xuICAgIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gIH0sXG4pO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMYXVuY2ggdGhlIHNlcnZlclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5pZiAoIW1vZHVsZS5ob3QpIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBjb25zdCBwb3J0ID0gKHByb2Nlc3MuZW52IGFzIGFueSkuUE9SVDtcbiAgTG9hZGFibGUucHJlbG9hZEFsbCgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBUaGUgc2VydmVyIGlzIHJ1bm5pbmcgYXQgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2ApO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbn1cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5pZiAobW9kdWxlLmhvdCkge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgYXBwWydob3QnXSA9IG1vZHVsZS5ob3Q7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCcuL2luZGV4JywgKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdob3QgcmVsb2FkaW5nLi4uJyk7XG4gIH0pO1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWZpbGUtbGluZS1jb3VudFxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCBoZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgY29yZSBmcm9tICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJztcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IChhcHA6IGNvcmUuRXhwcmVzcykgPT4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgZ2xvYmFsWyduYXZpZ2F0b3InXSA9IGdsb2JhbFsnbmF2aWdhdG9yJ10gfHwge307XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICBnbG9iYWxbJ25hdmlnYXRvciddLnVzZXJBZ2VudCA9IGdsb2JhbFsnbmF2aWdhdG9yJ10udXNlckFnZW50IHx8ICdhbGwnO1xuICBjb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50JztcbiAgaWYgKGlzUHJvZCkge1xuICAgIGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gICAgYXBwLnVzZShsb2dnZXIuZ2V0UmVxdWVzdExvZ2dlcik7XG4gIH1cblxuICBhcHAudXNlKGNvbXByZXNzaW9uKCkpO1xuICBhcHAudXNlKGhlbG1ldCgpKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG4gIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGZ1bmN0aW9uIGV4aXRIYW5kbGVyKG9wdGlvbnM6IGFueSwgZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob3B0aW9ucy5jbGVhbnVwKSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnY2xlYW4nKTtcbiAgICB9XG4gICAgaWYgKGVycikge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZXJyLnN0YWNrKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZXhpdCkge1xuICAgICAgcHJvY2Vzcy5leGl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzcy5vbignZXhpdCcsIGV4aXRIYW5kbGVyLmJpbmQobnVsbCwgeyBjbGVhbnVwOiB0cnVlIH0pKTtcblxuICBwcm9jZXNzLm9uKCdTSUdJTlQnLCBleGl0SGFuZGxlci5iaW5kKG51bGwsIHsgZXhpdDogdHJ1ZSB9KSk7XG4gIHByb2Nlc3Mub24oJ1NJR1VTUjEnLCBleGl0SGFuZGxlci5iaW5kKG51bGwsIHsgZXhpdDogdHJ1ZSB9KSk7XG4gIHByb2Nlc3Mub24oJ1NJR1VTUjInLCBleGl0SGFuZGxlci5iaW5kKG51bGwsIHsgZXhpdDogdHJ1ZSB9KSk7XG5cbiAgcHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBleGl0SGFuZGxlci5iaW5kKG51bGwsIHsgZXhpdDogdHJ1ZSB9KSk7XG59O1xuIiwiaW1wb3J0IGJ1bnlhbiwgeyBMb2dnZXJPcHRpb25zIH0gZnJvbSAnYnVueWFuJztcbmltcG9ydCBsb2cgZnJvbSAnZXhwcmVzcy1idW55YW4tbG9nZ2VyJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDdXN0b21CdW55YW4gZXh0ZW5kcyBidW55YW4ge1xuICBnZXRSZXF1ZXN0TG9nZ2VyOiBleHByZXNzLlJlcXVlc3RIYW5kbGVyO1xuICBnZXRCYXNpY0xvZ2dlcihuYW1lOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5jb25zdCBjb25maWcgPSB7XG4gIG5hbWU6ICdwdXp6bGUnLFxuICBzdHJlYW1zOiBbXG4gICAge1xuICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgIHBhdGg6ICdsb2dzL3B1enpsZS1nYW1lLXVpLWRldi1vdXQtYXBwLmxvZydcbiAgICB9LFxuICAgIHtcbiAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgcGF0aDogJ2xvZ3MvcHV6emxlLWdhbWUtdWktZGV2LWVycm9yLWFwcC5sb2cnXG4gICAgfVxuICBdXG59O1xuY29uc3QgbG9nZ2VyID0gYnVueWFuLmNyZWF0ZUxvZ2dlcihjb25maWcgYXMgTG9nZ2VyT3B0aW9ucykgYXMgSUN1c3RvbUJ1bnlhbjtcblxubG9nZ2VyLmdldEJhc2ljTG9nZ2VyID0gKG5hbWUgPSAnaW5pdCcpID0+IHtcbiAgcmV0dXJuIGJ1bnlhbi5jcmVhdGVMb2dnZXIoeyBuYW1lIH0pO1xufTtcblxubG9nZ2VyLmdldFJlcXVlc3RMb2dnZXIgPSBsb2coe1xuICBleGNsdWRlczogWyd1c2VyLWFnZW50JywgJ3Jlcy1oZWFkZXJzJywgJ3JlcycsICdyZXEnLCAnYm9keSddLFxuICBvYmZ1c2NhdGU6IFsnYm9keS5wYXNzd29yZCcsICdib2R5LmNvbmZpcm1QYXNzd29yZCddXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29yZSBmcm9tICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJztcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVyLnJvdXRlKCcvJykuZ2V0KChfOiBjb3JlLlJlcXVlc3QsIHJlczogY29yZS5SZXNwb25zZSkgPT4ge1xuICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoMjAwKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYnVueWFuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1idW55YW4tbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbW1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtaW1lLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWxvYWRhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWxvYWRhYmxlL3dlYnBhY2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWNvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpOyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3d0JBOzs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBU0E7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7Ozs7Ozs7O0FDMUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUE7Ozs7Ozs7QUFPQTs7Ozs7QUFLQTs7O0FBR0E7Ozs7Ozs7QUFmQTs7Ozs7Ozs7QUNKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkNBOzs7O0FBSUE7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdERBOzs7Ozs7OztBQ0hBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhJQUFBO0FBRkE7QUFBQTtBQUFBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUUE7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTs7Ozs7Ozs7QUNGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQWdCQTs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBY0E7QUFDQTtBQUNBO0FBS0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBSUE7QUFDQTtBQURBO0FBS0E7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbENBOzs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBVUEsZUFxREE7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7O0FBRUE7OztBQUtBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQURBOzs7QUFLQTtBQUNBO0FBREE7QUFHQTs7QUFoQ0E7QUFtQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6RkE7QUFBQTtBQUFBO0FBQUE7QUEwRkE7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUVBO0FBQ0E7QUFDQTs7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQSxhQVlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBUEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9