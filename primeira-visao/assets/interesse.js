const souvenirDialog = document.querySelector('#souvenir-dialog');
const souvenirForm = document.querySelector('#souvenir-form');
const souvenirStatus = document.querySelector('#souvenir-status');
const souvenirSubmit = souvenirForm.querySelector('button[type="submit"]');

function updateSouvenirFields() {
  const isShirt = souvenirForm.elements.product.value === 'Camiseta';
  const size = souvenirForm.elements.size;
  document.querySelector('#souvenir-size-wrap').hidden = !isShirt;
  size.required = isShirt;
  size.disabled = !isShirt;
  document.querySelector('#souvenir-price').textContent = isShirt
    ? 'Camiseta por R$ 60,00. Confirme seu interesse até 27 de novembro.'
    : 'Caneca por R$ 40,00. A produção depende de pelo menos 20 reservas até 27 de novembro.';
}

const linkedProduct = new URLSearchParams(location.search).get('produto');
if (linkedProduct === 'caneca') souvenirForm.elements.product.value = 'Caneca';
if (linkedProduct === 'camiseta') souvenirForm.elements.product.value = 'Camiseta';
updateSouvenirFields();
souvenirForm.elements.product.addEventListener('change', updateSouvenirFields);
document.querySelectorAll('[data-souvenir]').forEach(button => {
  button.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !souvenirDialog?.showModal) return;
    event.preventDefault();
    souvenirForm.elements.product.value = button.dataset.souvenir;
    updateSouvenirFields();
    if (!souvenirSubmit.disabled) souvenirStatus.textContent = '';
    souvenirDialog.showModal();
  });
});
document.querySelector('#close-souvenir')?.addEventListener('click',()=>souvenirDialog.close());souvenirDialog?.addEventListener('click',e=>{if(e.target===souvenirDialog){const r=souvenirDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)souvenirDialog.close()}});
souvenirForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (souvenirSubmit.disabled) return;
  const data = Object.fromEntries(new FormData(souvenirForm));
  souvenirSubmit.disabled = true;
  souvenirStatus.textContent = 'Registrando seu interesse…';
  try {
    const response = await fetch('/api/interesse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      souvenirStatus.textContent = result.error || 'Não foi possível registrar seu interesse.';
      return;
    }
    souvenirForm.reset();
    souvenirForm.elements.product.value = data.product;
    updateSouvenirFields();
    if (result.preview) {
      const [date, name, phone, product, size] = result.preview;
      const details = [date, name, phone, product, size].filter(Boolean).join(' · ');
      souvenirStatus.textContent = 'Cadastro de teste salvo neste computador. ' + details;
      return;
    }
    souvenirStatus.textContent = data.product === 'Caneca'
      ? 'Reserva registrada! Se atingirmos o mínimo de 20 canecas, entraremos em contato pelo telefone informado.'
      : 'Interesse registrado! A organização vai entrar em contato pelo telefone informado.';
  } catch {
    souvenirStatus.textContent = 'Não foi possível registrar seu interesse. Tente novamente.';
  } finally {
    souvenirSubmit.disabled = false;
  }
});
const previewNote = document.querySelector('#preview-note');
if (previewNote && ['localhost', '127.0.0.1'].includes(location.hostname)) {
  previewNote.hidden = false;
}
