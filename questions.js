const questions = [
    {
        "question": "HTML5 nedir?",
        "options": [
            "Web sayfasının içeriğini ve yapısını belirten işaretleme dilidir",
            "Sadece veritabanı yönetim sistemidir",
            "Sunucu tarafı programlama dilidir",
            "Bir işletim sistemidir"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "HTML5, web sayfalarının içeriğini ve yapısını belirleyen işaretleme dilidir."
    },
    {
        "question": "Bir web sayfasına resim eklemek için hangi HTML etiketi kullanılır?",
        "options": [
            "<image>",
            "<img>",
            "<pic>",
            "<picture>"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "<img> etiketi (image) bir sayfaya görsel eklemek için kullanılan standart etikettir."
    },
    {
        "question": "HTML`de en büyük başlık etiketi hangisidir?",
        "options": [
            "<heading>",
            "<h6>",
            "<h1>",
            "<header>"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "HTML başlıkları h1`den h6`ya kadar gider. h1 en büyük başlığı ifade eder."
    },
    {
        "question": "Bir link (bağlantı) oluşturmak için hangi HTML etiketi kullanılır?",
        "options": [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "<a> (anchor) etiketi web sayfaları arasında veya aynı sayfa içinde bağlantı oluşturur."
    },
    {
        "question": "Sırasız liste (madde imli liste) oluşturmak için hangi etiket kullanılır?",
        "options": [
            "<ol>",
            "<ul>",
            "<li>",
            "<list>"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "<ul> (unordered list) sırasız liste oluşturur. Öğeler <li> etiketiyle eklenir."
    },
    {
        "question": "DOCTYPE bildirimi ne işe yarar?",
        "options": [
            "Sayfanın başlığını belirler",
            "Tarayıcıya belgenin hangi HTML sürümüyle yazıldığını söyler",
            "CSS dosyalarını bağlar",
            "Veritabanı bağlantısı kurar"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "<!DOCTYPE html> ifadesi, tarayıcıya sayfanın güncel HTML5 standartlarında yazıldığını bildirir."
    },
    {
        "question": "HTML`de form verilerini sunucuya gönderirken şifre gibi hassas veriler için hangi method kullanılmalıdır?",
        "options": [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "POST metodu, verileri HTTP gövdesinde gizli bir şekilde gönderdiği için GET metoduna göre daha güvenlidir."
    },
    {
        "question": "Kullanıcıdan sadece BİR seçim yapmasını istediğimiz form elemanı hangisidir?",
        "options": [
            "checkbox",
            "text",
            "radio",
            "select-multiple"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Radio butonları (<input type=\"radio\">), aynı name değerine sahip gruptan sadece bir seçeneğin işaretlenmesine izin verir."
    },
    {
        "question": "Bir input alanının boş bırakılamayacağını belirtmek için hangi nitelik (attribute) kullanılır?",
        "options": [
            "required",
            "placeholder",
            "readonly",
            "disabled"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "`required` niteliği, form gönderilmeden önce alanın doldurulmasını zorunlu kılar."
    },
    {
        "question": "Görme engelliler için ekran okuyucuların resmi betimlemesini sağlayan <img> niteliği hangisidir?",
        "options": [
            "title",
            "src",
            "alt",
            "description"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "`alt` (alternative text) niteliği, resim yüklenemediğinde veya ekran okuyucu kullanıldığında resmi betimler."
    },
    {
        "question": "HTML5 ile gelen ve sayfanın ana içeriğinden bağımsız yan içerikleri belirtmek için kullanılan anlamsal (semantic) etiket hangisidir?",
        "options": [
            "<aside>",
            "<section>",
            "<article>",
            "<nav>"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "<aside> etiketi genellikle sayfanın kenar çubukları (sidebar) gibi ana içerikten bağımsız kısımları tanımlamak için kullanılır."
    },
    {
        "question": "HTML formlarında `<label>` etiketini bir `<input>` alanına bağlamak için hangi nitelikler eşleşmelidir?",
        "options": [
            "label \"id\" ve input \"name\"",
            "label \"for\" ve input \"id\"",
            "label \"name\" ve input \"value\"",
            "label \"for\" ve input \"name\""
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "<label> etiketinin \"for\" niteliği, hedeflenen <input> etiketinin \"id\" niteliği ile aynı olmalıdır."
    },
    {
        "question": "Aşağıdakilerden hangisi HTML5 ile eklenmiş yeni bir form input tipidir?",
        "options": [
            "password",
            "radio",
            "date",
            "file"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "HTML5 ile birlikte email, url, number, date, range gibi birçok yeni ve özel input tipi eklenmiştir."
    },
    {
        "question": "Bir HTML belgesinde karakter setinin UTF-8 olduğunu belirtmek için hangi etiket nerede kullanılır?",
        "options": [
            "<meta charset=\"UTF-8\"> / <head> içinde",
            "<utf-8> / <body> içinde",
            "<doctype utf-8> / En üstte",
            "<script charset=\"UTF-8\"> / <footer> içinde"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "<meta charset=\"UTF-8\"> etiketi HTML sayfasının dil kodlamasını tanımlar ve <head> bölgesine yazılmalıdır."
    },
    {
        "question": "HTML tablolarında ardışık iki veya daha fazla SÜTUNU birleştirmek için `<td>` veya `<th>` etiketinde hangi nitelik kullanılır?",
        "options": [
            "rowspan",
            "colspan",
            "merge",
            "span"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "`colspan` niteliği belirtilen hücrenin yatayda (sütun bazında) kaç hücrelik yer kaplayacağını belirtir."
    },
    {
        "question": "CSS nedir?",
        "options": [
            "Veritabanı dili",
            "Web sayfasının tasarımını ve görsel düzenini sağlayan stil dili",
            "Programlama dili",
            "Tarayıcı eklentisi"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Cascading Style Sheets (CSS), HTML elemanlarının renk, boyut, konum gibi özelliklerini belirleyen stil dilidir."
    },
    {
        "question": "Metin rengini değiştirmek için hangi CSS özelliği kullanılır?",
        "options": [
            "background-color",
            "color",
            "text-color",
            "font-color"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "`color` özelliği metinlerin rengini değiştirmek için kullanılır."
    },
    {
        "question": "Arka plan rengini değiştirmek için hangi CSS özelliği kullanılır?",
        "options": [
            "bg-color",
            "color",
            "background-color",
            "back-color"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "`background-color` bir elemanın arkaplan rengini belirler."
    },
    {
        "question": "CSS`de ID seçici hangi sembolle başlar?",
        "options": [
            ". (Nokta)",
            "# (Diyez)",
            "* (Yıldız)",
            "@ (Kuyruklu a)"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "ID seçicileri # ile başlar (Örn: #baslik). Sınıflar (class) ise . ile başlar."
    },
    {
        "question": "Yazı tipini (font ailesini) değiştirmek için hangi CSS özelliği kullanılır?",
        "options": [
            "font-weight",
            "font-style",
            "font-family",
            "text-style"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "`font-family` özelliği metnin yazı tipini (Arial, Roboto vb.) belirler."
    },
    {
        "question": "Box Model`de elemanın İÇ BOŞLUĞUNU (kenarlık ile içerik arası) hangi özellik belirler?",
        "options": [
            "margin",
            "padding",
            "border",
            "width"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "`padding`, elemanın içeriği ile kenarlığı (border) arasındaki boşluktur."
    },
    {
        "question": "Box Model`de elemanın DIŞ BOŞLUĞUNU (diğer elemanlarla arası) hangi özellik belirler?",
        "options": [
            "margin",
            "padding",
            "border",
            "width"
        ],
        "answer": 0,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "`margin`, elemanın kenarlığından dışarıya doğru olan ve diğer elemanları iten boşluktur."
    },
    {
        "question": "Aşağıdakilerden hangisi bir \"Block\" seviyesinde HTML elemanıdır?",
        "options": [
            "<span>",
            "<a>",
            "<div>",
            "<strong>"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "<div>, kendi satırını tamamen kaplayan ve alt satıra geçiren bir block-level elemandır."
    },
    {
        "question": "Bir elemanı sayfanın ortasına yatay olarak hizalamak için blok seviyesi bir elemanda hangi CSS kuralı kullanılır?",
        "options": [
            "text-align: center;",
            "margin: 0 auto;",
            "padding: auto;",
            "float: center;"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Genişliği belirtilmiş bir blok elemana `margin: 0 auto;` verildiğinde sağ ve sol boşluklar otomatik eşitlenerek ortalama sağlanır."
    },
    {
        "question": "Fareyle bir elemanın ÜZERİNE GELİNDİĞİNDE tetiklenen CSS pseudo-class hangisidir?",
        "options": [
            ":active",
            ":focus",
            ":visited",
            ":hover"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "`:hover` durumu, kullanıcının fare imlecini hedef elemanın üzerine getirdiği anı yakalar."
    },
    {
        "question": "Elemanın genişliğini (padding ve border dahil) toplam değer olarak sabitleyen özellik hangisidir?",
        "options": [
            "box-sizing: content-box;",
            "box-sizing: border-box;",
            "display: block;",
            "position: absolute;"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "`box-sizing: border-box;` kullanıldığında, padding ve border genişliğe dahil edilir, böylece elemanın toplam boyutu belirtilen width değerini aşmaz."
    },
    {
        "question": "Bir elemanı ekranda sayfaya göre SABİT (kaydırıldığında bile yerinden oynamayan) yapmak için hangisi kullanılır?",
        "options": [
            "position: relative;",
            "position: absolute;",
            "position: fixed;",
            "position: static;"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "`position: fixed;` elemanı tarayıcı penceresine göre (viewport) sabitler. Sayfa aşağı kaydırılsa da yeri değişmez."
    },
    {
        "question": "CSS Flexbox mimarisinde, içindeki elemanları yatay eksende merkeze hizalamak için hangi kural kullanılır (flex-direction row iken)?",
        "options": [
            "align-items: center;",
            "justify-content: center;",
            "text-align: center;",
            "vertical-align: middle;"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "`justify-content: center;` flex yönü boyunca (varsayılan row/yatay) elemanları ortalar."
    },
    {
        "question": "Responsive tasarımlarda, ekran genişliğine göre farklı CSS kodları çalıştırmak için ne kullanılır?",
        "options": [
            "@import",
            "@media (Media Queries)",
            "@keyframes",
            "@font-face"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "Media Queries, ekran boyutu, çözünürlük veya cihaz türüne göre özel CSS kuralları tanımlamayı sağlar."
    },
    {
        "question": "CSS`de elemanların Z eksenindeki konumunu (hangi elemanın üstte görüneceğini) hangi özellik belirler?",
        "options": [
            "opacity",
            "z-index",
            "position",
            "display"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "`z-index`, pozisyon verilmiş elemanların üst üste binme sırasını belirler. Değeri yüksek olan üstte yer alır."
    },
    {
        "question": "JavaScript`in web geliştirmedeki ana rolü nedir?",
        "options": [
            "Sayfa tasarımı yapmak",
            "Veritabanı tabloları oluşturmak",
            "Web sayfalarını dinamik ve etkileşimli hale getirmek",
            "Sayfa yapısını belirlemek"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "JavaScript, tarayıcıda çalışarak kullanıcının hareketlerine tepki veren interaktif sistemler kurar."
    },
    {
        "question": "JavaScript`te değeri sonradan değiştirilemeyen (sabit) değişken tanımlamak için hangi komut kullanılır?",
        "options": [
            "var",
            "let",
            "const",
            "static"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "`const` ile atanan bir değişkenin değeri sonradan farklı bir değerle değiştirilemez."
    },
    {
        "question": "Konsola mesaj yazdırmak için hangi JavaScript komutu kullanılır?",
        "options": [
            "console.log()",
            "print()",
            "echo()",
            "document.write()"
        ],
        "answer": 0,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "Geliştirici araçlarındaki konsola çıktı vermek için `console.log()` metodu kullanılır."
    },
    {
        "question": "DOM`un açılımı nedir?",
        "options": [
            "Data Object Model",
            "Document Object Model",
            "Display Object Management",
            "Document Oriented Module"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "Document Object Model, HTML belgesinin JavaScript tarafından nesneler halinde okunabilir ve değiştirilebilir ağaç yapısıdır."
    },
    {
        "question": "Bir HTML elemanını ID değerine göre seçmek için hangi metot kullanılır?",
        "options": [
            "document.querySelector()",
            "document.getElementsByTagName()",
            "document.getElementById()",
            "document.getElementsByName()"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "`document.getElementById(\"ornek\")`, belirtilen ID`ye sahip tekil elemanı DOM üzerinden çeker."
    },
    {
        "question": "JS`de mantıksal \"VE\" (AND) operatörü hangisidir?",
        "options": [
            "||",
            "&&",
            "!",
            "&"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "`&&` operatörü, hem solundaki hem de sağındaki koşul doğru (true) ise genel sonucu true döndürür."
    },
    {
        "question": "Hem değerin hem de veri tipinin aynı olup olmadığını kontrol eden operatör hangisidir?",
        "options": [
            "=",
            "==",
            "===",
            "!="
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "`===` (Strict equality) operatörü, değişkenlerin değerlerinin ve tiplerinin (String, Number vs.) tam eşleşmesini zorunlu tutar."
    },
    {
        "question": "Bir HTML elemanının içindeki HTML yapısını değiştirmek için hangi özellik kullanılır?",
        "options": [
            "innerText",
            "innerHTML",
            "value",
            "textContent"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "`innerHTML` özelliği, bir HTML elemanının içine hem metin hem de HTML etiketleri yerleştirmeyi sağlar."
    },
    {
        "question": "Bir dizinin (array) sonuna yeni bir eleman eklemek için hangi metot kullanılır?",
        "options": [
            "shift()",
            "unshift()",
            "push()",
            "pop()"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "`push()` metodu, dizinin en sonuna bir veya daha fazla eleman ekler."
    },
    {
        "question": "Bir fonksiyonu belirli bir milisaniye SONRA SADECE BİR KEZ çalıştırmak için hangisi kullanılır?",
        "options": [
            "setInterval()",
            "setTimeout()",
            "delay()",
            "pause()"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "`setTimeout(fonksiyon, süre)` belirtilen sürenin bitiminde ilgili fonksiyonu tek seferlik tetikler."
    },
    {
        "question": "Hangi fonksiyon JSON formatındaki bir metni (string) kullanılabilir bir JavaScript nesnesine (object) çevirir?",
        "options": [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.toObject()",
            "Object.assign()"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "`JSON.parse()` fonksiyonu, string halindeki JSON verisini analiz edip asıl veri tiplerine ve nesnelere çevirir."
    },
    {
        "question": "Sayfadaki dış kaynakların (resimler, iframe`ler) tamamen yüklenmesinin bittiğini anlamak için hangi olay (event) dinlenmelidir?",
        "options": [
            "DOMContentLoaded",
            "load",
            "ready",
            "init"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "`window.addEventListener(\"load\")` olayı sadece HTML`in değil, dış resim ve css dosyalarının da yüklenmesini bekler."
    },
    {
        "question": "Tarayıcı kapansa dahi verilerin KALICI olarak kullanıcının bilgisayarında saklanmasını sağlayan tarayıcı API`si hangisidir?",
        "options": [
            "sessionStorage",
            "localStorage",
            "Cookies",
            "CacheStorage"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "`localStorage` ile kaydedilen veriler, kullanıcı veya JavaScript tarafından açıkça silinene kadar tarayıcıda kalmaya devam eder."
    },
    {
        "question": "Bir HTML elemanına olay dinleyici (event listener) eklemek için kullanılan modern metot hangisidir?",
        "options": [
            "addEventListener()",
            "attachEvent()",
            "on()",
            "bind()"
        ],
        "answer": 0,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "`addEventListener(\"olayAdi\", fonksiyon)` yapısı, DOM elemanlarına esnek ve birden fazla dinleyici bağlamanın modern yoludur."
    },
    {
        "question": "Array içindeki tüm elemanlar üzerinde dönerek, her eleman için belirli bir kural uygulayıp YENİ bir dizi döndüren metot hangisidir?",
        "options": [
            "forEach()",
            "map()",
            "filter()",
            "reduce()"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "`map()` metodu, dizideki elemanları dönüştürüp uzunluğu aynı olan tamamen yeni bir array oluşturur."
    },
    {
        "question": "Bootstrap nedir?",
        "options": [
            "Bir veritabanı",
            "Mobil öncelikli responsive siteler geliştirmek için CSS/JS framework`ü",
            "Sunucu tabanlı bir dil",
            "Sadece animasyon kütüphanesi"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bootstrap, hazır sınıflar kullanarak duyarlı (responsive) web arayüzlerini hızla tasarlamamızı sağlayan açık kaynaklı bir kütüphanedir."
    },
    {
        "question": "Bootstrap grid (ızgara) sistemi yatay bir satırı maksimum kaç eşit sütuna böler?",
        "options": [
            "10",
            "12",
            "16",
            "24"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bootstrap, tasarımı 12 sütunluk bir mantığa böler. (Örn: col-6 ekranın tam yarısını kaplar)."
    },
    {
        "question": "Bootstrap`te yazının rengini KIRMIZI yapmak için hangi class kullanılır?",
        "options": [
            "text-red",
            "text-danger",
            "color-red",
            "font-danger"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bootstrap renk paletinde tehlike/hata durumu kırmızıdır ve `text-danger` sınıfıyla kullanılır."
    },
    {
        "question": "Bootstrap`te bir butonu MAVİ (ana renk) yapmak için hangi class kombinasyonu kullanılır?",
        "options": [
            "btn btn-blue",
            "btn btn-primary",
            "button btn-info",
            "btn-color-primary"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bootstrap`te ana marka rengi varsayılan olarak mavidir ve `primary` anahtar kelimesiyle (btn-primary) ifade edilir."
    },
    {
        "question": "Bir metni yatayda ortalamak için hangi Bootstrap class`ı kullanılır?",
        "options": [
            "text-center",
            "align-center",
            "center-text",
            "mx-auto"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "`text-center` sınıfı, bloğun içindeki metinlerin ve inline elemanların ortalanmasını sağlar (text-align: center)."
    },
    {
        "question": "Bootstrap`te sayfa içeriğini ortalayan ve ekran boyutuna göre `max-width` (sabit genişlik) alan kapsayıcı class hangisidir?",
        "options": [
            ".wrapper",
            ".container",
            ".content",
            ".main-body"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "`.container` sınıfı, kırılma noktalarında ekran genişliğini sabitler ve sayfayı ortalar."
    },
    {
        "question": "Bootstrap grid sisteminde sütunları (col) kapsayan \"satır\" class`ı hangisidir?",
        "options": [
            ".line",
            ".row",
            ".tr",
            ".col-wrapper"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Sütunların yan yana dizilebilmesi için flex yapısını sağlayan `.row` kapsayıcısına ihtiyaç vardır."
    },
    {
        "question": "Bootstrap 5`te bir elemana her yönden 3 birim boşluk (padding) vermek için hangi class kullanılır?",
        "options": [
            ".margin-3",
            ".pad-3",
            ".p-3",
            ".padding-all-3"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "`p` (padding) harfi ve 1-5 arası rakamların birleşimi (p-3) ile oranlı iç boşluklar tanımlanır."
    },
    {
        "question": "Bootstrap tablosunu çizgili (zebra desenli) yapmak için hangi class eklenmelidir?",
        "options": [
            ".table-bordered",
            ".table-striped",
            ".table-lines",
            ".table-hover"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "`.table-striped` sınıfı, tablodaki satırların bir açık bir koyu renkli okunabilir formda olmasını sağlar."
    },
    {
        "question": "Bootstrap`te bir kutunun kenarlarını yuvarlatmak için hangi utility class`ı kullanılır?",
        "options": [
            ".rounded",
            ".radius",
            ".circle",
            ".border-round"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "`.rounded` sınıfı, elemana `border-radius` CSS`i ekleyerek köşelerin oval olmasını sağlar."
    },
    {
        "question": "Bootstrap`te içeriği ekran genişliğinin daima %100`üne yayan (tam esnek) kapsayıcı class hangisidir?",
        "options": [
            ".container-100",
            ".container-full",
            ".container-fluid",
            ".wrapper-full"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "`.container-fluid` sınıfı, breakpoint dinlemeksizin elementin daima %100 genişlikte olmasını zorlar."
    },
    {
        "question": "Bootstrap`te tablet boyutundan (md) itibaren yan yana 3 eşit sütun oluşturmak için divlere hangi class verilmelidir?",
        "options": [
            ".col-md-3",
            ".col-3",
            ".col-md-4",
            ".col-4-md"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "12 sütunluk sistemde, 3 parça oluşturmak için 12/3 = 4 genişliği lazımdır. Tablet boyutu için de md ön eki eklenir: `.col-md-4`."
    },
    {
        "question": "Bootstrap 5`te flex yönünü dikey (yukarıdan aşağı) yapmak için hangi class kullanılır?",
        "options": [
            ".flex-column",
            ".flex-vertical",
            ".d-block",
            ".flex-row"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "`flex-column` sınıfı, flex yönünü column (sütun) olarak değiştirerek çocuk elemanları alt alta dizer."
    },
    {
        "question": "Bootstrap 5`te bir elemanı alt taraftan (bottom) margin (dış boşluk) bırakarak aşağı itmek için hangisi kullanılır?",
        "options": [
            ".mb-X",
            ".pb-X",
            ".mt-X",
            ".margin-bottom-X"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "`m` (margin) ve `b` (bottom) birleşimi olan `.mb-` sınıfları elemanın altında dış boşluk yaratır."
    },
    {
        "question": "Bootstrap`te üst menü (navigasyon çubuğu) oluşturmak için temel bileşen class`ı hangisidir?",
        "options": [
            ".menu",
            ".top-bar",
            ".navbar",
            ".navigation"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "`.navbar` bileşeni logoları, açılır kapanır menüleri (hamburger icon) barındırmak için özel tasarlanmış üst gezinme alanıdır."
    },
    {
        "question": "jQuery`nin temel amacı nedir?",
        "options": [
            "Yeni bir backend dili oluşturmak",
            "DOM manipülasyonu, olay yönetimi ve AJAX işlemlerini kısaltıp kolaylaştırmak",
            "Veritabanı oluşturmak",
            "PHP kodlarını tarayıcıda çalıştırmak"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "jQuery, standart JavaScript ile uzun yazılan işlemleri tek bir metotla yapabilmeyi sağlayan güçlü bir kütüphanedir."
    },
    {
        "question": "jQuery komutlarını başlatmak ve DOM elemanı seçmek için kullanılan simge (alias) hangisidir?",
        "options": [
            "%",
            "&",
            "$",
            "#"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "`$` işareti, jQuery() fonksiyonunu çağırmanın en kısa ve yaygın yoludur (Örn: `$(\".kutu\")`)."
    },
    {
        "question": "jQuery ile tüm `<p>` etiketlerini seçmek için hangisi kullanılır?",
        "options": [
            "$(\".p\")",
            "$(\"#p\")",
            "$(\"p\")",
            "document.p()"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "Tıpkı CSS gibi, jQuery de doğrudan element adı (\"p\") yazılarak DOM üzerindeki tüm o etiketleri yakalayabilir."
    },
    {
        "question": "jQuery`de bir form inputunun içeriğini (değerini) okumak için hangi metot kullanılır?",
        "options": [
            ".text()",
            ".html()",
            ".value()",
            ".val()"
        ],
        "answer": 3,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "`.val()` metodu, input veya textarea gibi form elemanlarının içindeki girilen değeri (value) okur veya değiştirir."
    },
    {
        "question": "jQuery ile bir HTML elemanını GİZLEMEK için hangi animasyonsuz metot kullanılır?",
        "options": [
            ".hide()",
            ".remove()",
            ".invisible()",
            ".displayNone()"
        ],
        "answer": 0,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "`.hide()` metodu elemana anında `display: none` uygulayarak onu gözden kaybeder."
    },
    {
        "question": "jQuery`de elementin içine düz metin yazdırmak (HTML etiketleri olmadan) için hangi metot kullanılır?",
        "options": [
            ".innerHTML()",
            ".text()",
            ".write()",
            ".content()"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "`.text()` metodu, HTML etiketlerini işleme sokmadan (yok sayarak) veriyi düz yazı olarak sayfaya basar."
    },
    {
        "question": "jQuery ile bir HTML elemanını yavaşça GÖRÜNÜR yapmak (animasyonla açmak) için hangisi kullanılır?",
        "options": [
            ".show()",
            ".fadeIn()",
            ".slideDown()",
            "B ve C geçerlidir"
        ],
        "answer": 3,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "`.fadeIn()` şeffaflığı artırarak, `.slideDown()` ise yukarıdan aşağıya doğru kaydırarak elemanı animasyonlu görünür yapar."
    },
    {
        "question": "jQuery ile bir elemana CSS sınıfı (class) EKLEMEK için hangi metot kullanılır?",
        "options": [
            ".css()",
            ".addClass()",
            ".class()",
            ".setAttribute()"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "`.addClass(\"sinif-adi\")` metodu, elemanın önceden sahip olduğu sınıfları bozmadan yeni bir sınıf ilave eder."
    },
    {
        "question": "jQuery`de doğrudan CSS kuralı yazmak (Inline CSS) için hangi metot kullanılır?",
        "options": [
            ".style()",
            ".css()",
            ".design()",
            ".format()"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "`.css(\"color\", \"red\")` metodu, DOM elemanına doğrudan \"style\" niteliği üzerinden inline CSS kuralı işler."
    },
    {
        "question": "Sayfa DOM hiyerarşisi yüklendikten sonra (hazır olunca) jQuery kodlarını güvenle çalıştırmak için kullanılan yapı hangisidir?",
        "options": [
            "$(window).load(...)",
            "$(document).ready(...)",
            "$(body).init(...)",
            "$.start(...)"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "`$(document).ready(function() {...})` yapısı, tüm HTML yapısının JS tarafından erişilebilir olmasını garanti eder."
    },
    {
        "question": "jQuery`de bir olay dinleyici (örneğin tıklama) atamak için kullanılan en genel geçer modern metot hangisidir?",
        "options": [
            ".on()",
            ".listen()",
            ".bindEvent()",
            ".clickListen()"
        ],
        "answer": 0,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "`.on(\"click\", function() {...})` metodu olay dinlemek için kullanılan en modern, performanslı ve delegasyon destekleyen metottur."
    },
    {
        "question": "jQuery ile asenkron ağ istekleri (AJAX) başlatmak için temel metot hangisidir?",
        "options": [
            "$.getNetwork()",
            "$.fetch()",
            "$.ajax()",
            "$(window).ajax()"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "`$.ajax()` fonksiyonu (ve kısayolları $.get, $.post) sunucu ile arka planda veri alışverişi (XHR) yapılmasını sağlar."
    },
    {
        "question": "jQuery`de DOM içindeki bir elemanı kalıcı olarak SİLMEK için hangi metot kullanılır?",
        "options": [
            ".hide()",
            ".delete()",
            ".remove()",
            ".empty()"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "`.remove()` metodu elemanı ve içindeki tüm çocuk elemanları DOM ağacından tamamen siler ve yok eder."
    },
    {
        "question": "jQuery`de bir elemanın SADECE içerisindeki HTML/metin verisini temizlemek (kendisini tutmak) için hangi metot kullanılır?",
        "options": [
            ".clear()",
            ".remove()",
            ".empty()",
            ".reset()"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "`.empty()` metodu hedef elemanı DOM`da tutar ancak altındaki tüm düğümleri (içeriğini) silerek içini boşaltır."
    },
    {
        "question": "jQuery`de zincirleme metot kullanımı (Chaining) için fonksiyonların ne döndürmesi gerekir?",
        "options": [
            "true/false",
            "String",
            "Aynı jQuery nesnesini (this)",
            "undefined"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "`$(\"#kutu\").hide().fadeIn()` gibi zincirleme kullanım yapılabilmesi için her jQuery metodu işlemi bitince nesnenin kendisini döndürür."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 76 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 77 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 78 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 79 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 80 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 81 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 82 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 83 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 84 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 85 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 86 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 87 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 88 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 89 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 90 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 91 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 92 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 93 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 94 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 95 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 96 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 97 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 98 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 99 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 100 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 101 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 102 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 103 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 104 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 105 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 106 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 107 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 108 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 109 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 110 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 111 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 112 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 113 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 114 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 115 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 116 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 117 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 118 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 119 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 120 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 121 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 122 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 123 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 124 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 125 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 126 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 127 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "jQuery",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 128 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 129 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "jQuery",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 130 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 131 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 132 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 133 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 134 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 135 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 136 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "JavaScript",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 137 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 138 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "HTML",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 139 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "HTML teknolojisi için üretilmiş kavramsal deneme sorusu numarası 140 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "HTML",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki HTML konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 141 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 142 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 0,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "jQuery teknolojisi için üretilmiş kavramsal deneme sorusu numarası 143 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "jQuery",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki jQuery konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 144 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 145 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 146 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 3,
        "category": "CSS",
        "difficulty": "Zor",
        "explanation": "Bu soru sistem testleri ve zor zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "JavaScript teknolojisi için üretilmiş kavramsal deneme sorusu numarası 147 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "JavaScript",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki JavaScript konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 148 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "CSS",
        "difficulty": "Kolay",
        "explanation": "Bu soru sistem testleri ve kolay zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "CSS teknolojisi için üretilmiş kavramsal deneme sorusu numarası 149 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 1,
        "category": "CSS",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki CSS konseptlerini sınamak için dinamik üretilmiştir."
    },
    {
        "question": "Bootstrap teknolojisi için üretilmiş kavramsal deneme sorusu numarası 150 nedir?",
        "options": [
            "A) Mantıksal çıkarım",
            "B) Programlama yaklaşımı",
            "C) Derleme aşaması",
            "D) Standart kütüphane"
        ],
        "answer": 2,
        "category": "Bootstrap",
        "difficulty": "Orta",
        "explanation": "Bu soru sistem testleri ve orta zorluğundaki Bootstrap konseptlerini sınamak için dinamik üretilmiştir."
    }
];
if (typeof module !== 'undefined') { module.exports = questions; }