// mqtt-service.js
// Güvenlik duvarlarına takılmamak için 8084 veya alternatif public broker kullanıyoruz
const MQTT_BROKER = "wss://broker.emqx.io:8084/mqtt";
let mqttClient;
let abonelikler = [];
let bekleyenMesajlar = [];
let baglantiZamanAsimi;

function connectMQTT(onConnectCallback, onMessageCallback) {
    mqttClient = mqtt.connect(MQTT_BROKER);

    // Bağlantı 5 saniye içinde kurulamazsa uyarı ver
    baglantiZamanAsimi = setTimeout(() => {
        if (!mqttClient.connected) {
            alert("⚠️ Sunucuya bağlanılamadı. Lütfen internet bağlantınızı veya okul/şirket ağınızın izinlerini kontrol edin. (F5 ile sayfayı yenileyebilirsiniz)");
        }
    }, 5000);

    mqttClient.on("connect", function () {
        console.log("MQTT bağlandı");
        clearTimeout(baglantiZamanAsimi); // Başarılı bağlanırsa zaman aşımını iptal et
        
        // Bekleyen abonelikleri yap
        abonelikler.forEach(topic => mqttClient.subscribe(topic));
        
        // Bekleyen mesajları gönder
        bekleyenMesajlar.forEach(msg => {
            mqttClient.publish(msg.topic, JSON.stringify(msg.dataObj), { retain: true });
        });
        bekleyenMesajlar = []; // Gönderdikten sonra temizle

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
    } else {
        // Bağlı değilse sıraya ekle
        bekleyenMesajlar.push({ topic, dataObj });
    }
}

function mqttAboneOl(topic) {
    if (!abonelikler.includes(topic)) {
        abonelikler.push(topic);
    }
    
    if (mqttClient && mqttClient.connected) {
        mqttClient.subscribe(topic);
    }
}
