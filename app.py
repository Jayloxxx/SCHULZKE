from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory
from flask_mail import Mail, Message
import os
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here-change-in-production'

# File Upload Configuration
app.config['UPLOAD_FOLDER'] = 'applications'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max upload
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

# Email Configuration - Brevo SMTP
app.config['MAIL_SERVER'] = 'smtp-relay.brevo.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')  # Brevo Login
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')  # Brevo SMTP-Key
app.config['MAIL_DEFAULT_SENDER'] = ('Schulzke Bau', 'schulzkebau@t-online.de')

mail = Mail(app)

# Custom Jinja2 filter for date formatting
@app.template_filter('date')
def format_date(value, format='%d.%m.%Y'):
    """Format a date string or datetime object."""
    if value == 'now':
        return datetime.now().strftime(format)
    elif isinstance(value, datetime):
        return value.strftime(format)
    return value

@app.route('/')
def index():
    """Homepage route"""
    return render_template('index.html')

@app.route('/logo-preview')
def logo_preview():
    """Logo preview page for selection"""
    return render_template('logo-preview.html')

@app.route('/impressum')
def impressum():
    """Impressum page"""
    return render_template('impressum.html')

@app.route('/datenschutz')
def datenschutz():
    """Privacy policy page"""
    return render_template('datenschutz.html')

@app.route('/agb')
def agb():
    """Terms and conditions page"""
    return render_template('agb.html')

@app.route('/ablauf')
def ablauf():
    """Project workflow/journey page"""
    return render_template('ablauf.html')

@app.route('/referenzen-zertifikate')
def referenzen_zertifikate():
    """References and certificates page"""
    return render_template('referenzen_zertifikate.html')

@app.route('/projektanfrage')
def projektanfrage():
    """Project inquiry page"""
    return render_template('projektanfrage.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone', '')
        subject = request.form.get('subject')
        message = request.form.get('message')

        # Validate required fields
        if not all([name, email, subject, message]):
            return render_template('index.html', error=True)

        # Save to file (simple storage solution)
        save_contact_to_file(name, email, phone, subject, message)

        # Optional: Send email notification
        try:
            send_contact_email(name, email, phone, subject, message)
        except Exception as e:
            print(f"Email sending failed: {e}")
            # Continue even if email fails

        return render_template('index.html', message_sent=True)

    except Exception as e:
        print(f"Contact form error: {e}")
        return render_template('index.html', error=True)

