# Use Java 23 base image
FROM eclipse-temurin:23-jdk

# Set working directory
WORKDIR /app

# Copy project files into the container
COPY . .

# Give executable permission to mvnw
RUN chmod +x ./mvnw

# Package the application using Maven wrapper
RUN ./mvnw clean package -DskipTests

# Run the packaged application
CMD ["java", "-jar", "target/TouristReviewBackend-0.0.1-SNAPSHOT.jar"]
