const modalVideo = document.getElementById('modalVideo');
modalVideo?.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const recipient = button.getAttribute('data-bs-whatever');
    modalVideo.querySelector('.modal-body').innerHTML = `
        <iframe
            width="560" height="315"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        >
        </iframe>`;
    modalVideo.querySelector('iframe').src = recipient;
});