def save_contact_to_file(name, email, phone, subject, message):
    """Save contact form submission to a text file"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Create contacts directory if it doesn't exist
    if not os.path.exists('contacts'):
        os.makedirs('contacts')

    # Save to file
    filename = f"contacts/contact_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"Kontaktanfrage - {timestamp}\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Name: {name}\n")
        f.write(f"Email: {email}\n")
        f.write(f"Telefon: {phone}\n")
        f.write(f"Betreff: {subject}\n\n")
        f.write(f"Nachricht:\n{message}\n")

    print(f"Contact saved to {filename}")

def send_contact_email(name, email, phone, subject, message):
    """Send email notification for contact form submission"""
    if not app.config['MAIL_USERNAME']:
        print("Email not configured - skipping email notification")
        return

    msg = Message(
        subject=f"Neue Kontaktanfrage: {subject}",
        recipients=['schulzkebau@t-online.de'],
        reply_to=email
    )

    msg.body = f"Neue Kontaktanfrage von {name} ({email}): {message}"

    msg.html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #E85A1E, #F5A623); padding: 30px 40px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Neue Kontaktanfrage</h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">über schulzkebau.com</p>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <!-- Contact Info Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin-bottom: 30px;">
                                    <tr>
                                        <td style="padding: 25px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span><br>
                                                        <span style="color: #212529; font-size: 16px; font-weight: 600;">{name}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">E-Mail</span><br>
                                                        <a href="mailto:{email}" style="color: #E85A1E; font-size: 16px; font-weight: 600; text-decoration: none;">{email}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</span><br>
                                                        <a href="tel:{phone}" style="color: #E85A1E; font-size: 16px; font-weight: 600; text-decoration: none;">{phone}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 0 0;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Betreff</span><br>
                                                        <span style="color: #212529; font-size: 16px; font-weight: 600;">{subject}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Message -->
                                <h3 style="color: #212529; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;">Nachricht</h3>
                                <div style="background-color: #fff; border-left: 4px solid #E85A1E; padding: 20px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                    <p style="color: #495057; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{message}</p>
                                </div>

                                <!-- Quick Actions -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                    <tr>
                                        <td align="center">
                                            <a href="mailto:{email}?subject=Re: {subject}" style="display: inline-block; background: linear-gradient(135deg, #E85A1E, #F5A623); color: #ffffff; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Direkt antworten</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                                <p style="color: #888; font-size: 13px; margin: 0;">Schulzke Bau- & Industriemontagen</p>
                                <p style="color: #666; font-size: 12px; margin: 8px 0 0 0;">Diese E-Mail wurde automatisch generiert.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    mail.send(msg)
    print("Contact email sent successfully")

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/apply', methods=['POST'])
def apply():
    """Handle job application submissions"""
    try:
        # Get form data
        position = request.form.get('position')
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        email = request.form.get('email')
        phone = request.form.get('phone')
        address = request.form.get('address', '')
        zipcode = request.form.get('zipcode', '')
        city = request.form.get('city', '')
        message = request.form.get('message', '')

        # Validate required fields
        if not all([position, firstname, lastname, email, phone]):
            return jsonify({'error': 'Required fields missing'}), 400

        # Create application directory with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        applicant_name = f"{lastname}_{firstname}".replace(' ', '_')
        app_dir = os.path.join(app.config['UPLOAD_FOLDER'], f"{timestamp}_{applicant_name}")
        os.makedirs(app_dir, exist_ok=True)

        # Save uploaded files
        files_saved = {}

        # CV (required)
        if 'cv' in request.files:
            cv_file = request.files['cv']
            if cv_file and cv_file.filename and allowed_file(cv_file.filename):
                filename = secure_filename(f"CV_{cv_file.filename}")
                filepath = os.path.join(app_dir, filename)
                cv_file.save(filepath)
                files_saved['cv'] = filename

        # Cover Letter (optional)
        if 'cover_letter' in request.files:
            cover_file = request.files['cover_letter']
            if cover_file and cover_file.filename and allowed_file(cover_file.filename):
                filename = secure_filename(f"Anschreiben_{cover_file.filename}")
                filepath = os.path.join(app_dir, filename)
                cover_file.save(filepath)
                files_saved['cover_letter'] = filename

        # Additional documents (optional, multiple)
        if 'documents' in request.files:
            documents = request.files.getlist('documents')
            doc_count = 0
            for doc_file in documents:
                if doc_file and doc_file.filename and allowed_file(doc_file.filename):
                    doc_count += 1
                    filename = secure_filename(f"Dokument_{doc_count}_{doc_file.filename}")
                    filepath = os.path.join(app_dir, filename)
                    doc_file.save(filepath)
                    files_saved[f'document_{doc_count}'] = filename

        # Save application details to text file
        save_application_to_file(app_dir, position, firstname, lastname, email, phone,
                                address, zipcode, city, message, files_saved)

        # Optional: Send email notification
        try:
            send_application_email(position, firstname, lastname, email, phone,
                                 address, zipcode, city, message, files_saved, app_dir)
        except Exception as e:
            print(f"Email sending failed: {e}")
            # Continue even if email fails

        return jsonify({'success': True, 'message': 'Application received'}), 200

    except Exception as e:
        print(f"Application error: {e}")
        return jsonify({'error': 'Server error'}), 500

def save_application_to_file(app_dir, position, firstname, lastname, email, phone,
                            address, zipcode, city, message, files_saved):
    """Save application details to a text file"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    filename = os.path.join(app_dir, 'bewerbung_details.txt')
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"BEWERBUNG - {timestamp}\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Position: {position}\n\n")
        f.write("PERSÖNLICHE DATEN:\n")
        f.write("-" * 60 + "\n")
        f.write(f"Name: {firstname} {lastname}\n")
        f.write(f"E-Mail: {email}\n")
        f.write(f"Telefon: {phone}\n")
        if address:
            f.write(f"Adresse: {address}\n")
        if zipcode and city:
            f.write(f"PLZ/Stadt: {zipcode} {city}\n")

        f.write("\nNACHRICHT:\n")
        f.write("-" * 60 + "\n")
        f.write(f"{message}\n\n")

        f.write("HOCHGELADENE DOKUMENTE:\n")
        f.write("-" * 60 + "\n")
        for file_type, filename in files_saved.items():
            f.write(f"- {file_type}: {filename}\n")

    print(f"Application saved to {app_dir}")

