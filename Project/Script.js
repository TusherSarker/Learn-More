// ── Toggle open/close on click ──────────────────────────────────
const subjectBtn = document.getElementById('subjectBtn');
const megaMenu = document.getElementById('megaMenu');
const subjectDrop = document.getElementById('subjectDrop');
const chevron = document.getElementById('subChevron');

subjectBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = megaMenu.classList.toggle('show');
    subjectDrop.classList.toggle('open', open);
    chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
    // Reset to class-only state on each open
    if (open) resetToClassOnly();
});

document.addEventListener('click', e => {
    if (!subjectDrop.contains(e.target)) {
        megaMenu.classList.remove('show');
        subjectDrop.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
    }
});

// ── Reset to initial state (only class col visible) ──────────────
function resetToClassOnly() {
    document.querySelectorAll('.class-item').forEach(i => i.classList.remove('active'));
    document.getElementById('colGroups').classList.remove('visible');
    document.getElementById('colSubjects').classList.remove('visible');
    megaMenu.classList.remove('has-group', 'has-subject');
}

// ── Hover on a Class → show groups column ────────────────────────
function hoverClass(cls, el) {
    // Highlight active class
    document.querySelectorAll('.class-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    // Hide all group sets, show the one for this class
    document.querySelectorAll('.groups-set').forEach(g => g.classList.add('hidden'));
    const gset = document.getElementById('gset-' + cls);
    if (gset) gset.classList.remove('hidden');

    // Show groups column, hide subjects column
    const colGroups = document.getElementById('colGroups');
    const colSubjects = document.getElementById('colSubjects');
    colGroups.classList.add('visible');
    colSubjects.classList.remove('visible');
    megaMenu.classList.add('has-group');
    megaMenu.classList.remove('has-subject');

    // Clear group active states
    document.querySelectorAll('.group-item').forEach(i => i.classList.remove('active'));
}

// ── Hover on a Group → show subjects column ──────────────────────
function hoverGroup(cls, group, el) {
    // Highlight active group
    const gset = document.getElementById('gset-' + cls);
    if (gset) gset.querySelectorAll('.group-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    // Hide all subject sets, show the matching one
    document.querySelectorAll('.subjects-set').forEach(s => s.classList.add('hidden'));
    const sset = document.getElementById('subs-' + cls + '-' + group);
    if (sset) sset.classList.remove('hidden');

    // Show subjects column
    const colSubjects = document.getElementById('colSubjects');
    colSubjects.classList.add('visible');
    megaMenu.classList.add('has-subject');
}