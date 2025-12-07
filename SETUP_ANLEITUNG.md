# 🚀 Setup-Anleitung für Ihre neue Website

## 📋 Überblick

Ihre neue Website besteht jetzt aus **mehreren Seiten**:

### Hauptseiten:
1. **Homepage** (`/`) - Ihre Hauptseite mit allen Sektionen
2. **Impressum** (`/impressum`) - Rechtlich erforderlich ✅
3. **Datenschutz** (`/datenschutz`) - DSGVO-konform ✅
4. **AGB** (`/agb`) - Allgemeine Geschäftsbedingungen ✅

## 🎯 Schnellstart

```bash
# 1. Abhängigkeiten installieren
pip install -r requirements.txt

# 2. Umgebungsvariablen einrichten (optional)
copy .env.example .env

# 3. Server starten
python app.py
```

**Website ist erreichbar unter:** http://localhost:5000

## 📁 Projektstruktur

```
SCHULZKE/
├── app.py                      # Flask-Anwendung (Backend)
├── requirements.txt            # Python-Pakete
├── .env.example               # Umgebungsvariablen-Vorlage
├── .gitignore                 # Git-Ignorierte Dateien
├── README.md                  # Haupt-Dokumentation
├── SETUP_ANLEITUNG.md         # Diese Datei
│
├── templates/                 # HTML-Templates
│   ├── base.html             # Basis-Template (Navigation + Footer)
│   ├── index.html            # Homepage
│   ├── impressum.html        # Impressum
│   ├── datenschutz.html      # Datenschutzerklärung
│   └── agb.html              # AGB
│
├── static/                    # Statische Dateien
│   └── script.js             # JavaScript für Interaktivität
│
└── contacts/                  # Gespeicherte Kontaktanfragen
    └── (wird automatisch erstellt)
```

## ✏️ Wichtige Anpassungen

### 1. Kontaktdaten ergänzen

Suchen Sie in den folgenden Dateien nach Platzhaltern und ersetzen Sie diese:

#### In `templates/index.html`:
- Zeile ~850: Telefonnummer
- Zeile ~865: Vollständige Adresse

#### In `templates/impressum.html`:
- Zeile ~26: Vollständige Adresse
- Zeile ~30: Telefonnummer

#### In `templates/datenschutz.html`:
- Zeile ~90: Hosting-Anbieter Details
- Zeile ~110: Vollständige Adresse

### 2. Farben anpassen (optional)

Die Hauptfarbe ist Orange (`primary-600: #e14f0f`).

Zu ändern in:
- `templates/base.html` (Zeile 11-30)
- `templates/index.html` (Zeile 13-32)

### 3. Logo/Bilder hinzufügen

#### Eigenes Logo hinzufügen:
1. Logo in `static/images/logo.png` speichern
2. In `templates/base.html` und `templates/index.html` den Logo-Bereich ersetzen:

```html
<!-- Statt Text-Logo -->
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Schulzke Logo" class="h-12">
```

#### Projekt-Bilder hinzufügen:
1. Bilder in `static/images/` speichern (z.B. `projekt1.jpg`)
2. Platzhalter in den Sektionen ersetzen:

```html
<!-- Beispiel für Referenzen -->
<div class="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300">
```

Ersetzen durch:
```html
<div class="aspect-[4/3]">
    <img src="{{ url_for('static', filename='images/projekt1.jpg') }}"
         alt="Projekt Name"
         class="w-full h-full object-cover">
</div>
```

## 📧 Email-Benachrichtigungen einrichten

### Für Gmail:

1. Google-Konto: 2-Faktor-Authentifizierung aktivieren
2. App-Passwort erstellen: https://myaccount.google.com/apppasswords
3. In `.env` eintragen:

```env
MAIL_USERNAME=ihre-email@gmail.com
MAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  # Das App-Passwort
```

### Für andere Email-Anbieter:

In `app.py` (Zeile 10-11) anpassen:
```python
app.config['MAIL_SERVER'] = 'smtp.ihr-anbieter.de'
app.config['MAIL_PORT'] = 587  # oder 465 für SSL
```

## 🔒 Rechtliche Hinweise

