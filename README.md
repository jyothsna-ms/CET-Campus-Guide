# CET Campus Guide

Run the redesigned app from this folder:

```powershell
python server.py
```

Then open:

```text
http://127.0.0.1:8765
```

The app includes:

- Spotify-style sign-up/login onboarding
- HTTP-only session cookies
- SQLite database integration
- Password hashing with PBKDF2
- API-backed guide content, locations and profiles
- Six main navigation sections
- Campus map only inside the Campus section
- Admin editing protected by `CET_ADMIN_CODE`

Default admin signup code:

```text
CETADMIN
```

For deployment, set a stronger code before starting the server:

```powershell
$env:CET_ADMIN_CODE="replace-with-a-secret"
python server.py
```
