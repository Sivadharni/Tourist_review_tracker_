# Tourist Attraction Review System - Deployment Guide

## 🚀 Complete Deployment Instructions

This guide covers the complete deployment process for both the Spring Boot backend and React frontend.

## 📋 Prerequisites

### Development Environment
- **Java 23** (JDK)
- **Node.js 16+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**

### Production Environment
- **Docker** (recommended)
- **Cloud Provider** (AWS, Heroku, DigitalOcean, etc.)
- **Domain Name** (optional)
- **SSL Certificate** (recommended)

## 🗄️ Database Setup

### MySQL Configuration

1. **Create Database**
```sql
CREATE DATABASE tourist_review_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tourist_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON tourist_review_db.* TO 'tourist_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Environment Variables**
```bash
# Backend Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tourist_review_db
DB_USER=tourist_user
DB_PASSWORD=secure_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRATION=86400000
```

## 🔧 Backend Deployment

### Option 1: Traditional Deployment

1. **Build the Application**
```bash
cd tourist_review_tracker-main
./mvnw clean package -DskipTests
```

2. **Run the JAR**
```bash
java -jar target/TouristReviewBackend-0.0.1-SNAPSHOT.jar
```

3. **Configure Application Properties**
```properties
# src/main/resources/application-prod.properties
spring.datasource.url=jdbc:mysql://your-db-host:3306/tourist_review_db
spring.datasource.username=tourist_user
spring.datasource.password=secure_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT
jwt.secret=your_super_secret_jwt_key_here
jwt.expiration=86400000

# CORS
cors.allowed-origins=https://yourdomain.com
```

### Option 2: Docker Deployment

1. **Build Docker Image**
```bash
docker build -t tourist-review-backend .
```

2. **Run with Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: tourist_review_db
      MYSQL_USER: tourist_user
      MYSQL_PASSWORD: secure_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: tourist_review_db
      DB_USER: tourist_user
      DB_PASSWORD: secure_password
      JWT_SECRET: your_super_secret_jwt_key_here
    depends_on:
      - mysql

volumes:
  mysql_data:
```

3. **Start Services**
```bash
docker-compose up -d
```

## 🌐 Frontend Deployment

### Option 1: Static Hosting (Netlify/Vercel)

1. **Build for Production**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

3. **Environment Variables**
```bash
# Netlify Environment Variables
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Option 2: Docker Deployment

1. **Create Dockerfile**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Nginx Configuration**
```nginx
# nginx.conf
events {}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }

    location /api {
      proxy_pass http://backend:8080;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

### Option 3: Same Server Deployment

1. **Serve from Spring Boot**
```java
// Add to your Spring Boot application
@Controller
public class StaticContentController {
    
    @GetMapping(value = {"/", "/{path:^(?!api).*$}/**"})
    public String index() {
        return "forward:/index.html";
    }
}
```

2. **Copy Build Files**
```bash
cp -r frontend/build/* src/main/resources/static/
```

## 🔒 Security Configuration

### SSL/TLS Setup

1. **Let's Encrypt (Recommended)**
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get Certificate
sudo certbot --nginx -d yourdomain.com
```

2. **Manual SSL Configuration**
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

### Security Headers
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📊 Monitoring & Logging

### Application Monitoring

1. **Spring Boot Actuator**
```properties
# application.properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

2. **Logback Configuration**
```xml
<!-- src/main/resources/logback-spring.xml -->
<configuration>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/tourist-review.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/tourist-review.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 23
      uses: actions/setup-java@v2
      with:
        java-version: '23'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: ./mvnw clean package -DskipTests
    
    - name: Deploy to server
      run: |
        scp target/*.jar user@server:/path/to/app/
        ssh user@server 'systemctl restart tourist-review'

  frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: cd frontend && npm ci
    
    - name: Build
      run: cd frontend && npm run build
    
    - name: Deploy to Netlify
      run: |
        npx netlify-cli deploy --prod --dir=frontend/build
```

## 🌍 Environment Variables

### Production Environment Setup

```bash
# Backend (.env)
DB_HOST=your-production-db-host
DB_PORT=3306
DB_NAME=tourist_review_db
DB_USER=production_user
DB_PASSWORD=secure_production_password
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Frontend (.env)
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_ENV=production
```

## 🧪 Testing Before Deployment

### Backend Tests
```bash
# Run all tests
./mvnw test

# Run integration tests
./mvnw verify

# Generate test report
./mvnw jacoco:report
```

### Frontend Tests
```bash
cd frontend
npm test -- --coverage --watchAll=false
```

## 📈 Performance Optimization

### Backend Optimization
```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5

# Caching
spring.cache.type=redis
spring.redis.host=localhost
spring.redis.port=6379
```

### Frontend Optimization
```json
// package.json scripts
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
```java
@CrossOrigin(origins = "https://yourdomain.com")
@RestController
public class YourController {
    // Controller methods
}
```

2. **Database Connection Issues**
```bash
# Check MySQL service
sudo systemctl status mysql

# Check logs
tail -f /var/log/mysql/error.log
```

3. **Frontend Build Errors**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Update dependencies
   - Check security vulnerabilities
   - Review application logs

2. **Monthly**
   - Database backups
   - Performance monitoring
   - SSL certificate renewal

3. **Quarterly**
   - Security audits
   - Capacity planning
   - User feedback review

### Backup Strategy

```bash
# Database Backup
mysqldump -u tourist_user -p tourist_review_db > backup_$(date +%Y%m%d).sql

# Application Backup
tar -czf tourist_review_backup_$(date +%Y%m%d).tar.gz \
  target/*.jar \
  src/main/resources/ \
  docker-compose.yml
```

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Backend API is accessible at `/api` endpoints
- ✅ Frontend loads correctly in production
- ✅ User authentication works properly
- ✅ Database operations function correctly
- ✅ SSL certificate is properly configured
- ✅ Error pages display correctly
- ✅ Analytics tracking is working
- ✅ Social sharing features work
- ✅ Image uploads function properly

## 📚 Additional Resources

- [Spring Boot Deployment Guide](https://spring.io/guides/gs/deploying-to-heroku/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration Guide](https://www.nginx.com/resources/wiki/start/)

---

**🎉 Congratulations!** Your Tourist Attraction Review System is now deployed and ready for users!
