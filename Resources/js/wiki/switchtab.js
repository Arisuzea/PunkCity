function switchTab(tabId, group) {
  const groupEl = document.querySelector(`.method-tabs[data-group="${group}"]`).parentElement;

  groupEl.querySelectorAll('.method-tab').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  groupEl.querySelectorAll('.method-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  groupEl.querySelector(`#tab-${tabId}`).classList.add('active');
  groupEl.querySelector(`#tab-${tabId}`).setAttribute('aria-selected', 'true');
  groupEl.querySelector(`#panel-${tabId}`).classList.add('active');
}