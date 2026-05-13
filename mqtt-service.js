// mqtt-service.js
const MQTT_BROKER = "wss://broker.hivemq.com:8884/mqtt";
let mqttClient;

function connectMQTT(onConnectCallback, onMessageCallback) {
    mqttClient = mqtt.connect(MQTT_BROKER);

    mqttClient.on("connect", function () {
        console.log("MQTT bağlandı");
        if (onConnectCallback) onConnectCallback();
    });

    mqttClient.on("message", function (topic, message) {
        let veri;
        try {
            veri = JSON.parse(message.toString());
        } catch (e) {
            return;
        }

        let kanal = topic.split("/").pop();
        if (onMessageCallback) onMessageCallback(kanal, veri);
    });
}

function mqttYayinla(topic, dataObj) {
    if (mqttClient && mqttClient.connected) {
        mqttClient.publish(topic, JSON.stringify(dataObj), { retain: true });
    }
}

function mqttAboneOl(topic) {
    if (mqttClient && mqttClient.connected) {
        mqttClient.subscribe(topic);
    }
}
