document.getElementById('generarInforme').addEventListener('click', function(event) {
  event.preventDefault();

  fetch('https://hl7-fhir-ehr-ver-nica.onrender.com/service-request', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw new Error('No se pudieron obtener los datos de visitas.');
    return response.json();
  })
  .then(data => {
    const informe = generarFrecuenciaVisitas(data);
    mostrarInforme(informe);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al generar el informe.');
  });

  function generarFrecuenciaVisitas(visitas) {
    const frecuencia = {};

    visitas.forEach(v => {
      const paciente = v.pacienteId;
      const mes = new Date(v.fecha).toLocaleString('default', { year: 'numeric', month: 'long' });

      if (!frecuencia[paciente]) {
        frecuencia[paciente] = {};
      }

      if (!frecuencia[paciente][mes]) {
        frecuencia[paciente][mes] = 0;
      }

      frecuencia[paciente][mes]++;
    });

    return frecuencia;
  }

  function mostrarInforme(frecuencia) {
    const informeDiv = document.getElementById('informeVisitas');
    informeDiv.innerHTML = '<h3>Informe de Frecuencia de Visitas</h3>';

    for (const paciente in frecuencia) {
      informeDiv.innerHTML += `<h4>Paciente ID: ${paciente}</h4>`;
      const meses = frecuencia[paciente];
      for (const mes in meses) {
        informeDiv.innerHTML += `<p>${mes}: ${meses[mes]} visitas</p>`;
      }
    }
  }
});
