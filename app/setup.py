from hashlib import sha256
import redis


def create_sample_users() -> None:
    """Fill redis with predefined users"""

    users = [('jan', 'AAA'),
             ('zupan', 'gros'),
             ('Atrox', 'password')]

    # Store hashes of passwords
    users = ((u[0], sha256(u[1].encode()).hexdigest()) for u in users)

    # Save users to db
    red = redis.Redis()

    for user in users:
        result_code = red.hset('users', *user)
        if result_code != 1:
            raise Exception('Unable to add user to db')
