from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth_router, users_router, projects_router

app = FastAPI(
    title="Virtual Startup Platform API",
    description="Backend API for the Virtual Startup Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8001"],  # Frontend URL and Swagger UI
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(projects_router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
async def root():
    return {"message": "Welcome to Virtual Startup Platform API"} 