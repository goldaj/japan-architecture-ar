// Lens Studio script asset, to be attached to a Scene Object.
// This is an integration sketch, not a tested or packaged Snapchat Lens.
// @input SceneObject[] styleObjects
// @input Component.Text statusText
// @input bool startEnabled = false

var isActive = script.startEnabled;

function applyState() {
    if (script.styleObjects) {
        for (var i = 0; i < script.styleObjects.length; i++) {
            if (script.styleObjects[i]) {
                script.styleObjects[i].enabled = isActive;
            }
        }
    }
    if (script.statusText) {
        script.statusText.text = isActive ? "Japan: ON" : "Japan: OFF";
    }
}

script.createEvent("OnStartEvent").bind(applyState);
script.createEvent("TapEvent").bind(function () {
    isActive = !isActive;
    applyState();
});
