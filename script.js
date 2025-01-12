// script.js

// Published Google Sheet as JSON feed URL
const SHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQCLXQCYn4DP1So-8Ih5IX6OuVMt5ADbBlWk9JUuD8iOkLdYiax2cZi2MeiR4yz-3yJJZQdesb0-8U/pub?output=tsv';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_JSON_URL)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split('\t'); // Split the header row by tab
            const tableRows = rows.slice(1); // Skip the header row

            tableRows.forEach(row => {
                const columns = row.split('\t'); // Split each row by tab
                const tableRow = document.createElement('tr');

                columns.forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell || '-';
                    tableRow.appendChild(cellElement);
                });

                tableBody.appendChild(tableRow);
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
        });
});
