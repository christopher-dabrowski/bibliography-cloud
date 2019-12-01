FROM openjdk:11
EXPOSE 8081

ENV HOST=Docker

COPY Storage Storage
COPY build/libs/api-0.0.1-SNAPSHOT.jar api.jar

CMD ["java", "-jar", "api.jar"]