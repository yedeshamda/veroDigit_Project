FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
EXPOSE 9091
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]