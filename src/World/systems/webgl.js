const WEBGL = {
    isWebGLAvailable: function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext('webgl') ||
                    canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    },

    isWebGL2Available: function () {
        try {
            var canvas = document.createElement('canvas');
            const isAvailable = !!(
                window.WebGL2RenderingContext && canvas.getContext('webgl2')
            );
            document.removeChild(canvas);
            return isAvailable;
        } catch (e) {
            return false;
        }
    },

    getWebGLErrorMessage: function () {
        return this.getErrorMessage(1);
    },

    getWebGL2ErrorMessage: function () {
        return this.getErrorMessage(2);
    },

    getErrorMessage: function (version) {
        var names = {
            1: 'WebGL',
            2: 'WebGL 2',
        };

        var contexts = {
            1: window.WebGLRenderingContext,
            2: window.WebGL2RenderingContext,
        };

        var message = 'Your $0 does not seem to support WebGL';

        var element = document.createElement('div');
        element.id = 'webgl-error-message';

        if (contexts[version]) {
            message = message.replace('$0', 'graphics card');
        } else {
            message = message.replace('$0', 'browser');
        }

        message = message.replace('$1', names[version]);

        element.innerHTML = message;

        return element;
    },
};

module.exports = { WEBGL };
