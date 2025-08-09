// Wazuh Alerts (Example data)
new Chart(document.getElementById('wazuhChart'), {
    type: 'bar',
    data: {
        labels: ['Failed Logins', 'Malware Detected', 'File Changes'],
        datasets: [{
            label: 'Alerts',
            data: [12, 5, 8],
            backgroundColor: ['#f87171', '#fbbf24', '#34d399']
        }]
    }
});

// Skills Radar
new Chart(document.getElementById('skillsChart'), {
    type: 'radar',
    data: {
        labels: ['Python', 'C', 'Wazuh', 'Velociraptor', 'Splunk', 'Networking'],
        datasets: [{
            label: 'Skill Level',
            data: [8, 7, 9, 8, 6, 7],
            backgroundColor: 'rgba(56,189,248,0.2)',
            borderColor: '#38bdf8',
            pointBackgroundColor: '#38bdf8'
        }]
    }
});
