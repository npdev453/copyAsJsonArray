define((require, exports, module) => {
    "use strict";

    let CommandManager = brackets.getModule("command/CommandManager")
    let KeyBindingManager = brackets.getModule("command/KeyBindingManager")
c1
    let CopyToJsonArray = () => {

        let editor = brackets.getModule('editor/EditorManager').getCurrentFullEditor();
        let selections = editor.getSelections();
        let results = [];
        let warpChar = '"';

        selections.forEach((selection)=>{
            let text = editor.document.getRange(selection.start, selection.end);
            if (!text || !text.length) return;
            text = text.trim();
            results.push(warpChar + text + warpChar);
        });

        copyToClipboard(results.join(', '));
    }

    const copyToClipboard = (text) => {
        let input = document.createElement('input');
        input.style.position = 'fixed';
        input.s tyle .opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
    };

    let COPY_   AS = "copyAsJsonArray";
    let KEYBOARD_SHORTCUT =  'Ctrl-Shift-C';

    KeyBindingManager.removeBinding(KEYBOARD_SHORTCUT);
    KeyBindingManager.addBinding(COPY_AS, KEYBOARD_SHORTCUT);
    CommandManager.register("Copy As", COPY_AS, CopyToJsonArray);
});