def send_application_email(position, firstname, lastname, email, phone,
                          address, zipcode, city, message, files_saved, app_dir):
    """Send email notification for application with beautiful HTML template"""
    if not app.config['MAIL_USERNAME']:
        print("Email not configured - skipping email notification")
        return

    msg = Message(
        subject=f"Neue Bewerbung: {position} - {firstname} {lastname}",
        recipients=['schulzkebau@t-online.de'],
        reply_to=email
    )

    # Plain text fallback
    msg.body = f"Neue Bewerbung von {firstname} {lastname} ({email}) für die Position: {position}"

    # Build documents list HTML
    docs_count = len(files_saved)
    docs_html = ""
    if docs_count > 0:
        docs_list = ""
        for file_type, filename in files_saved.items():
            file_label = file_type.replace('_', ' ').title()
            docs_list += f"""
                <tr>
                    <td style="padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span style="color: #E85A1E; font-weight: 600;">{file_label}:</span>
                        <span style="color: #fff; margin-left: 8px;">{filename}</span>
                    </td>
                </tr>
            """
        docs_html = f"""
                                <!-- Documents -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 8px; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                                            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #E85A1E, #F5A623); border-radius: 10px; text-align: center; line-height: 44px;">
                                                                <span style="font-size: 20px;">📎</span>
                                                            </div>
                                                            <div>
                                                                <span style="color: #fff; font-size: 16px; font-weight: 600;">{docs_count} Dokument(e) angehängt</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {docs_list}
                                            </table>
                                        </td>
                                    </tr>
                                </table>
        """

    # Full address for display
    full_address = f"{address}, {zipcode} {city}" if address else f"{zipcode} {city}"

    msg.html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px 40px; text-align: center;">
                                <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                                    <span style="font-size: 28px;">👤</span>
                                </div>
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Neue Bewerbung</h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">{position}</p>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <!-- Applicant Info -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 25px;">
                                            <h3 style="color: #2563eb; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px 0;">Bewerber-Daten</h3>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span><br>
                                                        <span style="color: #212529; font-size: 20px; font-weight: 700;">{firstname} {lastname}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">E-Mail</span><br>
                                                        <a href="mailto:{email}" style="color: #2563eb; font-size: 16px; font-weight: 600; text-decoration: none;">{email}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</span><br>
                                                        <a href="tel:{phone}" style="color: #2563eb; font-size: 16px; font-weight: 600; text-decoration: none;">{phone}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 0 0;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Adresse</span><br>
                                                        <span style="color: #212529; font-size: 16px; font-weight: 600;">{full_address}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Message -->
                                <h3 style="color: #212529; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;">Anschreiben / Nachricht</h3>
                                <div style="background-color: #fff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 25px;">
                                    <p style="color: #495057; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{message if message else 'Keine Nachricht hinterlassen.'}</p>
                                </div>

