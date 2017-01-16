module.exports = function (RED) {

    function simpleJsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.func = config.func;

        if (!this.func.length) {
            node.warn('invalid function');
            this.status({
                fill: 'red',
                shape: 'ring',
                text: 'invalid function'
            });

            return;
        }
        this.status({});

        this.on('input', function (msg) {

            var funcStatus;
            this.status({});

            switch (this.func) {

                case 'parse-str':

                    if (typeof msg.payload.toString == 'function') {
                        msg.payload = msg.payload.toString();
                    } else {
                        msg.payload = String(msg.payload);
                    }

                    break;

                case 'parse-float':
                    msg.payload = parseFloat(msg.payload);
                    break;

                case 'parse-int':
                    msg.payload = parseInt(msg.payload);
                    break;

                case 'is-nan':
                    if (!isNaN(msg.payload)) {
                        msg = null;
                        funcStatus = {
                            fill: 'yellow',
                            shape: 'dot',
                            text: 'msg.payload is a number'
                        };

                        node.warn(funcStatus.text);
                        this.status(funcStatus);
                    }
                    break;

                case 'is-finite':
                    if (!isFinite(msg.payload)) {
                        msg = null;
                        funcStatus = {
                            fill: 'yellow',
                            shape: 'dot',
                            text: 'msg.payload is not a number'
                        };

                        node.warn(funcStatus.text);
                        this.status(funcStatus);
                    }
                    break;

                default:
                    msg = null;
            }

            node.send(msg);
        });

    }

    RED.nodes.registerType("simplejs", simpleJsNode);
};