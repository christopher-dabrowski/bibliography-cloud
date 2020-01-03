FROM gradle:jdk11 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11
EXPOSE 8090

ENV HOST=Docker

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
# COPY build/libs/api-0.0.1-SNAPSHOT.jar api.jar

CMD ["java", "-jar", "app.jar"]