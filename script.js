
// Replace this with your Web App URL
const SHEET_JSON_URL = 'https://script.google.com/macros/s/AKfycbzOUwIjz4GcHjqHmgwQwX9kyA-9F8yTs2KzMNV-Fkdz-cBcMkwrKUZRKSJEfEL0Zjf2mQ/exec';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_JSON_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
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
