document.getElementById('buscarHistorial').addEventListener('click', function(event) {
  event.preventDefault();

  const pacienteId = document.getElementById('pacienteId').value;

  // Intentar hacer la solicitud al backend
  fetch(`https://hl7-fhir-ehr-ver-nica.onrender.com/service-request/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener el historial médico desde el backend.');
    }
    return response.json();
  })
  .then(data => {
    mostrarHistorial(data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al intentar obtener el historial desde el servidor. Usando datos simulados.');
    
    // Usar datos simulados si hay un error con el fetch
    const historialSimulado = [
      {
        fecha: "2024-11-15",
        diagnostico: "Hipertensión arterial",
        tratamiento: "Losartán 50mg una vez al día"
      },
      {
        fecha: "2025-01-22",
        diagnostico: "Diabetes tipo 2",
        tratamiento: "Metformina 850mg cada 12 horas"
      },
      {
        fecha: "2025-03-10",
        diagnostico: "Infección urinaria",
        tratamiento: "Nitrofurantoína 100mg cada 6 horas por 7 días"
      }
    ];
    mostrarHistorial(historialSimulado);
  });

  function mostrarHistorial(historial) {
    const resultados = document.getElementById('resultadosHistorial');
    resultados.innerHTML = '';

    if (historial.length === 0) {
      resultados.innerHTML = '<p>No se encontraron registros médicos para este paciente.</p>';
    } else {
      historial.forEach(entry => {
        resultados.innerHTML += `
          <div class="registro">
            <h3>Consulta del ${entry.fecha}</h3>
            <p><strong>Diagnóstico:</strong> ${entry.diagnostico}</p>
            <p><strong>Tratamiento:</strong> ${entry.tratamiento}</p>
          </div>
        `;
      });
    }
  }
});