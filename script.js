import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'public-anon-key'; // Llave pública
const supabase = createClient(supabaseUrl, supabaseKey);

async function addTip(amount, time, table, paymentMethod) {
    const { data, error } = await supabase
        .from('tips')
        .insert([{ amount, time, table, payment_method: paymentMethod }]);
    
    if (error) console.error(error);
    else console.log('Propina registrada:', data);
}

document.addEventListener('DOMContentLoaded', () => {
  const formSection = document.getElementById('formSection');
  const historySection = document.getElementById('historySection');
  const dashboard = document.getElementById('dashboard');

  


  


  // Botones de navegación
  document.getElementById('addTipBtn').addEventListener('click', () => {
      showForm('Añadir Propina', getAddTipForm());
  });

  document.getElementById('registerEntryBtn').addEventListener('click', () => {
      showForm('Registrar Entrada', getRegisterEntryForm());
  });

  document.getElementById('registerExitBtn').addEventListener('click', () => {
      showForm('Registrar Salida', getRegisterExitForm());
  });

  document.getElementById('viewHistoryBtn').addEventListener('click', () => {
      showHistory();
  });

  // Función para mostrar formularios
  function showForm(title, content) {
      formSection.innerHTML = `<h2>${title}</h2>${content}`;
      formSection.style.display = 'block';
      historySection.style.display = 'none';
      dashboard.style.display = 'none';
  }

  // Función para mostrar historial
  function showHistory() {
      formSection.style.display = 'none';
      historySection.style.display = 'block';
      dashboard.style.display = 'none';
      populateHistory();
  }

  // Formularios dinámicos
  function getAddTipForm() {
      return `
          <form id="addTipForm">
              <label for="amount">Monto:</label>
              <input type="number" id="amount" required>
              <label for="time">Hora:</label>
              <input type="time" id="time" required>
              <label for="table">Mesa:</label>
              <input type="text" id="table" required>
              <label for="paymentMethod">Método de pago:</label>
              <select id="paymentMethod" required>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="otro">Otro</option>
              </select>
              <button type="submit">Registrar</button>
          </form>
      `;
  }

  function getRegisterEntryForm() {
      return `
          <form id="entryForm">
              <label for="employee">Empleado:</label>
              <input type="text" id="employee" required>
              <label for="entryTime">Hora de Entrada:</label>
              <input type="time" id="entryTime" required>
              <button type="submit">Registrar</button>
          </form>
      `;
  }

  function getRegisterExitForm() {
      return `
          <form id="exitForm">
              <label for="employeeExit">Empleado:</label>
              <input type="text" id="employeeExit" required>
              <label for="exitTime">Hora de Salida:</label>
              <input type="time" id="exitTime" required>
              <button type="submit">Registrar</button>
          </form>
      `;
  }

  // Función para poblar historial
  function populateHistory() {
      const historyTableBody = document.getElementById('historyTableBody');
      historyTableBody.innerHTML = ''; // Limpia el contenido previo

      // Ejemplo de datos simulados
      const historyData = [
          { date: '2024-11-15', amount: 200, employee: 'Yeison', hours: 4 },
          { date: '2024-11-14', amount: 150, employee: 'Karla', hours: 3 },
          { date: '2024-11-13', amount: 300, employee: 'Rodrigo', hours: 5 },
      ];

      historyData.forEach((record) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${record.date}</td>
              <td>${record.amount}</td>
              <td>${record.employee}</td>
              <td>${record.hours}</td>
          `;
          historyTableBody.appendChild(row);
      });
  }
});
