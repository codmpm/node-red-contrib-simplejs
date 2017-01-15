module.exports = function (RED) {

    function simpleJsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.func = config.func;
        console.log(this.func);

        if (!this.func.length) {
            console.log('no function given');
            this.status({
                fill: "red",
                shape: "ring",
                text: "invalid function"
            });
        } else {
            this.status({});
        }

        this.on('input', function (msg) {

            if (!this.func.length) {
                node.send(null);
                return;
            }

            this.status({});

            switch (this.func) {

                case 'parse-str':
                    msg.payload = String(msg.payload);
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
                        this.status({
                            fill: "yellow",
                            shape: "dot",
                            text: "msg.payload is a number"
                        });
                    }
                    break;

                case 'is-finite':
                    if (!isFinite(msg.payload)) {
                        msg = null;
                        this.status({
                            fill: "yellow",
                            shape: "dot",
                            text: "msg.payload is not a number"
                        });
                    }
                    break;
            }

            node.send(msg);
        });

    }

    RED.nodes.registerType("simplejs", simpleJsNode);
}