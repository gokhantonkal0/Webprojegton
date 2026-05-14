// mqtt-service.js (Tamamen Yerel Ağ - İnternetsiz Çok Oyunculu)

let broadcastChannel;
let messageCallback;

// `game.js` içinde `mqttClient.end()` gibi çağrılar için sahte nesne
let mqttClient = {
    connected: false,
    end: function() {
        if (broadcastChannel) broadcastChannel.close();
        this.connected = false;
    }
};

function connectMQTT(onConnectCallback, onMessageCallback) {
    if (broadcastChannel) {
        broadcastChannel.close();
    }
    
    // Sekmeler arası iletişim için BroadcastChannel (Aynı tarayıcıda çalışan sekmeler)
    broadcastChannel = new BroadcastChannel("GTonkalQuiz_LocalChannel");
    messageCallback = onMessageCallback;
    mqttClient.connected = true;

    // Diğer sekmelerden gelen mesajlar
    broadcastChannel.onmessage = function(event) {
        let msg = event.data;
        if (messageCallback) {
            let topic = msg.topic;
            let veri = msg.data;
            let kanal = topic.split("/").pop();
            messageCallback(kanal, veri);
        }
    };

    console.log("Local Bağlantı Sağlandı (İnternetsiz Çok Oyunculu)");
    if (onConnectCallback) {
        setTimeout(onConnectCallback, 50);
    }
}

function mqttYayinla(topic, dataObj) {
    if (broadcastChannel) {
        // Diğer sekmelere gönder
        broadcastChannel.postMessage({ topic: topic, data: dataObj });
    }
    
    // MQTT broker kendi yayınladığımızı bize geri yollar, BroadcastChannel yollamaz.
    // Bu yüzden kendi kendimize de asenkron olarak tetikliyoruz (Tam MQTT simülasyonu)
    if (messageCallback) {
        let kanal = topic.split("/").pop();
        setTimeout(() => messageCallback(kanal, dataObj), 10);
    }
}

function mqttAboneOl(topic) {
    // BroadcastChannel tüm mesajları alır, abonelik simüle edilir.
    console.log("Abone olundu: " + topic);
}