{docs_html}

                                <!-- Quick Actions -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                    <tr>
                                        <td align="center" style="padding-right: 10px;" width="50%">
                                            <a href="mailto:{email}?subject=Re: Ihre Bewerbung als {position}" style="display: block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">✉️ Antworten</a>
                                        </td>
                                        <td align="center" style="padding-left: 10px;" width="50%">
                                            <a href="tel:{phone}" style="display: block; background: #1a1a1a; color: #ffffff; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Anrufen</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                                <p style="color: #888; font-size: 13px; margin: 0;">Schulzke Bau- & Industriemontagen</p>
                                <p style="color: #666; font-size: 12px; margin: 8px 0 0 0;">Bewerbung über schulzkebau.com</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    # Attach files to email
    for file_type, filename in files_saved.items():
        filepath = os.path.join(app_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'rb') as f:
                # Determine content type
                content_type = 'application/octet-stream'
                if filename.lower().endswith('.pdf'):
                    content_type = 'application/pdf'
                elif filename.lower().endswith('.doc'):
                    content_type = 'application/msword'
                elif filename.lower().endswith('.docx'):
                    content_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                msg.attach(filename, content_type, f.read())

    mail.send(msg)
    print("Application email sent successfully")

@app.route('/submit-project', methods=['POST'])
def submit_project():
    """Handle project inquiry submissions"""
    try:
        # Get form data - support both old and new field names
        name = request.form.get('name', '')
        name_parts = name.split(' ', 1) if name else ['', '']
        firstname = request.form.get('firstname') or name_parts[0]
        lastname = request.form.get('lastname') or (name_parts[1] if len(name_parts) > 1 else '')
        email = request.form.get('email')
        phone = request.form.get('phone')
        address = request.form.get('address', '')
        zipcode = request.form.get('zipcode', '')
        city = request.form.get('city', '')
        category = request.form.get('category') or request.form.get('project_type', '')
        description = request.form.get('description') or request.form.get('message', '')

        # Additional fields from modal form
        timeframe = request.form.get('timeframe', '')
        scope = request.form.get('scope', '')
        notes = request.form.get('notes', '')

        # Combine description with additional info
        if timeframe or scope or notes:
            description = f"{description}\n\nZeitrahmen: {timeframe}\nUmfang: {scope}\nAnmerkungen: {notes}"

        # Validate required fields
        if not all([firstname, email, phone, category, description]):
            return jsonify({'error': 'Required fields missing'}), 400

        # Create project directory with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        project_name = f"{lastname}_{firstname}_{category}".replace(' ', '_')
        project_dir = os.path.join('projects', f"{timestamp}_{project_name}")
        os.makedirs(project_dir, exist_ok=True)

        # Create photos subdirectory
        photos_dir = os.path.join(project_dir, 'photos')
        os.makedirs(photos_dir, exist_ok=True)

        # Save uploaded photos - check for both 'photos' and 'images' field names
        photos_saved = []
        photo_field = 'photos' if 'photos' in request.files else 'images'
        if photo_field in request.files:
            photos = request.files.getlist(photo_field)
            for i, photo in enumerate(photos):
                if photo and photo.filename:
                    # Validate file type
                    if not photo.content_type.startswith('image/'):
                        continue

                    filename = secure_filename(f"foto_{i+1}_{photo.filename}")
                    filepath = os.path.join(photos_dir, filename)
                    photo.save(filepath)
                    photos_saved.append(filename)

        # Save project details to text file
        save_project_to_file(project_dir, firstname, lastname, email, phone,
                           address, zipcode, city, category, description, photos_saved)

        # Optional: Send email notification
        try:
            send_project_email(firstname, lastname, email, phone, address, zipcode, city,
                             category, description, photos_saved, project_dir)
        except Exception as e:
            print(f"Email sending failed: {e}")
            # Continue even if email fails

        return jsonify({'success': True, 'message': 'Project inquiry received'}), 200

    except Exception as e:
        print(f"Project submission error: {e}")
        return jsonify({'error': 'Server error'}), 500

