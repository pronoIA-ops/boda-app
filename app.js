/**
 * PWA "Mi Boda" - Planificador Personal
 * Archivo: app.js
 */

// ==========================================
// 1. CONSTANTES Y ESTADO INICIAL
// ==========================================
const STORAGE_KEY = 'wedding_planner_data_v3';
const CORRUPTED_KEY_PREFIX = 'wedding_planner_corrupted_';

// 76 TAREAS EXTRAÍDAS DEL EXCEL "Plan maestro.xlsx"
const INITIAL_TASKS = [
  { "id": "task-1", "title": "Definir fecha exacta", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Completado" },
  { "id": "task-2", "title": "Definir número aproximado de invitados", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "En proceso" },
  { "id": "task-3", "title": "Establecer presupuesto máximo", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Completado" },
  { "id": "task-4", "title": "Reservar lugar de ceremonia", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Completado" },
  { "id": "task-5", "title": "Reservar lugar de recepción", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Completado" },
  { "id": "task-6", "title": "Contratar fotógrafo", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Mary", "dueDate": "2026-09-24", "status": "Pendiente" },
  { "id": "task-7", "title": "Contratar DJ / música", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Mary", "dueDate": "2026-09-24", "status": "Pendiente" },
  { "id": "task-8", "title": "Definir catering / comida", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Mary", "dueDate": "2026-09-24", "status": "En proceso" },
  { "id": "task-9", "title": "Comprar / encargar vestido", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Mary", "dueDate": "2026-09-24", "status": "Pendiente" },
  { "id": "task-10", "title": "Definir traje del novio", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Tomas", "dueDate": "2026-09-24", "status": "Pendiente" },
  { "id": "task-11", "title": "Elegir padrinos / damas / pajes", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Media", "responsible": "Mary / Tomas", "dueDate": "2026-09-30", "status": "Pendiente" },
  { "id": "task-12", "title": "Definir si habrá ceremonia religiosa", "phase": "🔴 AHORA — SEPTIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Completado" },
  { "id": "task-13", "title": "Diseñar y preparar invitaciones", "phase": "🟠 OCTUBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-14", "title": "Cerrar lista de invitados", "phase": "🟠 OCTUBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-15", "title": "Contratar florista", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "En proceso" },
  { "id": "task-16", "title": "Definir decoración", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-17", "title": "Encargar pastel", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-18", "title": "Contratar maquillaje", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-19", "title": "Contratar peinado", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-20", "title": "Elegir ramo y boutonnieres", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-21", "title": "Elegir zapatos y accesorios", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-22", "title": "Comprar / encargar alianzas", "phase": "🟠 OCTUBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-23", "title": "Definir transporte", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-24", "title": "Definir menú y bebidas", "phase": "🟠 OCTUBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-25", "title": "Elegir canciones importantes", "phase": "🟠 OCTUBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-26", "title": "Definir programa de ceremonia", "phase": "🟠 OCTUBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-27", "title": "Enviar invitaciones", "phase": "🟡 NOVIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-28", "title": "Confirmar padrinos / damas", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-29", "title": "Confirmar vestidos y trajes", "phase": "🟡 NOVIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-30", "title": "Hacer prueba de vestido", "phase": "🟡 NOVIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-31", "title": "Hacer prueba de maquillaje", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-32", "title": "Hacer prueba de peinado", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-33", "title": "Confirmar decoración y flores", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-34", "title": "Confirmar menú y pastel", "phase": "🟡 NOVIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-35", "title": "Preparar recuerdos, si habrá", "phase": "🟡 NOVIEMBRE", "priority": "Baja", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-36", "title": "Preparar nombres / números de mesa", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-37", "title": "Definir seating chart preliminar", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-38", "title": "Preparar votos", "phase": "🟡 NOVIEMBRE", "priority": "Baja", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-39", "title": "Definir discursos", "phase": "🟡 NOVIEMBRE", "priority": "Baja", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-40", "title": "Preparar playlist", "phase": "🟡 NOVIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-41", "title": "Cerrar Respuestas de invitados", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-42", "title": "Confirmar número final de invitados", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-43", "title": "Hacer distribución final de mesas", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-44", "title": "Confirmar todos los proveedores", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-45", "title": "Confirmar horarios con proveedores", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-46", "title": "Preparar pagos finales", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-47", "title": "Confirmar ceremonia con oficiante / pastor", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-48", "title": "Recoger vestido", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-49", "title": "Recoger traje", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-50", "title": "Recoger alianzas", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-51", "title": "Preparar kit de emergencia", "phase": "🟢 DICIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-52", "title": "Preparar decoración", "phase": "🟢 DICIEMBRE", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-53", "title": "Preparar documentos legales", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-54", "title": "Crear cronograma del día", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-55", "title": "Asignar responsables del día", "phase": "🟢 DICIEMBRE", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-56", "title": "Confirmar todos los proveedores", "phase": "💒 SEMANA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-57", "title": "Confirmar invitados importantes", "phase": "💒 SEMANA DE LA BODA", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-58", "title": "Entregar cronograma a responsables", "phase": "💒 SEMANA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-59", "title": "Preparar pagos / propinas", "phase": "💒 SEMANA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-60", "title": "Preparar decoración y materiales", "phase": "💒 SEMANA DE LA BODA", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-61", "title": "Preparar kit de emergencia", "phase": "💒 SEMANA DE LA BODA", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-62", "title": "Preparar maleta de la pareja", "phase": "💒 SEMANA DE LA BODA", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-63", "title": "Confirmar transporte", "phase": "💒 SEMANA DE LA BODA", "priority": "Media", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-64", "title": "Ensayo de ceremonia", "phase": "💍 DÍA ANTERIOR", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-65", "title": "Entregar / asegurar anillos", "phase": "💍 DÍA ANTERIOR", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-66", "title": "Preparar vestido y traje", "phase": "💍 DÍA ANTERIOR", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-67", "title": "Revisar documentos", "phase": "💍 DÍA ANTERIOR", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-68", "title": "Descansar y evitar cambios grandes", "phase": "💍 DÍA ANTERIOR", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-69", "title": "Coordinación de proveedores", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-70", "title": "Supervisar decoración", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-71", "title": "Coordinar música", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-72", "title": "Coordinar fotógrafo", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-73", "title": "Coordinar catering", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-74", "title": "Custodiar regalos / sobres", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-75", "title": "Emergencias de la novia", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" },
  { "id": "task-76", "title": "Emergencias del novio", "phase": "❤️ DÍA DE LA BODA", "priority": "Alta", "responsible": "Sin asignar", "dueDate": "", "status": "Pendiente" }
];

const INITIAL_STATE = {
  weddingDetails: {
    coupleNames: "Ana & Carlos",
    date: "2027-09-18",
    location: "Hacienda El Paraíso",
    totalBudget: 18000,
    currencySymbol: "€"
  },
  spaces: {
    ceremony: { name: "Parroquia San Francisco", address: "Calle Mayor 12", contact: "Padre Miguel - 600000000", notes: "Llegar 30 min antes" },
    banquet: { name: "Hacienda El Paraíso", address: "Carretera del Sol Km 15", contact: "Laura - 611111111", notes: "Cóctel en los jardines principales" }
  },
  suppliers: [
    { id: "sup-1", name: "Catering Gourmet", category: "Catering", totalAmount: 6500, paidAmount: 2500, phone: "622222222", notes: "Menú degustación completado" },
    { id: "sup-2", name: "Fotografía Luz", category: "Fotografía", totalAmount: 1800, paidAmount: 500, phone: "633333333", notes: "Incluye sesión preboda" }
  ],
  guests: [
    { id: "guest-1", name: "María García", group: "Familia Novia", status: "Confirmado", menu: "Adulto", allergies: "Sin gluten", plusOneAllowed: true, plusOneName: "Juan Pérez", table: "Mesa 1" },
    { id: "guest-2", name: "Pedro Martínez", group: "Amigos", status: "Pendiente", menu: "Adulto", allergies: "", plusOneAllowed: false, plusOneName: "", table: "Sin asignar" }
  ],
  tasks: INITIAL_TASKS,
  expenses: [
    { id: "exp-1", concept: "Alquiler Finca", category: "Lugar", realCost: 4500, estimatedCost: 4500, status: "Pagado" },
    { id: "exp-2", concept: "Señal Catering", category: "Catering", realCost: 2500, estimatedCost: 6500, status: "Parcial" }
  ],
  itinerary: [
    { id: "it-1", timeStart: "17:00", title: "Ceremonia Nupcial", details: "Llegada de invitados a las 16:30", location: "Parroquia San Francisco" },
    { id: "it-2", timeStart: "19:00", title: "Cóctel de Bienvenida", details: "Música en vivo y aperitivos", location: "Jardín Hacienda" },
    { id: "it-3", timeStart: "21:00", title: "Cena y Brindis", details: "Plato principal y pastel", location: "Salón Principal" }
  ],
  tables: [
    { id: "tbl-1", name: "Mesa 1", capacity: 8, shape: "Redonda" },
    { id: "tbl-2", name: "Mesa Presidencial", capacity: 6, shape: "Rectangular" }
  ],
  notes: [
    { id: "note-1", title: "Ideas de decoración", category: "Ideas & Inspiración", content: "Flores silvestres, tonos pastel y luces cálidas colgantes." }
  ]
};

// Módulos disponibles
const MODULES = [
  { id: 'resumen', name: 'Resumen', icon: 'layout-dashboard' },
  { id: 'invitados', name: 'Lista de Invitados', icon: 'users' },
  { id: 'espacios', name: 'Espacios', icon: 'map-pin' },
  { id: 'proveedores', name: 'Proveedores', icon: 'briefcase' },
  { id: 'web-invitados', name: 'Sitio Web & RSVP', icon: 'globe' },
  { id: 'tareas', name: 'Lista de Tareas', icon: 'check-square' },
  { id: 'presupuesto', name: 'Presupuesto', icon: 'wallet' },
  { id: 'itinerario', name: 'Itinerario', icon: 'clock' },
  { id: 'mesas', name: 'Distribución Mesas', icon: 'grid' },
  { id: 'notas', name: 'Notas e Ideas', icon: 'file-text' },
  { id: 'configuracion', name: 'Configuración y Copias', icon: 'settings' }
];

// Estado global en memoria
let store = null;
let isLocalStorageAvailable = true;
let activeModule = 'resumen';
let guestSearchQuery = "";
let guestStatusFilter = "todos";
let deferredPrompt = null;

// Filtros globales para el módulo de Tareas
let taskSearchQuery = "";
let taskPhaseFilter = "todas";
let taskStatusFilter = "todos";
let taskPriorityFilter = "todas";
let taskResponsibleFilter = "todos";

// Fases de las Tareas en Orden
const TASK_PHASES = [
  "🔴 AHORA — SEPTIEMBRE",
  "🟠 OCTUBRE",
  "🟡 NOVIEMBRE",
  "🟢 DICIEMBRE",
  "💒 SEMANA DE LA BODA",
  "💍 DÍA ANTERIOR",
  "❤️ DÍA DE LA BODA"
];

// ==========================================
// 2. GESTIÓN DE SEGURIDAD Y PERSISTENCIA
// ==========================================

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

function cloneInitialState() {
  if (typeof structuredClone === 'function') {
    return structuredClone(INITIAL_STATE);
  }
  return JSON.parse(JSON.stringify(INITIAL_STATE));
}

function safeGetStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage no accesible para lectura:', e);
    isLocalStorageAvailable = false;
    return null;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn('localStorage no accesible para escritura:', e);
    isLocalStorageAvailable = false;
    return false;
  }
}

function loadData() {
  const defaultData = cloneInitialState();
  const rawData = safeGetStorage(STORAGE_KEY);

  if (!rawData) {
    safeSetStorage(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(rawData);
    
    const validated = {
      weddingDetails: (parsed.weddingDetails && typeof parsed.weddingDetails === 'object') ? { ...defaultData.weddingDetails, ...parsed.weddingDetails } : defaultData.weddingDetails,
      spaces: (parsed.spaces && typeof parsed.spaces === 'object') ? { ...defaultData.spaces, ...parsed.spaces } : defaultData.spaces,
      suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : defaultData.suppliers,
      guests: Array.isArray(parsed.guests) ? parsed.guests : defaultData.guests,
      tasks: Array.isArray(parsed.tasks) && parsed.tasks.length > 0 ? parsed.tasks : defaultData.tasks,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : defaultData.expenses,
      itinerary: Array.isArray(parsed.itinerary) ? parsed.itinerary : defaultData.itinerary,
      tables: Array.isArray(parsed.tables) ? parsed.tables : defaultData.tables,
      notes: Array.isArray(parsed.notes) ? parsed.notes : defaultData.notes
    };

    return validated;
  } catch (e) {
    console.error('Datos corruptos en localStorage:', e);
    safeSetStorage(CORRUPTED_KEY_PREFIX + Date.now(), rawData);
    
    setTimeout(() => {
      showToast('Se detectó un error en los datos guardados. Se han restaurado los datos iniciales de respaldo.', 'error');
    }, 500);

    return defaultData;
  }
}

function saveData() {
  const success = safeSetStorage(STORAGE_KEY, JSON.stringify(store));
  if (!success && !isLocalStorageAvailable) {
    showToast('Modo sin almacenamiento: Los cambios se mantendrán solo durante la sesión actual.', 'info');
  }
  scheduleCloudSave();
  updateUI();
}

// ==========================================
// SINCRONIZACIÓN CON SUPABASE
// ==========================================
let cloudReady = false;
let cloudTimer = null;

function normalizeStore(parsed) {
  const d = cloneInitialState();
  return {
    weddingDetails: (parsed.weddingDetails && typeof parsed.weddingDetails === 'object') ? { ...d.weddingDetails, ...parsed.weddingDetails } : d.weddingDetails,
    spaces: (parsed.spaces && typeof parsed.spaces === 'object') ? { ...d.spaces, ...parsed.spaces } : d.spaces,
    suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : d.suppliers,
    guests: Array.isArray(parsed.guests) ? parsed.guests : d.guests,
    tasks: Array.isArray(parsed.tasks) && parsed.tasks.length > 0 ? parsed.tasks : d.tasks,
    expenses: Array.isArray(parsed.expenses) ? parsed.expenses : d.expenses,
    itinerary: Array.isArray(parsed.itinerary) ? parsed.itinerary : d.itinerary,
    tables: Array.isArray(parsed.tables) ? parsed.tables : d.tables,
    notes: Array.isArray(parsed.notes) ? parsed.notes : d.notes
  };
}

async function loadFromCloud() {
  try {
    if (!window.supabaseClient) throw new Error('Supabase no cargó');
    const { data, error } = await supabaseClient
      .from('wedding_data')
      .select('content')
      .eq('id', 1)
      .single();
    if (error) throw error;

    if (data && data.content && data.content.weddingDetails) {
      // La nube ya tiene datos: son los que mandan
      store = normalizeStore(data.content);
      safeSetStorage(STORAGE_KEY, JSON.stringify(store));
      updateUI();
    } else {
      // La nube está vacía: subimos los datos de este dispositivo
      await saveToCloud();
    }
    cloudReady = true;
    showToast('Sincronizado con la nube', 'success');
  } catch (e) {
    console.error(e);
    showToast('No se pudo conectar con la nube. Los cambios no se compartirán.', 'error');
  }
}

function scheduleCloudSave() {
  if (!cloudReady) return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(saveToCloud, 800);
}

async function saveToCloud() {
  try {
    const { error } = await supabaseClient
      .from('wedding_data')
      .update({ content: store })
      .eq('id', 1);
    if (error) throw error;
  } catch (e) {
    console.error(e);
    showToast('No se pudo guardar en la nube', 'error');
  }
}

// ==========================================
// 3. MANEJO GLOBAL DE ERRORES Y NOTIFICACIONES
// ==========================================

window.onerror = function (msg, url, lineNo, columnNo, error) {
  showGlobalError(`Error de ejecución: ${msg} (Línea ${lineNo})`);
  return false;
};

window.addEventListener('unhandledrejection', function (event) {
  showGlobalError(`Promesa no capturada: ${event.reason}`);
});

function showGlobalError(message) {
  const banner = document.getElementById('global-error-banner');
  const msgElem = document.getElementById('global-error-message');
  if (banner && msgElem) {
    msgElem.textContent = message;
    banner.classList.remove('hidden');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const bgClass = type === 'error' ? 'bg-rose-600 text-white' : type === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white';
  
  const toast = document.createElement('div');
  toast.className = `px-4 py-3 rounded-2xl shadow-xl font-medium text-sm flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 animate-fade-in ${bgClass}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 4. INICIALIZACIÓN Y NAVEGACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    store = loadData();
    renderNavigation();
    switchModule('resumen');
    setupPWAInstall();
    setupKeyboardListeners();
    loadFromCloud();
  } catch (err) {
    showGlobalError('Falló el arranque de la aplicación: ' + err.message);
  }
});

function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileDrawer();
    }
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('SW registrado correctamente:', reg.scope);
        })
        .catch(err => {
          console.warn('Fallo en registro de SW:', err);
        });
    });
  }
}
registerServiceWorker();

function setupPWAInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('pwa-install-btn');
    if (btn) {
      btn.classList.remove('hidden');
      btn.onclick = () => {
        btn.classList.add('hidden');
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('¡Gracias por instalar Mi Boda!', 'success');
          }
          deferredPrompt = null;
        });
      };
    }
  });

  window.addEventListener('appinstalled', () => {
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.classList.add('hidden');
    showToast('Aplicación PWA instalada con éxito', 'success');
  });
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;
  
  const isOpen = !drawer.classList.contains('-translate-x-full');
  if (isOpen) {
    closeMobileDrawer();
  } else {
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('-translate-x-full');
    }, 10);
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;
  drawer.classList.add('-translate-x-full');
  backdrop.classList.add('opacity-0');
  setTimeout(() => { backdrop.classList.add('hidden'); }, 300);
}

function renderNavigation() {
  const desktopNav = document.getElementById('desktop-menu');
  const mobileDrawerNav = document.getElementById('mobile-drawer-menu');
  const mobileBottomNav = document.getElementById('mobile-menu');

  if (desktopNav) {
    desktopNav.innerHTML = MODULES.map(mod => `
      <button onclick="switchModule('${mod.id}')" class="flex items-center w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeModule === mod.id ? 'bg-wedding-50 text-wedding-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
        <i data-lucide="${mod.icon}" class="mr-3 h-5 w-5 ${activeModule === mod.id ? 'text-wedding-600' : 'text-slate-400'}"></i>${escapeHtml(mod.name)}
      </button>
    `).join('');
  }

  if (mobileDrawerNav) {
    mobileDrawerNav.innerHTML = MODULES.map(mod => `
      <button onclick="switchModule('${mod.id}')" class="flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeModule === mod.id ? 'bg-wedding-50 text-wedding-700 font-bold border border-wedding-200' : 'text-slate-700 hover:bg-slate-100'}">
        <i data-lucide="${mod.icon}" class="mr-3.5 h-5 w-5 ${activeModule === mod.id ? 'text-wedding-600' : 'text-slate-400'}"></i>
        <span>${escapeHtml(mod.name)}</span>
      </button>
    `).join('');
  }

  if (mobileBottomNav) {
    const mainMobileIds = ['resumen', 'invitados', 'tareas', 'presupuesto'];
    const mainMobileModules = MODULES.filter(m => mainMobileIds.includes(m.id));
    let html = mainMobileModules.map(mod => `
      <button onclick="switchModule('${mod.id}')" class="flex flex-col items-center py-1 px-2.5 rounded-xl ${activeModule === mod.id ? 'text-wedding-600 font-bold' : 'text-slate-500'}">
        <i data-lucide="${mod.icon}" class="w-5 h-5"></i>
        <span class="text-[10px] mt-1">${escapeHtml(mod.name)}</span>
      </button>
    `).join('');
    html += `
      <button onclick="toggleMobileDrawer()" class="flex flex-col items-center py-1 px-2.5 rounded-xl text-slate-500">
        <i data-lucide="menu" class="w-5 h-5"></i>
        <span class="text-[10px] mt-1">Más</span>
      </button>
    `;
    mobileBottomNav.innerHTML = html;
  }
  if (window.lucide) lucide.createIcons();
}

function switchModule(moduleId) {
  activeModule = moduleId;
  const modObj = MODULES.find(m => m.id === moduleId);
  const titleElem = document.getElementById('mobile-title');
  if (titleElem && modObj) titleElem.textContent = modObj.name;
  closeMobileDrawer();
  renderNavigation();
  renderModuleContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI() {
  renderNavigation();
  renderModuleContent();
}

function renderModuleContent() {
  const container = document.getElementById('app-content');
  if (!container) return;
  
  try {
    switch (activeModule) {
      case 'resumen': container.innerHTML = renderResumenModule(); break;
      case 'invitados': container.innerHTML = renderInvitadosModule(); break;
      case 'espacios': container.innerHTML = renderEspaciosModule(); break;
      case 'proveedores': container.innerHTML = renderProveedoresModule(); break;
      case 'web-invitados': container.innerHTML = renderWebInvitadosModule(); break;
      case 'tareas': container.innerHTML = renderTareasModule(); break;
      case 'presupuesto': container.innerHTML = renderPresupuestoModule(); break;
      case 'itinerario': container.innerHTML = renderItinerarioModule(); break;
      case 'mesas': container.innerHTML = renderMesasModule(); break;
      case 'notas': container.innerHTML = renderNotasModule(); break;
      case 'configuracion': container.innerHTML = renderConfiguracionModule(); break;
      default: container.innerHTML = `<div class="p-8 text-center text-slate-500"><p>Módulo no encontrado.</p></div>`;
    }
  } catch (err) {
    console.error(`Error renderizando módulo ${activeModule}:`, err);
    container.innerHTML = `
      <div class="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center text-rose-900">
        <i data-lucide="alert-octagon" class="w-10 h-10 mx-auto text-rose-600 mb-2"></i>
        <h3 class="font-bold text-lg">Error al cargar este módulo</h3>
        <p class="text-xs text-rose-700 mt-1">${escapeHtml(err.message)}</p>
        <button onclick="switchModule('resumen')" class="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold">Volver al Resumen</button>
      </div>
    `;
  }
  
  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 5. MODALES Y UTILIDADES FORMATO
// ==========================================

function openModal(title, contentHtml) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-container');
  const titleElem = document.getElementById('modal-title');
  const bodyElem = document.getElementById('modal-body');

  if (!backdrop || !container || !titleElem || !bodyElem) return;

  titleElem.textContent = title;
  bodyElem.innerHTML = contentHtml;

  backdrop.classList.remove('hidden');
  container.classList.remove('hidden');
  container.classList.add('flex');

  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-container');
  if (!backdrop || !container) return;

  backdrop.classList.add('hidden');
  container.classList.add('hidden');
  container.classList.remove('flex');
}

function formatMoney(amount) {
  const symbol = (store && store.weddingDetails && store.weddingDetails.currencySymbol) ? store.weddingDetails.currencySymbol : '€';
  return `${Number(amount || 0).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${symbol}`;
}

function calculateCountdown(targetDateStr) {
  if (!targetDateStr) return { days: 0, hours: 0, mins: 0 };
  const target = new Date(targetDateStr + 'T00:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / 1000 / 60) % 60);

  return { days, hours, mins };
}

// ==========================================
// 6. IMPLEMENTACIÓN COMPLETA DE MÓDULOS
// ==========================================

// --- MÓDULO RESUMEN ---
function renderResumenModule() {
  const details = store.weddingDetails;
  const countdown = calculateCountdown(details.date);
  
  const totalGuests = store.guests.length;
  const confirmedGuests = store.guests.filter(g => g.status === 'Confirmado').length;
  const pendingGuests = store.guests.filter(g => g.status === 'Pendiente').length;
  const declinedGuests = store.guests.filter(g => g.status === 'Rechazado').length;

  const totalTasks = store.tasks.length;
  const completedTasks = store.tasks.filter(t => t.status === 'Completado' || t.status === 'completada').length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalSpent = store.expenses.reduce((acc, curr) => acc + Number(curr.realCost || 0), 0);
  const totalPaidSuppliers = store.suppliers.reduce((acc, curr) => acc + Number(curr.paidAmount || 0), 0);

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-gradient-to-r from-wedding-600 to-rose-700 rounded-3xl p-6 text-white shadow-lg">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">Mi Boda</span>
            <h2 class="text-3xl font-extrabold">${escapeHtml(details.coupleNames)}</h2>
            <p class="text-wedding-100 text-sm mt-1 flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-4 h-4"></i> ${escapeHtml(details.date)} &bull; 
              <i data-lucide="map-pin" class="w-4 h-4"></i> ${escapeHtml(details.location)}
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex gap-4 text-center border border-white/20">
            <div><span class="text-2xl font-black block">${countdown.days}</span><span class="text-[10px] uppercase text-wedding-100">Días</span></div>
            <div class="border-r border-white/20"></div>
            <div><span class="text-2xl font-black block">${countdown.hours}</span><span class="text-[10px] uppercase text-wedding-100">Horas</span></div>
            <div class="border-r border-white/20"></div>
            <div><span class="text-2xl font-black block">${countdown.mins}</span><span class="text-[10px] uppercase text-wedding-100">Min</span></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase">Invitados Confirmados</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">${confirmedGuests} <span class="text-xs font-normal text-slate-400">/ ${totalGuests}</span></h3>
            <p class="text-xs text-amber-600 mt-1">${pendingGuests} pendientes &bull; ${declinedGuests} rechazados</p>
          </div>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><i data-lucide="users" class="w-6 h-6"></i></div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase">Progreso Plan Maestro</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">${taskProgress}%</h3>
            <p class="text-xs text-slate-500 mt-1">${completedTasks} de ${totalTasks} tareas completadas</p>
          </div>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><i data-lucide="check-square" class="w-6 h-6"></i></div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase">Presupuesto Gastado</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">${formatMoney(totalSpent)}</h3>
            <p class="text-xs text-slate-500 mt-1">Meta: ${formatMoney(details.totalBudget)}</p>
          </div>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-2xl"><i data-lucide="wallet" class="w-6 h-6"></i></div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase">Pagado a Proveedores</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">${formatMoney(totalPaidSuppliers)}</h3>
            <p class="text-xs text-slate-500 mt-1">${store.suppliers.length} proveedores contratados</p>
          </div>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-2xl"><i data-lucide="briefcase" class="w-6 h-6"></i></div>
        </div>
      </div>
    </div>
  `;
}

// --- MÓDULO INVITADOS ---
function renderInvitadosModule() {
  const filteredGuests = store.guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(guestSearchQuery.toLowerCase()) || 
                          (g.group && g.group.toLowerCase().includes(guestSearchQuery.toLowerCase()));
    const matchesStatus = guestStatusFilter === 'todos' || g.status.toLowerCase() === guestStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Lista de Invitados</h2>
          <p class="text-slate-500 text-sm">Gestiona confirmaciones, menús y distribución de acompañantes</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="document.getElementById('csv-file-input').click()" class="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5">
            <i data-lucide="upload" class="w-4 h-4"></i> Importar CSV
          </button>
          <button onclick="exportGuestsCSV()" class="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5">
            <i data-lucide="download" class="w-4 h-4"></i> Exportar
          </button>
          <button onclick="openAddGuestModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-wedding-700 flex items-center gap-1.5">
            <i data-lucide="plus" class="w-4 h-4"></i> Añadir
          </button>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 justify-between">
        <div class="relative flex-1">
          <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input type="text" value="${escapeHtml(guestSearchQuery)}" oninput="handleGuestSearch(this.value)" placeholder="Buscar por nombre o grupo..." class="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-wedding-500">
        </div>
        <div class="flex gap-1 overflow-x-auto pb-1 md:pb-0">
          ${['todos', 'confirmado', 'pendiente', 'rechazado'].map(st => `
            <button onclick="setGuestStatusFilter('${st}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${guestStatusFilter === st ? 'bg-wedding-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              ${st}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th class="px-6 py-4">Nombre</th>
                <th class="px-6 py-4">Grupo</th>
                <th class="px-6 py-4">Estado</th>
                <th class="px-6 py-4">Menú / Alergias</th>
                <th class="px-6 py-4">Mesa</th>
                <th class="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100" id="guests-table-body">
              ${filteredGuests.length === 0 ? `
                <tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No se encontraron invitados.</td></tr>
              ` : filteredGuests.map(g => `
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900">
                    ${escapeHtml(g.name)}
                    ${g.plusOneAllowed ? `<span class="block text-xs font-normal text-slate-500">+1: ${escapeHtml(g.plusOneName || 'Acompañante')}</span>` : ''}
                  </td>
                  <td class="px-6 py-4"><span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">${escapeHtml(g.group || 'Sin Grupo')}</span></td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${g.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : g.status === 'Rechazado' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}">
                      ${escapeHtml(g.status)}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-600">
                    <div>${escapeHtml(g.menu || 'Adulto')}</div>
                    ${g.allergies ? `<div class="text-xs text-rose-600 font-medium">⚠️ ${escapeHtml(g.allergies)}</div>` : ''}
                  </td>
                  <td class="px-6 py-4 text-slate-600">${escapeHtml(g.table || 'Sin asignar')}</td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button onclick="openEditGuestModal('${escapeHtml(g.id)}')" aria-label="Editar invitado" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                      <button onclick="deleteGuest('${escapeHtml(g.id)}')" aria-label="Eliminar invitado" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function handleGuestSearch(val) {
  guestSearchQuery = val;
  renderModuleContent();
}

function setGuestStatusFilter(st) {
  guestStatusFilter = st;
  renderModuleContent();
}

function openAddGuestModal() { openGuestFormModal(null); }
function openEditGuestModal(id) { const guest = store.guests.find(g => g.id === id); if (guest) openGuestFormModal(guest); }

function openGuestFormModal(guest) {
  const isEdit = !!guest;
  const g = guest || { name: '', group: 'Familia Novia', status: 'Pendiente', menu: 'Adulto', allergies: '', plusOneAllowed: false, plusOneName: '', table: 'Sin asignar' };
  const tablesOptions = store.tables.map(t => `<option value="${escapeHtml(t.name)}" ${g.table === t.name ? 'selected' : ''}>${escapeHtml(t.name)}</option>`).join('');

  const content = `
    <form onsubmit="saveGuestForm(event, '${isEdit ? escapeHtml(g.id) : ''}')" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
        <input type="text" id="g-name" required value="${escapeHtml(g.name)}" class="w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:border-wedding-500">
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Grupo</label>
          <select id="g-group" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${g.group === 'Familia Novia' ? 'selected' : ''}>Familia Novia</option>
            <option ${g.group === 'Familia Novio' ? 'selected' : ''}>Familia Novio</option>
            <option ${g.group === 'Amigos' ? 'selected' : ''}>Amigos</option>
            <option ${g.group === 'Trabajo' ? 'selected' : ''}>Trabajo</option>
            <option ${g.group === 'Otros' ? 'selected' : ''}>Otros</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Estado</label>
          <select id="g-status" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${g.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option ${g.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
            <option ${g.status === 'Rechazado' ? 'selected' : ''}>Rechazado</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Menú</label>
          <select id="g-menu" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${g.menu === 'Adulto' ? 'selected' : ''}>Adulto</option>
            <option ${g.menu === 'Infantil' ? 'selected' : ''}>Infantil</option>
            <option ${g.menu === 'Vegetariano' ? 'selected' : ''}>Vegetariano</option>
            <option ${g.menu === 'Vegano' ? 'selected' : ''}>Vegano</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Mesa</label>
          <select id="g-table" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option value="Sin asignar" ${g.table === 'Sin asignar' ? 'selected' : ''}>Sin asignar</option>
            ${tablesOptions}
          </select>
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Alergias o Intolerancias</label>
        <input type="text" id="g-allergies" value="${escapeHtml(g.allergies)}" placeholder="Ej: Celíaco, Frutos secos" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div class="border-t pt-3">
        <label class="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
          <input type="checkbox" id="g-plusone" ${g.plusOneAllowed ? 'checked' : ''} onchange="document.getElementById('plusone-name-container').style.display = this.checked ? 'block' : 'none'">
          ¿Permitir Acompañante (+1)?
        </label>
        <div id="plusone-name-container" class="mt-2 ${g.plusOneAllowed ? '' : 'hidden'}">
          <input type="text" id="g-plusone-name" value="${escapeHtml(g.plusOneName)}" placeholder="Nombre del acompañante" class="w-full px-3 py-2 text-sm border rounded-xl">
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal(isEdit ? 'Editar Invitado' : 'Añadir Invitado', content);
}

function saveGuestForm(event, guestId) {
  event.preventDefault();
  const name = document.getElementById('g-name').value.trim();
  const group = document.getElementById('g-group').value;
  const status = document.getElementById('g-status').value;
  const menu = document.getElementById('g-menu').value;
  const table = document.getElementById('g-table').value;
  const allergies = document.getElementById('g-allergies').value.trim();
  const plusOneAllowed = document.getElementById('g-plusone').checked;
  const plusOneName = document.getElementById('g-plusone-name').value.trim();

  if (!name) return;

  if (guestId) {
    const index = store.guests.findIndex(g => g.id === guestId);
    if (index !== -1) {
      store.guests[index] = { ...store.guests[index], name, group, status, menu, table, allergies, plusOneAllowed, plusOneName };
    }
  } else {
    store.guests.push({
      id: generateUUID(),
      name, group, status, menu, table, allergies, plusOneAllowed, plusOneName
    });
  }

  saveData();
  closeModal();
  showToast(guestId ? 'Invitado actualizado' : 'Invitado registrado', 'success');
}

function deleteGuest(id) {
  if (confirm('¿Deseas eliminar a este invitado?')) {
    store.guests = store.guests.filter(g => g.id !== id);
    saveData();
    showToast('Invitado eliminado', 'info');
  }
}

function exportGuestsCSV() {
  if (store.guests.length === 0) {
    showToast('No hay invitados para exportar', 'info');
    return;
  }
  let csv = 'Nombre,Grupo,Estado,Menu,Alergias,Mesa\n';
  store.guests.forEach(g => {
    csv += `"${g.name}","${g.group}","${g.status}","${g.menu}","${g.allergies}","${g.table}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'lista_invitados_boda.csv';
  link.click();
}

function importGuestsCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const text = e.target.result;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      if (lines.length <= 1) throw new Error('Archivo CSV vacío o sin cabecera');

      let count = 0;
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
        if (cols[0]) {
          store.guests.push({
            id: generateUUID(),
            name: cols[0],
            group: cols[1] || 'Otros',
            status: cols[2] || 'Pendiente',
            menu: cols[3] || 'Adulto',
            allergies: cols[4] || '',
            table: cols[5] || 'Sin asignar',
            plusOneAllowed: false,
            plusOneName: ''
          });
          count++;
        }
      }
      saveData();
      showToast(`Se importaron ${count} invitados con éxito`, 'success');
    } catch (err) {
      showToast('Error al procesar el CSV: ' + err.message, 'error');
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

// --- MÓDULO ESPACIOS ---
function renderEspaciosModule() {
  const spaces = store.spaces;
  return `
    <div class="space-y-6 animate-fade-in">
      <h2 class="text-2xl font-bold text-slate-900">Ubicaciones y Espacios</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="p-3 bg-wedding-100 text-wedding-600 rounded-2xl"><i data-lucide="church" class="w-6 h-6"></i></span>
              <button onclick="openEditSpaceModal('ceremony')" class="text-xs text-wedding-600 font-semibold hover:underline">Editar</button>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Ceremonia</h3>
            <p class="text-slate-600 font-medium mt-1">${escapeHtml(spaces.ceremony.name)}</p>
            <p class="text-xs text-slate-500 mt-2 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${escapeHtml(spaces.ceremony.address)}</p>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1"><i data-lucide="phone" class="w-3.5 h-3.5"></i> ${escapeHtml(spaces.ceremony.contact)}</p>
            <div class="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600"><strong>Notas:</strong> ${escapeHtml(spaces.ceremony.notes)}</div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="p-3 bg-rose-100 text-rose-600 rounded-2xl"><i data-lucide="utensils" class="w-6 h-6"></i></span>
              <button onclick="openEditSpaceModal('banquet')" class="text-xs text-wedding-600 font-semibold hover:underline">Editar</button>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Banquete</h3>
            <p class="text-slate-600 font-medium mt-1">${escapeHtml(spaces.banquet.name)}</p>
            <p class="text-xs text-slate-500 mt-2 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${escapeHtml(spaces.banquet.address)}</p>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1"><i data-lucide="phone" class="w-3.5 h-3.5"></i> ${escapeHtml(spaces.banquet.contact)}</p>
            <div class="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600"><strong>Notas:</strong> ${escapeHtml(spaces.banquet.notes)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openEditSpaceModal(key) {
  const sp = store.spaces[key];
  const title = key === 'ceremony' ? 'Espacio Ceremonia' : 'Espacio Banquete';
  const content = `
    <form onsubmit="saveSpaceForm(event, '${key}')" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre del Lugar</label>
        <input type="text" id="sp-name" required value="${escapeHtml(sp.name)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Dirección</label>
        <input type="text" id="sp-address" value="${escapeHtml(sp.address)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Contacto / Teléfono</label>
        <input type="text" id="sp-contact" value="${escapeHtml(sp.contact)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Notas adicionales</label>
        <textarea id="sp-notes" rows="3" class="w-full px-3 py-2 text-sm border rounded-xl">${escapeHtml(sp.notes)}</textarea>
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal(`Editar ${title}`, content);
}

function saveSpaceForm(event, key) {
  event.preventDefault();
  store.spaces[key] = {
    name: document.getElementById('sp-name').value.trim(),
    address: document.getElementById('sp-address').value.trim(),
    contact: document.getElementById('sp-contact').value.trim(),
    notes: document.getElementById('sp-notes').value.trim()
  };
  saveData();
  closeModal();
  showToast('Espacio actualizado', 'success');
}

// --- MÓDULO PROVEEDORES ---
function renderProveedoresModule() {
  const suppliers = store.suppliers;
  const totalBudgeted = suppliers.reduce((a, c) => a + Number(c.totalAmount || 0), 0);
  const totalPaid = suppliers.reduce((a, c) => a + Number(c.paidAmount || 0), 0);
  const totalPending = totalBudgeted - totalPaid;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Proveedores</h2>
          <p class="text-slate-500 text-sm">Control de contrataciones y estados de pago</p>
        </div>
        <button onclick="openAddSupplierModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> Añadir Proveedor
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-100"><p class="text-xs text-slate-500">Contratado Total</p><p class="text-xl font-bold text-slate-900">${formatMoney(totalBudgeted)}</p></div>
        <div class="bg-white p-4 rounded-2xl border border-slate-100"><p class="text-xs text-emerald-600">Total Pagado</p><p class="text-xl font-bold text-emerald-600">${formatMoney(totalPaid)}</p></div>
        <div class="bg-white p-4 rounded-2xl border border-slate-100"><p class="text-xs text-amber-600">Pendiente de Pago</p><p class="text-xl font-bold text-amber-600">${formatMoney(totalPending)}</p></div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="divide-y divide-slate-100">
          ${suppliers.length === 0 ? '<p class="p-6 text-center text-slate-400">No hay proveedores registrados.</p>' : suppliers.map(sup => {
            const pending = sup.totalAmount - sup.paidAmount;
            return `
              <div class="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold text-slate-900 text-base">${escapeHtml(sup.name)}</h3>
                    <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">${escapeHtml(sup.category)}</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">${sup.phone ? `📞 ${escapeHtml(sup.phone)} &bull; ` : ''}${escapeHtml(sup.notes)}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-6">
                  <div class="text-right">
                    <p class="text-sm font-bold text-slate-900">${formatMoney(sup.totalAmount)}</p>
                    <p class="text-xs ${pending <= 0 ? 'text-emerald-600 font-semibold' : 'text-amber-600'}">${pending <= 0 ? 'Totalmente Pagado' : `Pendiente: ${formatMoney(pending)}`}</p>
                  </div>
                  <div class="flex gap-1">
                    <button onclick="openEditSupplierModal('${escapeHtml(sup.id)}')" aria-label="Editar proveedor" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                    <button onclick="deleteSupplier('${escapeHtml(sup.id)}')" aria-label="Eliminar proveedor" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function openAddSupplierModal() { openSupplierFormModal(null); }
function openEditSupplierModal(id) { const sup = store.suppliers.find(s => s.id === id); if (sup) openSupplierFormModal(sup); }

function openSupplierFormModal(sup) {
  const isEdit = !!sup;
  const s = sup || { name: '', category: 'Catering', totalAmount: 0, paidAmount: 0, phone: '', notes: '' };
  const content = `
    <form onsubmit="saveSupplierForm(event, '${isEdit ? escapeHtml(s.id) : ''}')" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre Proveedor</label>
        <input type="text" id="sup-name" required value="${escapeHtml(s.name)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
        <select id="sup-category" class="w-full px-3 py-2 text-sm border rounded-xl">
          <option ${s.category === 'Catering' ? 'selected' : ''}>Catering</option>
          <option ${s.category === 'Fotografía' ? 'selected' : ''}>Fotografía</option>
          <option ${s.category === 'Música' ? 'selected' : ''}>Música</option>
          <option ${s.category === 'Flores' ? 'selected' : ''}>Flores</option>
          <option ${s.category === 'Decoración' ? 'selected' : ''}>Decoración</option>
          <option ${s.category === 'Otros' ? 'selected' : ''}>Otros</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Importe Total</label>
          <input type="number" step="0.01" id="sup-total" required value="${s.totalAmount}" class="w-full px-3 py-2 text-sm border rounded-xl">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Importe Pagado</label>
          <input type="number" step="0.01" id="sup-paid" required value="${s.paidAmount}" class="w-full px-3 py-2 text-sm border rounded-xl">
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Teléfono</label>
        <input type="text" id="sup-phone" value="${escapeHtml(s.phone)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Notas</label>
        <input type="text" id="sup-notes" value="${escapeHtml(s.notes)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal(isEdit ? 'Editar Proveedor' : 'Añadir Proveedor', content);
}

function saveSupplierForm(event, id) {
  event.preventDefault();
  const name = document.getElementById('sup-name').value.trim();
  const category = document.getElementById('sup-category').value;
  const totalAmount = parseFloat(document.getElementById('sup-total').value) || 0;
  const paidAmount = parseFloat(document.getElementById('sup-paid').value) || 0;
  const phone = document.getElementById('sup-phone').value.trim();
  const notes = document.getElementById('sup-notes').value.trim();

  if (id) {
    const idx = store.suppliers.findIndex(s => s.id === id);
    if (idx !== -1) store.suppliers[idx] = { id, name, category, totalAmount, paidAmount, phone, notes };
  } else {
    store.suppliers.push({ id: generateUUID(), name, category, totalAmount, paidAmount, phone, notes });
  }

  saveData();
  closeModal();
  showToast('Proveedor guardado', 'success');
}

function deleteSupplier(id) {
  if (confirm('¿Eliminar proveedor?')) {
    store.suppliers = store.suppliers.filter(s => s.id !== id);
    saveData();
    showToast('Proveedor eliminado', 'info');
  }
}

// --- MÓDULO SITIO WEB & RSVP ---
function renderWebInvitadosModule() {
  const details = store.weddingDetails;
  const messageText = `¡Nos casamos! 💍\n\n${details.coupleNames} queremos invitarte a celebrar nuestra boda el ${details.date} en ${details.location}.\n\nPor favor confírmanos tu asistencia antes del próximo mes.`;

  return `
    <div class="space-y-6 animate-fade-in">
      <h2 class="text-2xl font-bold text-slate-900">Sitio Web y Confirmación RSVP</h2>
      
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto text-center space-y-4">
        <div class="w-16 h-16 bg-wedding-100 text-wedding-600 rounded-full flex items-center justify-center mx-auto">
          <i data-lucide="heart" class="w-8 h-8"></i>
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900">${escapeHtml(details.coupleNames)}</h3>
        <p class="text-slate-500 text-sm">Te esperamos el <strong>${escapeHtml(details.date)}</strong> en <strong>${escapeHtml(details.location)}</strong></p>
        
        <div class="bg-slate-50 p-4 rounded-2xl text-left border text-xs font-mono text-slate-700 whitespace-pre-wrap">${escapeHtml(messageText)}</div>

        <button onclick="copyRSVPMessage('${escapeHtml(messageText)}')" class="bg-wedding-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-wedding-700 flex items-center gap-2 mx-auto">
          <i data-lucide="copy" class="w-4 h-4"></i> Copiar Mensaje RSVP para WhatsApp
        </button>
      </div>
    </div>
  `;
}

function copyRSVPMessage(msg) {
  navigator.clipboard.writeText(msg).then(() => {
    showToast('Mensaje copiado al portapapeles', 'success');
  }).catch(() => {
    showToast('Error al copiar el mensaje', 'error');
  });
}

// --- MÓDULO TAREAS (PLAN MAESTRO EXCEL COMPLETO) ---
function renderTareasModule() {
  const tasks = store.tasks || [];
  
  // Cálculo de Métricas
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completado' || t.status === 'completada').length;
  const inProgress = tasks.filter(t => t.status === 'En proceso').length;
  const pending = tasks.filter(t => t.status === 'Pendiente' || !t.status).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Filtrado de Tareas
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(taskSearchQuery.toLowerCase());
    const matchesPhase = taskPhaseFilter === 'todas' || t.phase === taskPhaseFilter;
    const matchesStatus = taskStatusFilter === 'todos' || 
                          (taskStatusFilter === 'Completado' && (t.status === 'Completado' || t.status === 'completada')) ||
                          (taskStatusFilter === 'En proceso' && t.status === 'En proceso') ||
                          (taskStatusFilter === 'Pendiente' && (t.status === 'Pendiente' || !t.status));
    const matchesPriority = taskPriorityFilter === 'todas' || t.priority === taskPriorityFilter;
    const matchesResp = taskResponsibleFilter === 'todos' || t.responsible === taskResponsibleFilter;
    return matchesSearch && matchesPhase && matchesStatus && matchesPriority && matchesResp;
  });

  return `
    <div class="space-y-6 animate-fade-in">
      <!-- Encabezado -->
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Plan Maestro de Tareas (${total})</h2>
          <p class="text-slate-500 text-sm">Cronograma organizado por etapas, responsables y prioridad</p>
        </div>
        <button onclick="openAddTaskModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5 self-start sm:self-auto shadow-sm">
          <i data-lucide="plus" class="w-4 h-4"></i> Añadir Tarea
        </button>
      </div>

      <!-- Barra de Progreso y Métricas Globales -->
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div class="flex justify-between items-center text-sm font-semibold text-slate-700">
          <span class="flex items-center gap-2"><i data-lucide="target" class="w-4 h-4 text-wedding-600"></i> Progreso General del Plan</span>
          <span class="text-wedding-600 font-bold">${percent}% Completado</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div class="bg-gradient-to-r from-wedding-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-50">
          <div class="bg-emerald-50/60 p-2.5 rounded-2xl"><span class="block text-lg font-bold text-emerald-700">${completed}</span><span class="text-[11px] font-medium text-emerald-600">Completadas</span></div>
          <div class="bg-amber-50/60 p-2.5 rounded-2xl"><span class="block text-lg font-bold text-amber-700">${inProgress}</span><span class="text-[11px] font-medium text-amber-600">En Proceso</span></div>
          <div class="bg-slate-100/70 p-2.5 rounded-2xl"><span class="block text-lg font-bold text-slate-700">${pending}</span><span class="text-[11px] font-medium text-slate-500">Pendientes</span></div>
        </div>
      </div>

      <!-- Barra de Búsqueda y Filtros Combinados -->
      <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 space-y-3">
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input type="text" value="${escapeHtml(taskSearchQuery)}" oninput="handleTaskSearch(this.value)" placeholder="Buscar tarea..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-wedding-500">
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Etapa / Mes</label>
            <select onchange="handleTaskPhaseFilter(this.value)" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-wedding-500 bg-slate-50">
              <option value="todas" ${taskPhaseFilter === 'todas' ? 'selected' : ''}>Todas las Etapas</option>
              ${TASK_PHASES.map(p => `<option value="${escapeHtml(p)}" ${taskPhaseFilter === p ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Estado</label>
            <select onchange="handleTaskStatusFilter(this.value)" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-wedding-500 bg-slate-50">
              <option value="todos" ${taskStatusFilter === 'todos' ? 'selected' : ''}>Todos los Estados</option>
              <option value="Pendiente" ${taskStatusFilter === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
              <option value="En proceso" ${taskStatusFilter === 'En proceso' ? 'selected' : ''}>En proceso</option>
              <option value="Completado" ${taskStatusFilter === 'Completado' ? 'selected' : ''}>Completado</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Prioridad</label>
            <select onchange="handleTaskPriorityFilter(this.value)" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-wedding-500 bg-slate-50">
              <option value="todas" ${taskPriorityFilter === 'todas' ? 'selected' : ''}>Todas las Prioridades</option>
              <option value="Alta" ${taskPriorityFilter === 'Alta' ? 'selected' : ''}>Alta</option>
              <option value="Media" ${taskPriorityFilter === 'Media' ? 'selected' : ''}>Media</option>
              <option value="Baja" ${taskPriorityFilter === 'Baja' ? 'selected' : ''}>Baja</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Responsable</label>
            <select onchange="handleTaskResponsibleFilter(this.value)" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-wedding-500 bg-slate-50">
              <option value="todos" ${taskResponsibleFilter === 'todos' ? 'selected' : ''}>Todos</option>
              <option value="Mary" ${taskResponsibleFilter === 'Mary' ? 'selected' : ''}>Mary</option>
              <option value="Tomas" ${taskResponsibleFilter === 'Tomas' ? 'selected' : ''}>Tomas</option>
              <option value="Mary / Tomas" ${taskResponsibleFilter === 'Mary / Tomas' ? 'selected' : ''}>Mary / Tomas</option>
              <option value="Sin asignar" ${taskResponsibleFilter === 'Sin asignar' ? 'selected' : ''}>Sin asignar</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Listado de Tareas Agrupado por Etapa -->
      <div class="space-y-6">
        ${TASK_PHASES.map(phase => {
          const phaseTasks = filteredTasks.filter(t => t.phase === phase);
          if (phaseTasks.length === 0) return '';
          
          const phaseCompleted = phaseTasks.filter(t => t.status === 'Completado' || t.status === 'completada').length;

          return `
            <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>${escapeHtml(phase)}</span>
                </h3>
                <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                  ${phaseCompleted} / ${phaseTasks.length}
                </span>
              </div>

              <div class="space-y-2">
                ${phaseTasks.map(t => {
                  const isDone = t.status === 'Completado' || t.status === 'completada';
                  const isInProgress = t.status === 'En proceso';

                  const priorityBadge = t.priority === 'Alta' 
                    ? '<span class="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg">Alta</span>'
                    : t.priority === 'Media'
                    ? '<span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-lg">Media</span>'
                    : '<span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">Baja</span>';

                  const respBadge = (t.responsible && t.responsible !== 'Sin asignar') 
                    ? `<span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-lg">👤 ${escapeHtml(t.responsible)}</span>` 
                    : '';

                  const dueBadge = t.dueDate 
                    ? `<span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-lg">📅 ${escapeHtml(t.dueDate)}</span>` 
                    : '';

                  return `
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50/80 border border-slate-100 transition-all gap-3">
                      <div class="flex items-start gap-3 flex-1">
                        <!-- Botón de Cambio Rápido de Estado -->
                        <button onclick="cycleTaskStatus('${escapeHtml(t.id)}')" class="mt-0.5 flex-shrink-0 focus:outline-none" title="Cambiar estado">
                          ${isDone 
                            ? '<div class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center"><i data-lucide="check" class="w-3.5 h-3.5"></i></div>' 
                            : isInProgress
                            ? '<div class="w-5 h-5 rounded-full border-2 border-amber-500 bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-bold">~</div>'
                            : '<div class="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-wedding-500"></div>'
                          }
                        </button>

                        <div class="space-y-1">
                          <p class="text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}">
                            ${escapeHtml(t.title)}
                          </p>
                          <div class="flex flex-wrap items-center gap-1.5">
                            ${priorityBadge}
                            ${respBadge}
                            ${dueBadge}
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-50">
                        <select onchange="updateTaskStatus('${escapeHtml(t.id)}', this.value)" class="text-xs px-2.5 py-1 border rounded-xl bg-white font-medium text-slate-700 focus:outline-none">
                          <option value="Pendiente" ${t.status === 'Pendiente' || !t.status ? 'selected' : ''}>Pendiente</option>
                          <option value="En proceso" ${t.status === 'En proceso' ? 'selected' : ''}>En proceso</option>
                          <option value="Completado" ${isDone ? 'selected' : ''}>Completado</option>
                        </select>
                        <div class="flex items-center gap-1">
                          <button onclick="openEditTaskModal('${escapeHtml(t.id)}')" aria-label="Editar tarea" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                          <button onclick="deleteTask('${escapeHtml(t.id)}')" aria-label="Eliminar tarea" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}

        ${filteredTasks.length === 0 ? `
          <div class="bg-white p-8 rounded-3xl text-center text-slate-400 border border-slate-100">
            <i data-lucide="check-circle-2" class="w-10 h-10 mx-auto text-slate-300 mb-2"></i>
            <p class="font-medium text-slate-600">No se encontraron tareas con los filtros seleccionados.</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function handleTaskSearch(val) { taskSearchQuery = val; renderModuleContent(); }
function handleTaskPhaseFilter(val) { taskPhaseFilter = val; renderModuleContent(); }
function handleTaskStatusFilter(val) { taskStatusFilter = val; renderModuleContent(); }
function handleTaskPriorityFilter(val) { taskPriorityFilter = val; renderModuleContent(); }
function handleTaskResponsibleFilter(val) { taskResponsibleFilter = val; renderModuleContent(); }

function cycleTaskStatus(id) {
  const task = store.tasks.find(t => t.id === id);
  if (!task) return;
  if (task.status === 'Completado' || task.status === 'completada') {
    task.status = 'Pendiente';
  } else if (task.status === 'Pendiente' || !task.status) {
    task.status = 'En proceso';
  } else {
    task.status = 'Completado';
  }
  saveData();
}

function updateTaskStatus(id, newStatus) {
  const task = store.tasks.find(t => t.id === id);
  if (task) {
    task.status = newStatus;
    saveData();
  }
}

function openAddTaskModal() { openTaskFormModal(null); }
function openEditTaskModal(id) { const task = store.tasks.find(t => t.id === id); if (task) openTaskFormModal(task); }

function openTaskFormModal(task) {
  const isEdit = !!task;
  const t = task || { title: '', phase: TASK_PHASES[0], priority: 'Alta', responsible: 'Sin asignar', dueDate: '', status: 'Pendiente' };

  const content = `
    <form onsubmit="saveTaskForm(event, '${isEdit ? escapeHtml(t.id) : ''}')" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Título de la Tarea</label>
        <input type="text" id="tk-title" required value="${escapeHtml(t.title)}" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Etapa / Mes</label>
        <select id="tk-phase" class="w-full px-3 py-2 text-sm border rounded-xl">
          ${TASK_PHASES.map(p => `<option value="${escapeHtml(p)}" ${t.phase === p ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}
        </select>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Prioridad</label>
          <select id="tk-priority" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${t.priority === 'Alta' ? 'selected' : ''}>Alta</option>
            <option ${t.priority === 'Media' ? 'selected' : ''}>Media</option>
            <option ${t.priority === 'Baja' ? 'selected' : ''}>Baja</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Responsable</label>
          <select id="tk-resp" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${t.responsible === 'Sin asignar' ? 'selected' : ''}>Sin asignar</option>
            <option ${t.responsible === 'Mary' ? 'selected' : ''}>Mary</option>
            <option ${t.responsible === 'Tomas' ? 'selected' : ''}>Tomas</option>
            <option ${t.responsible === 'Mary / Tomas' ? 'selected' : ''}>Mary / Tomas</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Estado</label>
          <select id="tk-status" class="w-full px-3 py-2 text-sm border rounded-xl">
            <option ${t.status === 'Pendiente' || !t.status ? 'selected' : ''}>Pendiente</option>
            <option ${t.status === 'En proceso' ? 'selected' : ''}>En proceso</option>
            <option ${t.status === 'Completado' || t.status === 'completada' ? 'selected' : ''}>Completado</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Fecha Límite</label>
          <input type="date" id="tk-duedate" value="${escapeHtml(t.dueDate)}" class="w-full px-3 py-2 text-sm border rounded-xl">
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal(isEdit ? 'Editar Tarea' : 'Añadir Tarea', content);
}

function saveTaskForm(event, taskId) {
  event.preventDefault();
  const title = document.getElementById('tk-title').value.trim();
  const phase = document.getElementById('tk-phase').value;
  const priority = document.getElementById('tk-priority').value;
  const responsible = document.getElementById('tk-resp').value;
  const status = document.getElementById('tk-status').value;
  const dueDate = document.getElementById('tk-duedate').value;

  if (!title) return;

  if (taskId) {
    const idx = store.tasks.findIndex(t => t.id === taskId);
    if (idx !== -1) {
      store.tasks[idx] = { ...store.tasks[idx], title, phase, priority, responsible, status, dueDate };
    }
  } else {
    store.tasks.push({ id: generateUUID(), title, phase, priority, responsible, status, dueDate });
  }

  saveData();
  closeModal();
  showToast(taskId ? 'Tarea actualizada' : 'Tarea añadida', 'success');
}

function deleteTask(id) {
  if (confirm('¿Deseas eliminar esta tarea del Plan Maestro?')) {
    store.tasks = store.tasks.filter(t => t.id !== id);
    saveData();
    showToast('Tarea eliminada', 'info');
  }
}

// --- MÓDULO PRESUPUESTO ---
function renderPresupuestoModule() {
  const expenses = store.expenses;
  const totalBudget = store.weddingDetails.totalBudget;
  const totalReal = expenses.reduce((a, c) => a + Number(c.realCost || 0), 0);
  const remaining = totalBudget - totalReal;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Control de Presupuesto</h2>
          <p class="text-slate-500 text-sm">Desglose de gastos reales frente a la estimación global</p>
        </div>
        <button onclick="openAddExpenseModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> Añadir Gasto
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-3xl border border-slate-100"><p class="text-xs text-slate-500">Presupuesto Meta</p><p class="text-2xl font-bold text-slate-900 mt-1">${formatMoney(totalBudget)}</p></div>
        <div class="bg-white p-5 rounded-3xl border border-slate-100"><p class="text-xs text-rose-600">Total Gastado</p><p class="text-2xl font-bold text-rose-600 mt-1">${formatMoney(totalReal)}</p></div>
        <div class="bg-white p-5 rounded-3xl border border-slate-100"><p class="text-xs text-emerald-600">Disponible / Restante</p><p class="text-2xl font-bold text-emerald-600 mt-1">${formatMoney(remaining)}</p></div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="divide-y divide-slate-100">
          ${expenses.length === 0 ? '<p class="p-6 text-center text-slate-400">No hay gastos registrados.</p>' : expenses.map(e => `
            <div class="p-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p class="font-bold text-slate-900">${escapeHtml(e.concept)}</p>
                <span class="text-xs text-slate-500">${escapeHtml(e.category)}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="font-bold text-slate-900">${formatMoney(e.realCost)}</span>
                <button onclick="deleteExpense('${escapeHtml(e.id)}')" aria-label="Eliminar gasto" class="text-slate-400 hover:text-rose-600 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function openAddExpenseModal() {
  const content = `
    <form onsubmit="saveExpenseForm(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Concepto</label>
        <input type="text" id="exp-concept" required class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
        <select id="exp-category" class="w-full px-3 py-2 text-sm border rounded-xl">
          <option>Lugar</option>
          <option>Catering</option>
          <option>Fotografía</option>
          <option>Música</option>
          <option>Flores</option>
          <option>Vestuario</option>
          <option>Otros</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Costo Real / Importe</label>
        <input type="number" step="0.01" id="exp-cost" required class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal('Añadir Gasto', content);
}

function saveExpenseForm(event) {
  event.preventDefault();
  const concept = document.getElementById('exp-concept').value.trim();
  const category = document.getElementById('exp-category').value;
  const realCost = parseFloat(document.getElementById('exp-cost').value) || 0;

  if (!concept) return;

  store.expenses.push({ id: generateUUID(), concept, category, realCost });
  saveData();
  closeModal();
  showToast('Gasto registrado', 'success');
}

function deleteExpense(id) {
  store.expenses = store.expenses.filter(e => e.id !== id);
  saveData();
}

// --- MÓDULO ITINERARIO ---
function renderItinerarioModule() {
  const sorted = [...store.itinerary].sort((a, b) => a.timeStart.localeCompare(b.timeStart));

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Itinerario del Día</h2>
          <p class="text-slate-500 text-sm">Cronograma ordenado por horas</p>
        </div>
        <button onclick="openAddItineraryModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> Añadir Evento
        </button>
      </div>

      <div class="relative border-l-2 border-wedding-200 ml-4 space-y-6">
        ${sorted.map(it => `
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-wedding-600 border-2 border-white"></div>
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
              <div>
                <span class="inline-block text-xs font-bold text-wedding-600 bg-wedding-50 px-2.5 py-0.5 rounded-md mb-1">${escapeHtml(it.timeStart)}</span>
                <h3 class="font-bold text-slate-900 text-base">${escapeHtml(it.title)}</h3>
                <p class="text-xs text-slate-500 mt-1">${escapeHtml(it.details)}</p>
              </div>
              <button onclick="deleteItinerary('${escapeHtml(it.id)}')" aria-label="Eliminar evento" class="text-slate-400 hover:text-rose-600 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openAddItineraryModal() {
  const content = `
    <form onsubmit="saveItineraryForm(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Hora (HH:MM)</label>
        <input type="time" id="it-time" required class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Título del Evento</label>
        <input type="text" id="it-title" required class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Detalles / Ubicación</label>
        <input type="text" id="it-details" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal('Añadir Evento al Itinerario', content);
}

function saveItineraryForm(event) {
  event.preventDefault();
  const timeStart = document.getElementById('it-time').value;
  const title = document.getElementById('it-title').value.trim();
  const details = document.getElementById('it-details').value.trim();

  if (!timeStart || !title) return;

  store.itinerary.push({ id: generateUUID(), timeStart, title, details });
  saveData();
  closeModal();
  showToast('Evento añadido', 'success');
}

function deleteItinerary(id) {
  store.itinerary = store.itinerary.filter(i => i.id !== id);
  saveData();
}

// --- MÓDULO MESAS ---
function renderMesasModule() {
  const tables = store.tables;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Distribución de Mesas</h2>
          <p class="text-slate-500 text-sm">Organiza los asientos y asignación de invitados</p>
        </div>
        <button onclick="openAddTableModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> Añadir Mesa
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${tables.map(tbl => {
          const assignedGuests = store.guests.filter(g => g.table === tbl.name);
          const isOverCap = assignedGuests.length > tbl.capacity;

          return `
            <div class="bg-white p-5 rounded-3xl shadow-sm border ${isOverCap ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-100'} flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-bold text-slate-900 text-lg">${escapeHtml(tbl.name)}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${isOverCap ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}">
                    ${assignedGuests.length} / ${tbl.capacity} pax
                  </span>
                </div>
                ${isOverCap ? '<p class="text-xs text-rose-600 font-semibold mb-2">⚠️ Capacidad superada</p>' : ''}
                
                <div class="space-y-1 mt-3">
                  ${assignedGuests.length === 0 ? '<p class="text-xs text-slate-400 italic">Sin invitados asignados</p>' : assignedGuests.map(g => `
                    <div class="text-xs bg-slate-50 p-2 rounded-xl text-slate-700 font-medium flex justify-between">
                      <span>${escapeHtml(g.name)}</span>
                      <span class="text-slate-400">${escapeHtml(g.menu)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-4 border-t mt-4">
                <button onclick="deleteTable('${escapeHtml(tbl.id)}')" aria-label="Eliminar mesa" class="text-slate-400 hover:text-rose-600 p-1 text-xs">Eliminar Mesa</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function openAddTableModal() {
  const content = `
    <form onsubmit="saveTableForm(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre de la Mesa</label>
        <input type="text" id="tbl-name" required placeholder="Ej: Mesa 1, Mesa Presidencial" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Capacidad (Asientos)</label>
        <input type="number" id="tbl-cap" required value="8" min="1" class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal('Añadir Mesa', content);
}

function saveTableForm(event) {
  event.preventDefault();
  const name = document.getElementById('tbl-name').value.trim();
  const capacity = parseInt(document.getElementById('tbl-cap').value, 10) || 8;

  if (!name) return;

  store.tables.push({ id: generateUUID(), name, capacity, shape: 'Redonda' });
  saveData();
  closeModal();
  showToast('Mesa creada', 'success');
}

function deleteTable(id) {
  if (confirm('¿Eliminar mesa? Los invitados asignados volverán a "Sin asignar".')) {
    const tbl = store.tables.find(t => t.id === id);
    if (tbl) {
      store.guests.forEach(g => { if (g.table === tbl.name) g.table = 'Sin asignar'; });
      store.tables = store.tables.filter(t => t.id !== id);
      saveData();
      showToast('Mesa eliminada', 'info');
    }
  }
}

// --- MÓDULO NOTAS E IDEAS ---
function renderNotasModule() {
  const notes = store.notes;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Notas e Ideas</h2>
          <p class="text-slate-500 text-sm">Inspiración, listas de deseos y recordatorios</p>
        </div>
        <button onclick="openAddNoteModal()" class="bg-wedding-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-wedding-700 flex items-center gap-1.5">
          <i data-lucide="plus" class="w-4 h-4"></i> Nueva Nota
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${notes.map(n => `
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <span class="px-2.5 py-1 bg-wedding-50 text-wedding-700 rounded-lg text-xs font-semibold mb-2 inline-block">${escapeHtml(n.category)}</span>
              <h3 class="font-bold text-slate-900 text-base">${escapeHtml(n.title)}</h3>
              <p class="text-xs text-slate-600 mt-2 whitespace-pre-wrap">${escapeHtml(n.content)}</p>
            </div>
            <div class="flex justify-end pt-4 border-t mt-4">
              <button onclick="deleteNote('${escapeHtml(n.id)}')" aria-label="Eliminar nota" class="text-slate-400 hover:text-rose-600 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openAddNoteModal() {
  const content = `
    <form onsubmit="saveNoteForm(event)" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Título</label>
        <input type="text" id="nt-title" required class="w-full px-3 py-2 text-sm border rounded-xl">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
        <select id="nt-category" class="w-full px-3 py-2 text-sm border rounded-xl">
          <option>Ideas & Inspiración</option>
          <option>Música & Canciones</option>
          <option>Regalos & Sorpresas</option>
          <option>Recordatorios</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Contenido</label>
        <textarea id="nt-content" rows="4" required class="w-full px-3 py-2 text-sm border rounded-xl"></textarea>
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t">
        <button type="button" onclick="closeModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancelar</button>
        <button type="submit" class="px-4 py-2 text-sm font-semibold bg-wedding-600 text-white hover:bg-wedding-700 rounded-xl">Guardar</button>
      </div>
    </form>
  `;
  openModal('Añadir Nota', content);
}

function saveNoteForm(event) {
  event.preventDefault();
  const title = document.getElementById('nt-title').value.trim();
  const category = document.getElementById('nt-category').value;
  const content = document.getElementById('nt-content').value.trim();

  if (!title || !content) return;

  store.notes.push({ id: generateUUID(), title, category, content });
  saveData();
  closeModal();
  showToast('Nota guardada', 'success');
}

function deleteNote(id) {
  store.notes = store.notes.filter(n => n.id !== id);
  saveData();
}

// --- MÓDULO CONFIGURACIÓN Y COPIAS ---
function renderConfiguracionModule() {
  const details = store.weddingDetails;

  return `
    <div class="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-900">Configuración y Copias de Seguridad</h2>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h3 class="font-bold text-lg text-slate-900 border-b pb-2">Datos Principales de la Boda</h3>
        <form onsubmit="saveWeddingDetailsForm(event)" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nombres de la Pareja</label>
              <input type="text" id="cfg-names" required value="${escapeHtml(details.coupleNames)}" class="w-full px-3 py-2 text-sm border rounded-xl">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Fecha de la Boda</label>
              <input type="date" id="cfg-date" required value="${escapeHtml(details.date)}" class="w-full px-3 py-2 text-sm border rounded-xl">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1">Lugar Principal</label>
              <input type="text" id="cfg-location" required value="${escapeHtml(details.location)}" class="w-full px-3 py-2 text-sm border rounded-xl">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Moneda ($/€)</label>
              <input type="text" id="cfg-currency" required value="${escapeHtml(details.currencySymbol)}" class="w-full px-3 py-2 text-sm border rounded-xl">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Presupuesto Meta Global</label>
            <input type="number" step="0.01" id="cfg-budget" required value="${details.totalBudget}" class="w-full px-3 py-2 text-sm border rounded-xl">
          </div>
          <button type="submit" class="bg-wedding-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-wedding-700">Guardar Cambios</button>
        </form>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h3 class="font-bold text-lg text-slate-900 border-b pb-2">Copias de Seguridad (JSON)</h3>
        <p class="text-xs text-slate-500">Exporta todos tus datos a un archivo local o restaura una copia guardada previamente.</p>
        
        <div class="flex flex-wrap gap-3">
          <button onclick="exportBackupJSON()" class="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 flex items-center gap-2">
            <i data-lucide="download" class="w-4 h-4"></i> Exportar Copia JSON
          </button>
          
          <label class="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer flex items-center gap-2">
            <i data-lucide="upload" class="w-4 h-4"></i> Importar Copia JSON
            <input type="file" accept=".json" class="hidden" onchange="importBackupJSON(event)">
          </label>
        </div>
      </div>

      <div class="bg-rose-50 border border-rose-200 p-6 rounded-3xl space-y-3">
        <h3 class="font-bold text-base text-rose-900">Restablecer la Aplicación</h3>
        <p class="text-xs text-rose-700">Borra todos los datos actuales y restaura los valores por defecto del Plan Maestro. Esta acción no se puede deshacer.</p>
        <button onclick="confirmResetApp()" class="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-rose-700">
          Restablecer Datos de Fábrica
        </button>
      </div>
    </div>
  `;
}

function saveWeddingDetailsForm(event) {
  event.preventDefault();
  store.weddingDetails = {
    coupleNames: document.getElementById('cfg-names').value.trim(),
    date: document.getElementById('cfg-date').value,
    location: document.getElementById('cfg-location').value.trim(),
    currencySymbol: document.getElementById('cfg-currency').value.trim(),
    totalBudget: parseFloat(document.getElementById('cfg-budget').value) || 0
  };
  saveData();
  showToast('Configuración guardada', 'success');
}

function exportBackupJSON() {
  const jsonStr = JSON.stringify(store, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup_boda_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.weddingDetails || !parsed.guests) {
        throw new Error('El archivo JSON no coincide con el formato esperado.');
      }
      store = parsed;
      saveData();
      showToast('Copia de seguridad restaurada con éxito', 'success');
    } catch (err) {
      showToast('Error al importar backup: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

function confirmResetApp() {
  if (confirm('¿ESTÁS SEGURO? Se borrarán todos los cambios e invitados introducidos y se cargará el Plan Maestro original.')) {
    store = cloneInitialState();
    saveData();
    showToast('Datos restablecidos correctamente', 'info');
  }
}
