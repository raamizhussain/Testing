// script.js

// Published Google Sheet as JSON feed URL
const SHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThq2qnsUO_jBqCLHlP1VZzyWZP72WKQtbLdDw1utmq0_xKkSc7D-mrb5JzF2qdDAKZIlnKZdNkdr6Q/pub?output=csv
';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_JSON_URL)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const tableRows = rows.slice(1); // Skip the header row

            tableRows.forEach(row => {
                const columns = row.split('\t'); // Split each row by tab

                // Skip if row doesn't have expected columns
                if (columns.length < 6) return;

                // Remove the first column (timestamp)
                const filteredColumns = columns.slice(1);

                const tableRow = document.createElement('tr');

                filteredColumns.forEach(cell => {
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
