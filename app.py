from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_mail import Mail, Message
import os
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here-change-in-production'

# File Upload Configuration
app.config['UPLOAD_FOLDER'] = 'applications'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload
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
    """Send email notification for application"""
    if not app.config['MAIL_USERNAME']:
        print("Email not configured - skipping email notification")
        return

    msg = Message(
        subject=f"Neue Bewerbung: {position} - {firstname} {lastname}",
        recipients=['schulzkebau@t-online.de'],  # Change to your email
        reply_to=email
    )

    msg.body = f"""
Neue Bewerbung über die Website

Position: {position}

BEWERBER-DATEN:
Name: {firstname} {lastname}
E-Mail: {email}
Telefon: {phone}
Adresse: {address}
PLZ/Stadt: {zipcode} {city}

NACHRICHT:
{message}

DOKUMENTE:
{chr(10).join([f'- {file_type}: {filename}' for file_type, filename in files_saved.items()])}

Die vollständige Bewerbung wurde gespeichert in: {app_dir}
    """

    # Attach files to email
    for file_type, filename in files_saved.items():
        filepath = os.path.join(app_dir, filename)
        with open(filepath, 'rb') as f:
            msg.attach(filename, 'application/octet-stream', f.read())

    mail.send(msg)
    print("Application email sent successfully")

@app.route('/submit-project', methods=['POST'])
def submit_project():
    """Handle project inquiry submissions"""
    try:
        # Get form data
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        email = request.form.get('email')
        phone = request.form.get('phone')
        address = request.form.get('address', '')
        zipcode = request.form.get('zipcode', '')
        city = request.form.get('city', '')
        category = request.form.get('category')
        description = request.form.get('description')

        # Validate required fields
        if not all([firstname, lastname, email, phone, category, description]):
            return jsonify({'error': 'Required fields missing'}), 400

        # Create project directory with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        project_name = f"{lastname}_{firstname}_{category}".replace(' ', '_')
        project_dir = os.path.join('projects', f"{timestamp}_{project_name}")
        os.makedirs(project_dir, exist_ok=True)

        # Create photos subdirectory
        photos_dir = os.path.join(project_dir, 'photos')
        os.makedirs(photos_dir, exist_ok=True)

        # Save uploaded photos
        photos_saved = []
        if 'photos' in request.files:
            photos = request.files.getlist('photos')
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
    """Send email notification for project inquiry"""
    if not app.config['MAIL_USERNAME']:
        print("Email not configured - skipping email notification")
        return

    msg = Message(
        subject=f"Neue Projektanfrage: {category} - {firstname} {lastname}",
        recipients=['schulzkebau@t-online.de'],  # Change to your email
        reply_to=email
    )

    msg.body = f"""
Neue Projektanfrage über die Website

KONTAKTDATEN:
Name: {firstname} {lastname}
E-Mail: {email}
Telefon: {phone}
Adresse: {address}
PLZ/Stadt: {zipcode} {city}

PROJEKTDETAILS:
Kategorie: {category}

Beschreibung:
{description}

FOTOS:
{len(photos_saved)} Foto(s) hochgeladen

Die vollständige Projektanfrage wurde gespeichert in: {project_dir}
    """

    # Attach photos to email (max 5 to avoid large emails)
    photos_dir = os.path.join(project_dir, 'photos')
    for i, photo_name in enumerate(photos_saved[:5]):  # Limit to 5 photos in email
        photo_path = os.path.join(photos_dir, photo_name)
        if os.path.exists(photo_path):
            with open(photo_path, 'rb') as f:
                msg.attach(photo_name, 'image/jpeg', f.read())

    if len(photos_saved) > 5:
        msg.body += f"\n\nHinweis: {len(photos_saved) - 5} weitere Foto(s) wurden gespeichert, aber nicht an diese E-Mail angehängt."

    mail.send(msg)
    print("Project inquiry email sent successfully")

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
