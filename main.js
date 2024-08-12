'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ExtractHighlightsPluginSettings = /** @class */ (function () {
    function ExtractHighlightsPluginSettings() {
        this.headlineText = "";
        this.addFootnotes = false;
        this.useBoldForHighlights = false;
        this.createLinks = false;
        this.addInnerLinks = false;
        this.autoCapitalize = false;
        this.createNewFile = false;
        this.explodeIntoNotes = false;
        this.openExplodedNotes = false;
        this.createContextualQuotes = false;
    }
    return ExtractHighlightsPluginSettings;
}());

var ExtractHighlightsPluginSettingsTab = /** @class */ (function (_super) {
    __extends(ExtractHighlightsPluginSettingsTab, _super);
    function ExtractHighlightsPluginSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    ExtractHighlightsPluginSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Extract Highlights Plugin" });
        new obsidian.Setting(containerEl)
            .setName("Heading Text")
            .setDesc("If set, will add `## Your Text`. Use $NOTE_TITLE to include title. Leave blank to omit. ")
            .addText(function (text) {
            return text
                .setPlaceholder("Highlights for $NOTE_TITLE")
                .setValue(_this.plugin.settings.headlineText)
                .onChange(function (value) {
                _this.plugin.settings.headlineText = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Use bold for highlights')
            .setDesc('If enabled, will include classic markdown bold (**) sections as highlights')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.useBoldForHighlights).onChange(function (value) {
                _this.plugin.settings.useBoldForHighlights = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Enable Footnotes')
            .setDesc('If enabled, will add a footnote to the current document to each highlight in your list. Useful when you wan to keep track of which highlight came from which source file.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.addFootnotes).onChange(function (value) {
                _this.plugin.settings.addFootnotes = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Auto-capitalize first letter')
            .setDesc('If enabled, capitalizes the first letter of each highlight.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.autoCapitalize).onChange(function (value) {
                _this.plugin.settings.autoCapitalize = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Create links')
            .setDesc('If enabled, will turn each highlight into a [[ link ]] to create a highlight MOC')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.createLinks).onChange(function (value) {
                _this.plugin.settings.createLinks = value;
                // disable explode notes mode
                if (_this.plugin.settings.explodeIntoNotes && value == false) {
                    _this.plugin.settings.explodeIntoNotes = false;
                    _this.plugin.settings.openExplodedNotes = false;
                }
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Add inner links')
            .setDesc('If enabled, will add a bookmark to each highlight and link back to the MOC')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.addInnerLinks).onChange(function (value) {
                _this.plugin.settings.addInnerLinks = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Open new file with highlights')
            .setDesc('If enabled, opens a new file with the highlights copied into.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.createNewFile).onChange(function (value) {
                _this.plugin.settings.createNewFile = value;
                // disable explode notes mode
                if (_this.plugin.settings.explodeIntoNotes && value == false) {
                    _this.plugin.settings.explodeIntoNotes = false;
                    _this.plugin.settings.openExplodedNotes = false;
                }
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        containerEl.createEl("h2", { text: "💥 Explode Notes Mode 💥" });
        containerEl.createEl("p", { text: "A secret mode that will take your highlighting to the next level. Only available if you have  'Create Links' and 'Create new File' enabled. After enabling both, close this window and open again to see options." });
        if (this.plugin.settings.createLinks && this.plugin.settings.createNewFile) {
            new obsidian.Setting(containerEl)
                .setName('Explode links into notes')
                .setDesc('If enabled, will turn each highlight into a note with the highlighted text as quote and a backlink to the MOC and source-file. Very powerful but use with caution!')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.explodeIntoNotes).onChange(function (value) {
                    _this.plugin.settings.explodeIntoNotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
            new obsidian.Setting(containerEl)
                .setName('Open exploded notes on creation')
                .setDesc('If enabled, will open each of your exploded notes when you create them. Fun and useful to continue working in your highlight-notes right away!')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.openExplodedNotes).onChange(function (value) {
                    _this.plugin.settings.openExplodedNotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
            new obsidian.Setting(containerEl)
                .setName('Create contextual quotes')
                .setDesc('If enabled, will quote the full line of your highlight, not just the highlight itself. Useful for keeping the context of your highlight.')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.createContextualQuotes).onChange(function (value) {
                    _this.plugin.settings.createContextualQuotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
        }
    };
    return ExtractHighlightsPluginSettingsTab;
}(obsidian.PluginSettingTab));

var ToggleHighlight = /** @class */ (function () {
    function ToggleHighlight() {
    }
    ToggleHighlight.prototype.toggleHighlight = function (s, ch) {
        if (s == "")
            return "";
        if (s.indexOf(".") < 0) {
            return "==" + s + "==";
        }
        var left = s.substring(0, ch);
        var right = s.substring(ch);
        var marked = left + "$CURSOR$" + right;
        // https://regex101.com/r/BSpvV6/7
        // https://stackoverflow.com/a/5553924
        var p = marked.match(/(==(.*?)==)|[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/gm);
        var np = new Array();
        if (p.length > 0) {
            p.forEach(function (part) {
                if (typeof part !== 'undefined') {
                    if (part.trim() == "") {
                        return;
                    }
                    if (part.includes("$CURSOR$")) {
                        if (part.startsWith("==") && part.endsWith("==")) {
                            part = part.replace(/==/g, "");
                        }
                        else {
                            part = "==" + part + "==";
                        }
                        part = part.replace("$CURSOR$", "");
                        part = part.trim();
                    }
                    part = part.trim();
                    np.push(part);
                }
            });
            return np.join(" ");
        }
    };
    return ToggleHighlight;
}());

obsidian.addIcon('target', '<path d="M50 88C29.0132 88 12 70.9868 12 50C12 29.0132 29.0132 12 50 12C70.9868 12 88 29.0132 88 50C87.9761 70.9769 70.9769 87.9761 50 88ZM50 22.8571C35.0094 22.8571 22.8571 35.0094 22.8571 50C22.8571 64.9906 35.0094 77.1429 50 77.1429C64.9906 77.1429 77.1429 64.9906 77.1429 50C77.1429 35.0094 64.9906 22.8571 50 22.8571ZM50 66.2857C41.0056 66.2857 33.7143 58.9943 33.7143 50C33.7143 41.0056 41.0056 33.7143 50 33.7143C58.9943 33.7143 66.2857 41.0056 66.2857 50C66.2857 54.3192 64.5699 58.4616 61.5157 61.5157C58.4616 64.5699 54.3192 66.2857 50 66.2857Z" fill="#646464"/>');
var ExtractHighlightsPlugin = /** @class */ (function (_super) {
    __extends(ExtractHighlightsPlugin, _super);
    function ExtractHighlightsPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtractHighlightsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.counter = 0;
                this.loadSettings();
                this.addSettingTab(new ExtractHighlightsPluginSettingsTab(this.app, this));
                this.statusBar = this.addStatusBarItem();
                this.addRibbonIcon('target', 'Extract Highlights', function () {
                    _this.extractHighlights();
                });
                this.addCommand({
                    id: "shortcut-extract-highlights",
                    name: "Shortcut for extracting highlights",
                    callback: function () { return _this.extractHighlights(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "±",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-highlight-sentence",
                    name: "Shortcut for highlighting sentence cursor is in",
                    callback: function () { return _this.createHighlight(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "—",
                        },
                    ],
                });
                return [2 /*return*/];
            });
        });
    };
    ExtractHighlightsPlugin.prototype.loadSettings = function () {
        var _this = this;
        this.settings = new ExtractHighlightsPluginSettings();
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var loadedSettings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _a.sent();
                        if (loadedSettings) {
                            // console.log("Found existing settings file");
                            this.settings.headlineText = loadedSettings.headlineText;
                            this.settings.addFootnotes = loadedSettings.addFootnotes;
                            this.settings.createLinks = loadedSettings.createLinks;
                            this.settings.addInnerLinks = loadedSettings.addInnerLinks;
                            this.settings.autoCapitalize = loadedSettings.autoCapitalize;
                            this.settings.createNewFile = loadedSettings.createNewFile;
                            this.settings.explodeIntoNotes = loadedSettings.explodeIntoNotes;
                            this.settings.openExplodedNotes = loadedSettings.openExplodedNotes;
                            this.settings.createContextualQuotes = loadedSettings.createContextualQuotes;
                        }
                        else {
                            // console.log("No settings file found, saving...");
                            this.saveData(this.settings);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    ExtractHighlightsPlugin.prototype.extractHighlights = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var activeLeaf, name, processResults, highlightsText, highlights, baseNames, contexts, saveStatus, newBasenameMOC, i, content, newBasename, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        activeLeaf = (_a = this.app.workspace.activeLeaf) !== null && _a !== void 0 ? _a : null;
                        name = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view.file.basename;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 12, , 13]);
                        if (!((_b = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view) === null || _b === void 0 ? void 0 : _b.data)) return [3 /*break*/, 10];
                        processResults = this.processHighlights(activeLeaf.view);
                        this.processAddBookmarks();
                        highlightsText = processResults.markdown;
                        highlights = processResults.highlights;
                        baseNames = processResults.baseNames;
                        contexts = processResults.contexts;
                        saveStatus = this.saveToClipboard(highlightsText);
                        new obsidian.Notice(saveStatus);
                        newBasenameMOC = "Highlights for " + name + ".md";
                        if (!this.settings.createNewFile) return [3 /*break*/, 4];
                        // Add link back to Original
                        highlightsText += "## Source\n- [[".concat(name, "]]");
                        return [4 /*yield*/, this.saveToFile(newBasenameMOC, highlightsText)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.app.workspace.openLinkText(newBasenameMOC, newBasenameMOC, true)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!(this.settings.createNewFile && this.settings.createLinks && this.settings.explodeIntoNotes)) return [3 /*break*/, 9];
                        i = 0;
                        _c.label = 5;
                    case 5:
                        if (!(i < baseNames.length)) return [3 /*break*/, 9];
                        content = "";
                        // add highlight as quote
                        content += "## Source\n";
                        if (this.settings.createContextualQuotes) {
                            // context quote
                            content += "> ".concat(contexts[i], "[^1]");
                        }
                        else {
                            // regular highlight quote
                            content += "> ".concat(highlights[i], "[^1]");
                        }
                        content += "\n\n";
                        content += "[^1]: [[".concat(name, "]]");
                        content += "\n";
                        newBasename = baseNames[i] + ".md";
                        return [4 /*yield*/, this.saveToFile(newBasename, content)];
                    case 6:
                        _c.sent();
                        if (!this.settings.openExplodedNotes) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.app.workspace.openLinkText(newBasename, newBasename, true)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        new obsidian.Notice("No highlights to extract.");
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        e_1 = _c.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ExtractHighlightsPlugin.prototype.saveToFile = function (filePath, mdString) {
        return __awaiter(this, void 0, void 0, function () {
            var fileExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(filePath)];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) return [3 /*break*/, 2];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.app.vault.create(filePath, mdString)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExtractHighlightsPlugin.prototype.insertAt = function (str, index, fragment) {
        if (index > str.length) {
            return str + fragment;
        }
        return str.substring(0, index) + fragment + str.substring(index);
    };
    ExtractHighlightsPlugin.prototype.processAddBookmarks = function () {
        var view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (view) {
            var bookmarkIndex = 0;
            var lineCounter = 0;
            if (this.settings.addInnerLinks) {
                var re = /(==|<\/mark>)/g;
                var regBookmark = / \^highlight\d+/g;
                var fullText = view.editor.getValue();
                var lines = fullText.split("\n");
                var match1 = void 0;
                lineCounter = 0;
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    // remove all old bookmarks from all lines
                    var match2 = regBookmark.exec(line);
                    if (match2) {
                        view.editor.replaceRange("", { line: lineCounter, ch: match2.index }, { line: lineCounter, ch: match2.index + match2[0].length });
                    }
                    lineCounter++;
                }
                lineCounter = 0;
                fullText = view.editor.getValue();
                lines = fullText.split("\n");
                for (var _a = 0, lines_2 = lines; _a < lines_2.length; _a++) {
                    var line = lines_2[_a];
                    // add new bookmarks to the end of the text blocks
                    while ((match1 = re.exec(line)) !== null) {
                        bookmarkIndex++;
                        var lastBlockLine = lineCounter;
                        for (var i = lineCounter; i < lines.length; i++) {
                            if (lines[i] == "") {
                                lastBlockLine = i - 1;
                                break;
                            }
                        }
                        console.log('lineCounter, match1.index :>> ', lineCounter, match1.index);
                        view.editor.replaceRange(" ^highlight".concat(bookmarkIndex), { line: lastBlockLine, ch: lines[lastBlockLine].length }, { line: lastBlockLine, ch: lines[lastBlockLine].length });
                    }
                    lineCounter++;
                }
            }
        }
        return true;
    };
    ExtractHighlightsPlugin.prototype.processHighlights = function (view) {
        var currentFile = this.app.workspace.getActiveFile();
        var re;
        if (this.settings.useBoldForHighlights) {
            re = /(==|\<mark.*?\>|\*\*)([\s\S]*?)(==|\<\/mark\>|\*\*)/g;
        }
        else {
            re = /(==|\<mark.*?\>)([\s\S]*?)(==|\<\/mark\>)/g;
        }
        var markdownText = view.data;
        var basename = view.file.basename;
        var matches = markdownText.match(re);
        this.counter += 1;
        var result = "";
        var highlights = [];
        var baseNames = [];
        var contexts = [];
        var lines = markdownText.split("\n");
        var cleanedLines = [];
        for (var i = 0; i < lines.length; i++) {
            if (!(lines[i] == "")) {
                cleanedLines.push(lines[i]);
            }
        }
        if (matches != null) {
            var bookmarkIndex = 0;
            if (this.settings.headlineText != "") {
                var text = this.settings.headlineText.replace(/\$NOTE_TITLE/, "".concat(basename));
                result += "### ".concat(text, "\n\n");
            }
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var entry = matches_1[_i];
                bookmarkIndex++;
                // Keep surrounding paragraph for context
                if (this.settings.createContextualQuotes) {
                    for (var i = 0; i < cleanedLines.length; i++) {
                        var match = cleanedLines[i].match(entry);
                        if (!(match == null) && match.length > 0) {
                            var val = cleanedLines[i];
                            if (!contexts.contains(val)) {
                                contexts.push(val);
                            }
                        }
                    }
                }
                // Clean up highlighting match
                var removeNewline = entry.replace(/\n/g, " ");
                var removeHighlightStart = removeNewline.replace(/==/g, "");
                var removeHighlightEnd = removeHighlightStart.replace(/\<mark.*?\>/g, "");
                var removeMarkClosing = removeHighlightEnd.replace(/\<\/mark\>/g, "");
                var removeBold = removeMarkClosing.replace(/\*\*/g, "");
                var removeDoubleSpaces = removeBold.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.trim();
                if (this.settings.autoCapitalize) {
                    if (removeDoubleSpaces != null) {
                        removeDoubleSpaces = this.capitalizeFirstLetter(removeDoubleSpaces);
                    }
                }
                result += "- ";
                if (this.settings.createLinks) {
                    // First, sanitize highlight to be used as a file-link
                    // * " \ / | < > : ?
                    var sanitized = removeDoubleSpaces.replace(/\*|\"|\\|\/|\<|\>|\:|\?|\|/gm, "");
                    sanitized = sanitized.trim();
                    var baseName = sanitized;
                    if (baseName.length > 100) {
                        baseName = baseName.substr(0, 99);
                        baseName += "...";
                    }
                    result += "[[" + baseName + "]]";
                    highlights.push(sanitized);
                    baseNames.push(baseName);
                }
                else {
                    result += removeDoubleSpaces;
                    highlights.push(removeDoubleSpaces);
                }
                if (this.settings.addFootnotes) {
                    result += "[^".concat(this.counter, "]");
                }
                if (this.settings.addInnerLinks) {
                    var currentLink = this.app.fileManager.generateMarkdownLink(currentFile, '.', "#^highlight".concat(bookmarkIndex), '(link to text)');
                    result += currentLink;
                }
                result += "\n";
            }
            if (this.settings.addFootnotes) {
                result += "\n";
                result += "[^".concat(this.counter, "]: [[").concat(basename, "]]\n");
            }
            result += "\n";
        }
        return { markdown: result, baseNames: baseNames, highlights: highlights, contexts: contexts };
    };
    ExtractHighlightsPlugin.prototype.saveToClipboard = function (data) {
        if (data.length > 0) {
            navigator.clipboard.writeText(data);
            return "Highlights copied to clipboard!";
        }
        else {
            return "No highlights found";
        }
    };
    ExtractHighlightsPlugin.prototype.createHighlight = function () {
        var mdView = this.app.workspace.activeLeaf.view;
        var doc = mdView.sourceMode.cmEditor;
        this.editor = doc;
        var cursorPosition = this.editor.getCursor();
        var lineText = this.editor.getLine(cursorPosition.line);
        // use our fancy class to figure this out
        var th = new ToggleHighlight();
        var result = th.toggleHighlight(lineText, cursorPosition.ch);
        // catch up on cursor
        var cursorDifference = -2;
        if (result.length > lineText.length) {
            cursorDifference = 2;
        }
        this.editor.replaceRange(result, { line: cursorPosition.line, ch: 0 }, { line: cursorPosition.line, ch: lineText.length });
        this.editor.setCursor({ line: cursorPosition.line, ch: cursorPosition.ch + cursorDifference });
    };
    ExtractHighlightsPlugin.prototype.capitalizeFirstLetter = function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    return ExtractHighlightsPlugin;
}(obsidian.Plugin));

module.exports = ExtractHighlightsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvVG9nZ2xlSGlnaGxpZ2h0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyB7XG4gIHB1YmxpYyBoZWFkbGluZVRleHQ6IHN0cmluZztcbiAgcHVibGljIGFkZEZvb3Rub3RlczogYm9vbGVhbjtcbiAgcHVibGljIHVzZUJvbGRGb3JIaWdobGlnaHRzOiBib29sZWFuO1xuICBwdWJsaWMgY3JlYXRlTGlua3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhZGRJbm5lckxpbmtzOiBib29sZWFuO1xuICBwdWJsaWMgYXV0b0NhcGl0YWxpemU6IGJvb2xlYW47XG4gIHB1YmxpYyBjcmVhdGVOZXdGaWxlOiBib29sZWFuO1xuICBwdWJsaWMgZXhwbG9kZUludG9Ob3RlczogYm9vbGVhbjtcbiAgcHVibGljIG9wZW5FeHBsb2RlZE5vdGVzOiBib29sZWFuO1xuICBwdWJsaWMgY3JlYXRlQ29udGV4dHVhbFF1b3RlczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhlYWRsaW5lVGV4dCA9IFwiXCI7XG4gICAgdGhpcy5hZGRGb290bm90ZXMgPSBmYWxzZTtcbiAgICB0aGlzLnVzZUJvbGRGb3JIaWdobGlnaHRzID0gZmFsc2U7XG4gICAgdGhpcy5jcmVhdGVMaW5rcyA9IGZhbHNlO1xuICAgIHRoaXMuYWRkSW5uZXJMaW5rcyA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b0NhcGl0YWxpemUgPSBmYWxzZTtcbiAgICB0aGlzLmNyZWF0ZU5ld0ZpbGUgPSBmYWxzZTtcbiAgICB0aGlzLmV4cGxvZGVJbnRvTm90ZXMgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XG4gICAgdGhpcy5jcmVhdGVDb250ZXh0dWFsUXVvdGVzID0gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7QXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cHJpdmF0ZSByZWFkb25seSBwbHVnaW46IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHRjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHt0ZXh0OiBcIkV4dHJhY3QgSGlnaGxpZ2h0cyBQbHVnaW5cIn0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIkhlYWRpbmcgVGV4dFwiKVxuXHRcdFx0LnNldERlc2MoXCJJZiBzZXQsIHdpbGwgYWRkIGAjIyBZb3VyIFRleHRgLiBVc2UgJE5PVEVfVElUTEUgdG8gaW5jbHVkZSB0aXRsZS4gTGVhdmUgYmxhbmsgdG8gb21pdC4gXCIpXG5cdFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHRcdFx0dGV4dFxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcihcIkhpZ2hsaWdodHMgZm9yICROT1RFX1RJVExFXCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRsaW5lVGV4dClcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkbGluZVRleHQgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1VzZSBib2xkIGZvciBoaWdobGlnaHRzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBpbmNsdWRlIGNsYXNzaWMgbWFya2Rvd24gYm9sZCAoKiopIHNlY3Rpb25zIGFzIGhpZ2hsaWdodHMnLFxuXHRcdFx0KVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQm9sZEZvckhpZ2hsaWdodHMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0VuYWJsZSBGb290bm90ZXMnKVxuXHRcdFx0LnNldERlc2MoXG5cdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIGFkZCBhIGZvb3Rub3RlIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50IHRvIGVhY2ggaGlnaGxpZ2h0IGluIHlvdXIgbGlzdC4gVXNlZnVsIHdoZW4geW91IHdhbiB0byBrZWVwIHRyYWNrIG9mIHdoaWNoIGhpZ2hsaWdodCBjYW1lIGZyb20gd2hpY2ggc291cmNlIGZpbGUuJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkRm9vdG5vdGVzID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdBdXRvLWNhcGl0YWxpemUgZmlyc3QgbGV0dGVyJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgY2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIGhpZ2hsaWdodC4nLFxuXHRcdFx0KVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b0NhcGl0YWxpemUpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9DYXBpdGFsaXplID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0NyZWF0ZSBsaW5rcycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgdHVybiBlYWNoIGhpZ2hsaWdodCBpbnRvIGEgW1sgbGluayBdXSB0byBjcmVhdGUgYSBoaWdobGlnaHQgTU9DJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZUxpbmtzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcyA9IHZhbHVlO1xuXG5cdFx0XHRcdFx0Ly8gZGlzYWJsZSBleHBsb2RlIG5vdGVzIG1vZGVcblx0XHRcdFx0XHRpZih0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzICYmIHZhbHVlID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3RlcyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQWRkIGlubmVyIGxpbmtzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBhZGQgYSBib29rbWFyayB0byBlYWNoIGhpZ2hsaWdodCBhbmQgbGluayBiYWNrIHRvIHRoZSBNT0MnLFxuXHRcdFx0KVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkSW5uZXJMaW5rcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkSW5uZXJMaW5rcyA9IHZhbHVlO1xuXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdPcGVuIG5ldyBmaWxlIHdpdGggaGlnaGxpZ2h0cycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIG9wZW5zIGEgbmV3IGZpbGUgd2l0aCB0aGUgaGlnaGxpZ2h0cyBjb3BpZWQgaW50by4nLFxuXHRcdFx0KVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSkub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSA9IHZhbHVlO1xuXG5cdFx0XHRcdFx0Ly8gZGlzYWJsZSBleHBsb2RlIG5vdGVzIG1vZGVcblx0XHRcdFx0XHRpZih0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzICYmIHZhbHVlID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3RlcyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7dGV4dDogXCLwn5KlIEV4cGxvZGUgTm90ZXMgTW9kZSDwn5KlXCJ9KTtcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwge3RleHQ6IFwiQSBzZWNyZXQgbW9kZSB0aGF0IHdpbGwgdGFrZSB5b3VyIGhpZ2hsaWdodGluZyB0byB0aGUgbmV4dCBsZXZlbC4gT25seSBhdmFpbGFibGUgaWYgeW91IGhhdmUgICdDcmVhdGUgTGlua3MnIGFuZCAnQ3JlYXRlIG5ldyBGaWxlJyBlbmFibGVkLiBBZnRlciBlbmFibGluZyBib3RoLCBjbG9zZSB0aGlzIHdpbmRvdyBhbmQgb3BlbiBhZ2FpbiB0byBzZWUgb3B0aW9ucy5cIn0pO1xuXG5cdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSkge1xuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHRcdC5zZXROYW1lKCdFeHBsb2RlIGxpbmtzIGludG8gbm90ZXMnKVxuXHRcdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCB0dXJuIGVhY2ggaGlnaGxpZ2h0IGludG8gYSBub3RlIHdpdGggdGhlIGhpZ2hsaWdodGVkIHRleHQgYXMgcXVvdGUgYW5kIGEgYmFja2xpbmsgdG8gdGhlIE1PQyBhbmQgc291cmNlLWZpbGUuIFZlcnkgcG93ZXJmdWwgYnV0IHVzZSB3aXRoIGNhdXRpb24hJyxcblx0XHRcdFx0KVxuXHRcdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoJ09wZW4gZXhwbG9kZWQgbm90ZXMgb24gY3JlYXRpb24nKVxuXHRcdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBvcGVuIGVhY2ggb2YgeW91ciBleHBsb2RlZCBub3RlcyB3aGVuIHlvdSBjcmVhdGUgdGhlbS4gRnVuIGFuZCB1c2VmdWwgdG8gY29udGludWUgd29ya2luZyBpbiB5b3VyIGhpZ2hsaWdodC1ub3RlcyByaWdodCBhd2F5IScsXG5cdFx0XHRcdClcblx0XHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3Rlcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3RlcyA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoJ0NyZWF0ZSBjb250ZXh0dWFsIHF1b3RlcycpXG5cdFx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHF1b3RlIHRoZSBmdWxsIGxpbmUgb2YgeW91ciBoaWdobGlnaHQsIG5vdCBqdXN0IHRoZSBoaWdobGlnaHQgaXRzZWxmLiBVc2VmdWwgZm9yIGtlZXBpbmcgdGhlIGNvbnRleHQgb2YgeW91ciBoaWdobGlnaHQuJyxcblx0XHRcdFx0KVxuXHRcdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlQ29udGV4dHVhbFF1b3RlcyA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQpO1xuXG5cdFx0fVxuXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVIaWdobGlnaHQge1xuXG4gICAgdG9nZ2xlSGlnaGxpZ2h0KHM6IHN0cmluZywgY2g/OiBudW1iZXIpIHtcbiAgICAgICAgaWYocyA9PSBcIlwiKSByZXR1cm4gXCJcIjtcbiAgICAgICAgaWYocy5pbmRleE9mKFwiLlwiKSA8IDApIHsgcmV0dXJuIFwiPT1cIiArIHMgKyBcIj09XCJ9XG5cbiAgICAgICAgbGV0IGxlZnQgPSBzLnN1YnN0cmluZygwLCBjaCk7XG4gICAgICAgIGxldCByaWdodCA9IHMuc3Vic3RyaW5nKGNoKTtcbiAgICAgICAgbGV0IG1hcmtlZCA9IGxlZnQgKyBcIiRDVVJTT1IkXCIgKyByaWdodDtcblxuICAgICAgICAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL0JTcHZWNi83XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NTUzOTI0XG4gICAgICAgIGxldCBwID0gbWFya2VkLm1hdGNoKC8oPT0oLio/KT09KXxbXi4hP1xcc11bXi4hP10qKD86Wy4hP10oPyFbJ1wiXT9cXHN8JClbXi4hP10qKSpbLiE/XT9bJ1wiXT8oPz1cXHN8JCkvZ20pO1xuXG4gICAgICAgIGxldCBucCA9IG5ldyBBcnJheSgpO1xuXG4gICAgICAgIGlmKHAubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcC5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBhcnQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnRyaW0oKSA9PSBcIlwiKSB7ICByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LmluY2x1ZGVzKFwiJENVUlNPUiRcIikpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFydC5zdGFydHNXaXRoKFwiPT1cIikgJiYgcGFydC5lbmRzV2l0aChcIj09XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQucmVwbGFjZSgvPT0vZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQgPSBcIj09XCIgKyBwYXJ0ICsgXCI9PVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQucmVwbGFjZShcIiRDVVJTT1IkXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgbnAucHVzaChwYXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG5wLmpvaW4oXCIgXCIpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7UGx1Z2luLCBOb3RpY2UsIGFkZEljb24sIFZpZXcsIE1hcmtkb3duVmlldywgV29ya3NwYWNlLCBGaWxlTWFuYWdlcn0gZnJvbSBcIm9ic2lkaWFuXCJcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzIGZyb20gXCIuL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NcIlxuaW1wb3J0IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIgZnJvbSBcIi4vRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5nc1RhYlwiXG5pbXBvcnQgVG9nZ2xlSGlnaGxpZ2h0IGZyb20gXCIuL1RvZ2dsZUhpZ2hsaWdodFwiO1xuXG5hZGRJY29uKCd0YXJnZXQnLCAnPHBhdGggZD1cIk01MCA4OEMyOS4wMTMyIDg4IDEyIDcwLjk4NjggMTIgNTBDMTIgMjkuMDEzMiAyOS4wMTMyIDEyIDUwIDEyQzcwLjk4NjggMTIgODggMjkuMDEzMiA4OCA1MEM4Ny45NzYxIDcwLjk3NjkgNzAuOTc2OSA4Ny45NzYxIDUwIDg4Wk01MCAyMi44NTcxQzM1LjAwOTQgMjIuODU3MSAyMi44NTcxIDM1LjAwOTQgMjIuODU3MSA1MEMyMi44NTcxIDY0Ljk5MDYgMzUuMDA5NCA3Ny4xNDI5IDUwIDc3LjE0MjlDNjQuOTkwNiA3Ny4xNDI5IDc3LjE0MjkgNjQuOTkwNiA3Ny4xNDI5IDUwQzc3LjE0MjkgMzUuMDA5NCA2NC45OTA2IDIyLjg1NzEgNTAgMjIuODU3MVpNNTAgNjYuMjg1N0M0MS4wMDU2IDY2LjI4NTcgMzMuNzE0MyA1OC45OTQzIDMzLjcxNDMgNTBDMzMuNzE0MyA0MS4wMDU2IDQxLjAwNTYgMzMuNzE0MyA1MCAzMy43MTQzQzU4Ljk5NDMgMzMuNzE0MyA2Ni4yODU3IDQxLjAwNTYgNjYuMjg1NyA1MEM2Ni4yODU3IDU0LjMxOTIgNjQuNTY5OSA1OC40NjE2IDYxLjUxNTcgNjEuNTE1N0M1OC40NjE2IDY0LjU2OTkgNTQuMzE5MiA2Ni4yODU3IDUwIDY2LjI4NTdaXCIgZmlsbD1cIiM2NDY0NjRcIi8+JylcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG5cdHB1YmxpYyBzZXR0aW5nczogRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncztcblx0cHVibGljIHN0YXR1c0JhcjogSFRNTEVsZW1lbnRcblx0cHVibGljIGNvdW50ZXI6IDA7XG5cdHByaXZhdGUgZWRpdG9yOiBDb2RlTWlycm9yLkVkaXRvcjtcblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0dGhpcy5jb3VudGVyID0gMDtcblx0XHR0aGlzLmxvYWRTZXR0aW5ncygpO1xuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG5cdFx0dGhpcy5zdGF0dXNCYXIgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKVxuXG5cdFx0dGhpcy5hZGRSaWJib25JY29uKCd0YXJnZXQnLCAnRXh0cmFjdCBIaWdobGlnaHRzJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5leHRyYWN0SGlnaGxpZ2h0cygpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiBcInNob3J0Y3V0LWV4dHJhY3QtaGlnaGxpZ2h0c1wiLFxuXHRcdFx0bmFtZTogXCJTaG9ydGN1dCBmb3IgZXh0cmFjdGluZyBoaWdobGlnaHRzXCIsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5leHRyYWN0SGlnaGxpZ2h0cygpLFxuXHRcdFx0aG90a2V5czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bW9kaWZpZXJzOiBbXCJBbHRcIiwgXCJTaGlmdFwiXSxcblx0XHRcdFx0XHRrZXk6IFwiwrFcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwic2hvcnRjdXQtaGlnaGxpZ2h0LXNlbnRlbmNlXCIsXG5cdFx0XHRuYW1lOiBcIlNob3J0Y3V0IGZvciBoaWdobGlnaHRpbmcgc2VudGVuY2UgY3Vyc29yIGlzIGluXCIsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5jcmVhdGVIaWdobGlnaHQoKSxcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1vZGlmaWVyczogW1wiQWx0XCIsIFwiU2hpZnRcIl0sXG5cdFx0XHRcdFx0a2V5OiBcIuKAlFwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KTtcblx0fVxuXG5cdGxvYWRTZXR0aW5ncygpIHtcblx0XHR0aGlzLnNldHRpbmdzID0gbmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3MoKTtcblx0XHQoYXN5bmMgKCkgPT4ge1xuXHRcdCAgY29uc3QgbG9hZGVkU2V0dGluZ3MgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XG5cdFx0ICBpZiAobG9hZGVkU2V0dGluZ3MpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiRm91bmQgZXhpc3Rpbmcgc2V0dGluZ3MgZmlsZVwiKTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ID0gbG9hZGVkU2V0dGluZ3MuaGVhZGxpbmVUZXh0O1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMgPSBsb2FkZWRTZXR0aW5ncy5hZGRGb290bm90ZXM7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzID0gbG9hZGVkU2V0dGluZ3MuY3JlYXRlTGlua3M7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmFkZElubmVyTGlua3MgPSBsb2FkZWRTZXR0aW5ncy5hZGRJbm5lckxpbmtzO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IGxvYWRlZFNldHRpbmdzLmF1dG9DYXBpdGFsaXplO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlID0gbG9hZGVkU2V0dGluZ3MuY3JlYXRlTmV3RmlsZTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IGxvYWRlZFNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXM7XG5cdFx0XHR0aGlzLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gbG9hZGVkU2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXM7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMgPSBsb2FkZWRTZXR0aW5ncy5jcmVhdGVDb250ZXh0dWFsUXVvdGVzO1xuXHRcdCAgfSBlbHNlIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiTm8gc2V0dGluZ3MgZmlsZSBmb3VuZCwgc2F2aW5nLi4uXCIpO1xuXHRcdFx0dGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0XHQgIH1cblx0XHR9KSgpO1xuXHR9XG5cblx0YXN5bmMgZXh0cmFjdEhpZ2hsaWdodHMoKSB7XG5cdFx0bGV0IGFjdGl2ZUxlYWY6IGFueSA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmID8/IG51bGxcblx0XHQvL2xldCBhY3RpdmVMZWFmOiBhbnkgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuXG5cdFx0bGV0IG5hbWUgPSBhY3RpdmVMZWFmPy52aWV3LmZpbGUuYmFzZW5hbWU7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKGFjdGl2ZUxlYWY/LnZpZXc/LmRhdGEpIHtcblx0XHRcdFx0bGV0IHByb2Nlc3NSZXN1bHRzID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpO1xuXHRcdFx0XHR0aGlzLnByb2Nlc3NBZGRCb29rbWFya3MoKTtcblx0XHRcdFx0bGV0IGhpZ2hsaWdodHNUZXh0ID0gcHJvY2Vzc1Jlc3VsdHMubWFya2Rvd247XG5cdFx0XHRcdGxldCBoaWdobGlnaHRzID0gcHJvY2Vzc1Jlc3VsdHMuaGlnaGxpZ2h0cztcblx0XHRcdFx0bGV0IGJhc2VOYW1lcyA9IHByb2Nlc3NSZXN1bHRzLmJhc2VOYW1lcztcblx0XHRcdFx0bGV0IGNvbnRleHRzID0gcHJvY2Vzc1Jlc3VsdHMuY29udGV4dHM7XG5cdFx0XHRcdGxldCBzYXZlU3RhdHVzID0gdGhpcy5zYXZlVG9DbGlwYm9hcmQoaGlnaGxpZ2h0c1RleHQpO1xuXHRcdFx0XHRuZXcgTm90aWNlKHNhdmVTdGF0dXMpO1xuXG5cdFx0XHRcdGNvbnN0IG5ld0Jhc2VuYW1lTU9DID0gXCJIaWdobGlnaHRzIGZvciBcIiArIG5hbWUgKyBcIi5tZFwiO1xuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKSB7XG5cdFx0XHRcdFx0Ly8gQWRkIGxpbmsgYmFjayB0byBPcmlnaW5hbFxuXHRcdFx0XHRcdGhpZ2hsaWdodHNUZXh0ICs9IGAjIyBTb3VyY2VcXG4tIFtbJHtuYW1lfV1dYDtcblxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuc2F2ZVRvRmlsZShuZXdCYXNlbmFtZU1PQywgaGlnaGxpZ2h0c1RleHQpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQobmV3QmFzZW5hbWVNT0MsIG5ld0Jhc2VuYW1lTU9DLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSAmJiB0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzICYmIHRoaXMuc2V0dGluZ3MuZXhwbG9kZUludG9Ob3Rlcykge1xuXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiYXNlTmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgZmlsZSBmb3IgXCIgKyBiYXNlTmFtZXNbaV0pO1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRlbnQgPSBcIlwiO1xuXHRcdFx0XHRcdFx0Ly8gYWRkIGhpZ2hsaWdodCBhcyBxdW90ZVxuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIiMjIFNvdXJjZVxcblwiXG5cdFx0XHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMpIHtcblx0XHRcdFx0XHRcdFx0Ly8gY29udGV4dCBxdW90ZVxuXHRcdFx0XHRcdFx0XHRjb250ZW50ICs9IGA+ICR7Y29udGV4dHNbaV19W14xXWA7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyByZWd1bGFyIGhpZ2hsaWdodCBxdW90ZVxuXHRcdFx0XHRcdFx0XHRjb250ZW50ICs9IGA+ICR7aGlnaGxpZ2h0c1tpXX1bXjFdYDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gXCJcXG5cXG5cIjtcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gYFteMV06IFtbJHtuYW1lfV1dYDtcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gXCJcXG5cIjtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBuZXdCYXNlbmFtZSA9IGJhc2VOYW1lc1tpXSArIFwiLm1kXCI7XG5cblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuc2F2ZVRvRmlsZShuZXdCYXNlbmFtZSwgY29udGVudCk7XG5cblx0XHRcdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXMpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChuZXdCYXNlbmFtZSwgbmV3QmFzZW5hbWUsIHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXcgTm90aWNlKFwiTm8gaGlnaGxpZ2h0cyB0byBleHRyYWN0LlwiKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlLm1lc3NhZ2UpXG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgc2F2ZVRvRmlsZShmaWxlUGF0aDogc3RyaW5nLCBtZFN0cmluZzogc3RyaW5nKSB7XG5cdFx0Ly9JZiBmaWxlcyBleGlzdHMgdGhlbiBhcHBlbmQgY29udGVudCB0byBleGlzdGluZyBmaWxlXG5cdFx0Y29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGZpbGVQYXRoKTtcblx0XHRpZiAoZmlsZUV4aXN0cykge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJGaWxlIGV4aXN0cyBhbHJlYWR5Li4uXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGUoZmlsZVBhdGgsIG1kU3RyaW5nKTtcblx0XHR9XG5cdH1cblxuXHRpbnNlcnRBdChzdHI6IHN0cmluZywgaW5kZXg6IG51bWJlciwgZnJhZ21lbnQ6IHN0cmluZykge1xuXHRcdGlmIChpbmRleCA+IHN0ci5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBzdHIgKyBmcmFnbWVudDtcblx0XHR9XG5cdFx0cmV0dXJuIHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpICsgZnJhZ21lbnQgKyBzdHIuc3Vic3RyaW5nKGluZGV4KTtcblx0fVxuXG5cdHByb2Nlc3NBZGRCb29rbWFya3MoKSB7XG5cdFx0Y29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cdFx0aWYgKHZpZXcpIHtcblx0XHRcdGxldCBib29rbWFya0luZGV4ID0gMDtcblx0XHRcdGxldCBsaW5lQ291bnRlciA9IDA7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZElubmVyTGlua3MpIHtcblx0XHRcdFx0Y29uc3QgcmUgPSAvKD09fDxcXC9tYXJrPikvZztcblx0XHRcdFx0Y29uc3QgcmVnQm9va21hcmsgPSAvIFxcXmhpZ2hsaWdodFxcZCsvZztcblx0XHRcdFx0bGV0IGZ1bGxUZXh0ID0gdmlldy5lZGl0b3IuZ2V0VmFsdWUoKTtcblx0XHRcdFx0bGV0IGxpbmVzID0gZnVsbFRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRcdGxldCBtYXRjaDE7XG5cdFx0XHRcdGxpbmVDb3VudGVyID0gMDtcblx0XHRcdFx0Zm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xuXHRcdFx0XHRcdC8vIHJlbW92ZSBhbGwgb2xkIGJvb2ttYXJrcyBmcm9tIGFsbCBsaW5lc1xuXHRcdFx0XHRcdGxldCBtYXRjaDIgPSByZWdCb29rbWFyay5leGVjKGxpbmUpO1xuXHRcdFx0XHRcdGlmKG1hdGNoMil7XG5cdFx0XHRcdFx0XHR2aWV3LmVkaXRvci5yZXBsYWNlUmFuZ2UoXCJcIiwgeyBsaW5lOiBsaW5lQ291bnRlciwgY2g6IG1hdGNoMi5pbmRleH0sIHsgbGluZTogbGluZUNvdW50ZXIsIGNoOiBtYXRjaDIuaW5kZXggKyBtYXRjaDJbMF0ubGVuZ3RoIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsaW5lQ291bnRlcisrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpbmVDb3VudGVyID0gMDtcblx0XHRcdFx0ZnVsbFRleHQgPSB2aWV3LmVkaXRvci5nZXRWYWx1ZSgpO1xuXHRcdFx0XHRsaW5lcyA9IGZ1bGxUZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0XHRmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG5cdFx0XHRcdFx0Ly8gYWRkIG5ldyBib29rbWFya3MgdG8gdGhlIGVuZCBvZiB0aGUgdGV4dCBibG9ja3Ncblx0XHRcdFx0XHR3aGlsZSAoKG1hdGNoMSA9IHJlLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRib29rbWFya0luZGV4Kys7XG5cdFx0XHRcdFx0XHRsZXQgbGFzdEJsb2NrTGluZSA9IGxpbmVDb3VudGVyO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IGxpbmVDb3VudGVyOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGxpbmVzW2ldID09IFwiXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXN0QmxvY2tMaW5lID0gaS0xO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbGluZUNvdW50ZXIsIG1hdGNoMS5pbmRleCA6Pj4gJywgbGluZUNvdW50ZXIsIG1hdGNoMS5pbmRleCk7XG5cdFx0XHRcdFx0XHR2aWV3LmVkaXRvci5yZXBsYWNlUmFuZ2UoYCBeaGlnaGxpZ2h0JHtib29rbWFya0luZGV4fWAsIHsgbGluZTogbGFzdEJsb2NrTGluZSwgY2g6IGxpbmVzW2xhc3RCbG9ja0xpbmVdLmxlbmd0aH0sIHsgbGluZTogbGFzdEJsb2NrTGluZSwgY2g6IGxpbmVzW2xhc3RCbG9ja0xpbmVdLmxlbmd0aCB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGluZUNvdW50ZXIrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cHJvY2Vzc0hpZ2hsaWdodHModmlldzogYW55KSB7XG5cdFx0Y29uc3QgY3VycmVudEZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuXG5cdFx0dmFyIHJlO1xuXG5cdFx0aWYodGhpcy5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmsuKj9cXD58XFwqXFwqKShbXFxzXFxTXSo/KSg9PXxcXDxcXC9tYXJrXFw+fFxcKlxcKikvZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmsuKj9cXD4pKFtcXHNcXFNdKj8pKD09fFxcPFxcL21hcmtcXD4pL2c7XG5cdFx0fVxuXG5cdFx0bGV0IG1hcmtkb3duVGV4dCA9IHZpZXcuZGF0YTtcblx0XHRsZXQgYmFzZW5hbWUgPSB2aWV3LmZpbGUuYmFzZW5hbWU7XG5cdFx0bGV0IG1hdGNoZXMgPSBtYXJrZG93blRleHQubWF0Y2gocmUpO1xuXHRcdHRoaXMuY291bnRlciArPSAxO1xuXG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0dmFyIGhpZ2hsaWdodHMgPSBbXTtcblx0XHR2YXIgYmFzZU5hbWVzID0gW107XG5cdFx0bGV0IGNvbnRleHRzOiBhbnlbXVtdID0gW107XG5cdFx0bGV0IGxpbmVzID0gbWFya2Rvd25UZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdGxldCBjbGVhbmVkTGluZXMgPSBbXTtcblxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYoIShsaW5lc1tpXSA9PSBcIlwiKSkge1xuXHRcdFx0XHRjbGVhbmVkTGluZXMucHVzaChsaW5lc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoZXMgIT0gbnVsbCkge1xuXHRcdFx0bGV0IGJvb2ttYXJrSW5kZXggPSAwO1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5oZWFkbGluZVRleHQgIT0gXCJcIikgeyBcblx0XHRcdFx0bGV0IHRleHQgPSB0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dC5yZXBsYWNlKC9cXCROT1RFX1RJVExFLywgYCR7YmFzZW5hbWV9YClcblx0XHRcdFx0cmVzdWx0ICs9IGAjIyMgJHt0ZXh0fVxcblxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGVudHJ5IG9mIG1hdGNoZXMpIHtcblx0XHRcdFx0Ym9va21hcmtJbmRleCsrO1xuXHRcdFx0XHQvLyBLZWVwIHN1cnJvdW5kaW5nIHBhcmFncmFwaCBmb3IgY29udGV4dFxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMpIHtcblx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2xlYW5lZExpbmVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRsZXQgbWF0Y2ggPSBjbGVhbmVkTGluZXNbaV0ubWF0Y2goZW50cnkpO1xuXHRcdFx0XHRcdFx0aWYoIShtYXRjaCA9PSBudWxsKSAmJiBtYXRjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB2YWwgPSBjbGVhbmVkTGluZXNbaV07XG5cblx0XHRcdFx0XHRcdFx0aWYoIWNvbnRleHRzLmNvbnRhaW5zKHZhbCkpIHtcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0cy5wdXNoKHZhbCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDbGVhbiB1cCBoaWdobGlnaHRpbmcgbWF0Y2hcblx0XHRcdFx0dmFyIHJlbW92ZU5ld2xpbmUgPSBlbnRyeS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpO1xuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0U3RhcnQgPSByZW1vdmVOZXdsaW5lLnJlcGxhY2UoLz09L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVIaWdobGlnaHRFbmQgPSByZW1vdmVIaWdobGlnaHRTdGFydC5yZXBsYWNlKC9cXDxtYXJrLio/XFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVNYXJrQ2xvc2luZyA9IHJlbW92ZUhpZ2hsaWdodEVuZC5yZXBsYWNlKC9cXDxcXC9tYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVCb2xkID0gcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVCb2xkLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cblx0XHRcdFx0cmVtb3ZlRG91YmxlU3BhY2VzID0gcmVtb3ZlRG91YmxlU3BhY2VzLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZURvdWJsZVNwYWNlcy50cmltKCk7XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSkge1xuXHRcdFx0XHRcdGlmKHJlbW92ZURvdWJsZVNwYWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihyZW1vdmVEb3VibGVTcGFjZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIi0gXCJcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHNhbml0aXplIGhpZ2hsaWdodCB0byBiZSB1c2VkIGFzIGEgZmlsZS1saW5rXG5cdFx0XHRcdFx0Ly8gKiBcIiBcXCAvIHwgPCA+IDogP1xuXHRcdFx0XHRcdGxldCBzYW5pdGl6ZWQgPSByZW1vdmVEb3VibGVTcGFjZXMucmVwbGFjZSgvXFwqfFxcXCJ8XFxcXHxcXC98XFw8fFxcPnxcXDp8XFw/fFxcfC9nbSwgXCJcIik7XG5cdFx0XHRcdFx0c2FuaXRpemVkID0gc2FuaXRpemVkLnRyaW0oKTtcblxuXHRcdFx0XHRcdGxldCBiYXNlTmFtZSA9IHNhbml0aXplZDtcblx0XHRcdFx0XHRpZihiYXNlTmFtZS5sZW5ndGggPiAxMDApIHtcblx0XHRcdFx0XHRcdGJhc2VOYW1lID0gYmFzZU5hbWUuc3Vic3RyKDAsIDk5KTtcblx0XHRcdFx0XHRcdGJhc2VOYW1lICs9IFwiLi4uXCJcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQgKz0gXCJbW1wiICsgYmFzZU5hbWUgKyBcIl1dXCI7XG5cdFx0XHRcdFx0aGlnaGxpZ2h0cy5wdXNoKHNhbml0aXplZCk7XG5cdFx0XHRcdFx0YmFzZU5hbWVzLnB1c2goYmFzZU5hbWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCArPSByZW1vdmVEb3VibGVTcGFjZXM7XG5cdFx0XHRcdFx0aGlnaGxpZ2h0cy5wdXNoKHJlbW92ZURvdWJsZVNwYWNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykge1xuXHRcdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dYDtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZElubmVyTGlua3MpIHtcblx0XHRcdFx0XHRsZXQgY3VycmVudExpbmsgPSB0aGlzLmFwcC5maWxlTWFuYWdlci5nZW5lcmF0ZU1hcmtkb3duTGluayhjdXJyZW50RmlsZSwgJy4nLCBgI15oaWdobGlnaHQke2Jvb2ttYXJrSW5kZXh9YCwgJyhsaW5rIHRvIHRleHQpJyk7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IGN1cnJlbnRMaW5rO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYWRkRm9vdG5vdGVzKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIlxcblwiXG5cdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dOiBbWyR7YmFzZW5hbWV9XV1cXG5gXG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdCArPSBcIlxcblwiO1xuXHRcdH1cblxuXHRcdHJldHVybiB7bWFya2Rvd246IHJlc3VsdCwgYmFzZU5hbWVzOiBiYXNlTmFtZXMsIGhpZ2hsaWdodHM6IGhpZ2hsaWdodHMsIGNvbnRleHRzOiBjb250ZXh0c307XG5cdH1cblxuXHRzYXZlVG9DbGlwYm9hcmQoZGF0YTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChkYXRhKTtcblx0XHRcdHJldHVybiBcIkhpZ2hsaWdodHMgY29waWVkIHRvIGNsaXBib2FyZCFcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFwiTm8gaGlnaGxpZ2h0cyBmb3VuZFwiO1xuXHRcdH1cblx0fVxuXG5cdGNyZWF0ZUhpZ2hsaWdodCgpIHtcblx0XHRjb25zdCBtZFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3IGFzIE1hcmtkb3duVmlldztcblx0XHRjb25zdCBkb2MgPSBtZFZpZXcuc291cmNlTW9kZS5jbUVkaXRvcjtcblx0XHR0aGlzLmVkaXRvciA9IGRvYztcblxuXHRcdGNvbnN0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0bGV0IGxpbmVUZXh0ID0gdGhpcy5lZGl0b3IuZ2V0TGluZShjdXJzb3JQb3NpdGlvbi5saW5lKTtcblxuXHRcdC8vIHVzZSBvdXIgZmFuY3kgY2xhc3MgdG8gZmlndXJlIHRoaXMgb3V0XG5cdFx0bGV0IHRoID0gbmV3IFRvZ2dsZUhpZ2hsaWdodCgpO1xuXHRcdGxldCByZXN1bHQgPSB0aC50b2dnbGVIaWdobGlnaHQobGluZVRleHQsIGN1cnNvclBvc2l0aW9uLmNoKTtcblxuXHRcdC8vIGNhdGNoIHVwIG9uIGN1cnNvclxuXHRcdGxldCBjdXJzb3JEaWZmZXJlbmNlID0gLTI7XG5cdFx0aWYocmVzdWx0Lmxlbmd0aCA+IGxpbmVUZXh0Lmxlbmd0aCkgeyBjdXJzb3JEaWZmZXJlbmNlID0gMiB9XG5cblx0XHR0aGlzLmVkaXRvci5yZXBsYWNlUmFuZ2UocmVzdWx0LCB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IDB9LCB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IGxpbmVUZXh0Lmxlbmd0aH0pXG5cdFx0dGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKHtsaW5lOiBjdXJzb3JQb3NpdGlvbi5saW5lLCBjaDogY3Vyc29yUG9zaXRpb24uY2ggKyBjdXJzb3JEaWZmZXJlbmNlfSk7XG5cdH1cblxuXG5cdGNhcGl0YWxpemVGaXJzdExldHRlcihzOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsImFkZEljb24iLCJOb3RpY2UiLCJNYXJrZG93blZpZXciLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbkYsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxP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
