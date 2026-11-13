"use strict";

// ---------------------------------------------------------------------------
// Pedido en línea: el menú se convierte en un carrito y el pedido se envía
// como mensaje de WhatsApp al turno disponible (usa activeOrderConfig() de
// script.js). Precios transcritos de las cartas en assets/menu-*.
// ---------------------------------------------------------------------------
(() => {
  const FILLINGS = ["Carne asada", "Cochinita", "Pollo", "Relleno negro", "Milanesa", "Pierna"];
  const AGUAS = ["Horchata", "Jamaica", "Tamarindo", "Cebada", "Té", "Piña con chaya", "Fresa-kiwi", "Limón con chía", "Pepino"];
  const opt = (name, values) => ({
    name,
    values: values.map((v) => (Array.isArray(v) ? { label: v[0], add: v[1] } : { label: v, add: 0 })),
  });
  const FRUTA = opt("Fruta", [["Sin fruta", 0], ["Con fruta", 15]]);
  const AGUA = opt("Sabor del agua", AGUAS);
  const ESTILO_HAMBURGUESA = opt("Estilo", [["Clásica", 0], ["BBQ", 15], ["Hawaiana", 15]]);

  const MENU = [
    {
      id: "desayunos",
      label: "Desayunos",
      note: "Todos los paquetes de desayuno incluyen café y postre. Agrega fruta por $15.",
      sections: [
        {
          items: [
            { id: "d-combinado", name: "Combinado yucateco", price: 160, options: [FRUTA] },
            { id: "d-chilaquiles", name: "Chilaquiles", price: 150, options: [opt("Con", ["Carne asada", "Pollo", "Huevo estrellado"]), FRUTA] },
            { id: "d-motulenos", name: "Huevos motuleños", price: 150, options: [FRUTA] },
            { id: "d-club", name: "Club sandwich", price: 150, options: [FRUTA] },
            { id: "d-estrellados", name: "Huevos estrellados con tocino y hot cakes", price: 170, options: [FRUTA] },
            { id: "d-huevos-gusto", name: "Huevos al gusto", price: 140, options: [opt("Preparación", ["Con jamón", "Con tocino", "Con chorizo", "A la mexicana"]), FRUTA] },
            { id: "d-burro", name: "Burro", price: 150, options: [opt("Relleno", ["Milanesa", "Asado", "Cochinita", "Pierna"]), FRUTA] },
          ],
        },
      ],
    },
    {
      id: "diarios",
      label: "Platillos diarios",
      sections: [
        {
          items: [
            { id: "p-chilaquiles", name: "Chilaquiles preparados", price: 120, options: [opt("A elegir", ["Huevo", "Asado", "Pollo"])] },
            { id: "p-omelet", name: "Omelet", price: 90, options: [opt("Tipo", ["Jamón y queso", "Tres quesos"])] },
            { id: "p-quesadillas", name: "Quesadillas o burritas", price: 70, options: [opt("Elige", ["Quesadillas", "Burritas"])] },
            { id: "p-quesadillas-prep", name: "Quesadillas o burritas preparadas", price: 85, options: [opt("Elige", ["Quesadillas", "Burritas"])] },
            { id: "p-tostadas", name: "Tostadas de pollo", desc: "3 piezas", price: 85 },
            { id: "p-combinado", name: "Combinado yucateco tradicional", desc: "Un salbute, un panucho y un antojito con 4 guisos típicos", price: 110 },
            { id: "p-club", name: "Club sandwich", desc: "Lechuga, jamón, jitomate, pimientos, quesos, tocino y papas fritas", price: 120 },
            { id: "p-revueltos", name: "Huevos revueltos", price: 85, options: [opt("Preparación", ["A la mexicana", "Con jamón", "Con chorizo"])] },
            { id: "p-ensalada", name: "Ensalada de frutas", desc: "Frutas de temporada con yogurt y granola", price: 80 },
            { id: "p-motulenos", name: "Huevos motuleños", desc: "Huevos estrellados sobre tortillas fritas y frijoles negros, bañados en salsa de tomate, jamón, chícharos, plátano macho y queso", price: 105, tag: "Tradición yucateca" },
          ],
        },
      ],
    },
    {
      id: "fuertes",
      label: "Platos fuertes",
      sections: [
        {
          items: [
            { id: "f-tampiquena", name: "Tampiqueña de arrachera", desc: "Corte de arrachera con frijol, 1 quesadilla, arroz, ensalada y plátanos fritos", price: 190 },
            { id: "f-pechuga-rellena", name: "Pechuga rellena de jamón y queso", desc: "O gratinada, con papas fritas", price: 170, options: [opt("Elige", ["Rellena de jamón y queso", "Gratinada"])] },
            { id: "f-poc-chuc", name: "Poc chuc", desc: "Pierna de cerdo asada estilo Yucatán", price: 150 },
            { id: "f-bistec", name: "Bistec de res a la mexicana", price: 160 },
            { id: "f-cochinita", name: "Cochinita pibil", price: 150 },
            { id: "f-filete", name: "Filete de pescado empanizado", price: 150 },
            { id: "f-pavo", name: "Pavo en relleno negro", price: 150 },
            { id: "f-pollo-frito", name: "Pollo frito con papas", price: 150 },
            { id: "f-fajitas", name: "Fajitas de pollo", price: 150 },
            { id: "f-pechuga-asada", name: "Pechuga asada o gratinada", price: 150, options: [opt("Elige", ["Asada", "Gratinada"])] },
            { id: "f-encebollada", name: "Pechuga encebollada", price: 150 },
            { id: "f-milanesa", name: "Milanesa de pollo", desc: "Con papas", price: 170 },
          ],
        },
        {
          title: "Caldos",
          items: [
            { id: "c-caldo-pollo", name: "Caldo de pollo con verduras", price: 130 },
            { id: "c-consome", name: "Consomé de pollo", price: 75 },
            { id: "c-sopa-lima", name: "Sopa de lima", price: 130 },
          ],
        },
        {
          title: "Especial de domingo",
          items: [{ id: "e-lechon", name: "Lechón al horno", price: 150, tag: "Solo domingo" }],
        },
      ],
    },
    {
      id: "paquetes",
      label: "Paquetes",
      sections: [
        {
          title: "Paquetes de comida",
          note: "Incluyen entrada, plato fuerte, agua fresca y postre.",
          items: [
            { id: "k-filete", name: "Paquete filete de pescado empanizado", price: 160, options: [AGUA] },
            { id: "k-fajitas", name: "Paquete fajitas de pollo a la mexicana", price: 160, options: [AGUA] },
            { id: "k-poc-chuc", name: "Paquete poc chuc", price: 160, options: [AGUA] },
          ],
        },
        {
          title: "Paquetes rápidos",
          items: [
            { id: "k-1", name: "Paquete 1: Hamburguesa gourmet", desc: "Con papas fritas y agua fresca", price: 140, options: [ESTILO_HAMBURGUESA, AGUA] },
            { id: "k-2", name: "Paquete 2: Torta cubana", desc: "Más un panucho o taco y agua fresca", price: 120, options: [opt("Acompaña con", ["Panucho", "Taco"]), AGUA] },
            { id: "k-3", name: "Paquete 3: 3 panuchos, salbutes o tacos", price: 90, options: [opt("Elige", ["Panuchos", "Salbutes", "Tacos"]), opt("Guiso", FILLINGS)] },
          ],
        },
      ],
    },
    {
      id: "antojitos",
      label: "Antojitos y tortas",
      note: "De carne asada, cochinita, pollo, relleno negro, milanesa o pierna: ¡de lo que quieras!",
      sections: [
        {
          items: [
            { id: "a-pieza", name: "Panucho, salbute o taco de maíz", desc: "Precio por pieza", price: 30, options: [opt("Elige", ["Panucho", "Salbute", "Taco de maíz"]), opt("Guiso", FILLINGS)] },
            { id: "a-3-piezas", name: "3 piezas a elegir", desc: "Panuchos, salbutes o tacos", price: 90, options: [opt("Elige", ["Panuchos", "Salbutes", "Tacos"]), opt("Guiso", FILLINGS)] },
            { id: "a-taco-harina", name: "Taco de tortilla de harina", price: 35, options: [opt("Guiso", FILLINGS)] },
            { id: "a-tacos-petropolys", name: "Tacos Petropolys", desc: "Tortilla de harina, pierna y queso", price: 40 },
          ],
        },
        {
          title: "Tortas",
          items: [
            { id: "t-carne", name: "Torta de carne", price: 50, options: [opt("Carne", ["Cochinita", "Relleno", "Pierna", "Pollo deshebrado"])] },
            { id: "t-especial", name: "Torta especial", desc: "Una carne más jamón y queso o un huevo estrellado", price: 60, options: [opt("Carne", ["Asado", "Milanesa"]), opt("Con", ["Jamón y queso", "Huevo estrellado"])] },
            { id: "t-petropolys", name: "Torta Petropolys", desc: "Pavo, pierna y queso. ¡Tienes que probarla!", price: 70, tag: "De la casa" },
            { id: "t-cubana", name: "Torta cubana", desc: "Carne más jamón, queso y huevo estrellado", price: 70 },
            { id: "t-super-fa", name: "Torta Super FA", desc: "Tu elección de tres carnes (escríbelas en la nota)", price: 70 },
          ],
        },
        {
          title: "Hamburguesas",
          items: [
            { id: "h-hamburguesa", name: "Hamburguesa de arrachera o sirloin", desc: "150 g de carne asada con queso, lechuga, guarnición y papas fritas", price: 95, options: [opt("Carne", ["Arrachera", "Sirloin"]), ESTILO_HAMBURGUESA] },
          ],
        },
      ],
    },
    {
      id: "postres",
      label: "Postres y extras",
      sections: [
        {
          items: [
            { id: "x-postre", name: "Postre", desc: "Sujeto a disponibilidad", price: 50, options: [opt("Elige", ["Flan", "Pay de queso", "Gelatina de sabores", "Pastel de tres leches"])] },
            { id: "x-papas", name: "Papas fritas", price: 75 },
            { id: "x-platanos", name: "Plátanos fritos", price: 60 },
          ],
        },
      ],
    },
    {
      id: "bebidas",
      label: "Bebidas",
      sections: [
        {
          items: [
            { id: "b-olla", name: "Café de olla con crema", price: 45 },
            { id: "b-cafe", name: "Café americano o con leche", price: 40, options: [opt("Elige", ["Americano", "Con leche"])] },
            { id: "b-capuchino", name: "Capuchino", price: 45 },
            { id: "b-chocolate", name: "Chocolate caliente", price: 50 },
            { id: "b-naranja", name: "Jugo de naranja", desc: "500 ml", price: 35 },
            { id: "b-agua-500", name: "Agua fresca", desc: "500 ml", price: 30, options: [AGUA] },
            { id: "b-agua-litro", name: "Agua fresca de litro", price: 40, options: [AGUA] },
            { id: "b-jarra", name: "Jarra de agua fresca", price: 90, options: [AGUA] },
          ],
        },
      ],
    },
  ];

  const ITEMS = new Map();
  MENU.forEach((cat) =>
    cat.sections.forEach((section) =>
      section.items.forEach((item) => ITEMS.set(item.id, { ...item, category: cat.label })),
    ),
  );

  // --- Referencias del DOM ---
  const tabsEl = document.getElementById("menuTabs");
  const panelEl = document.getElementById("menuPanel");
  if (!tabsEl || !panelEl) return;
  const fab = document.getElementById("cartFab");
  const fabCount = document.getElementById("cartCount");
  const fabTotal = document.getElementById("cartFabTotal");
  const drawer = document.getElementById("cartDrawer");
  const linesEl = document.getElementById("cartLines");
  const emptyEl = document.getElementById("cartEmpty");
  const form = document.getElementById("cartForm");
  const totalEl = document.getElementById("cartTotal");
  const sendBtn = document.getElementById("cartSend");
  const sentEl = document.getElementById("cartSent");
  const shiftNote = document.getElementById("cartShiftNote");
  const sectionShift = document.getElementById("cartShift");
  const sheet = document.getElementById("itemSheet");
  const sheetForm = document.getElementById("itemSheetForm");
  const sheetGroups = document.getElementById("itemSheetGroups");
  const sheetQty = document.getElementById("itemSheetQty");
  const sheetSubmit = document.getElementById("itemSheetSubmit");
  const toast = document.getElementById("cartToast");
  const motion = document.documentElement.classList.contains("motion");
  const STORAGE_KEY = "petropolys-pedido-v1";

  const money = (n) => `$${n.toLocaleString("es-MX")}`;
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const PLUS = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  const CHECK = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

  // --- Estado del carrito (se guarda en este navegador) ---
  let state = { lines: [], form: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && Array.isArray(saved.lines)) {
      state.lines = saved.lines.filter((line) => ITEMS.has(line.id) && line.qty > 0);
      state.form = saved.form || {};
    }
  } catch (error) {
    /* Navegación privada o almacenamiento bloqueado: el carrito vive en memoria. */
  }
  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      /* Sin almacenamiento disponible. */
    }
  };

  function unitPrice(line) {
    const item = ITEMS.get(line.id);
    let price = item.price;
    (item.options || []).forEach((group, i) => {
      const value = group.values.find((v) => v.label === line.choices[i]);
      if (value) price += value.add;
    });
    return price;
  }
  const lineTotal = (line) => unitPrice(line) * line.qty;
  const cartCount = () => state.lines.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = () => state.lines.reduce((sum, line) => sum + lineTotal(line), 0);
  const describeChoices = (line) => line.choices.filter((c) => c && !/^Sin /.test(c) && c !== "Clásica");

  function addLine(id, choices, qty, note) {
    const key = [id, ...choices, note.trim().toLowerCase()].join("|");
    const existing = state.lines.find((line) => line.key === key);
    if (existing) existing.qty += qty;
    else state.lines.push({ key, id, choices, qty, note: note.trim() });
    save();
    renderCart();
    renderBadges();
  }

  // --- Pestañas y tarjetas del menú ---
  let activeCat = MENU[0].id;
  tabsEl.innerHTML =
    MENU.map(
      (cat, i) =>
        `<button aria-controls="menuPanel" aria-selected="${i === 0}" class="menu-tab" data-cat="${cat.id}" id="tab-${cat.id}" role="tab" tabindex="${i === 0 ? 0 : -1}" type="button">${escapeHtml(cat.label)}</button>`,
    ).join("") + '<span aria-hidden="true" class="menu-tabs__pill"></span>';
  const pill = tabsEl.querySelector(".menu-tabs__pill");

  function movePill() {
    const tab = tabsEl.querySelector(`[data-cat="${activeCat}"]`);
    if (!tab) return;
    pill.style.width = `${tab.offsetWidth}px`;
    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
  }

  function dishCard(item, index) {
    const preview = item.options && item.options[0].values.length > 1 && !/^Sin /.test(item.options[0].values[0].label)
      ? `<p class="dish__opts">${escapeHtml(item.options[0].values.slice(0, 4).map((v) => v.label).join(" · "))}${item.options[0].values.length > 4 ? " …" : ""}</p>`
      : "";
    return `<article class="dish" data-id="${item.id}" style="--i:${index}">
      <span aria-hidden="true" class="dish__badge"></span>
      <div class="dish__body">
        ${item.tag ? `<span class="dish__tag">${escapeHtml(item.tag)}</span>` : ""}
        <h4>${escapeHtml(item.name)}</h4>
        ${item.desc ? `<p class="dish__desc">${escapeHtml(item.desc)}</p>` : ""}
        ${preview}
      </div>
      <div class="dish__foot">
        <span class="dish__price">${money(item.price)}</span>
        <button aria-label="Agregar ${escapeHtml(item.name)} al pedido" class="dish__add" data-add="${item.id}" type="button">
          <span class="dish__add-label">${item.options ? "Elegir" : "Agregar"}</span><span class="dish__add-icon">${PLUS}</span>
        </button>
      </div>
    </article>`;
  }

  function renderPanel() {
    const cat = MENU.find((c) => c.id === activeCat);
    let index = 0;
    panelEl.setAttribute("aria-labelledby", `tab-${cat.id}`);
    panelEl.innerHTML =
      (cat.note ? `<p class="menu-panel__note">${escapeHtml(cat.note)}</p>` : "") +
      cat.sections
        .map(
          (section) =>
            `<div class="menu-panel__section">
              ${section.title ? `<h3 class="menu-panel__title">${escapeHtml(section.title)}</h3>` : ""}
              ${section.note ? `<p class="menu-panel__note menu-panel__note--small">${escapeHtml(section.note)}</p>` : ""}
              <div class="dish-grid">${section.items.map((item) => dishCard(item, index++)).join("")}</div>
            </div>`,
        )
        .join("");
    if (motion) {
      panelEl.classList.remove("is-entering");
      void panelEl.offsetWidth;
      panelEl.classList.add("is-entering");
    }
    renderBadges();
  }

  function selectTab(id, focus = false) {
    activeCat = id;
    tabsEl.querySelectorAll(".menu-tab").forEach((tab) => {
      const selected = tab.dataset.cat === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        if (focus) tab.focus();
        tab.scrollIntoView({ block: "nearest", inline: "center", behavior: motion ? "smooth" : "auto" });
      }
    });
    movePill();
    renderPanel();
  }
  tabsEl.addEventListener("click", (event) => {
    const tab = event.target.closest(".menu-tab");
    if (tab && tab.dataset.cat !== activeCat) selectTab(tab.dataset.cat);
  });
  tabsEl.addEventListener("keydown", (event) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const i = MENU.findIndex((c) => c.id === activeCat);
    selectTab(MENU[(i + keys[event.key] + MENU.length) % MENU.length].id, true);
  });
  window.addEventListener("resize", movePill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);

  function renderBadges() {
    const counts = {};
    state.lines.forEach((line) => (counts[line.id] = (counts[line.id] || 0) + line.qty));
    panelEl.querySelectorAll(".dish").forEach((card) => {
      const n = counts[card.dataset.id] || 0;
      const badge = card.querySelector(".dish__badge");
      badge.textContent = n ? `${n} en tu pedido` : "";
      card.classList.toggle("is-in-cart", n > 0);
    });
  }

  // --- Hoja para elegir opciones ---
  let sheetItem = null;
  let sheetTrigger = null;
  function sheetPrice() {
    const choices = sheetChoices();
    return unitPrice({ id: sheetItem.id, choices, qty: 1 }) * Number(sheetQty.textContent);
  }
  function sheetChoices() {
    return (sheetItem.options || []).map((group, i) => {
      const checked = sheetForm.querySelector(`input[name="g${i}"]:checked`);
      return checked ? checked.value : group.values[0].label;
    });
  }
  function updateSheetTotal() {
    sheetSubmit.querySelector("b").textContent = money(sheetPrice());
  }
  function openSheet(item, trigger) {
    sheetItem = item;
    sheetTrigger = trigger;
    sheet.querySelector(".item-sheet__cat").textContent = item.category;
    sheet.querySelector("#itemSheetTitle").textContent = item.name;
    const desc = sheet.querySelector(".item-sheet__desc");
    desc.textContent = item.desc || "";
    desc.hidden = !item.desc;
    sheetGroups.innerHTML = item.options
      .map(
        (group, i) => `<fieldset class="choice-group">
          <legend>${escapeHtml(group.name)}</legend>
          <div class="choice-group__options">
            ${group.values
              .map(
                (v, j) => `<label class="choice"><input ${j === 0 ? "checked" : ""} name="g${i}" type="radio" value="${escapeHtml(v.label)}" /><span>${escapeHtml(v.label)}${v.add ? ` <small>+${money(v.add)}</small>` : ""}</span></label>`,
              )
              .join("")}
          </div>
        </fieldset>`,
      )
      .join("");
    sheetForm.elements.nota.value = "";
    sheetQty.textContent = "1";
    updateSheetTotal();
    sheet.showModal();
    document.body.classList.add("modal-open");
  }
  sheetForm.addEventListener("change", updateSheetTotal);
  sheet.querySelectorAll("[data-qty]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const next = Math.max(1, Math.min(30, Number(sheetQty.textContent) + Number(btn.dataset.qty)));
      sheetQty.textContent = String(next);
      updateSheetTotal();
    }),
  );
  sheetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const qty = Number(sheetQty.textContent);
    addLine(sheetItem.id, sheetChoices(), qty, sheetForm.elements.nota.value);
    closeDialog(sheet);
    confirmAdd(sheetTrigger, sheetItem, qty);
  });
  sheet.querySelector(".item-sheet__close").addEventListener("click", () => closeDialog(sheet));

  // Cierre con animación para los dos diálogos del pedido.
  function closeDialog(dialog) {
    if (!dialog.open) return;
    if (!motion) {
      dialog.close();
      return;
    }
    dialog.classList.add("is-closing");
    setTimeout(() => {
      dialog.classList.remove("is-closing");
      dialog.close();
    }, 260);
  }
  [sheet, drawer].forEach((dialog) => {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      if (!sheet.open && !drawer.open) document.body.classList.remove("modal-open");
    });
  });

  // --- Agregar desde la tarjeta ---
  panelEl.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-add]");
    if (!btn) return;
    const item = ITEMS.get(btn.dataset.add);
    if (item.options) {
      openSheet(item, btn);
      return;
    }
    addLine(item.id, [], 1, "");
    confirmAdd(btn, item, 1);
  });

  function confirmAdd(btn, item, qty) {
    showToast(`${qty} × ${item.name} agregado`);
    if (btn && btn.isConnected) {
      btn.classList.add("is-added");
      btn.querySelector(".dish__add-icon").innerHTML = CHECK;
      setTimeout(() => {
        btn.classList.remove("is-added");
        btn.querySelector(".dish__add-icon").innerHTML = PLUS;
      }, 1300);
    }
    if (!motion || !btn || !btn.isConnected || fab.hidden) {
      bumpFab();
      return;
    }
    // Una bolita naranja vuela del botón al carrito.
    const from = btn.getBoundingClientRect();
    const to = fab.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "fly-dot";
    dot.style.left = `${from.left + from.width / 2 - 9}px`;
    dot.style.top = `${from.top + from.height / 2 - 9}px`;
    document.body.append(dot);
    const dx = to.left + 28 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const flight = dot.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(1.25)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0.6 },
      ],
      { duration: 750, easing: "cubic-bezier(0.5, 0, 0.3, 1)" },
    );
    flight.onfinish = () => {
      dot.remove();
      bumpFab();
    };
  }

  function bumpFab() {
    if (!motion) return;
    fab.classList.remove("is-bumping");
    void fab.offsetWidth;
    fab.classList.add("is-bumping");
  }

  let toastTimer;
  function showToast(text) {
    // Dentro de un diálogo abierto el aviso debe vivir en él para verse encima.
    const host = [drawer, sheet].find((d) => d.open) || document.body;
    if (toast.parentNode !== host) host.append(toast);
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  // --- Carrito ---
  function renderCart() {
    const count = cartCount();
    const total = cartTotal();
    const wasHidden = fab.hidden;
    fab.hidden = count === 0;
    if (wasHidden && !fab.hidden && motion) {
      fab.classList.remove("is-entering");
      void fab.offsetWidth;
      fab.classList.add("is-entering");
    }
    fabCount.textContent = String(count);
    fabTotal.textContent = money(total);
    fab.setAttribute("aria-label", `Ver pedido: ${count} ${count === 1 ? "producto" : "productos"}, ${money(total)}`);
    totalEl.textContent = money(total);
    emptyEl.hidden = count > 0;
    form.hidden = count === 0;
    sendBtn.disabled = count === 0;
    linesEl.innerHTML = state.lines
      .map((line) => {
        const item = ITEMS.get(line.id);
        const extra = describeChoices(line);
        return `<li class="cart-line" data-key="${escapeHtml(line.key)}">
          <div class="cart-line__info">
            <strong>${escapeHtml(item.name)}</strong>
            ${extra.length ? `<span>${escapeHtml(extra.join(" · "))}</span>` : ""}
            ${line.note ? `<em>Nota: ${escapeHtml(line.note)}</em>` : ""}
          </div>
          <div class="cart-line__side">
            <b>${money(lineTotal(line))}</b>
            <div class="stepper stepper--small">
              <button aria-label="Quitar uno de ${escapeHtml(item.name)}" data-step="-1" type="button">−</button>
              <span>${line.qty}</span>
              <button aria-label="Agregar uno más de ${escapeHtml(item.name)}" data-step="1" type="button">+</button>
            </div>
          </div>
        </li>`;
      })
      .join("");
  }
  linesEl.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-step]");
    if (!btn) return;
    const li = btn.closest(".cart-line");
    const line = state.lines.find((l) => l.key === li.dataset.key);
    line.qty += Number(btn.dataset.step);
    const remove = () => {
      state.lines = state.lines.filter((l) => l.qty > 0);
      save();
      renderCart();
      renderBadges();
    };
    if (line.qty <= 0 && motion) {
      li.classList.add("is-leaving");
      setTimeout(remove, 280);
    } else remove();
  });
  document.getElementById("cartClear").addEventListener("click", () => {
    state.lines = [];
    save();
    renderCart();
    renderBadges();
    sentEl.hidden = true;
  });

  function openDrawer() {
    sentEl.hidden = true;
    updateShift();
    drawer.showModal();
    document.body.classList.add("modal-open");
  }
  fab.addEventListener("click", openDrawer);
  document.querySelectorAll("[data-open-cart]").forEach((btn) => btn.addEventListener("click", openDrawer));
  drawer.querySelector(".cart-drawer__close").addEventListener("click", () => closeDialog(drawer));
  document.getElementById("cartKeepShopping").addEventListener("click", () => closeDialog(drawer));

  // --- Datos de entrega ---
  const addressField = document.getElementById("cartAddress");
  function syncForm() {
    const data = new FormData(form);
    state.form = {
      nombre: data.get("nombre") || "",
      entrega: data.get("entrega") || "Paso a recogerlo",
      direccion: data.get("direccion") || "",
      pago: data.get("pago") || "",
      notas: data.get("notas") || "",
    };
    addressField.hidden = state.form.entrega !== "Envío a domicilio";
    save();
  }
  function restoreForm() {
    const f = state.form;
    if (f.nombre) form.elements.nombre.value = f.nombre;
    if (f.entrega) {
      const radio = [...form.elements.entrega].find((r) => r.value === f.entrega);
      if (radio) radio.checked = true;
    }
    if (f.direccion) form.elements.direccion.value = f.direccion;
    if (f.pago) form.elements.pago.value = f.pago;
    if (f.notas) form.elements.notas.value = f.notas;
    addressField.hidden = (f.entrega || "") !== "Envío a domicilio";
  }
  form.addEventListener("input", syncForm);
  form.addEventListener("change", syncForm);

  // --- Turno disponible y mensaje de WhatsApp ---
  function updateShift() {
    if (typeof activeOrderConfig !== "function") return;
    const config = activeOrderConfig();
    const label = config === day ? "turno de día" : "turno de noche";
    shiftNote.textContent = `Se abrirá WhatsApp con tu pedido listo para enviarlo al ${label} (${config.label}).`;
    if (sectionShift) sectionShift.textContent = `Ahora atiende el ${label} · ${config.label}`;
  }
  updateShift();
  setInterval(updateShift, 30000);

  function buildMessage() {
    const f = state.form;
    const lines = state.lines.map((line) => {
      const item = ITEMS.get(line.id);
      const extra = describeChoices(line);
      let text = `• ${line.qty} × ${item.name}${extra.length ? ` (${extra.join(", ")})` : ""} — ${money(lineTotal(line))}`;
      if (line.note) text += `\n   Nota: ${line.note}`;
      return text;
    });
    const parts = [
      "Hola, quiero hacer un pedido en Café Petropolys 🍽️",
      "",
      "*MI PEDIDO*",
      ...lines,
      "",
      `*Total estimado: ${money(cartTotal())} MXN*`,
      "",
      `*Nombre:* ${f.nombre.trim()}`,
      `*Entrega:* ${f.entrega}`,
    ];
    if (f.entrega === "Envío a domicilio") parts.push(`*Dirección:* ${f.direccion.trim()}`);
    if (f.pago) parts.push(`*Pago:* ${f.pago}`);
    if (f.notas.trim()) parts.push(`*Notas:* ${f.notas.trim()}`);
    parts.push("", "Pedido armado desde la página web.");
    return parts.join("\n");
  }

  sendBtn.addEventListener("click", () => {
    syncForm();
    if (!state.form.nombre.trim()) {
      form.elements.nombre.focus();
      form.elements.nombre.closest(".field").classList.add("is-invalid");
      showToast("Escribe tu nombre para enviar el pedido");
      return;
    }
    if (state.form.entrega === "Envío a domicilio" && !state.form.direccion.trim()) {
      form.elements.direccion.focus();
      form.elements.direccion.closest(".field").classList.add("is-invalid");
      showToast("Escribe la dirección de entrega");
      return;
    }
    const config = activeOrderConfig();
    const url = `https://wa.me/52${config.phone}?text=${encodeURIComponent(buildMessage())}`;
    const win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url;
    sentEl.hidden = false;
    sentEl.scrollIntoView({ block: "nearest", behavior: motion ? "smooth" : "auto" });
  });
  form.addEventListener("input", (event) => {
    const field = event.target.closest(".field");
    if (field) field.classList.remove("is-invalid");
  });
  form.addEventListener("submit", (event) => event.preventDefault());

  // --- Inicio ---
  restoreForm();
  syncForm();
  selectTab(activeCat);
  renderCart();
  // Permite abrir una categoría desde enlaces como <a data-menu-cat="bebidas">.
  document.querySelectorAll("[data-menu-cat]").forEach((link) =>
    link.addEventListener("click", () => selectTab(link.dataset.menuCat)),
  );
})();