def save_project_to_file(project_dir, firstname, lastname, email, phone,
                        address, zipcode, city, category, description, photos_saved):
    """Save project inquiry details to a text file"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    filename = os.path.join(project_dir, 'projekt_details.txt')
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"PROJEKTANFRAGE - {timestamp}\n")
        f.write("=" * 60 + "\n\n")

        f.write("KONTAKTDATEN:\n")
        f.write("-" * 60 + "\n")
        f.write(f"Name: {firstname} {lastname}\n")
        f.write(f"E-Mail: {email}\n")
        f.write(f"Telefon: {phone}\n")
        if address:
            f.write(f"Adresse: {address}\n")
        if zipcode and city:
            f.write(f"PLZ/Stadt: {zipcode} {city}\n")

        f.write("\nPROJEKTDETAILS:\n")
        f.write("-" * 60 + "\n")
        f.write(f"Kategorie: {category}\n\n")
        f.write(f"Beschreibung:\n{description}\n")

        f.write("\nHOCHGELADENE FOTOS:\n")
        f.write("-" * 60 + "\n")
        if photos_saved:
            for photo in photos_saved:
                f.write(f"- {photo}\n")
        else:
            f.write("Keine Fotos hochgeladen\n")

    print(f"Project inquiry saved to {project_dir}")

def send_project_email(firstname, lastname, email, phone, address, zipcode, city,
                      category, description, photos_saved, project_dir):
    """Send email notification for project inquiry with inline images"""
    if not app.config['MAIL_USERNAME']:
        print("Email not configured - skipping email notification")
        return

    msg = Message(
        subject=f"Neue Projektanfrage: {category} - {firstname} {lastname}",
        recipients=['schulzkebau@t-online.de'],
        reply_to=email
    )

    # Create full address for Google Maps
    full_address = f"{address}, {zipcode} {city}" if address else f"{zipcode} {city}"
    maps_url = f"https://www.google.com/maps/search/?api=1&query={full_address.replace(' ', '+')}"
    maps_directions_url = f"https://www.google.com/maps/dir/?api=1&destination={full_address.replace(' ', '+')}"

    # Plain text fallback
    msg.body = f"Neue Projektanfrage von {firstname} {lastname} ({email}): {category} - {description}"

    # Photo info
    photo_count = len(photos_saved)
    photos_dir = os.path.join(project_dir, 'photos')

    # Build inline photo gallery HTML
    photo_gallery_html = ""
    if photo_count > 0:
        photo_gallery_html = """
                                <!-- Photo Gallery -->
                                <h3 style="color: #212529; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 25px 0 15px 0;">Projektfotos</h3>
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                    <tr>
                                        <td>
        """
        # Add each photo as inline image
        for i, photo_name in enumerate(photos_saved[:10]):  # Max 10 photos inline
            cid = f"photo{i}"
            photo_gallery_html += f"""
                                            <div style="margin-bottom: 15px; background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                                <img src="cid:{cid}" style="width: 100%; max-width: 520px; height: auto; display: block;" alt="Projektfoto {i+1}">
                                                <div style="padding: 10px 15px; background: #fff;">
                                                    <span style="color: #6c757d; font-size: 12px;">Foto {i+1} von {photo_count}</span>
                                                </div>
                                            </div>
            """
        photo_gallery_html += """
                                        </td>
                                    </tr>
                                </table>
        """

    # Photo count info section
    photo_info_html = f"""
                                <!-- Photos Info -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3e6; border-radius: 8px; border: 1px solid #ffe0cc;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td width="50" valign="top">
                                                        <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #E85A1E, #F5A623); border-radius: 10px; text-align: center; line-height: 44px;">
                                                            <span style="font-size: 20px;">📸</span>
                                                        </div>
                                                    </td>
                                                    <td style="padding-left: 15px;">
                                                        <span style="color: #E85A1E; font-size: 18px; font-weight: 700;">{photo_count} Foto(s)</span><br>
                                                        <span style="color: #666; font-size: 13px;">{"Oben angezeigt und als Anhang beigefügt" if photo_count > 0 else "Keine Fotos hochgeladen"}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
    """

    msg.html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #E85A1E, #F5A623); padding: 30px 40px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Neue Projektanfrage</h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">{category}</p>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <!-- Customer Info -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 25px;">
                                            <h3 style="color: #E85A1E; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px 0;">Kundendaten</h3>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span><br>
                                                        <span style="color: #212529; font-size: 18px; font-weight: 700;">{firstname} {lastname}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0; border-bottom: 1px solid #e9ecef;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">E-Mail</span><br>
                                                        <a href="mailto:{email}" style="color: #E85A1E; font-size: 16px; font-weight: 600; text-decoration: none;">{email}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 15px 0 8px 0;">
                                                        <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</span><br>
                                                        <a href="tel:{phone}" style="color: #E85A1E; font-size: 16px; font-weight: 600; text-decoration: none;">{phone}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Address with Maps Link -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 8px; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 25px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td width="50" valign="top">
                                                        <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #E85A1E, #F5A623); border-radius: 10px; text-align: center; line-height: 44px;">
                                                            <span style="font-size: 20px;">📍</span>
                                                        </div>
                                                    </td>
                                                    <td style="padding-left: 15px;">
                                                        <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Projektadresse</span><br>
                                                        <span style="color: #fff; font-size: 16px; font-weight: 600; line-height: 1.5;">{address}<br>{zipcode} {city}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                                                <tr>
                                                    <td align="center" style="padding-right: 8px;" width="50%">
                                                        <a href="{maps_url}" style="display: block; background: rgba(255,255,255,0.1); color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; border: 1px solid rgba(255,255,255,0.2);">📍 In Maps öffnen</a>
                                                    </td>
                                                    <td align="center" style="padding-left: 8px;" width="50%">
                                                        <a href="{maps_directions_url}" style="display: block; background: linear-gradient(135deg, #E85A1E, #F5A623); color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px;">🚗 Route starten</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Project Description -->
                                <h3 style="color: #212529; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;">Projektbeschreibung</h3>
                                <div style="background-color: #fff; border-left: 4px solid #E85A1E; padding: 20px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 25px;">
                                    <p style="color: #495057; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{description}</p>
                                </div>

{photo_gallery_html}

{photo_info_html}

                                <!-- Quick Actions -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                    <tr>
                                        <td align="center" style="padding-right: 10px;" width="50%">
                                            <a href="mailto:{email}?subject=Re: Projektanfrage {category}" style="display: block; background: linear-gradient(135deg, #E85A1E, #F5A623); color: #ffffff; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">✉️ Antworten</a>
                                        </td>
                                        <td align="center" style="padding-left: 10px;" width="50%">
                                            <a href="tel:{phone}" style="display: block; background: #1a1a1a; color: #ffffff; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Anrufen</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                                <p style="color: #888; font-size: 13px; margin: 0;">Schulzke Bau- & Industriemontagen</p>
                                <p style="color: #666; font-size: 12px; margin: 8px 0 0 0;">Projektanfrage über schulzkebau.com</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    # Attach photos with Content-ID for inline display
    for i, photo_name in enumerate(photos_saved[:10]):
        photo_path = os.path.join(photos_dir, photo_name)
        if os.path.exists(photo_path):
            with open(photo_path, 'rb') as f:
                photo_data = f.read()
                # Determine content type
                content_type = 'image/jpeg'
                if photo_name.lower().endswith('.png'):
                    content_type = 'image/png'
                elif photo_name.lower().endswith('.gif'):
                    content_type = 'image/gif'
                elif photo_name.lower().endswith('.webp'):
                    content_type = 'image/webp'

                # Attach with Content-ID for inline display in email body
                msg.attach(
                    photo_name,
                    content_type,
                    photo_data,
                    'inline',
                    headers=[['Content-ID', f'<photo{i}>']]
                )

                # Also attach as regular attachment for download
                msg.attach(
                    f"Anhang_{photo_name}",
                    content_type,
                    photo_data,
                    'attachment'
                )

    mail.send(msg)
    print("Project inquiry email sent successfully")

@app.route('/sitemap.xml')
def sitemap():
    """Serve sitemap.xml for SEO"""
    return send_from_directory('static', 'sitemap.xml', mimetype='application/xml')

@app.route('/robots.txt')
def robots():
    """Serve robots.txt for SEO"""
    return send_from_directory('static', 'robots.txt', mimetype='text/plain')

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    """Handle 500 errors"""
    return render_template('index.html', error=True), 500

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('contacts', exist_ok=True)
    os.makedirs('applications', exist_ok=True)
    os.makedirs('projects', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    os.makedirs('templates', exist_ok=True)

    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)
