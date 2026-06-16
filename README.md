# CET Guide Backend

This folder contains a lightweight backend plus refreshed static pages for the CET campus guide.

## Run

```powershell
node server.js
```

Then open `http://localhost:3000`.

## API

- `GET /api/health`
- `GET /api/cet`
- `GET /api/contacts`
- `GET /api/hods`
- `GET /api/facilities`
- `GET /api/locations`
- `GET /api/style-guide`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/locations`
- `PUT /api/locations/:id`
- `DELETE /api/locations/:id`

The curated source data lives in `data/cet-data.json`. It includes official CET contact, HOD, facility, vision/mission and campus navigation starter data from `cet.ac.in`.
