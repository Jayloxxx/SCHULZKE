// Project Inquiry Form with Photo Upload

let uploadedPhotos = [];

document.addEventListener('DOMContentLoaded', function() {
    setupPhotoUpload();
    setupFormSubmission();
});

function setupPhotoUpload() {
    const dropzone = document.getElementById('photoDropzone');
    const input = document.getElementById('photoInput');
    const placeholder = document.getElementById('photoPlaceholder');
    const preview = document.getElementById('photoPreview');

    // Click to upload
    dropzone.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            input.click();
        }
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.add('border-primary-500', 'bg-primary-100');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.remove('border-primary-500', 'bg-primary-100');
        }, false);
    });

    // Handle dropped files
    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handlePhotos(files);
    }, false);

    // Handle selected files (click)
    input.addEventListener('change', (e) => {
        const files = e.target.files;
        handlePhotos(files);
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handlePhotos(files) {
    const validFiles = Array.from(files).filter(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} ist kein Bild.`);
            return false;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert(`${file.name} ist zu groß. Maximal 5MB pro Bild erlaubt.`);
            return false;
        }

        return true;
    });

    if (validFiles.length === 0) return;

    // Add new photos to uploaded array
    validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhotos.push({
                file: file,
                dataUrl: e.target.result
            });
            updatePhotoPreview();
        };
        reader.readAsDataURL(file);
    });
}

function updatePhotoPreview() {
    const placeholder = document.getElementById('photoPlaceholder');
    const preview = document.getElementById('photoPreview');
    const grid = document.getElementById('photoGrid');

    if (uploadedPhotos.length > 0) {
        placeholder.classList.add('hidden');
        preview.classList.remove('hidden');

        // Clear and rebuild grid
        grid.innerHTML = '';

        uploadedPhotos.forEach((photo, index) => {
            const photoCard = document.createElement('div');
            photoCard.className = 'relative group';
            photoCard.innerHTML = `
                <div class="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img src="${photo.dataUrl}" alt="Foto ${index + 1}" class="w-full h-full object-cover">
                </div>
                <button type="button" onclick="removePhoto(${index})"
                        class="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <p class="text-xs text-gray-600 mt-2 text-center truncate">${photo.file.name}</p>
            `;
            grid.appendChild(photoCard);
        });
    } else {
        placeholder.classList.remove('hidden');
        preview.classList.add('hidden');
    }
}

function removePhoto(index) {
    uploadedPhotos.splice(index, 1);
    updatePhotoPreview();
}

function addMorePhotos() {
    document.getElementById('photoInput').click();
}

function setupFormSubmission() {
    const form = document.getElementById('projectForm');
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('projectSuccess');
    const errorMsg = document.getElementById('projectError');

    // Hide previous messages
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // Validate that we have at least some photos (optional but recommended)
    if (uploadedPhotos.length === 0) {
        const confirm = window.confirm('Sie haben keine Fotos hochgeladen. Möchten Sie trotzdem fortfahren? (Fotos helfen uns, Ihr Projekt besser einzuschätzen)');
        if (!confirm) return;
    }

    // Add photos to FormData
    uploadedPhotos.forEach((photo, index) => {
        formData.append('photos', photo.file, photo.file.name);
    });

    // Disable submit button
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';

    try {
        const response = await fetch('/submit-project', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            successMsg.classList.remove('hidden');
            form.reset();
            uploadedPhotos = [];
            updatePhotoPreview();

            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            errorMsg.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMsg.classList.remove('hidden');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}
