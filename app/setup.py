from hashlib import sha256
import redis


def create_sample_users(user_manager) -> None:
    """Fill redis with predefined users"""

    users = [('jan', 'AAA'),
             ('zupan', 'gros'),
             ('Atrox', 'password')]

    for user in users:
        user_manager.addUser(*user)
