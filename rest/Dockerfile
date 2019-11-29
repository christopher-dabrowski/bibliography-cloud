FROM openjdk:11
#COPY . .
#ENV MONGO_URL mongodb://localhost/belfastjug_sample_01
EXPOSE 8080

ENV HOST=Docker

COPY build/libs/api-0.0.1-SNAPSHOT.jar api.jar

CMD ["java", "-jar", "api.jar"]