module.exports = function (RED) {

    function simpleJsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        if (!config.func.length) {
            var errStatus = {
                fill: 'red',
                shape: 'ring',
                text: 'invalid function'
            };

            node.warn(errStatus.text);
            this.status(errStatus);

            return;
        }

        this.status({});

        this.on('input', function (msg) {

            var funcStatus;
            this.status({});

            if (typeof msg[config.property] === 'undefined') {

                var errStatus = {
                    fill: 'red',
                    shape: 'ring',
                    text: 'invalid property'
                };

                node.warn(errStatus.text);
                this.status(errStatus);

                msg = null;

            } else {

                switch (config.func) {

                    case 'parse-str':

                        if (typeof msg[config.property].toString == 'function') {
                            msg[config.property] = msg[config.property].toString();
                        } else {
                            msg[config.property] = String(msg[config.property]);
                        }

                        break;

                    case 'parse-float':
                        msg[config.property] = parseFloat(msg[config.property]);
                        break;

                    case 'parse-int':
                        msg[config.property] = parseInt(msg[config.property]);
                        break;

                    case 'is-nan':
                        if (!isNaN(msg[config.property])) {
                            msg = null;
                            funcStatus = {
                                fill: 'yellow',
                                shape: 'dot',
                                text: 'msg.' + config.property + ' is a number'
                            };

                            node.warn(funcStatus.text);
                            this.status(funcStatus);
                        }
                        break;

                    case 'is-finite':
                        if (!isFinite(msg[config.property])) {
                            msg = null;
                            funcStatus = {
                                fill: 'yellow',
                                shape: 'dot',
                                text: 'msg.' + config.property + ' is not a number'
                            };

                            node.warn(funcStatus.text);
                            this.status(funcStatus);
                        }
                        break;

                    default:
                        msg = null;
                }
            }

            node.send(msg);
        });

    }

    RED.nodes.registerType("simplejs", simpleJsNode);
};