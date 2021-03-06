const renderCard = (data) => {
    let divElement = document.querySelector(".naver-team-wrapper");
    const html = `
        <div class="card">
            <img class="card-pic" src="${data.image_url}" >
            <p class="card-name">${data.name}</p>
            <h6 class="card-title">${data.job_role}</h6>
        </div>
    `;

    divElement.insertAdjacentHTML('beforeend', html);
  };

const requestData = async () => {
    try {
        const res = await fetch ("https://my-json-server.typicode.com/naveteam/fake-api/navers");
        let data = await res.json();
        for (let i = 0; i < data.length; i++) {
            renderCard(data[i]);
        }
    } catch (err){
        console.log("Há uma problema na requisição...")
    }
}
requestData();


