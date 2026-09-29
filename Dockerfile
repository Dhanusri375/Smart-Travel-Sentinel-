# Smart Travel Sentinel - Multi-Platform Dockerfile
FROM python:3.11-slim

# Prevent Python from writing .pyc files & enable unbuffered stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy dependency definition
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Cloud platforms inject PORT dynamically; default to 8000
ENV PORT=8000
ENV HOST=0.0.0.0

EXPOSE 8000

# Start server using dynamic environment variables
CMD ["python", "server.py"]
