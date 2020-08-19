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
/******/ 	var hotCurrentHash = "ce88619f089e457100a0";
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
/******/ 			_selfInvalidated: false,
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
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
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
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
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
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
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
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
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
/******/ 			var queue = outdatedModules.map(function(id) {
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
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
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
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
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
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
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
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
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
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledAppInner, {
    className: "styledAppInner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_0__["Helmet"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("title", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }, "Puzzle game"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("meta", {
    name: "description",
    content: "react typescript ssr with code split",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }), Object(react_router_config__WEBPACK_IMPORTED_MODULE_7__["renderRoutes"])(_common_routes__WEBPACK_IMPORTED_MODULE_6__["default"]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_reset__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_common__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
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
  SET_LOADING: `${namespace}_SET_LOADING`
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
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_withProduce__WEBPACK_IMPORTED_MODULE_2__["default"])(_home_store_state__WEBPACK_IMPORTED_MODULE_1__["default"], reducers));

/***/ }),

/***/ "./src/common/routes/home/store/state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => ({
  isLoading: true
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
  // tslint:disable-next-line:no-string-literal
  const initialState = window['__INITIAL_STATE__']; // tslint:disable-next-line:no-string-literal

  delete window['__INITIAL_STATE__'];
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
var _this = undefined,
    _jsxFileName = "/Users/amitjain/Puzzle-game/src/server/index.tsx";

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

