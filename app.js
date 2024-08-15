// API URL'sini tanımlıyoruz
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// HTML elementlerini seçiyoruz
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// Buton tıklama olayını dinliyoruz
btn.addEventListener("click", () => {
    // Kullanıcının girdiği kelimeyi alıyoruz
    let inpWord = document.getElementById("inp-word").value;
    console.log(inpWord); // Konsola girilen kelimeyi yazdırıyoruz

    // API'den kelime anlamını çekiyoruz
    fetch(`${url}${inpWord}`)
        .then((response) => response.json()) // Burada `json()` fonksiyonunu çağırıyoruz
        .then((data) => {
            console.log(data); // API'den gelen veriyi konsola yazdırıyoruz
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

                sound.setAttribute("src",`https:${data[0].phonetics[0].audio}`);

        })
        .catch( ()=>{
            result.innerHTML = ` <h3 class="error">Couldn't Find The Word</h3>`;
        })
        
});
function playSound(){
    sound.play();
}
