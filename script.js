const SHEET_JSON_URL = 'https://script.google.com/macros/s/AKfycbytnQZCtWEXdqfgh4Hgg8l9uGV4jmvWw0sua4VL8APdfnH0CITIPG6gSiu5SwYGIm29SA/exec';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_JSON_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }

            data.forEach(row => {
                const tableRow = document.createElement('tr');

                Object.values(row).forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell || '-';
                    tableRow.appendChild(cellElement);
                });

                tableBody.appendChild(tableRow);
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);
            tableBody.innerHTML = `<tr><td colspan="3">Error loading data: ${error.message}</td></tr>`;
        });
});
