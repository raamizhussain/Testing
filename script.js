// script.js

// Replace this with your Web App URL
const SHEET_JSON_URL = 'https://script.google.com/macros/s/AKfycbzOUwIjz4GcHjqHmgwQwX9kyA-9F8yTs2KzMNV-Fkdz-cBcMkwrKUZRKSJEfEL0Zjf2mQ/exec';

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('sheet-data');

    fetch(SHEET_JSON_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(row => {
                const tableRow = document.createElement('tr');

                // Create table cells for each row
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
            tableBody.innerHTML = '<tr><td colspan="2">Error loading data</td></tr>';
        });
});
