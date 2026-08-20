(function () {
    const modal = document.getElementById('eventModal');
    const title = document.getElementById('modalTitle');
    const meta = document.getElementById('modalMeta');
    const date = document.getElementById('modalDate');
    const desc = document.getElementById('modalDesc');
    const duration = document.getElementById('modalDuration');
    const level = document.getElementById('modalLevel');
    const capacity = document.getElementById('modalCapacity');
    const status = document.getElementById('modalStatus');
    const tags = document.getElementById('modalTags');
    const closeBtn = document.getElementById('modalCloseBtn');
    function openModal(data) {
        title.textContent = data.title || 'Event';
        meta.textContent = data.meta || '';
        date.textContent = data.date || 'Date TBD';
        desc.textContent = data.desc || 'No details available.';
        duration.textContent = data.duration || '—';
        level.textContent = data.level || '—';
        capacity.textContent = data.capacity || '—';
        status.textContent = data.status || 'Open';
        tags.innerHTML = '';
        if (data.tags) {
            var tagList = data.tags.split(',').map(function (t) { return t.trim(); });
            tagList.forEach(function (tag) {
                var span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                tags.appendChild(span);
            });
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-modal-title]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var data = {
                title: this.getAttribute('data-modal-title') || 'Event',
                meta: this.getAttribute('data-modal-meta') || '',
                date: this.getAttribute('data-modal-date') || 'Date TBD',
                desc: this.getAttribute('data-modal-desc') || 'No details available.',
                duration: this.getAttribute('data-modal-duration') || '—',
                level: this.getAttribute('data-modal-level') || '—',
                capacity: this.getAttribute('data-modal-capacity') || '—',
                status: this.getAttribute('data-modal-status') || 'Open',
                tags: this.getAttribute('data-modal-tags') || ''
            };
            openModal(data);
        });
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal)
            closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active'))
            closeModal();
    });
    document.querySelector('[data-year]').textContent = new Date().getFullYear();
})();
