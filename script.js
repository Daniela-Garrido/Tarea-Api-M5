const API_URL = 'https://api.boostr.cl/feriados/en.json';

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        document.getElementById('loadingMessage').classList.add('d-none');
        document.getElementById('holidaysContainer').classList.remove('d-none');

        const currentYear = new Date().getFullYear();
        const holidaysList = document.getElementById('holidaysList');

        data.data.forEach(holiday => {
            const holidayYear = new Date(holiday.date).getFullYear();
            if (holidayYear === currentYear) {
                const cardClass = holiday.inalienable ? 'card holiday-card inalienable' : 'card holiday-card';

                const holidayCard = document.createElement('div');
                holidayCard.className = 'col-md-6 col-lg-4 mb-4';
                holidayCard.innerHTML = `
                            <div class="${cardClass}">
                                <div class="card-body">
                                    <h5 class="card-title">${holiday.title}</h5>
                                    <p class="card-text"><strong>Fecha:</strong> ${holiday.date}</p>
                                    <p class="card-text"><strong>Tipo:</strong> ${holiday.type}</p>
                                </div>
                            </div>
                        `;
                holidaysList.appendChild(holidayCard);
            }
        });
    })
    .catch(error => {
        document.getElementById('loadingMessage').innerHTML = `
                    <div class="alert alert-danger">
                        Error al cargar los feriados: ${error.message}
                    </div>
                `;
    });