app.get('*', /*#__PURE__*/function () {
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

      htmlData.children = react_dom_server__WEBPACK_IMPORTED_MODULE_11___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
        store: _common_store__WEBPACK_IMPORTED_MODULE_0__["default"],
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 7
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_loadable__WEBPACK_IMPORTED_MODULE_9___default.a.Capture, {
        report: getModules,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 9
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_1__["StyleSheetManager"], {
        sheet: sheet.instance,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 11
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["StaticRouter"], {
        location: req.url,
        context: context,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 13
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_common_App__WEBPACK_IMPORTED_MODULE_14__["default"], {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 15
        }
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
    children: react_dom_server__WEBPACK_IMPORTED_MODULE_11___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCIuL2NodW5rLW1hbmlmZXN0Lmpzb25cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcIi4vcmVhY3QtbG9hZGFibGUuanNvblwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vQXBwLnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL0xvYWRlci50c3giLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9jb21tb24udHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yZXNldC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL3JvdXRlcy50c3giLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9jb25zdGFudHMudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdG9yZS9yZWR1Y2VyLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vcm91dGVzL2hvbWUvc3RvcmUvc3RhdGUudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi9zdG9yZS9pbmRleC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvY29tbW9uL3N0b3JlL3JlZHVjZXJzL2luZGV4LnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9jb21tb24vdXRpbHMvd2l0aFByb2R1Y2UudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL2NvbW1vbi92YXJpYWJsZXMudHMiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvc3JjL3NlcnZlci9odG1sLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvaW5kZXgudHN4IiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9iYXNpY1NldHRpbmdzLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9leGl0SGFuZGxlci50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9zcmMvc2VydmVyL21pZGRsZXdhcmUvbG9nZ2VyLnRzIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL3NyYy9zZXJ2ZXIvcm91dGVzL2hlYWx0aC50cyIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImJ1bnlhblwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImRvdGVudlwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwiZXhwcmVzcy1idW55YW4tbG9nZ2VyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcImltbWVyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJtaW1lLXR5cGVzXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInBhdGhcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlYWN0XCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlYWN0LWxvYWRhYmxlXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1sb2FkYWJsZS93ZWJwYWNrXCIiLCIvVXNlcnMvYW1pdGphaW4vUHV6emxlLWdhbWUvZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWNvbmZpZ1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwicmVkdXhcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwiL1VzZXJzL2FtaXRqYWluL1B1enpsZS1nYW1lL2V4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIiIsIi9Vc2Vycy9hbWl0amFpbi9QdXp6bGUtZ2FtZS9leHRlcm5hbCBcInN0eWxlZC1jb21wb25lbnRzXCIiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIik7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkge1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciB1cGRhdGUgPSByZXF1aXJlKFwiLi9cIiArIFwidXBkYXRlcy9cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJjZTg4NjE5ZjA4OWU0NTcxMDBhMFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG4gXHRcdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0c3dpdGNoIChob3RTdGF0dXMpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuIFx0XHRcdFx0XHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG4gXHRcdFx0XHRcdFx0KGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9XG4gXHRcdFx0XHRcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdH1cbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaCwgaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gXHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpIHtcbiBcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHQhbW9kdWxlIHx8XG4gXHRcdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcbiBcdFx0XHRcdClcbiBcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuIFx0XHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcbiBcdFx0XHRcdCFpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRwYXJlbnRzOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5wYXJlbnRzLnNsaWNlKCksXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGlmIChob3RVcGRhdGVOZXdIYXNoICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVuZGVmaW5lZDtcbiBcdFx0fVxuIFx0XHRob3RVcGRhdGUgPSB1bmRlZmluZWQ7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IGl0ZW0ucGFyZW50cztcbiBcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSBtb2R1bGVJZDtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiBcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRyZXR1cm4gbGlzdDtcbiBcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoIWhvdFVwZGF0ZSkgaG90VXBkYXRlID0ge307XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZSk7XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuIFx0XHRcdHJldHVybiB0cnVlO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0aWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBtb2R1bGVJZCkpXG4gXHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlcnZlclwiOiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIHJlcXVpcmUoKSBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gMCkge1xuIFx0XHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL2NodW5rcy9cIiArICh7XCJob21lXCI6XCJob21lXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIHVuY2F1Z2h0IGVycm9yIGhhbmRsZXIgZm9yIHdlYnBhY2sgcnVudGltZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikge1xuIFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuIFx0XHRcdHRocm93IGVycjsgLy8gY2F0Y2ggdGhpcyBlcnJvciBieSB1c2luZyBpbXBvcnQoKS5jYXRjaCgpXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9jaHVuay1tYW5pZmVzdC5qc29uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVhY3QtbG9hZGFibGUuanNvblwiKTsiLCJpbXBvcnQgeyBIZWxtZXQgfSBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IEdsb2JhbFN0eWxlIGZyb20gJ0Bjb21tb24vcmVzZXQnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJlTG9hZGVyIGZyb20gJ0Bjb21tb24vTG9hZGVyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29tbW9uR2xvYmFsU3R5bGUgZnJvbSAnQGNvbW1vbi9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bjb21tb24vcm91dGVzJztcbmltcG9ydCB7IHJlbmRlclJvdXRlcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XG4gIGV4YWN0PzogYm9vbGVhbjtcbiAgcGF0aD86IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBjb21wb25lbnQ/OiBSZWFjdC5Db21wb25lbnRUeXBlPFJvdXRlQ29tcG9uZW50UHJvcHM8YW55Pj47XG59XG5cbmNvbnN0IFN0eWxlZEFwcElubmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0eWxlZEFwcElubmVyIGNsYXNzTmFtZT0nc3R5bGVkQXBwSW5uZXInPlxuICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgIDx0aXRsZT5QdXp6bGUgZ2FtZTwvdGl0bGU+XG4gICAgICAgICAgPG1ldGFcbiAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgY29udGVudD0ncmVhY3QgdHlwZXNjcmlwdCBzc3Igd2l0aCBjb2RlIHNwbGl0J1xuICAgICAgICAgIC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8UHJlTG9hZGVyIC8+XG4gICAgICAgIHtyZW5kZXJSb3V0ZXMocm91dGVzKX1cbiAgICAgICAgPEdsb2JhbFN0eWxlIC8+XG4gICAgICAgIDxDb21tb25HbG9iYWxTdHlsZSAvPlxuICAgICAgPC9TdHlsZWRBcHBJbm5lcj5cbiAgICA8Lz5cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlTG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50PHt9PiB7XG4gIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHbG9iYWxTdHlsZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgYnJlYWtwb2ludHMsIGNvbG9ycyB9IGZyb20gJy4vdmFyaWFibGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2xvYmFsU3R5bGVgXG4gICp7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIGJvZHl7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgY29sb3I6ICR7Y29sb3JzLmRhcmtHcmF5fTtcbiAgfVxuXG4gICNhcHB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1pbi13aWR0aDogJHticmVha3BvaW50cy50YWJsZXRQb3J0cmFpdH1weDtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnJlYWtwb2ludHMudGFibGV0TGFuZHNjYXBlfXB4KSB7XG4gICAgYm9keS5oYXNTdW1tYXJ5e1xuICAgICAgI2FwcHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMThyZW07XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuIiwiaW1wb3J0IHsgY3JlYXRlR2xvYmFsU3R5bGUgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IGJyZWFrcG9pbnRzLCBjb2xvcnMgfSBmcm9tICcuL3ZhcmlhYmxlcyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2xvYmFsU3R5bGVgXG5cblxuKlt0YWJpbmRleF17XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24geyAvKiBDb2RlIGZvciBGaXJlZm94ICovXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5ib2R5e1xuICBvdmVyZmxvdy14OmhpZGRlbjtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyogOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn0gKi9cblxuLnN0eWxlc19fU3VtbWFyeUNvbnRlbnRDb21wYWN0V3JhcHBlci1qY3RxcmItNXtcbiAgdHJhbnNpdGlvbjogMC4ycyBsaW5lYXIgMHMgIWltcG9ydGFudDtcbn1cbi5oaWRlRHJhd2Vye1xuICAuaXNTdGlja3l7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi5jaGVja291dE1vYmlsZUZvb3RlckRyYXdlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4OiAxO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMi41cmVtO1xuXG4gICAgaGVpZ2h0OiA1NnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuMzM7XG5cbiAgICAuY29weSB7XG4gICAgICBjb2xvcjogJHtjb2xvcnMubWVkaXVtR3JheX07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgfVxuICAgIC50bmMge1xuICAgICAgY29sb3I6ICR7Y29sb3JzLmlyb25HcmF5fTtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJHticmVha3BvaW50cy5kZXNrdG9wfXB4KSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG5cblxuLyoqKiBSRVNFVCBDU1MgKioqL1xuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiAnVGVsZUdyb3Rlc2sgTmV4dCcgIWltcG9ydGFudDtcbn1cblxuYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLyoqKioqKioqKioqIFByb2R1Y3QgRGV0YWlsZWQgUGxhbiBNb2RhbCBCb2R5IFNjcm9sbCBGYWxzZSBDU1MgMDMtMDYtMjAxOSAqKioqKioqKioqKi9cbmJvZHl7XG4gICYub3ZlcmZsb3dIaWRle1xuICAgIG92ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gIH1cbn1cbi8qKioqKioqKioqKiBQcm9kdWN0IERldGFpbGVkIFBsYW4gTW9kYWwgQm9keSBTY3JvbGwgRmFsc2UgQ1NTIDAzLTA2LTIwMTkgKioqKioqKioqKiovXG5cblxuXG4qLFxuKjo6YWZ0ZXIsXG4qOjpiZWZvcmUge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJ1RlbGVHcm90ZXNrIE5leHQnO1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5odG1sLFxuYm9keSxcbmRpdixcbnNwYW4sXG5hcHBsZXQsXG5vYmplY3QsXG5pZnJhbWUsXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYsXG5wLFxuYmxvY2txdW90ZSxcbnByZSxcbmEsXG5hYmJyLFxuYWNyb255bSxcbmFkZHJlc3MsXG5iaWcsXG5jaXRlLFxuY29kZSxcbmRlbCxcbmRmbixcbmVtLFxuaW1nLFxuaW5zLFxua2JkLFxucSxcbnMsXG5zYW1wLFxuc21hbGwsXG5zdHJpa2UsXG5zdHJvbmcsXG5zdWIsXG5zdXAsXG50dCxcbnZhcixcbmIsXG51LFxuaSxcbmNlbnRlcixcbmRsLFxuZHQsXG5kZCxcbm9sLFxudWwsXG5saSxcbmZpZWxkc2V0LFxuZm9ybSxcbmxhYmVsLFxubGVnZW5kLFxudGFibGUsXG5jYXB0aW9uLFxudGJvZHksXG50Zm9vdCxcbnRoZWFkLFxudHIsXG50aCxcbnRkLFxuYXJ0aWNsZSxcbmFzaWRlLFxuY2FudmFzLFxuZGV0YWlscyxcbmVtYmVkLFxuZmlndXJlLFxuZmlnY2FwdGlvbixcbmZvb3RlcixcbmhlYWRlcixcbmhncm91cCxcbm1lbnUsXG5uYXYsXG5vdXRwdXQsXG5ydWJ5LFxuc2VjdGlvbixcbnN1bW1hcnksXG50aW1lLFxubWFyayxcbmF1ZGlvLFxudmlkZW8ge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogMDtcbiAgZm9udDogaW5oZXJpdDtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXG5hcnRpY2xlLFxuYXNpZGUsXG5kZXRhaWxzLFxuZmlnY2FwdGlvbixcbmZpZ3VyZSxcbmZvb3RlcixcbmhlYWRlcixcbmhncm91cCxcbm1lbnUsXG5uYXYsXG5zZWN0aW9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJvZHkge1xuICBsaW5lLWhlaWdodDogMTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxub2wsXG51bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbmEge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5ibG9ja3F1b3RlLFxucSB7XG4gIHF1b3Rlczogbm9uZTtcbn1cblxuYmxvY2txdW90ZTo6YmVmb3JlLFxuYmxvY2txdW90ZTo6YWZ0ZXIsXG5xOjpiZWZvcmUsXG5xOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBjb250ZW50OiBub25lO1xufVxuXG50YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xufVxuXG4vKioqIHNsaWNrIHNsaWRlciAqKiovXG4vKiBTbGlkZXIgKi9cbi5zbGljay1zbGlkZXJcbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXRvdWNoLWFjdGlvbjogcGFuLXk7XG4gICAgICAgIHRvdWNoLWFjdGlvbjogcGFuLXk7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLnNsaWNrLWxpc3RcbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG59XG4uc2xpY2stbGlzdDpmb2N1c1xue1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG4uc2xpY2stbGlzdC5kcmFnZ2luZ1xue1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjdXJzb3I6IGhhbmQ7XG59XG5cbi5zbGljay1zbGlkZXIgLnNsaWNrLXRyYWNrLFxuLnNsaWNrLXNsaWRlciAuc2xpY2stbGlzdFxue1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG59XG5cbi5zbGljay10cmFja1xue1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcblxuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuLnNsaWNrLXRyYWNrOmJlZm9yZSxcbi5zbGljay10cmFjazphZnRlclxue1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuXG4gICAgY29udGVudDogJyc7XG59XG4uc2xpY2stdHJhY2s6YWZ0ZXJcbntcbiAgICBjbGVhcjogYm90aDtcbn1cbi5zbGljay1sb2FkaW5nIC5zbGljay10cmFja1xue1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLnNsaWNrLXNsaWRlXG57XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIGhlaWdodDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxcHg7XG59XG5bZGlyPSdydGwnXSAuc2xpY2stc2xpZGVcbntcbiAgICBmbG9hdDogcmlnaHQ7XG59XG4uc2xpY2stc2xpZGUgaW1nXG57XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG4uc2xpY2stc2xpZGUuc2xpY2stbG9hZGluZyBpbWdcbntcbiAgICBkaXNwbGF5OiBub25lO1xufVxuLnNsaWNrLXNsaWRlLmRyYWdnaW5nIGltZ1xue1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnNsaWNrLWluaXRpYWxpemVkIC5zbGljay1zbGlkZVxue1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuLnNsaWNrLWxvYWRpbmcgLnNsaWNrLXNsaWRlXG57XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLnNsaWNrLXZlcnRpY2FsIC5zbGljay1zbGlkZVxue1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgaGVpZ2h0OiBhdXRvO1xuXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG59XG4uc2xpY2stYXJyb3cuc2xpY2staGlkZGVuIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuI2JpbmtpZXMtb24tcGFnZSxcbiNiaW5raWVzLWluLW1vZGFsXG57XG5cdHRyYW5zaXRpb246IG9wYWNpdHkgMC41cywgdmlzaWJpbGl0eSAwLjVzO1xufVxuYm9keS5iaW5raWVzLXNob3cgI2JpbmtpZXMtb24tcGFnZSxcbmJvZHkuYmlua2llcy1zaG93ICNiaW5raWVzLWluLW1vZGFse1xuXHRvcGFjaXR5OiAxO1xuXHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuYm9keS5iaW5raWVzLWhpZGUgI2JpbmtpZXMtb24tcGFnZSxcbmJvZHkuYmlua2llcy1oaWRlICNiaW5raWVzLWluLW1vZGFsXG57XG5cdG9wYWNpdHk6IDA7XG5cdHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi5iaW5raWVzLWJhcntcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG5cblxuLyogaGlkZSBzY3JvbGwgYmFyICovXG5ib2R5ICo6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHdpZHRoOiAwICFpbXBvcnRhbnQgO1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICBvdmVyZmxvdzogLW1vei1zY3JvbGxiYXJzLW5vbmU7XG4gIH1cbiBib2R5ICAqe1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICBvdmVyZmxvdzogLW1vei1zY3JvbGxiYXJzLW5vbmU7XG4gIC8qIH0gKi9cblxuICAvKiogQmlua2llcyBQYWdlIENTUyAqL1xuXG4gICNiaW5raWVzLW9uLXBhZ2Uub3V0T2ZTdG9ja3tcbiAgb3BhY2l0eTogMC42O1xuICB9XG4gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpe1xuICAgICNiaW5raWVzLW9uLXBhZ2Uub3V0T2ZTdG9ja3tcbiAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICB9XG4gIH1cblxuICAuZ3JlZW4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMDkyNjA7XG4gIH1cbiAgLmJsdWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNTk4ZGM7XG4gIH1cbiAgLnllbGxvdyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZDkxZTtcbiAgfVxuICAub3JhbmdlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTc3ZTIyO1xuICB9XG4gIC5yZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlODRjM2Q7XG4gIH1cblxufWA7XG4iLCJpbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTG9hZGFibGUsIHsgTG9hZGluZ0NvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3QtbG9hZGFibGUnO1xuXG5jb25zdCBsb2FkaW5nOiBGdW5jdGlvbkNvbXBvbmVudDxMb2FkaW5nQ29tcG9uZW50UHJvcHM+ID0gKCkgPT4gbnVsbDtcblxuY29uc3QgSG9tZSA9IExvYWRhYmxlKHtcbiAgbG9hZGluZyxcbiAgbG9hZGVyOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2hvbWUnICovICcuL3JvdXRlcy9ob21lJylcbn0pO1xuY29uc3Qgcm91dGVzOiBJUm91dGVzW10gPSBbXG4gIHtcbiAgICBwYXRoOiAnLycsXG4gICAgYmFzZVBhdGg6ICcvJyxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IEhvbWUsXG4gIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVzIHtcbiAgY2hpbGRSb3V0ZXM/OiBJUm91dGVzW107XG4gIGJhc2VQYXRoPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBleGFjdD86IGJvb2xlYW47XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgY29tcG9uZW50PzogUmVhY3QuQ29tcG9uZW50VHlwZTxhbnk+O1xuICBsb2FkRGF0YT8oKTogR2VuZXJhdG9yO1xufVxuIiwiY29uc3QgbmFtZXNwYWNlID0gJ0hPTUUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFNFVF9MT0FESU5HOiBgJHtuYW1lc3BhY2V9X1NFVF9MT0FESU5HYFxufTtcbiIsImltcG9ydCBDT05TVEFOVFMgZnJvbSAnQGhvbWUvc3RvcmUvY29uc3RhbnRzJztcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnQGhvbWUvc3RvcmUvc3RhdGUnO1xuaW1wb3J0IHdpdGhQcm9kdWNlIGZyb20gJ0B1dGlscy93aXRoUHJvZHVjZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJSG9tZVN0YXRlIH0gZnJvbSAnQGhvbWUvc3RvcmUvdHlwZXMnO1xuXG5jb25zdCByZWR1Y2VycyA9IHtcbiAgW0NPTlNUQU5UUy5TRVRfTE9BRElOR106IChzdGF0ZTogSUhvbWVTdGF0ZSwgcGF5bG9hZDogYm9vbGVhbikgPT4ge1xuICAgIHN0YXRlLmlzTG9hZGluZyA9IHBheWxvYWQ7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhQcm9kdWNlKGluaXRpYWxTdGF0ZSwgcmVkdWNlcnMpIGFzIFJlZHVjZXI8XG4gIElIb21lU3RhdGUsXG4gIEFueUFjdGlvblxuPjtcbiIsImltcG9ydCB7IElIb21lU3RhdGUgfSBmcm9tICdAaG9tZS9zdG9yZS90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpOiBJSG9tZVN0YXRlID0+ICh7XG4gIGlzTG9hZGluZzogdHJ1ZSxcbn0pO1xuIiwiaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlLCB7IEVORCwgU2FnYU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY3JlYXRlU3RvcmUsIFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgcm9vdFJlZHVjZXIsIHsgUm9vdFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycy9pbmRleCc7XG5kZWNsYXJlIGNvbnN0IF9fREVWX186IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvdyBleHRlbmRzIFdpbmRvdyB7XG4gIF9fSU5JVElBTF9TVEFURV9fOiBvYmplY3Q7XG4gIF9fU0VDUkVUU19fOiB7XG4gICAgRU5WOiBzdHJpbmc7XG4gIH07XG59XG5pbnRlcmZhY2UgSVN0b3JlIGV4dGVuZHMgU3RvcmU8Um9vdFN0YXRlPiB7XG4gIHJ1blNhZ2E6IFNhZ2FNaWRkbGV3YXJlPHt9PlsncnVuJ107XG4gIGNsb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVTdG9yZSA9IChpbml0aWFsU3RhdGU6IG9iamVjdCA9IHt9KSA9PiB7XG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlOiBTYWdhTWlkZGxld2FyZTxvYmplY3Q+ID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgY29tcG9zZUVuaGFuY2VycyA9XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgX19ERVZfXyAmJlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICh3aW5kb3dbJ19fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyddIGFzIHR5cGVvZiBjb21wb3NlKVxuICAgICAgPyAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgKHdpbmRvd1snX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fJ10gYXMgdHlwZW9mIGNvbXBvc2UpXG4gICAgICA6IGNvbXBvc2U7XG5cbiAgY29uc3QgZW5oYW5jZXIgPSBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSkpO1xuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGVuaGFuY2VyKSBhcyBJU3RvcmU7XG5cbiAgc3RvcmUucnVuU2FnYSA9IHNhZ2FNaWRkbGV3YXJlLnJ1bjtcblxuICBzdG9yZS5jbG9zZSA9ICgpID0+IHtcbiAgICBzdG9yZS5kaXNwYXRjaChFTkQpO1xuICB9O1xuXG4gIGlmIChcbiAgICBfX0RFVl9fICYmXG4gICAgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiZcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgbW9kdWxlLmhvdFxuICApIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi4vc3RvcmUvcmVkdWNlcnMnLCAoKSA9PiB7XG4gICAgICBpbXBvcnQoJy4vcmVkdWNlcnMnKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKG1vZHVsZS5kZWZhdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlO1xufTtcblxubGV0IHN0b3JlOiBJU3RvcmU7XG50cnkge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gd2luZG93WydfX0lOSVRJQUxfU1RBVEVfXyddO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgZGVsZXRlIHdpbmRvd1snX19JTklUSUFMX1NUQVRFX18nXVxuICBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSk7XG59IGNhdGNoIChfZSkge1xuICBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgU3RhdGVUeXBlIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XG5pbXBvcnQgaG9tZSBmcm9tICdAaG9tZS9zdG9yZS9yZWR1Y2VyJztcblxuaW1wb3J0IHsgSU1haW5TdGF0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2VyczxJTWFpblN0YXRlPih7XG4gIGhvbWUsXG59KTtcblxuZXhwb3J0IHR5cGUgUm9vdFN0YXRlID0gU3RhdGVUeXBlPHR5cGVvZiByb290UmVkdWNlcj47XG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcbiIsImltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcbmltcG9ydCB7IEFueUFjdGlvbiB9IGZyb20gJ3JlZHV4JztcblxuZXhwb3J0IGRlZmF1bHQgKGluaXRpYWxTdGF0ZTogKCkgPT4gb2JqZWN0LCByZWR1Y2Vyczogb2JqZWN0KSA9PiB7XG4gIHJldHVybiBwcm9kdWNlKChzdGF0ZSA9IGluaXRpYWxTdGF0ZSgpLCB7IHR5cGUsIHBheWxvYWQgfTogQW55QWN0aW9uKSA9PiB7XG4gICAgaWYgKHJlZHVjZXJzW3R5cGVdKSB7XG4gICAgICByZWR1Y2Vyc1t0eXBlXShzdGF0ZSwgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3QgYnJlYWtwb2ludHMgPSB7XG4gIG1vYmlsZTogMzYwLFxuICB0YWJsZXRQb3J0cmFpdDogNzY4LFxuICB0YWJsZXRMYW5kc2NhcGU6IDEwMjQsXG4gIGRlc2t0b3A6IDEzNjYsXG4gIGRlc2t0b3BMYXJnZTogMTY4MFxufTtcblxuZXhwb3J0IGNvbnN0IGNvbG9ycyA9IHtcbiAgbWFnZW50YTogJyNlMjAwNzQnLFxuICBsb3dNYWdlbnRhOiAnI2YyZGNlNycsXG4gIHdoaXRlOiAnI2ZmZmZmZicsXG4gIGJsYWNrOiAnIzAwMDAwMCcsXG4gIGRhcmtHcmF5OiAnIzM4MzgzOCcsXG4gIGdyYXk6ICcjNzU3NTc1JyxcbiAgbWVkaXVtR3JheTogJyNhM2EzYTMnLFxuICBsaWdodEdyYXk6ICcjYzJjMmMyJyxcbiAgY2hhcmNvYWxHcmF5OiAnIzI2MjYyNicsXG4gIHNoYWRvd0dyYXk6ICcjNGI0YjRiJyxcbiAgaXJvbkdyYXk6ICcjNmM2YzZjJyxcbiAgc3RvbmVHcmF5OiAnIzdjN2M3YycsXG4gIHN0ZWVsR3JheTogJyNhNGE0YTQnLFxuICB3YXJtR3JheTogJyNkMGQwZDAnLFxuICBzaWx2ZXJHcmF5OiAnI2U2ZTZlNicsXG4gIGNsb3VkR3JheTogJyNlZGVkZWQnLFxuICBmb2dHcmF5OiAnI2YyZjJmMicsXG4gIHJlZDogJyNkOTAwMDAnLFxuICB5ZWxsb3c6ICcjZmVjYjAwJyxcbiAgZ3JlZW46ICcjNmJiMzI0JyxcbiAgZGFya01hZ2VudGE6ICcjYzAwMDYzJyxcbiAgbGlnaHRNYWdlbnRhOiAnI2YzMDA3ZCcsXG4gIGNvbGRHcmF5OiAnI2Y2ZjZmNicsXG4gIGxpZ2h0aXNoR3JheTogJyNlOGU4ZTgnLFxuICB0cmFuc3BhcmVudDogJ3RyYW5zcGFyZW50JyxcbiAgaGlnaExpZ2h0R3JheTogJyNkZGRkZGQnLFxuICBzZW1pTGlnaHRHcmF5OiAnI2RkZGRkZCcsXG4gIG9yYW5nZTogJyNmZjlhMWUnLFxuICB1bHRyYUxpZ2h0R3JheTogJyNkY2RjZGMnLFxuICB6QmxhY2s6ICcjMzIzMjMyJyxcbiAgcGljdG9uQmx1ZTogJyM1M2JhZjInLFxuICB0b3J5Qmx1ZTogJyMwRjYzQUQnLFxuICBibHVtaW5lOiAnIzIyNTQ4MicsXG4gIGV4dHJhRGFya0dyYXk6ICcjZDhkOGQ4J1xufTtcbiIsImltcG9ydCBzZXJpYWxpemUgZnJvbSAnc2VyaWFsaXplLWphdmFzY3JpcHQnO1xuaW1wb3J0IHsgSU1haW5TdGF0ZSB9IGZyb20gJ0Bjb21tb24vc3RvcmUvcmVkdWNlcnMvdHlwZXMnO1xuXG5kZWNsYXJlIGNvbnN0IF9fREVWX186IGJvb2xlYW47XG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XG4gIGhlYWQ6IHN0cmluZztcbiAgc3R5bGU6IHN0cmluZztcbiAgc2NyaXB0czogc3RyaW5nW107XG4gIHNlY3JldHM6IG9iamVjdDtcbiAgZGF0YTogSU1haW5TdGF0ZSB8IG51bGw7XG4gIGNoaWxkcmVuOiBzdHJpbmc7XG4gIGJvZHlBdHRyczogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoe1xuICBzZWNyZXRzLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgaGVhZCxcbiAgc3R5bGUsXG4gIHNjcmlwdHMsXG4gIGJvZHlBdHRycyxcbn06IC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaWctZnVuY3Rpb25cbklQcm9wcykgPT4ge1xuICBpZiAoIV9fREVWX18pIHtcbiAgICByZXR1cm4gYDxodG1sIGNsYXNzTmFtZT1cIm5vLWpzXCIgbGFuZz1cImVuXCI+XG4gICAgPGhlYWQ+XG4gICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgPG1ldGEgbmFtZT1cIm1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCI+XG4gICAgICA8bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIj5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjNTM2ODc4XCI+XG4gICAgICA8bWV0YSBodHRwRXF1aXY9XCJ4LXVhLWNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiIC8+XG4gICAgICA8bGluayByZWw9J2Zhdmljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nP3Y9MycgLz5cbiAgICAgIDxzY3JpcHQgc3JjPVwiL2RhdGFMYXllci5qc1wiPjwvc2NyaXB0PlxuICAgICAgPGxpbmsgcmVsPSdmYXZpY29uJyB0eXBlPSdpbWFnZS9wbmcnIGhyZWY9Jy9mYXZpY29uLnBuZycgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgICAgaHJlZj0nLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4xLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJ1xuICAgICAgICAgIHJlbD0nc3R5bGVzaGVldCdcbiAgICAgICAgLz5cbiAgICAgICR7aGVhZH1cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsbWluaW11bS1zY2FsZT0xLHVzZXItc2NhbGFibGU9bm9cIj5cblxuICAgICAgJHtzY3JpcHRzXG4gICAgICAgIC5tYXAoc2NyaXB0ID0+IGA8bGluayByZWw9XCJwcmVsb2FkXCIgYXM9XCJzY3JpcHRcIiBocmVmPVwiJHtzY3JpcHR9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9XG4gICAgICA8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCIvc2l0ZS53ZWJtYW5pZmVzdFwiIC8+XG5cbiAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPScvZmF2aWNvbi5wbmcnIC8+XG4gICAgICAke3N0eWxlfVxuICAgIDwvaGVhZD5cbiAgICA8Ym9keSAke2JvZHlBdHRyc30+XG4gICAgICA8ZGl2IGlkPVwiYXBwXCI+JHtjaGlsZHJlbn08L2Rpdj5cbiAgICAgIDxzY3JpcHQ+XG4gICAgICB3aW5kb3cuX19TRUNSRVRTX18gPSAgJHtzZXJpYWxpemUoc2VjcmV0cywge1xuICAgICAgICBpc0pTT046IHRydWUsXG4gICAgICB9KX1cbiAgICAgIDwvc2NyaXB0PlxuICAgICAgPHNjcmlwdD5cbiAgICAgIHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXyA9ICR7c2VyaWFsaXplKGRhdGEsIHtcbiAgICAgICAgaXNKU09OOiB0cnVlLFxuICAgICAgfSl9PC9zY3JpcHQ+XG4gICAgICAke3NjcmlwdHMubWFwKHNjcmlwdCA9PiBgPHNjcmlwdCBzcmM9XCIke3NjcmlwdH1cIiA+PC9zY3JpcHQ+YCkuam9pbignJyl9XG4gICAgICA8c2NyaXB0PlxuICAgICAgICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJykudGhlbihmdW5jdGlvbihyZWdpc3RyYXRpb24pIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwgd2l0aCBzY29wZTogJywgcmVnaXN0cmF0aW9uLnNjb3BlKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NlcnZpY2Ugd29ya2VyIG5vdCBpbnN0YWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgPC9zY3JpcHQ+XG4gICAgPC9ib2R5PlxuICA8L2h0bWw+YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYDxodG1sIGNsYXNzTmFtZT1cIm5vLWpzXCIgbGFuZz1cImVuXCI+XG4gICAgPGhlYWQ+XG4gICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgPG1ldGEgbmFtZT1cIm1vYmlsZS13ZWItYXBwLWNhcGFibGVcIiBjb250ZW50PVwieWVzXCI+XG4gICAgICA8bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIj5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjNTM2ODc4XCI+XG4gICAgICA8bWV0YSBodHRwRXF1aXY9XCJ4LXVhLWNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiIC8+XG4gICAgICA8bGluayByZWw9J2Zhdmljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgICBocmVmPScvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjEuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnXG4gICAgICAgICAgcmVsPSdzdHlsZXNoZWV0J1xuICAgICAgICAvPlxuICAgICAgJHtoZWFkfVxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEsbWF4aW11bS1zY2FsZT0xLHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICR7c2NyaXB0c1xuICAgICAgICAubWFwKHNjcmlwdCA9PiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGFzPVwic2NyaXB0XCIgaHJlZj1cIiR7c2NyaXB0fVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfVxuICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL3NpdGUud2VibWFuaWZlc3RcIiAvPlxuICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9Jy9mYXZpY29uLnBuZycgLz5cbiAgICAgICR7c3R5bGV9XG4gICAgPC9oZWFkPlxuICAgIDxib2R5ICR7Ym9keUF0dHJzfT5cbiAgICA8ZGl2IGlkPVwiYXBwXCI+JHtjaGlsZHJlbn08L2Rpdj5cbiAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fU0VDUkVUU19fID0gICR7c2VyaWFsaXplKHNlY3JldHMsIHtcbiAgICAgICAgaXNKU09OOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICA8L3NjcmlwdD5cbiAgICAgIDxzY3JpcHQ+XG4gICAgICB3aW5kb3cuX19JTklUSUFMX1NUQVRFX18gPSAke3NlcmlhbGl6ZShkYXRhLCB7XG4gICAgICAgIGlzSlNPTjogdHJ1ZSxcbiAgICAgIH0pfTwvc2NyaXB0PlxuICAgICAgJHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gYDxzY3JpcHQgc3JjPVwiJHtzY3JpcHR9XCIgPjwvc2NyaXB0PmApLmpvaW4oJycpfVxuICAgICAgPC9ib2R5PlxuICA8L2h0bWw+YDtcbiAgfVxufTtcbiIsImltcG9ydCBzdG9yZSBmcm9tICdAY29tbW9uL3N0b3JlJztcbmltcG9ydCB7IFNlcnZlclN0eWxlU2hlZXQsIFN0eWxlU2hlZXRNYW5hZ2VyIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgeyBtYXRjaFBhdGgsIFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IExvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnQGNvbW1vbi9yb3V0ZXMnO1xuaW1wb3J0IHsgYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBBcHAgZnJvbSAnQGNvbW1vbi9BcHAnO1xuaW1wb3J0IHsgZ2V0QnVuZGxlcyB9IGZyb20gJ3JlYWN0LWxvYWRhYmxlL3dlYnBhY2snO1xuaW1wb3J0IG1pbWUgZnJvbSAnbWltZS10eXBlcyc7XG5pbXBvcnQgeyBJQ2h1bmssIElFcnJvciwgSVJvdXRlckNvbnRleHQgfSBmcm9tICdAc2VydmVyL3R5cGVzJztcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL21pZGRsZXdhcmUvbG9nZ2VyJztcbmltcG9ydCBnZXRCYXNpY1NldHRpbmdzIGZyb20gJy4vbWlkZGxld2FyZS9iYXNpY1NldHRpbmdzJztcbmltcG9ydCBnZXRFeGl0SGFuZGxlciBmcm9tICcuL21pZGRsZXdhcmUvZXhpdEhhbmRsZXInO1xuaW1wb3J0IEhlYWx0aFJvdXRlcyBmcm9tICcuL3JvdXRlcy9oZWFsdGgnO1xuaW1wb3J0IGdldEh0bWwsIHsgSVByb3BzIGFzIElIVE1MUHJvcHMgfSBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGNodW5rcyBmcm9tICcuL2NodW5rLW1hbmlmZXN0Lmpzb24nO1xuaW1wb3J0IGxvYWRhYmxlTW9kdWxlc0pzb24gZnJvbSAnLi9yZWFjdC1sb2FkYWJsZS5qc29uJztcblxuZGVjbGFyZSBjb25zdCBfX0RFVl9fOiBib29sZWFuO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbkxvYWRhYmxlLnByZWxvYWRBbGwoKTtcblxuZ2V0RXhpdEhhbmRsZXIoKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuZ2V0QmFzaWNTZXR0aW5ncyhhcHApO1xuYXBwLnVzZSgnL2hlYWx0aCcsIEhlYWx0aFJvdXRlcyk7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlZ2lzdGVyIE5vZGUuanMgbWlkZGxld2FyZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5hcHAudXNlKFxuICBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJyksIHtcbiAgICBtYXhBZ2U6ICczMGQnLFxuICAgIHNldEhlYWRlcnMocmVzLCBmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICBpZiAobWltZS5sb29rdXAoZmlsZVBhdGgpID09PSAndGV4dC9odG1sJykge1xuICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3B1YmxpYywgbWF4LWFnZT0wJyk7XG4gICAgICB9IGVsc2UgaWYgKG1pbWUubG9va3VwKGZpbGVQYXRoKSA9PT0gJ2ZvbnQvb3BlbnR5cGUnKSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAncHVibGljLCBtYXgtYWdlPTF5cicpO1xuICAgICAgfVxuICAgIH0sXG4gIH0pLFxuKTtcblxuYXBwLmdldCgnL3N3LmpzJywgKF8sIHJlcykgPT4ge1xuICByZXMuc2VuZEZpbGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYy9hc3NldHMvc3cuanMnKSk7XG59KTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpZy1mdW5jdGlvblxuYXBwLmdldCgnKicsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHNhZ2FzOiBHZW5lcmF0b3JbXSA9IFtdO1xuXG4gICAgcm91dGVzLmZvckVhY2gocm91dGUgPT4ge1xuICAgICAgY29uc3QgbWF0Y2ggPSBtYXRjaFBhdGgocmVxLnVybCwgcm91dGUpO1xuICAgICAgaWYgKG1hdGNoICYmIHJvdXRlICYmIHJvdXRlLmxvYWREYXRhKSB7XG4gICAgICAgIHNhZ2FzLnB1c2gocm91dGUubG9hZERhdGEoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBzdG9yZS5ydW5TYWdhKGZ1bmN0aW9uKigpOiBHZW5lcmF0b3Ige1xuICAgICAgeWllbGQgYWxsKFtzYWdhc10pO1xuICAgIH0pLmRvbmU7XG4gICAgY29uc3Qgc2NyaXB0cyA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBodG1sRGF0YTogSUhUTUxQcm9wcyA9IHtcbiAgICAgIGhlYWQ6ICcnLFxuICAgICAgc3R5bGU6ICcnLFxuICAgICAgc2NyaXB0czogW10sXG4gICAgICBjaGlsZHJlbjogJycsXG4gICAgICBzZWNyZXRzOiB7fSxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBib2R5QXR0cnM6ICcnXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbnRleHQ6IElSb3V0ZXJDb250ZXh0ID0ge307XG4gICAgY29uc3Qgc2hlZXQgPSBuZXcgU2VydmVyU3R5bGVTaGVldCgpO1xuICAgIGNvbnN0IG1vZHVsZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgYWRkQ2h1bmsgPSAoY2h1bmtOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICgoY2h1bmtzIGFzIElDaHVuaylbY2h1bmtOYW1lXSkge1xuICAgICAgICBjaHVua3NbY2h1bmtOYW1lXS5mb3JFYWNoKChhc3NldDogc3RyaW5nKSA9PiBzY3JpcHRzLmFkZChhc3NldCkpO1xuICAgICAgfSBlbHNlIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2h1bmsgd2l0aCBuYW1lICcke2NodW5rTmFtZX0nIGNhbm5vdCBiZSBmb3VuZGApO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2V0TW9kdWxlcyA9IChtb2R1bGVOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBtb2R1bGVzLnB1c2gobW9kdWxlTmFtZSk7XG4gICAgfTtcbiAgICBodG1sRGF0YS5jaGlsZHJlbiA9IFJlYWN0RE9NLnJlbmRlclRvU3RyaW5nKFxuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgIDxMb2FkYWJsZS5DYXB0dXJlIHJlcG9ydD17Z2V0TW9kdWxlc30+XG4gICAgICAgICAgPFN0eWxlU2hlZXRNYW5hZ2VyIHNoZWV0PXtzaGVldC5pbnN0YW5jZX0+XG4gICAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgPC9TdHlsZVNoZWV0TWFuYWdlcj5cbiAgICAgICAgPC9Mb2FkYWJsZS5DYXB0dXJlPlxuICAgICAgPC9Qcm92aWRlcj4sXG4gICAgKTtcblxuICAgIGlmIChjb250ZXh0LnN0YXR1cyA9PT0gMzAxIHx8IGNvbnRleHQuc3RhdHVzID09PSAzMDIpIHtcbiAgICAgIHJldHVybiByZXMucmVkaXJlY3QoY29udGV4dC5zdGF0dXMsIGNvbnRleHQudXJsIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgaHRtbERhdGEuaGVhZCA9IGBcbiAgICAke0hlbG1ldC5yZW5kZXJTdGF0aWMoKS50aXRsZS50b1N0cmluZygpfVxuICAgICR7SGVsbWV0LnJlbmRlclN0YXRpYygpLm1ldGEudG9TdHJpbmcoKX1cbiAgICBgO1xuXG4gICAgaHRtbERhdGEuYm9keUF0dHJzID0gSGVsbWV0LnJlbmRlclN0YXRpYygpLmJvZHlBdHRyaWJ1dGVzLnRvU3RyaW5nKCk7XG5cbiAgICBodG1sRGF0YS5zdHlsZSA9IHNoZWV0LmdldFN0eWxlVGFncygpO1xuXG4gICAgaHRtbERhdGEuc2VjcmV0cyA9IHtcbiAgICAgIEVOVjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYsXG4gICAgfTtcblxuICAgIGFkZENodW5rKCdjbGllbnQnKTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBjb25zdCBidW5kbGVzID0gZ2V0QnVuZGxlcyhsb2FkYWJsZU1vZHVsZXNKc29uIGFzIGFueSwgbW9kdWxlcyk7XG5cbiAgICBsb2dnZXIuaW5mbyhgQnVuZGxlcyBjcmVhdGVkYCk7XG5cbiAgICBidW5kbGVzLmZvckVhY2goYnVuZGxlID0+IHtcbiAgICAgIHNjcmlwdHMuYWRkKGJ1bmRsZS5wdWJsaWNQYXRoKTtcbiAgICB9KTtcblxuICAgIGh0bWxEYXRhLmRhdGEgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgIGh0bWxEYXRhLnNjcmlwdHMgPSBbLi4uKEFycmF5LmZyb20oc2NyaXB0cykgYXMgc3RyaW5nW10pXTtcblxuICAgIGNvbnN0IGh0bWwgPSBnZXRIdG1sKGh0bWxEYXRhKTtcblxuICAgIHJlcy5zdGF0dXMoY29udGV4dC5zdGF0dXMgfHwgMjAwKTtcbiAgICByZXMuc2VuZChgPCFkb2N0eXBlIGh0bWw+JHtodG1sfWApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBuZXh0KGVycik7XG4gIH1cbn0pO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFcnJvciBoYW5kbGluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmFwcC51c2UoXG4gIChcbiAgICBlcnI6IElFcnJvcixcbiAgICBfcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICAgIF9uZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbiAgKSA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGVycik7XG5cbiAgICBjb25zdCBodG1sRGF0YSA9IHtcbiAgICAgIGhlYWQ6IGBcbiAgICA8dGl0bGU+JHtlcnIubWVzc2FnZX08L3RpdGxlPlxuICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiPkVycm9yPC9tZXRhPlxuICBgLFxuICAgICAgc3R5bGU6ICcnLFxuICAgICAgc2NyaXB0czogW10sXG4gICAgICBzZWNyZXRzOiB7fSxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBub1NjcmlwdEZvckdUQTogJycsXG4gICAgICBzY3JpcHRGb3JHVEE6ICcnLFxuICAgICAgYm9keUF0dHJpYnV0ZXM6ICcnLFxuICAgICAgYm9keUF0dHJzOiAnJyxcbiAgICAgIGNoaWxkcmVuOiBSZWFjdERPTS5yZW5kZXJUb1N0cmluZyg8PjwvPiksXG4gICAgfTtcbiAgICBjb25zdCBodG1sID0gZ2V0SHRtbChodG1sRGF0YSk7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbiAgfSxcbik7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExhdW5jaCB0aGUgc2VydmVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlmICghbW9kdWxlLmhvdCkge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGNvbnN0IHBvcnQgPSAocHJvY2Vzcy5lbnYgYXMgYW55KS5QT1JUO1xuICBMb2FkYWJsZS5wcmVsb2FkQWxsKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBhcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFRoZSBzZXJ2ZXIgaXMgcnVubmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vYCk7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xufVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlmIChtb2R1bGUuaG90KSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICBhcHBbJ2hvdCddID0gbW9kdWxlLmhvdDtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vaW5kZXgnLCAoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ2hvdCByZWxvYWRpbmcuLi4nKTtcbiAgfSk7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtZmlsZS1saW5lLWNvdW50XG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBjb3JlIGZyb20gJ2V4cHJlc3Mtc2VydmUtc3RhdGljLWNvcmUnO1xuXG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcDogY29yZS5FeHByZXNzKSA9PiB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICBnbG9iYWxbJ25hdmlnYXRvciddID0gZ2xvYmFsWyduYXZpZ2F0b3InXSB8fCB7fTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gIGdsb2JhbFsnbmF2aWdhdG9yJ10udXNlckFnZW50ID0gZ2xvYmFsWyduYXZpZ2F0b3InXS51c2VyQWdlbnQgfHwgJ2FsbCc7XG4gIGNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnO1xuICBpZiAoaXNQcm9kKSB7XG4gICAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgICBhcHAudXNlKGxvZ2dlci5nZXRSZXF1ZXN0TG9nZ2VyKTtcbiAgfVxuXG4gIGFwcC51c2UoY29tcHJlc3Npb24oKSk7XG4gIGFwcC51c2UoaGVsbWV0KCkpO1xuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgZnVuY3Rpb24gZXhpdEhhbmRsZXIob3B0aW9uczogYW55LCBlcnI6IGFueSk6IHZvaWQge1xuICAgIGlmIChvcHRpb25zLmNsZWFudXApIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdjbGVhbicpO1xuICAgIH1cbiAgICBpZiAoZXJyKSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShlcnIuc3RhY2spO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5leGl0KSB7XG4gICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzLm9uKCdleGl0JywgZXhpdEhhbmRsZXIuYmluZChudWxsLCB7IGNsZWFudXA6IHRydWUgfSkpO1xuXG4gIHByb2Nlc3Mub24oJ1NJR0lOVCcsIGV4aXRIYW5kbGVyLmJpbmQobnVsbCwgeyBleGl0OiB0cnVlIH0pKTtcbiAgcHJvY2Vzcy5vbignU0lHVVNSMScsIGV4aXRIYW5kbGVyLmJpbmQobnVsbCwgeyBleGl0OiB0cnVlIH0pKTtcbiAgcHJvY2Vzcy5vbignU0lHVVNSMicsIGV4aXRIYW5kbGVyLmJpbmQobnVsbCwgeyBleGl0OiB0cnVlIH0pKTtcblxuICBwcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGV4aXRIYW5kbGVyLmJpbmQobnVsbCwgeyBleGl0OiB0cnVlIH0pKTtcbn07XG4iLCJpbXBvcnQgYnVueWFuLCB7IExvZ2dlck9wdGlvbnMgfSBmcm9tICdidW55YW4nO1xuaW1wb3J0IGxvZyBmcm9tICdleHByZXNzLWJ1bnlhbi1sb2dnZXInO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUN1c3RvbUJ1bnlhbiBleHRlbmRzIGJ1bnlhbiB7XG4gIGdldFJlcXVlc3RMb2dnZXI6IGV4cHJlc3MuUmVxdWVzdEhhbmRsZXI7XG4gIGdldEJhc2ljTG9nZ2VyKG5hbWU6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgbmFtZTogJ3B1enpsZScsXG4gIHN0cmVhbXM6IFtcbiAgICB7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgcGF0aDogJ2xvZ3MvcHV6emxlLWdhbWUtdWktZGV2LW91dC1hcHAubG9nJ1xuICAgIH0sXG4gICAge1xuICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICBwYXRoOiAnbG9ncy9wdXp6bGUtZ2FtZS11aS1kZXYtZXJyb3ItYXBwLmxvZydcbiAgICB9XG4gIF1cbn07XG5jb25zdCBsb2dnZXIgPSBidW55YW4uY3JlYXRlTG9nZ2VyKGNvbmZpZyBhcyBMb2dnZXJPcHRpb25zKSBhcyBJQ3VzdG9tQnVueWFuO1xuXG5sb2dnZXIuZ2V0QmFzaWNMb2dnZXIgPSAobmFtZSA9ICdpbml0JykgPT4ge1xuICByZXR1cm4gYnVueWFuLmNyZWF0ZUxvZ2dlcih7IG5hbWUgfSk7XG59O1xuXG5sb2dnZXIuZ2V0UmVxdWVzdExvZ2dlciA9IGxvZyh7XG4gIGV4Y2x1ZGVzOiBbJ3VzZXItYWdlbnQnLCAncmVzLWhlYWRlcnMnLCAncmVzJywgJ3JlcScsICdib2R5J10sXG4gIG9iZnVzY2F0ZTogWydib2R5LnBhc3N3b3JkJywgJ2JvZHkuY29uZmlybVBhc3N3b3JkJ11cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JlIGZyb20gJ2V4cHJlc3Mtc2VydmUtc3RhdGljLWNvcmUnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIucm91dGUoJy8nKS5nZXQoKF86IGNvcmUuUmVxdWVzdCwgcmVzOiBjb3JlLlJlc3BvbnNlKSA9PiB7XG4gIHJldHVybiByZXMuc2VuZFN0YXR1cygyMDApO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidW55YW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29tcHJlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWJ1bnlhbi1sb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1pbWUtdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtbG9hZGFibGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtbG9hZGFibGUvd2VicGFja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VyaWFsaXplLWphdmFzY3JpcHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy8wQkE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOzs7Ozs7OztBQzFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBOzs7Ozs7O0FBT0E7Ozs7O0FBS0E7OztBQUdBOzs7Ozs7O0FBZkE7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDQTs7OztBQUlBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXREQTs7Ozs7Ozs7QUNIQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4SUFBQTtBQUZBO0FBQUE7QUFBQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBOzs7Ozs7OztBQ2xCQTtBQUFBO0FBRUE7QUFDQTtBQURBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BOzs7Ozs7OztBQ1ZBO0FBQUE7QUFDQTtBQURBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBY0E7QUFDQTtBQUNBO0FBS0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDakVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUlBO0FBQ0E7QUFEQTtBQUtBOzs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxDQTs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBLGVBcURBO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBOztBQUVBOzs7QUFLQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFEQTs7O0FBS0E7QUFDQTtBQURBO0FBR0E7O0FBaENBO0FBbUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUVBO0FBRUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXpGQTtBQUFBO0FBQUE7QUFBQTtBQTBGQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBOztBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBLGFBWUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFQQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7Ozs7OztBQ2pDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=