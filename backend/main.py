"""Minimal backend for the Ninja Van onboarding app (Substrait upload mode).

The onboarding walkthrough is a static SPA that keeps its progress in the
browser's localStorage, so this backend has no database and no real API — it
exists only to satisfy the platform contract:

  - listen on port 8000
  - serve GET /health (the readiness probe) with a 200
  - serve anything under /api (the ingress routes /api here; everything else
    goes to the frontend)

If this app later needs server-side state (per-user progress, an admin
completion dashboard), declare `database: oceanbase` in substrait.yaml, add
Flyway migrations under backend/resources/db/migration/, and build the API here.
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Ninja Van Onboarding")


class Health(BaseModel):
    status: str


@app.get("/health", response_model=Health)
def health() -> Health:
    return Health(status="ok")


@app.get("/api/health", response_model=Health)
def api_health() -> Health:
    return Health(status="ok")
