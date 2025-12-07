// Application Modal Functions

function openApplicationModal(position) {
    const modal = document.getElementById('applicationModal');
    const innerContainer = document.getElementById('applicationModalInner');

    // Set modal backdrop styles - create flexbox container
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.zIndex = '99999';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.padding = '1rem';
    modal.style.overflow = 'auto';

    // Force inner container to be visible with explicit styles - ABSOLUTE POSITIONING
    if (innerContainer) {
        innerContainer.style.display = 'block';
        innerContainer.style.backgroundColor = 'white';
        innerContainer.style.borderRadius = '1rem';
        innerContainer.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        innerContainer.style.maxWidth = '48rem';
        innerContainer.style.width = '90%';
        innerContainer.style.maxHeight = '90vh';
        innerContainer.style.overflowY = 'auto';
        innerContainer.style.position = 'fixed';  // Changed to fixed
        innerContainer.style.top = '50%';  // Center vertically
        innerContainer.style.left = '50%';  // Center horizontally
        innerContainer.style.transform = 'translate(-50%, -50%)';  // Offset by half its own size
        innerContainer.style.margin = '0';
        innerContainer.style.opacity = '1';
        innerContainer.style.visibility = 'visible';
        innerContainer.style.zIndex = '100000';  // Higher than navbar (99999)
    }

    document.getElementById('jobTitle').textContent = `Position: ${position}`;
    document.getElementById('position').value = position;
    document.body.style.overflow = 'hidden';

    console.log('Modal backdrop display:', modal.style.display);
    console.log('Inner container:', innerContainer);
    if (innerContainer) {
        const computed = window.getComputedStyle(innerContainer);
        const rect = innerContainer.getBoundingClientRect();
        console.log('Inner container display:', computed.display);
        console.log('Inner container dimensions:', innerContainer.offsetWidth, 'x', innerContainer.offsetHeight);
        console.log('Inner container background:', computed.backgroundColor);
        console.log('Inner container position on screen:', rect);
        console.log('Inner container opacity:', computed.opacity);
        console.log('Inner container visibility:', computed.visibility);
        console.log('Inner container z-index:', computed.zIndex);
        console.log('Inner container transform:', computed.transform);
    }
}

function closeApplicationModal() {
    const modal = document.getElementById('applicationModal');
    modal.style.display = 'none';
    document.getElementById('applicationForm').reset();
    document.body.style.overflow = 'auto';

    // Reset file previews
    resetFilePreview('cv');
    resetFilePreview('coverLetter');
    resetFilePreview('documents');

    // Hide success/error messages
    const successMsg = document.getElementById('applicationSuccess');
    const errorMsg = document.getElementById('applicationError');
    if (successMsg) successMsg.classList.add('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
}

function resetFilePreview(type) {
    if (type === 'cv') {
        document.getElementById('cvPlaceholder').classList.remove('hidden');
        document.getElementById('cvPreview').classList.add('hidden');
        document.getElementById('cvInput').value = '';
    } else if (type === 'coverLetter') {
        document.getElementById('coverLetterPlaceholder').classList.remove('hidden');
        document.getElementById('coverLetterPreview').classList.add('hidden');
        document.getElementById('coverLetterInput').value = '';
    } else if (type === 'documents') {
        document.getElementById('documentsPlaceholder').classList.remove('hidden');
        document.getElementById('documentsPreview').classList.add('hidden');
        document.getElementById('documentsPreview').innerHTML = '';
        document.getElementById('documentsInput').value = '';
    }
}

function removeFile(type) {
    resetFilePreview(type);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applicationModal');

    // Only initialize if application modal exists (Karriere page)
    if (!modal) return;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeApplicationModal();
        }
    });

    // Setup Drag & Drop for CV
    setupDragAndDrop('cvDropzone', 'cvInput', 'cvPlaceholder', 'cvPreview', 'cvFileName', false);

    // Setup Drag & Drop for Cover Letter
    setupDragAndDrop('coverLetterDropzone', 'coverLetterInput', 'coverLetterPlaceholder', 'coverLetterPreview', 'coverLetterFileName', false);

    // Setup Drag & Drop for Documents (multiple files)
    setupDragAndDrop('documentsDropzone', 'documentsInput', 'documentsPlaceholder', 'documentsPreview', null, true);

    // Form submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }
});

function setupDragAndDrop(dropzoneId, inputId, placeholderId, previewId, fileNameId, multiple) {
    const dropzone = document.getElementById(dropzoneId);
    const input = document.getElementById(inputId);
    const placeholder = document.getElementById(placeholderId);
    const preview = document.getElementById(previewId);

    // Check if elements exist (only on pages with application form)
    if (!dropzone || !input) return;

    // Click to upload
    dropzone.addEventListener('click', () => input.click());

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

        if (multiple) {
            handleMultipleFiles(files, input, placeholder, preview);
        } else {
            handleSingleFile(files[0], input, placeholder, preview, fileNameId);
        }
    }, false);

    // Handle selected files (click)
    input.addEventListener('change', (e) => {
        const files = e.target.files;

        if (multiple) {
            handleMultipleFiles(files, input, placeholder, preview);
        } else {
            handleSingleFile(files[0], input, placeholder, preview, fileNameId);
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleSingleFile(file, input, placeholder, preview, fileNameId) {
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('Die Datei ist zu groß. Maximal 5MB erlaubt.');
        return;
    }

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        alert('Bitte nur PDF oder Word-Dokumente hochladen.');
        return;
    }

    // Show preview
    placeholder.classList.add('hidden');
    preview.classList.remove('hidden');
    document.getElementById(fileNameId).textContent = file.name;
}

function handleMultipleFiles(files, input, placeholder, preview) {
    if (files.length === 0) return;

    // Clear previous preview
    preview.innerHTML = '';

    // Validate and show each file
    let validFiles = 0;
    Array.from(files).forEach(file => {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert(`${file.name} ist zu groß. Maximal 5MB erlaubt.`);
            return;
        }

        // Validate file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert(`${file.name}: Bitte nur PDF oder Word-Dokumente hochladen.`);
            return;
        }

        validFiles++;

        // Create preview element
        const filePreview = document.createElement('div');
        filePreview.className = 'flex items-center gap-2 p-2 bg-primary-50 rounded text-primary-700';
        filePreview.innerHTML = `
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="flex-1 text-sm">${file.name}</span>
        `;
        preview.appendChild(filePreview);
    });

    if (validFiles > 0) {
        placeholder.classList.add('hidden');
        preview.classList.remove('hidden');
    }
}

async function handleApplicationSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('applicationSuccess');
    const errorMsg = document.getElementById('applicationError');

    // Hide previous messages
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Wird gesendet...';

    try {
        const response = await fetch('/apply', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            successMsg.classList.remove('hidden');
            form.reset();
            resetFilePreview('cv');
            resetFilePreview('coverLetter');
            resetFilePreview('documents');

            // Close modal after 3 seconds
            setTimeout(() => {
                closeApplicationModal();
            }, 3000);
        } else {
            errorMsg.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMsg.classList.remove('hidden');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Bewerbung absenden';
    }
}
