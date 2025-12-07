# Schulzke Bau- & Industriemontagen Website

Moderne, responsive Website für Schulzke Bau- & Industriemontagen.

## Features

- ✨ Modernes, professionelles Design mit Tailwind CSS
- 📱 Voll responsive (Mobile, Tablet, Desktop)
- 🎯 Alle Hauptsektionen:
  - Hero Section mit Statistiken
  - Über uns
  - Leistungen (6 Hauptkategorien)
  - Referenzen
  - Galerie
  - Stellenangebote
  - Kontaktformular
- 🚀 Flask Backend für Kontaktformular
- 📧 Email-Benachrichtigungen (optional)
- 💾 Automatische Speicherung von Kontaktanfragen
- 🎨 Smooth Scrolling & Animationen
- 🔍 SEO-optimiert

## Installation

1. **Python-Abhängigkeiten installieren:**
```bash
pip install -r requirements.txt
```

2. **Umgebungsvariablen konfigurieren:**
```bash
# Kopieren Sie .env.example zu .env
copy .env.example .env

# Bearbeiten Sie .env und fügen Sie Ihre Konfiguration hinzu
```

3. **Anwendung starten:**
```bash
python app.py
```

Die Website ist dann verfügbar unter: `http://localhost:5000`

## Projektstruktur

```
SCHULZKE/
├── app.py                 # Flask Hauptanwendung
├── requirements.txt       # Python-Abhängigkeiten
├── .env.example          # Umgebungsvariablen-Vorlage
├── README.md             # Diese Datei
├── templates/
│   └── index.html        # Haupt-HTML-Template
├── static/
│   └── script.js         # JavaScript für Interaktivität
└── contacts/             # Gespeicherte Kontaktanfragen
```

## Konfiguration

### Email-Benachrichtigungen einrichten (Optional)

1. Öffnen Sie `.env`
2. Tragen Sie Ihre Email-Konfiguration ein:
```
MAIL_USERNAME=ihre-email@gmail.com
MAIL_PASSWORD=ihr-app-passwort
```

**Hinweis für Gmail:**
- Verwenden Sie ein App-spezifisches Passwort (nicht Ihr reguläres Passwort)
- Aktivieren Sie "Weniger sichere Apps" oder verwenden Sie 2-Faktor-Authentifizierung mit App-Passwort

### Kontaktformular

Kontaktanfragen werden automatisch gespeichert in: `contacts/contact_YYYYMMDD_HHMMSS.txt`

## Anpassungen

### Farben ändern

Die Hauptfarben sind in der Tailwind-Konfiguration in `index.html` definiert:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    // Orange-Töne - hier anpassen
                },
                dark: {
                    // Dunkelgrau-Töne
                }
            }
        }
    }
}
```

### Inhalte bearbeiten

Alle Texte und Inhalte befinden sich in `templates/index.html`. Suchen Sie nach den entsprechenden Sektionen und passen Sie sie an:

- **Hero Section:** Zeile ~50
- **Über uns:** Zeile ~150
- **Leistungen:** Zeile ~250
- **Referenzen:** Zeile ~400
- **Galerie:** Zeile ~500
- **Stellenangebote:** Zeile ~600
- **Kontakt:** Zeile ~750

### Bilder hinzufügen

Ersetzen Sie die Platzhalter-Hintergründe in den entsprechenden Sektionen:
```html
<!-- Beispiel -->
<div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
```

Durch:
```html
<div class="aspect-square">
    <img src="{{ url_for('static', filename='images/ihr-bild.jpg') }}" alt="Beschreibung">
</div>
```

## Deployment

### Produktionsumgebung

1. Ändern Sie `FLASK_ENV=production` in `.env`
2. Setzen Sie einen sicheren `SECRET_KEY`
3. Verwenden Sie einen WSGI-Server wie Gunicorn:

```bash
pip install gunicorn
gunicorn app:app
```

### Hosting-Optionen

- **Heroku:** Einfaches Deployment mit Git
- **PythonAnywhere:** Spezialisiert auf Python-Apps
- **DigitalOcean/AWS:** Volle Kontrolle
- **Vercel/Netlify:** Mit serverless functions

## Browser-Unterstützung

- Chrome (neueste 2 Versionen)
- Firefox (neueste 2 Versionen)
- Safari (neueste 2 Versionen)
- Edge (neueste 2 Versionen)

## Support

Bei Fragen oder Problemen:
- Überprüfen Sie die Flask-Logs
- Stellen Sie sicher, dass alle Abhängigkeiten installiert sind
- Prüfen Sie die Browser-Konsole auf JavaScript-Fehler

## Lizenz

© 2024 Schulzke Bau- & Industriemontagen. Alle Rechte vorbehalten.
