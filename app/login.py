import secrets
import redis
from datetime import datetime, timedelta


class LoginManager(object):
    """Class responsible for keeping track of logged users and session data"""

    def __init__(self, redisConnection=redis.Redis()):
        self.redis: redis.Redis = redisConnection

    def generateSessionID(self) -> str:
        """Generate session id used for user login feature"""
        for _ in range(100):
            id = secrets.token_urlsafe(128)
            if self.redis.exists(id):
                continue
            return id

        raise Exception('Unable to find free session id')

    def registerLogin(self, login: str) -> str:
        """Register that user logged in and return session cookie id"""
        sessionID = self.generateSessionID()
        exp_date = datetime.now() + timedelta(minutes=30)

        self.redis.hset(sessionID, 'login', login)
        self.redis.hset(sessionID, 'exp', str(exp_date))

    def isSessionValid(self, session_id: str) -> bool:
        """Check if user session cookie is valid"""
        if not self.redis.exists(session_id):
            return False
        if self.redis.hget(session_id, 'exp') > datetime.now():
            self.registerLogout(session_id)
            return False

        return True

    def registerLogout(self, session_id: str) -> None:
        """Register that user logged out"""
        self.redis.delete(session_id)

    def getLogin(self, session_id: str) -> str:
        return self.redis.hget(session_id, 'login')