### ⚠️ WICHTIG - Vor dem Live-Gang:

1. **Impressum:**
   - [ ] Vollständige Adresse eintragen
   - [ ] Telefonnummer ergänzen
   - [ ] Falls Handelsregister: Registernummer ergänzen

2. **Datenschutz:**
   - [ ] Hosting-Anbieter eintragen
   - [ ] Kontaktdaten vervollständigen
   - [ ] Optional: Von Anwalt prüfen lassen

3. **AGB:**
   - [ ] Individuelle Anpassungen vornehmen
   - [ ] Von Fachanwalt prüfen lassen (empfohlen!)

## 🌐 Website live schalten

### Option 1: Heroku (Kostenlos/Einfach)

```bash
# 1. Heroku CLI installieren
# 2. Heroku-App erstellen
heroku create schulzke-bau

# 3. Deployen
git push heroku main

# 4. Umgebungsvariablen setzen
heroku config:set SECRET_KEY=ihr-geheimer-key
heroku config:set MAIL_USERNAME=ihre-email@gmail.com
heroku config:set MAIL_PASSWORD=ihr-app-passwort
```

### Option 2: PythonAnywhere

1. Account erstellen: https://www.pythonanywhere.com
2. Code hochladen
3. Web-App konfigurieren
4. Umgebungsvariablen setzen

### Option 3: Eigener Server (VPS)

```bash
# Nginx + Gunicorn Setup
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## 🧪 Testing

### Lokales Testen:

1. **Homepage:** http://localhost:5000
2. **Impressum:** http://localhost:5000/impressum
3. **Datenschutz:** http://localhost:5000/datenschutz
4. **AGB:** http://localhost:5000/agb

### Kontaktformular testen:

1. Formular ausfüllen und absenden
2. Check: `contacts/` Ordner → Neue .txt Datei sollte erstellt werden
3. Bei Email-Konfiguration: Email-Posteingang prüfen

## 📱 Mobile-Ansicht testen

Browser → Entwicklertools (F12) → Device-Toolbar

Testen auf:
- iPhone (375px)
- iPad (768px)
- Desktop (1920px)

## 🎨 Design-Anpassungen

### Schriftarten ändern:

In `templates/base.html` oder `templates/index.html` die Google Fonts URL anpassen:

```html
<link href="https://fonts.googleapis.com/css2?family=IhreSchrift:wght@400;700&display=swap" rel="stylesheet">
```

### Abstände/Größen anpassen:

Tailwind CSS Klassen verwenden:
- `p-4` = Padding
- `mb-8` = Margin Bottom
- `text-2xl` = Text-Größe

Dokumentation: https://tailwindcss.com/docs

## 🐛 Troubleshooting

### Server startet nicht:
```bash
# Port bereits belegt?
python app.py  # Versucht Port 5000

# Alternativen Port:
# In app.py Zeile 120 ändern: port=5001
```

### Kontaktformular funktioniert nicht:
1. Browser-Konsole öffnen (F12)
2. Fehler prüfen
3. Flask-Terminal Ausgabe prüfen

### Seiten werden nicht gefunden (404):
1. Server neu starten
2. Browser-Cache leeren
3. URL prüfen: `/impressum` nicht `/impressum.html`

## 📞 Support

Bei Fragen:
1. README.md lesen
2. Flask-Dokumentation: https://flask.palletsprojects.com/
3. Tailwind CSS Docs: https://tailwindcss.com/

## ✅ Checkliste vor Live-Gang

- [ ] Alle Kontaktdaten eingetragen
- [ ] Eigene Bilder hochgeladen
- [ ] Impressum vollständig
- [ ] Datenschutz angepasst
- [ ] AGB geprüft
- [ ] Kontaktformular getestet
- [ ] Mobile-Ansicht getestet
- [ ] SECRET_KEY geändert
- [ ] Email-Benachrichtigung funktioniert
- [ ] SSL-Zertifikat eingerichtet (HTTPS)
- [ ] Backup-Strategie definiert

## 🎉 Viel Erfolg mit Ihrer neuen Website!

Die Website ist modern, professionell und rechtssicher aufgebaut.
Bei Fragen stehe ich gerne zur Verfügung!
