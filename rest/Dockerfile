FROM gradle:jdk11 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11
EXPOSE 8081

ENV HOST=Docker

COPY Storage Storage
COPY --from=build /home/gradle/src/build/libs/*.jar api.jar
# COPY build/libs/api-0.0.1-SNAPSHOT.jar api.jar

CMD ["java", "-jar", "api.jar"]