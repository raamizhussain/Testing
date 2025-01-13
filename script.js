// Use the CSV link you provided
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThq2qnsUO_jBqCLHlP1VZzyWZP72WKQtbLdDw1utmq0_xKkSc7D-mrb5JzF2qdDAKZIlnKZdNkdr6Q/pub?output=csv';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_CSV_URL)
        .then(response => response.text())  // Get the response as text (CSV format)
        .then(data => {
            const rows = data.split('\n');  // Split by newline to get individual rows
            const tableRows = rows.slice(1);  // Skip the header row

            tableRows.forEach(row => {
                const columns = row.split(',');  // Split each row by comma (CSV format)

                // Skip empty rows or rows with missing data
                if (columns.length < 3) return;

                const tableRow = document.createElement('tr');

                // Loop through each column and create a table cell for it
                columns.forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell || '-';  // Display '-' if the cell is empty
                    tableRow.appendChild(cellElement);
                });

                tableBody.appendChild(tableRow);  // Append the row to the table body
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);
            tableBody.innerHTML = `<tr><td colspan="3">Error loading data: ${error.message}</td></tr>`;  // Show an error message if the fetch fails
        });
});
